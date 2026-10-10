import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts } from "../data/mockProducts";
import { translations } from "../data/translations";
import confetti from "canvas-confetti";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language: uz | ru | en
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("sport_lang") || "uz";
  });

  // 2. Dark / Light mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("sport_theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("sport_lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("sport_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 3. Products State (CRUD with LocalStorage)
  const [products, setProducts] = useState(() => {
    const savedV3 = localStorage.getItem("sport_products_v3");
    if (savedV3) {
      try {
        return JSON.parse(savedV3);
      } catch (e) {
        console.error(e);
      }
    }
    const savedV2 = localStorage.getItem("sport_products_v2");
    if (savedV2) {
      try {
        const parsed = JSON.parse(savedV2);
        return parsed.map((p) => {
          const init = initialProducts.find((i) => i.id === p.id);
          if (init && (p.image?.includes("unsplash.com") || !p.image)) {
            return { ...p, image: init.image };
          }
          return p;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("sport_products_v3", JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd) => {
    const item = {
      ...newProd,
      id: "prod-" + Date.now(),
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 0,
      stock: Number(newProd.stock) || 10,
      price: Number(newProd.price) || 0,
      oldPrice: newProd.oldPrice ? Number(newProd.oldPrice) : null,
      specs: Array.isArray(newProd.specs) ? newProd.specs : (newProd.specs ? newProd.specs.split(",") : []),
    };
    setProducts((prev) => [item, ...prev]);
    showToast("Yangi mahsulot muvaffaqiyatli qo'shildi!");
  };

  const updateProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated, price: Number(updated.price), stock: Number(updated.stock) } : p))
    );
    showToast("Mahsulot muvaffaqiyatli yangilandi!");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Mahsulot o'chirildi");
  };

  // 4. Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("sport_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sport_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name.slice(0, 22)}..." savatga qo'shildi!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // 5. Promo Codes Management
  const [promoCodesList, setPromoCodesList] = useState(() => {
    const saved = localStorage.getItem("sport_promocodes_list");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { code: "SPORT2026", percent: 15, fixed: 0, desc: "Asosiy yangi mavsum chegirmasi (15%)" },
      { code: "FITNESS10", percent: 10, fixed: 0, desc: "Barcha fitnes tovarlariga 10%" },
      { code: "GEMINI", percent: 20, fixed: 0, desc: "VIP maxsus promo (20%)" },
      { code: "SALOM", percent: 0, fixed: 50000, desc: "Boshlang'ich xarid uchun 50 000 so'm" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("sport_promocodes_list", JSON.stringify(promoCodesList));
  }, [promoCodesList]);

  const addPromoCode = (newPromo) => {
    const code = newPromo.code.trim().toUpperCase();
    const percent = Number(newPromo.percent) || 0;
    const fixed = Number(newPromo.fixed) || 0;
    const desc = newPromo.desc?.trim() || (percent > 0 ? `${percent}% Chegirma` : `${fixed.toLocaleString()} so'm chegirma`);

    const item = { code, percent, fixed, desc };
    setPromoCodesList((prev) => {
      const filtered = prev.filter((p) => p.code !== code);
      return [item, ...filtered];
    });
    return item;
  };

  const deletePromoCode = (code) => {
    setPromoCodesList((prev) => prev.filter((p) => p.code !== code));
  };

  const [promo, setPromo] = useState(null);

  const applyPromo = (code) => {
    if (!code) return false;
    const clean = code.trim().toUpperCase();
    const found = promoCodesList.find(
      (p) => p.code && p.code.trim().toUpperCase() === clean
    );
    if (found) {
      setPromo({
        code: found.code,
        percent: Number(found.percent) || 0,
        fixed: Number(found.fixed) || 0,
        desc: found.desc || ""
      });
      const discountText =
        found.percent > 0
          ? `${found.percent}%`
          : `${(found.fixed || 0).toLocaleString()} so'm`;
      showToast(`${found.code}: ${discountText} chegirma muvaffaqiyatli qo'llandi!`);
      return true;
    }
    return false;
  };

  const removePromo = () => setPromo(null);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (promo) {
    if (promo.percent > 0) {
      discountAmount = Math.round((cartSubtotal * promo.percent) / 100);
    } else if (promo.fixed > 0) {
      discountAmount = Math.min(promo.fixed, cartSubtotal);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // 6. Wishlist (Sevimlilar)
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("sport_wishlist");
    return saved ? JSON.parse(saved) : ["prod-1", "prod-3"];
  });

  useEffect(() => {
    localStorage.setItem("sport_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Sevimlilardan olib tashlandi");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Sevimlilarga qo'shildi!");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  // 7. User & Auth
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sport_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("sport_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sport_user");
    }
  }, [user]);

  const loginUser = (identifier, password) => {
    // Check if admin
    if (
      (identifier.toLowerCase() === "admin" || identifier === "+998901234567") &&
      password === "admin123"
    ) {
      const adminUser = {
        id: "admin-1",
        username: "admin",
        name: "Bosh Administrator",
        phone: "+998901234567",
        role: "admin",
      };
      setUser(adminUser);
      showToast("Xush kelibsiz, Administrator!");
      return { success: true, user: adminUser };
    }

    // Regular user
    if (password.length >= 4) {
      const regularUser = {
        id: "usr-" + Date.now(),
        username: identifier.includes("+") ? identifier : identifier.toLowerCase(),
        name: identifier.split("@")[0] || "Sportchi",
        phone: identifier.includes("+") ? identifier : "+998900000000",
        role: "user",
      };
      setUser(regularUser);
      showToast("Tizimga muvaffaqiyatli kirdingiz!");
      return { success: true, user: regularUser };
    }

    return { success: false, error: "Parol kamida 4 belgidan iborat bo'lishi kerak!" };
  };

  const registerUser = (name, identifier, password) => {
    if (password.length < 4) {
      return { success: false, error: "Parol kamida 4 belgidan iborat bo'lishi kerak!" };
    }
    const newUser = {
      id: "usr-" + Date.now(),
      username: identifier.toLowerCase(),
      name: name || "Foydalanuvchi",
      phone: identifier.includes("+") ? identifier : "+998900000000",
      role: "user",
    };
    setUser(newUser);
    showToast("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    return { success: true, user: newUser };
  };

  const logoutUser = () => {
    setUser(null);
    showToast("Tizimdan chiqildi");
  };

  // 8. Orders Management
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("sport_orders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Initial sample orders for dashboard analytics
    return [
      {
        id: "ORD-9481",
        customerName: "Jasur Aliyev",
        phone: "+998 90 987 65 43",
        address: "Toshkent sh., Yunusobod 14-mavze, 22-uy",
        items: [
          { name: "Optimum Nutrition Gold Standard Whey", quantity: 1, price: 980000 },
          { name: "Pro Speed Sakrash Arqoni", quantity: 1, price: 95000 }
        ],
        subtotal: 1075000,
        discount: 161250,
        total: 913750,
        paymentMethod: "cash",
        status: "completed",
        date: "2026-10-07 14:32"
      },
      {
        id: "ORD-9482",
        customerName: "Madina Karimova",
        phone: "+998 97 123 45 67",
        address: "Samarqand sh., Registon ko'chasi 18",
        items: [
          { name: "Ayollar High-Waist Fitnes Legginsi", quantity: 2, price: 240000 },
          { name: "BlenderBottle Pro Shaker", quantity: 1, price: 110000 }
        ],
        subtotal: 590000,
        discount: 0,
        total: 590000,
        paymentMethod: "online",
        status: "delivering",
        date: "2026-10-08 11:15"
      },
      {
        id: "ORD-9483",
        customerName: "Sardor Rustamov",
        phone: "+998 93 555 44 33",
        address: "Toshkent sh., Chilonzor 9, 4-kvartira",
        items: [
          { name: "Sozlanuvchi Gantellar To'plami (2x10kg)", quantity: 1, price: 550000 }
        ],
        subtotal: 550000,
        discount: 55000,
        total: 495000,
        paymentMethod: "cash",
        status: "pending",
        date: "2026-10-08 17:50"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("sport_orders", JSON.stringify(orders));
  }, [orders]);

  // 9. Telegram Bot Config
  const [telegramConfig, setTelegramConfig] = useState(() => {
    const saved = localStorage.getItem("sport_telegram_config");
    return saved
      ? JSON.parse(saved)
      : {
          botToken: "7654321098:AAEXAMPLE_TOKEN_PLEASE_REPLACE",
          chatId: "-1001234567890",
        };
  });

  useEffect(() => {
    localStorage.setItem("sport_telegram_config", JSON.stringify(telegramConfig));
  }, [telegramConfig]);

  const saveTelegramConfig = (cfg) => {
    setTelegramConfig(cfg);
    showToast("Telegram sozlamalari saqlandi!");
  };

  const sendTelegramMessage = async (text) => {
    if (!telegramConfig.botToken || !telegramConfig.chatId) {
      return { success: false, error: "Bot token yoki Chat ID belgilanmagan" };
    }
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramConfig.chatId,
            text: text,
            parse_mode: "HTML",
          }),
        }
      );
      const data = await response.json();
      return { success: data.ok, data };
    } catch (err) {
      console.warn("Telegram API dispatch notice:", err);
      return { success: false, error: err.message };
    }
  };

  const createOrder = async (orderData) => {
    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      ...orderData,
      status: "pending",
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setPromo(null);

    // Fire celebratory confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Send formatted Telegram notification
    const itemsList = newOrder.items
      .map(
        (it, idx) =>
          `  ${idx + 1}. <b>${it.name || it.product?.name}</b> x ${it.quantity} = ${(
            (it.price || it.product?.price) * it.quantity
          ).toLocaleString()} so'm`
      )
      .join("\n");

    const message = `🏋️ <b>YANGI SPORT BUYURTMASI #${newOrder.id}</b>\n\n` +
      `👤 <b>Mijoz:</b> ${newOrder.customerName}\n` +
      `📞 <b>Telefon:</b> ${newOrder.phone}\n` +
      `📍 <b>Manzil:</b> ${newOrder.address}\n` +
      `💳 <b>To'lov:</b> ${newOrder.paymentMethod === "cash" ? "Naqd / Qabul qilganda" : "Onlayn (Click/Payme)"}\n\n` +
      `📦 <b>Mahsulotlar:</b>\n${itemsList}\n\n` +
      (newOrder.discount > 0 ? `🏷 <b>Chegirma:</b> -${newOrder.discount.toLocaleString()} so'm\n` : "") +
      `💰 <b>JAMI SUMMA:</b> <b>${newOrder.total.toLocaleString()} so'm</b>\n` +
      `🕒 <b>Vaqt:</b> ${newOrder.date}`;

    await sendTelegramMessage(message);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast("Buyurtma holati yangilandi: " + newStatus);
  };

  // 10. Global Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // 11. Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Active translation dictionary
  const t = translations[language] || translations.uz;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
        discountAmount,
        promo,
        promoCodesList,
        addPromoCode,
        deletePromoCode,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        user,
        loginUser,
        registerUser,
        logoutUser,
        authModalOpen,
        setAuthModalOpen,
        orders,
        createOrder,
        updateOrderStatus,
        telegramConfig,
        saveTelegramConfig,
        sendTelegramMessage,
        toastMessage,
        showToast,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
