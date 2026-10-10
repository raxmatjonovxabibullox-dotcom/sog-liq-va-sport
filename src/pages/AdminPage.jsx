import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { productCategories, getCategoryLabel } from "../data/mockProducts";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Send,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  X,
  Save,
  ArrowLeft,
  Search,
  Tag,
  Download,
  Upload,
  Printer,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  LogOut,
  Eye,
  EyeOff,
  Copy,
  Terminal,
  Crown,
  Globe,
  Bell,
  Menu,
  ChevronDown,
  ChevronRight,
  Settings,
  MoreVertical,
  Activity,
  FileText,
  CheckCircle2,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Grid,
  Lock,
  User,
  CreditCard,
  Sliders,
  BarChart2,
  Gift,
  Home
} from "lucide-react";

// Synthesized Web Audio SFX for high-tech tactile response
const playSound = (type = "click", enabled = true) => {
  if (!enabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === "success") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } else if (type === "warn") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.setValueAtTime(220, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    }
  } catch {}
};

export const AdminPage = () => {
  const {
    user,
    loginUser,
    logoutUser,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    createOrder,
    updateOrderStatus,
    telegramConfig,
    saveTelegramConfig,
    sendTelegramMessage,
    showToast,
    promoCodesList,
    addPromoCode,
    deletePromoCode,
    t,
    language,
    setLanguage
  } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'products' | 'orders' | 'promos' | 'customers' | 'telegram' | 'system'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("sport_admin_sound") !== "false");
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem("sport_admin_accent") || "emerald"); // emerald, cyan, violet, amber, rose
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Maxton Dashboard UI States
  const [dashboardSubmenuOpen, setDashboardSubmenuOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("eCommerce");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const salesViewsData = useMemo(() => [
    { month: "Jan", sales: 20, views: 18 },
    { month: "Feb", sales: 6, views: 12 },
    { month: "Mar", sales: 62, views: 44 },
    { month: "Apr", sales: 14, views: 20 },
    { month: "May", sales: 32, views: 25 },
    { month: "Jun", sales: 20, views: 18 },
    { month: "Jul", sales: 25, views: 40 },
    { month: "Aug", sales: 16, views: 12 },
    { month: "Sep", sales: 35, views: 48 },
  ], []);

  // Real-time clock
  const [currentTime, setCurrentTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Accent Maps
  const accentStyles = {
    emerald: {
      primary: "from-emerald-500 to-teal-600",
      text: "text-emerald-400",
      bgGlow: "bg-emerald-500/10",
      borderGlow: "border-emerald-500/30",
      activeTab: "bg-[#182638] text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10 shadow-sm",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      hex: "#10b981"
    },
    cyan: {
      primary: "from-cyan-500 to-blue-600",
      text: "text-cyan-400",
      bgGlow: "bg-cyan-500/10",
      borderGlow: "border-cyan-500/30",
      activeTab: "bg-[#182638] text-cyan-400 border border-cyan-500/40 shadow-cyan-500/10 shadow-sm",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      hex: "#00d2ff"
    },
    violet: {
      primary: "from-purple-500 to-indigo-600",
      text: "text-purple-400",
      bgGlow: "bg-purple-500/10",
      borderGlow: "border-purple-500/30",
      activeTab: "bg-[#182638] text-purple-400 border border-purple-500/40 shadow-purple-500/10 shadow-sm",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      hex: "#a855f7"
    },
    amber: {
      primary: "from-amber-500 to-orange-600",
      text: "text-amber-400",
      bgGlow: "bg-amber-500/10",
      borderGlow: "border-amber-500/30",
      activeTab: "bg-[#182638] text-amber-400 border border-amber-500/40 shadow-amber-500/10 shadow-sm",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      hex: "#f59e0b"
    },
    rose: {
      primary: "from-rose-500 to-pink-600",
      text: "text-rose-400",
      bgGlow: "bg-rose-500/10",
      borderGlow: "border-rose-500/30",
      activeTab: "bg-[#182638] text-rose-400 border border-rose-500/40 shadow-rose-500/10 shadow-sm",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      hex: "#f43f5e"
    }
  };
  const activeAccent = accentStyles[accentColor] || accentStyles.emerald;

  const handleAccentChange = (col) => {
    setAccentColor(col);
    localStorage.setItem("sport_admin_accent", col);
    playSound("click", soundEnabled);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("sport_admin_sound", String(next));
    playSound("click", next);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
    playSound("click", soundEnabled);
  };

  // Admin login states if not authenticated
  const [adminUsernameInput, setAdminUsernameInput] = useState("admin");
  const [adminPasswordInput, setAdminPasswordInput] = useState("admin123");
  const [adminAuthError, setAdminAuthError] = useState("");

  // Product CRUD states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  // Product Form Fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("nutrition");
  const [formPrice, setFormPrice] = useState("");
  const [formOldPrice, setFormOldPrice] = useState("");
  const [formStock, setFormStock] = useState("20");
  const [formImage, setFormImage] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formSpecs, setFormSpecs] = useState("");

  // Order Filters & Invoice State
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [viewingOrderInvoice, setViewingOrderInvoice] = useState(null);

  // Promo Codes Management State
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoPercent, setNewPromoPercent] = useState("15");
  const [newPromoDesc, setNewPromoDesc] = useState("");

  const isValidNumericId = (id) => id && /^-?\d{5,}$/.test(String(id).trim()) && String(id).trim() !== "8823235791";

  const [botToken, setBotToken] = useState("8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8");
  const [chatId, setChatId] = useState(
    isValidNumericId(telegramConfig?.chatId)
      ? String(telegramConfig.chatId).trim()
      : "8170197389"
  );
  const [isDetectingId, setIsDetectingId] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  useEffect(() => {
    if (isValidNumericId(telegramConfig?.chatId)) {
      setChatId(String(telegramConfig.chatId).trim());
    } else {
      setChatId("8170197389");
    }
  }, [telegramConfig]);

  // System & Terminal State
  const [serverPing, setServerPing] = useState(19);
  const [telegramPing, setTelegramPing] = useState(34);
  const [cpuUsage, setCpuUsage] = useState(18.5);
  const [ramUsage, setRamUsage] = useState(54.2);
  const [systemUptime, setSystemUptime] = useState(48200);
  const [terminalInput, setTerminalInput] = useState("");
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, time: "18:40:02", level: "INFO", msg: "Vite HMR dev server listening on port 5173" },
    { id: 2, time: "18:41:15", level: "SUCCESS", msg: "LocalStorage mahsulotlar bazasi yuklandi (16 tovar faol)" },
    { id: 3, time: "18:42:00", level: "INFO", msg: "Telegram Bot API integratsiyasi faol holatda" },
    { id: 4, time: "18:43:20", level: "SUCCESS", msg: "Superadmin sessiyasi faollashtirildi" }
  ]);
  const terminalLogsRef = useRef(null);
  const restoreFileRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemUptime((p) => p + 1);
      setCpuUsage(+(14 + Math.random() * 10).toFixed(1));
      setRamUsage(+(52 + Math.random() * 4).toFixed(1));
      setServerPing(Math.floor(16 + Math.random() * 8));
      setTelegramPing(Math.floor(30 + Math.random() * 12));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Total Metrics Calculations
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.total || 0), 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "pending").length;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = productSearch.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
        p.id.toLowerCase().includes(q);
      const matchCat = categoryFilter === "all" || p.category === categoryFilter;
      const matchStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && p.stock > 5) ||
        (stockFilter === "low" && p.stock > 0 && p.stock <= 5) ||
        (stockFilter === "out" && p.stock <= 0);
      return matchSearch && matchCat && matchStock;
    });
  }, [products, productSearch, categoryFilter, stockFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = orderSearchQuery.toLowerCase();
      const matchSearch =
        o.id.toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.address?.toLowerCase().includes(q);
      const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearchQuery, orderStatusFilter]);

  // Derived Customers (CRM)
  const customersList = useMemo(() => {
    const map = new Map();
    orders.forEach((o) => {
      const phone = o.phone || "Noma'lum";
      const name = o.customerName || "Sportchi";
      const address = o.address || "-";
      if (!map.has(phone)) {
        map.set(phone, {
          name,
          phone,
          address,
          ordersCount: 1,
          totalSpent: Number(o.total || 0),
          lastOrderDate: o.date || "Bugun"
        });
      } else {
        const item = map.get(phone);
        item.ordersCount += 1;
        item.totalSpent += Number(o.total || 0);
        item.lastOrderDate = o.date || item.lastOrderDate;
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // --- Handlers ---
  const handleOpenAddModal = () => {
    playSound("click", soundEnabled);
    setEditingProduct(null);
    setFormName("");
    setFormCategory("nutrition");
    setFormPrice("");
    setFormOldPrice("");
    setFormStock("20");
    setFormImage("/products/prod_1_on_whey.jpg");
    setFormDesc("");
    setFormSpecs("100% original sifat, AQSH");
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    playSound("click", soundEnabled);
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOldPrice(p.oldPrice || "");
    setFormStock(p.stock);
    setFormImage(p.image);
    setFormDesc(p.description || "");
    setFormSpecs(Array.isArray(p.specs) ? p.specs.join(", ") : "");
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;

    const catObj = productCategories.find((c) => c.id === formCategory);
    const payload = {
      name: formName,
      category: formCategory,
      categoryLabel: catObj ? catObj.labelUz : "Sport tovari",
      price: Number(formPrice),
      oldPrice: formOldPrice ? Number(formOldPrice) : null,
      stock: Number(formStock),
      image: formImage || "/products/prod_1_on_whey.jpg",
      description: formDesc,
      specs: formSpecs.split(",").map((s) => s.trim()).filter(Boolean)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    playSound("success", soundEnabled);
    setIsProductModalOpen(false);
  };

  const handleBatchDelete = () => {
    if (selectedProductIds.length === 0) return;
    if (confirm(`Rostdan ham tanlangan ${selectedProductIds.length} ta mahsulotni o'chirmoqchimisiz?`)) {
      selectedProductIds.forEach((id) => deleteProduct(id));
      setSelectedProductIds([]);
      playSound("warn", soundEnabled);
    }
  };

  const handleSaveTelegram = (e) => {
    e.preventDefault();
    let sanitized = String(chatId).trim();
    if (!isValidNumericId(sanitized)) {
      sanitized = "8170197389";
      setChatId("8170197389");
      showToast("Telegram @username qabul qilmaydi! Shaxsiy ID 8170197389 o'rnatildi.");
    }
    saveTelegramConfig({ botToken: "8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8", chatId: sanitized, botUsername: "@Kitobchalar_bot" });
    playSound("success", soundEnabled);
  };

  const handleAutoDetectChatId = async () => {
    setIsDetectingId(true);
    playSound("click", soundEnabled);
    try {
      const token = "8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8";
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
      const data = await res.json();
      if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
        for (let i = data.result.length - 1; i >= 0; i--) {
          const u = data.result[i];
          const senderId = u.message?.chat?.id || u.channel_post?.chat?.id || u.my_chat_member?.chat?.id;
          if (senderId && isValidNumericId(senderId)) {
            const detected = String(senderId);
            setChatId(detected);
            saveTelegramConfig({ botToken: token, chatId: detected, botUsername: "@Kitobchalar_bot" });
            showToast(`Chat ID topildi va saqlandi: ${detected}`);
            playSound("success", soundEnabled);
            setIsDetectingId(false);
            return;
          }
        }
      }
      setChatId("8170197389");
      saveTelegramConfig({ botToken: token, chatId: "8170197389", botUsername: "@Kitobchalar_bot" });
      showToast("Admin Chat ID: 8170197389 (@I_am_hacker1) saqlandi!");
      playSound("success", soundEnabled);
    } catch {
      showToast("Telegram serveriga ulanib bo'lmadi");
    }
    setIsDetectingId(false);
  };

  const handleTestTelegram = async () => {
    setIsTestingBot(true);
    playSound("click", soundEnabled);
    const start = performance.now();
    const res = await sendTelegramMessage(
      `⚡ <b>SOG'LIQ VA SPORT — ADMIN STUDIYASI</b>\n\nTelegram bot integratsiyasi 100% muvaffaqiyatli ishga tushirildi! Mahsulot rasmlari bilan xabar kelishi to'liq yoqildi.\nPing: ${Math.round(performance.now() - start)}ms\n🕒 Vaqt: ${new Date().toLocaleString()}`,
      "/products/prod_1_on_whey.jpg"
    );
    setIsTestingBot(false);
    if (res.success) {
      playSound("success", soundEnabled);
      showToast("Telegramga rasmli test xabar yetkazildi!");
    } else {
      playSound("warn", soundEnabled);
      showToast("Xatolik: Token yoki Chat ID ni tekshiring!");
    }
  };

  const handleSendBroadcast = async () => {
    if (!broadcastMessage.trim()) return;
    setIsBroadcasting(true);
    playSound("click", soundEnabled);
    const res = await sendTelegramMessage(
      `📢 <b>SOG'LIQ VA SPORT — MA'MURIYAT E'LONI:</b>\n\n${broadcastMessage}\n\n<i>📅 Sana: ${new Date().toLocaleString()}</i>`
    );
    setIsBroadcasting(false);
    if (res.success) {
      playSound("success", soundEnabled);
      showToast("Ommaviy e'lon Telegramga yuborildi!");
      setBroadcastMessage("");
    } else {
      playSound("warn", soundEnabled);
      showToast("Xabar jo'natilmadi: " + (res.error || "Xatolik"));
    }
  };

  const handleCreateTestOrder = async () => {
    playSound("click", soundEnabled);
    const randomProduct = products[Math.floor(Math.random() * products.length)] || products[0];
    const testOrder = {
      customerName: "Khabibullo Raxmatjonov (Test Buyurtma)",
      phone: "+998 90 987 65 43",
      address: "Toshkent sh., Yunusobod 14, 22-uy",
      items: [
        {
          id: randomProduct.id,
          name: randomProduct.name,
          price: randomProduct.price,
          quantity: 1,
          image: randomProduct.image
        }
      ],
      subtotal: randomProduct.price,
      discount: 0,
      total: randomProduct.price,
      paymentMethod: "cash"
    };
    await createOrder(testOrder);
    playSound("success", soundEnabled);
    showToast("Test buyurtma yaratildi va Telegramga yuborildi!");
  };

  const handleExportDatabase = () => {
    playSound("click", soundEnabled);
    const backup = {
      timestamp: new Date().toISOString(),
      products,
      orders,
      telegramConfig
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sogliq_Sport_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    playSound("success", soundEnabled);
    showToast("Ma'lumotlar bazasi zaxira nusxasi yuklab olindi!");
  };

  const handleRestoreDatabase = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed.products) {
          localStorage.setItem("sport_products_v3", JSON.stringify(parsed.products));
          localStorage.setItem("sport_products_v2", JSON.stringify(parsed.products));
        }
        if (parsed.orders) localStorage.setItem("sport_orders", JSON.stringify(parsed.orders));
        if (parsed.telegramConfig) localStorage.setItem("sport_telegram_config", JSON.stringify(parsed.telegramConfig));
        playSound("success", soundEnabled);
        showToast("Zaxira tiklandi! Sahifa yangilanmoqda...");
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        playSound("warn", soundEnabled);
        showToast("Noto'g'ri JSON fayl!");
      }
    };
    reader.readAsText(file);
  };

  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    const item = addPromoCode({
      code: newPromoCode,
      percent: Number(newPromoPercent) || 10,
      desc: newPromoDesc.trim() || `${newPromoPercent}% Chegirma`
    });
    setNewPromoCode("");
    setNewPromoDesc("");
    playSound("success", soundEnabled);
    showToast(`"${item.code}" promokodi yaratildi!`);
  };

  // If user is not admin, show ultra-secure executive login
  if (!user || user.role !== "admin") {
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const res = loginUser(adminUsernameInput, adminPasswordInput);
      if (!res.success || res.user.role !== "admin") {
        setAdminAuthError(
          language === "ru"
            ? "Неверный логин или пароль!"
            : language === "en"
            ? "Invalid username or password!"
            : "Login yoki parol noto'g'ri!"
        );
        playSound("warn", soundEnabled);
      } else {
        playSound("success", soundEnabled);
      }
    };

    return (
      <div className="min-h-screen bg-[#0b1120] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#11192b] border border-slate-800 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Crown className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              Executive Studio Admin
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === "ru"
                ? "Центр управления «Sog'liq va Sport»"
                : language === "en"
                ? "Control Center «Sog'liq va Sport»"
                : "\"Sog'liq va Sport\" Boshqaruv Markazi"}
            </p>
          </div>

          {adminAuthError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              {adminAuthError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {language === "ru" ? "Имя пользователя Admin" : language === "en" ? "Admin Username" : "Admin Foydalanuvchi Nomi"}
              </label>
              <input
                type="text"
                value={adminUsernameInput}
                onChange={(e) => setAdminUsernameInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-bold text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {language === "ru" ? "Пароль Admin" : language === "en" ? "Admin Password" : "Admin Paroli"}
              </label>
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-bold text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-extrabold text-sm text-white shadow-xl shadow-emerald-500/25 transition active:scale-95"
            >
              {language === "ru" ? "Войти в панель управления" : language === "en" ? "Sign in to Admin Panel" : "Boshqaruv Paneliga Kirish"}
            </button>
          </form>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                {language === "ru"
                  ? "Вернуться на главную (В магазин)"
                  : language === "en"
                  ? "Back to Home (Store)"
                  : "Bosh sahifaga (Do'konga) qaytish"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1422] text-slate-100 flex font-sans antialiased relative selection:bg-blue-500 selection:text-white">
      {/* 1. LEFT MAXTON SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#111625] border-r border-[#1a2035] transition-all duration-300 md:sticky md:top-0 md:h-screen shrink-0 overflow-y-auto flex flex-col justify-between ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isSidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="p-4 space-y-5">
          {/* Brand Logo */}
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#1c2438]">
            <Link
              to="/admin"
              onClick={() => playSound("click", soundEnabled)}
              className="flex items-center gap-3 group"
            >
              {/* Maxton Multi-Gradient Shape Logo */}
              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" className="w-8 h-8 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  <defs>
                    <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d2ff" />
                      <stop offset="100%" stopColor="#3a7bd5" />
                    </linearGradient>
                    <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f355a4" />
                      <stop offset="100%" stopColor="#7928ca" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 12 8 C 18 4, 30 6, 32 16 C 34 26, 24 34, 16 32 C 8 30, 6 12, 12 8 Z"
                    fill="url(#logoGrad1)"
                    opacity="0.9"
                  />
                  <path
                    d="M 24 14 C 30 18, 34 28, 26 34 C 18 40, 10 32, 14 24 C 18 16, 20 12, 24 14 Z"
                    fill="url(#logoGrad2)"
                    opacity="0.85"
                  />
                </svg>
              </div>

              {!isSidebarCollapsed && (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl text-white tracking-tight">Maxton</span>
                  <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase">Sport</span>
                </div>
              )}
            </Link>

            <button
              onClick={() => {
                setIsSidebarCollapsed(!isSidebarCollapsed);
                playSound("click", soundEnabled);
              }}
              className="hidden md:flex text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2238] transition"
              title="Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-4 text-xs font-medium">
            {/* GROUP 1: DASHBOARD */}
            <div>
              <button
                onClick={() => {
                  setDashboardSubmenuOpen(!dashboardSubmenuOpen);
                  setActiveTab("dashboard");
                  playSound("click", soundEnabled);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                  activeTab === "dashboard"
                    ? "bg-[#182238] text-white"
                    : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-blue-400" />
                  {!isSidebarCollapsed && <span className="font-semibold text-white">Dashboard</span>}
                </div>
                {!isSidebarCollapsed && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                      dashboardSubmenuOpen ? "" : "-rotate-90"
                    }`}
                  />
                )}
              </button>

              {/* Submenu for Dashboard */}
              {!isSidebarCollapsed && dashboardSubmenuOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1">
                  <button
                    onClick={() => {
                      setActiveSubmenu("analysis");
                      setActiveTab("dashboard");
                      playSound("click", soundEnabled);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-2 ${
                      activeSubmenu === "analysis" && activeTab === "dashboard"
                        ? "text-blue-400 font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-[10px]">›</span>
                    <span>Analysis</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveSubmenu("eCommerce");
                      setActiveTab("dashboard");
                      playSound("click", soundEnabled);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-2 ${
                      activeSubmenu === "eCommerce" && activeTab === "dashboard"
                        ? "bg-[#0d6efd] text-white font-bold shadow-md shadow-blue-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-[10px]">›</span>
                    <span>eCommerce</span>
                  </button>
                </div>
              )}

              {/* Widgets & Apps */}
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab("system");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "system" ? "bg-[#182238] text-white font-semibold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Grid className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Widgets</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                <button
                  onClick={() => {
                    setActiveTab("telegram");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "telegram" ? "bg-[#182238] text-white font-semibold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Apps</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>
            </div>

            {/* GROUP 2: UI ELEMENTS / MANAGEMENT */}
            <div>
              {!isSidebarCollapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  UI ELEMENTS
                </div>
              )}
              <div className="space-y-1">
                {/* Cards (Promocodes) */}
                <button
                  onClick={() => {
                    setActiveTab("promos");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "promos" ? "bg-[#182238] text-blue-400 font-bold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Cards</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                {/* eCommerce (Products CRUD) */}
                <button
                  onClick={() => {
                    setActiveTab("products");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "products" ? "bg-[#182238] text-blue-400 font-bold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>eCommerce</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                {/* Components (Orders) */}
                <button
                  onClick={() => {
                    setActiveTab("orders");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "orders" ? "bg-[#182238] text-blue-400 font-bold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Components</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                {/* Icons (Customers CRM) */}
                <button
                  onClick={() => {
                    setActiveTab("customers");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "customers" ? "bg-[#182238] text-blue-400 font-bold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Icons</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>
            </div>

            {/* GROUP 3: FORMS & TABLES */}
            <div>
              {!isSidebarCollapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  FORMS & TABLES
                </div>
              )}
              <div className="space-y-1">
                {/* Forms (Telegram Bot) */}
                <button
                  onClick={() => {
                    setActiveTab("telegram");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "telegram" ? "bg-[#182238] text-blue-400 font-bold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Forms</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                {/* Tables (System) */}
                <button
                  onClick={() => {
                    setActiveTab("system");
                    playSound("click", soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
                    activeTab === "system" ? "bg-[#182238] text-blue-400 font-bold" : "text-slate-400 hover:text-white hover:bg-[#141b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Tables</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>
            </div>

            {/* GROUP 4: PAGES */}
            <div>
              {!isSidebarCollapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  PAGES
                </div>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    showToast("Admin session: Active & Protected");
                    playSound("click", soundEnabled);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141b2e] transition"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Authentication</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                <button
                  onClick={() => {
                    showToast(`Admin: ${user?.name || "Khabibullo"} (${user?.username || "admin"})`);
                    playSound("click", soundEnabled);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141b2e] transition"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>User Profile</span>}
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("system");
                    playSound("click", soundEnabled);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141b2e] transition"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {!isSidebarCollapsed && <span>Timeline</span>}
                  </div>
                </button>

                <Link
                  to="/"
                  onClick={() => playSound("click", soundEnabled)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141b2e] transition"
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-blue-400" />
                    {!isSidebarCollapsed && <span>Pages (Store)</span>}
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1a2035]">
          <Link
            to="/"
            onClick={() => playSound("click", soundEnabled)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#161d31] hover:bg-[#1d2742] text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            {!isSidebarCollapsed && (
              <span>{language === "ru" ? "В магазин" : language === "en" ? "Back to shop" : "Do'konga qaytish"}</span>
            )}
          </Link>
        </div>
      </aside>

      {/* 2. MAIN MAXTON CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0e1322]">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 h-16 bg-[#111625] border-b border-[#1c2438] px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Search bar */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => {
                setIsMobileSidebarOpen(!isMobileSidebarOpen);
                playSound("click", soundEnabled);
              }}
              className="p-2 rounded-xl bg-[#161d31] text-slate-300 md:hidden hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Pill Search Input */}
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <input
                type="text"
                placeholder="Search"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  if (activeTab !== "products" && e.target.value.trim()) setActiveTab("products");
                }}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-[#182035] border border-[#232c45] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right Header Utilities: Flags, Check, Bell, Cart, Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Country Flags & Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  const nextLang = language === "uz" ? "ru" : language === "ru" ? "en" : "uz";
                  setLanguage(nextLang);
                  playSound("click", soundEnabled);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#182035] border border-[#232c45] text-xs font-bold hover:border-slate-600 transition"
                title="Tilni o'zgartirish"
              >
                <span className="text-base leading-none">
                  {language === "ru" ? "🇷🇺" : language === "en" ? "🇬🇧" : "🇺🇿"}
                </span>
                <span className="text-[11px] font-bold uppercase text-slate-300 hidden sm:inline">{language}</span>
              </button>
            </div>

            {/* Checkmark Icon */}
            <div className="p-2 rounded-xl bg-[#182035] border border-[#232c45] text-emerald-400 hidden sm:flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            {/* Notification Bell with Red Badge */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  playSound("click", soundEnabled);
                }}
                className="p-2 rounded-xl bg-[#182035] border border-[#232c45] text-slate-300 hover:text-white transition relative"
                title="Bildirishnomalar"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                  5
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#151c2e] border border-[#242e47] shadow-2xl p-3 z-50 space-y-2 text-xs animate-in fade-in">
                  <div className="font-bold text-white pb-2 border-b border-[#242e47] flex justify-between items-center">
                    <span>Bildirishnomalar</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">5 yangi</span>
                  </div>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto">
                    <div className="p-2 rounded-xl bg-[#1a233a] text-slate-300">
                      <div className="font-bold text-emerald-400 text-[11px]">Yangi buyurtma #{orders[0]?.id || "2026"}</div>
                      <div className="text-[10px] text-slate-400">{orders[0]?.customerName || "Javohir"} buyurtma berdi</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#1a233a] text-slate-300">
                      <div className="font-bold text-amber-400 text-[11px]">Zaxira ogohlantirishi</div>
                      <div className="text-[10px] text-slate-400">Optimum Nutrition zaxirasi oz qoldi (3 dona)</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#1a233a] text-slate-300">
                      <div className="font-bold text-blue-400 text-[11px]">Telegram Bot</div>
                      <div className="text-[10px] text-slate-400">Bot 100% faol holatda ishlamoqda</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon with Red Badge */}
            <div className="relative">
              <Link
                to="/cart"
                onClick={() => playSound("click", soundEnabled)}
                className="p-2 rounded-xl bg-[#182035] border border-[#232c45] text-slate-300 hover:text-white transition relative block"
                title="Do'kon savatchasi"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                  8
                </span>
              </Link>
            </div>

            {/* User Avatar with Green Active Dot */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#1c2438]">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-500/30 bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Admin Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span>A</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#111625]"></span>
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  playSound("warn", soundEnabled);
                }}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-[#1a2238] transition hidden sm:block"
                title="Chiqish (Logout)"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* BREADCRUMBS & ACTION HEADER */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pl-3 border-l border-[#1f283e]">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>eCommerce</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Settings Button */}
            <button
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
                playSound("click", soundEnabled);
              }}
              className="px-4 py-2 rounded-xl bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition active:scale-95"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* SETTINGS MODAL / POPUP */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-sm rounded-3xl bg-[#141b2e] border border-[#232d46] p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#232d46]">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <span>Dashboard Sozlamalari</span>
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Sound */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Taktil Ovoz Effekti (SFX):</span>
                  <button
                    onClick={handleToggleSound}
                    className={`px-3 py-1.5 rounded-xl font-bold transition ${
                      soundEnabled ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {soundEnabled ? "Yoniq" : "O'chiq"}
                  </button>
                </div>

                {/* Fullscreen */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">To'liq Ekran:</span>
                  <button
                    onClick={handleToggleFullscreen}
                    className="px-3 py-1.5 rounded-xl bg-[#1b243b] text-white font-bold hover:bg-[#232e4b]"
                  >
                    {isFullscreen ? "Kichraytirish" : "Kengaytirish"}
                  </button>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">Tizim Tili:</span>
                  <div className="flex gap-1">
                    {["uz", "ru", "en"].map((lng) => (
                      <button
                        key={lng}
                        onClick={() => {
                          setLanguage(lng);
                          playSound("click", soundEnabled);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                          language === lng ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {lng}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs"
              >
                Yopish
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENTS */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* 1. MAXTON ECOMMERCE DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* TOP ROW: 5 METRIC CARDS (Congratulations + 4 Sparkline cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* CARD 1: Congratulations Jhon (2 cols on desktop) */}
                <div className="sm:col-span-2 lg:col-span-2 p-5 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex items-center justify-between relative overflow-hidden group hover:border-[#2d3a5a] transition">
                  <div className="space-y-1 z-10 max-w-[65%]">
                    <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                      <span>Congratulations Khabibullo</span>
                      <span>🎉</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      You are the best seller of this month
                    </p>
                    <div className="pt-2">
                      <div className="text-2xl font-black text-white tracking-tight">
                        $168.5K
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        58% of sales target
                      </div>
                    </div>
                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setActiveTab("products");
                          playSound("click", soundEnabled);
                        }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-bold text-[11px] shadow-lg shadow-pink-500/25 transition active:scale-95"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* 3D Gift Box with Ribbons & Confetti */}
                  <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                    <span className="absolute -top-1 left-2 text-amber-300 text-xs animate-bounce">✨</span>
                    <span className="absolute -top-2 right-4 text-pink-400 text-sm animate-pulse">🎉</span>
                    <span className="absolute bottom-2 -left-2 text-cyan-300 text-xs">⭐</span>
                    <span className="absolute -bottom-1 right-2 text-amber-400 text-xs animate-ping">✨</span>

                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_10px_20px_rgba(244,63,94,0.35)]">
                      {/* Box bottom */}
                      <rect x="20" y="42" width="60" height="46" rx="6" fill="#f59e0b" />
                      <rect x="20" y="42" width="30" height="46" rx="6" fill="#d97706" opacity="0.4" />
                      {/* Box lid */}
                      <rect x="15" y="32" width="70" height="15" rx="4" fill="#fbbf24" />
                      <rect x="15" y="32" width="35" height="15" rx="4" fill="#d97706" opacity="0.3" />
                      {/* Vertical Red Ribbon */}
                      <rect x="44" y="32" width="12" height="56" fill="#ef4444" />
                      {/* Horizontal Red Ribbon */}
                      <rect x="20" y="58" width="60" height="10" fill="#dc2626" />
                      {/* Ribbon Bow */}
                      <path d="M 50 32 C 38 18, 28 22, 38 32 C 44 34, 48 33, 50 32 Z" fill="#ef4444" />
                      <path d="M 50 32 C 62 18, 72 22, 62 32 C 56 34, 52 33, 50 32 Z" fill="#dc2626" />
                      <circle cx="50" cy="32" r="5" fill="#f87171" />
                    </svg>
                  </div>
                </div>

                {/* CARD 2: Total Orders (248k) */}
                <div className="p-4 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex flex-col justify-between hover:border-blue-500/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                      <span>+24%</span>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-xl font-black text-white">248k</div>
                    <div className="text-[11px] text-slate-400 font-medium">Total Orders</div>
                  </div>
                  {/* Blue Smooth Sparkline */}
                  <div className="h-9 w-full pt-1">
                    <svg viewBox="0 0 120 35" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="sparkBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 25 Q 15 10, 30 20 T 60 12 T 90 24 T 120 8 L 120 35 L 0 35 Z" fill="url(#sparkBlue)" />
                      <path d="M 0 25 Q 15 10, 30 20 T 60 12 T 90 24 T 120 8" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* CARD 3: Total Sales ($47.6k) */}
                <div className="p-4 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex flex-col justify-between hover:border-emerald-500/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                      <span>+14%</span>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-xl font-black text-white">$47.6k</div>
                    <div className="text-[11px] text-slate-400 font-medium">Total Sales</div>
                  </div>
                  {/* Green Smooth Sparkline */}
                  <div className="h-9 w-full pt-1">
                    <svg viewBox="0 0 120 35" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="sparkGreen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 28 Q 20 32, 40 18 T 80 12 T 100 8 T 120 14 L 120 35 L 0 35 Z" fill="url(#sparkGreen)" />
                      <path d="M 0 28 Q 20 32, 40 18 T 80 12 T 100 8 T 120 14" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* CARD 4: Total Visits (189K) */}
                <div className="p-4 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex flex-col justify-between hover:border-cyan-500/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-rose-400 flex items-center gap-0.5">
                      <span>-35%</span>
                      <TrendingDown className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-xl font-black text-white">189K</div>
                    <div className="text-[11px] text-slate-400 font-medium">Total Visits</div>
                  </div>
                  {/* Cyan Smooth Sparkline */}
                  <div className="h-9 w-full pt-1">
                    <svg viewBox="0 0 120 35" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="sparkCyan" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 14 Q 20 8, 40 24 T 70 16 T 95 28 T 120 18 L 120 35 L 0 35 Z" fill="url(#sparkCyan)" />
                      <path d="M 0 14 Q 20 8, 40 24 T 70 16 T 95 28 T 120 18" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* CARD 5: Bounce Rate (24.6%) */}
                <div className="p-4 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex flex-col justify-between hover:border-amber-500/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <BarChart2 className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                      <span>+18%</span>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="text-xl font-black text-white">24.6%</div>
                    <div className="text-[11px] text-slate-400 font-medium">Bounce Rate</div>
                  </div>
                  {/* Amber Mini Vertical Columns */}
                  <div className="flex items-end justify-between h-9 gap-1 pt-1">
                    {[35, 50, 30, 65, 45, 90, 60, 95, 75, 100, 70, 85].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-[#f59e0b] rounded-t-sm transition-all duration-300 hover:bg-amber-300"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: Order Status (Donut) & Sales & Views (Dual Bar Chart) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* 1. ORDER STATUS (DONUT CHART) - spans 5 cols */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">Order Status</h3>
                    <button className="text-slate-400 hover:text-white p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Multi-Color Segmented Donut Chart */}
                  <div className="relative flex items-center justify-center my-4">
                    <svg viewBox="0 0 160 160" className="w-52 h-52 transform -rotate-90">
                      <defs>
                        <linearGradient id="donutCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00d2ff" />
                          <stop offset="100%" stopColor="#0d6efd" />
                        </linearGradient>
                        <linearGradient id="donutPink" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff416c" />
                          <stop offset="100%" stopColor="#ff4b2b" />
                        </linearGradient>
                        <linearGradient id="donutGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00e396" />
                          <stop offset="100%" stopColor="#00b074" />
                        </linearGradient>
                      </defs>

                      {/* Track Background */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#1a2238"
                        strokeWidth="14"
                      />

                      {/* Segment 1: Sales (68%) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="url(#donutCyan)"
                        strokeWidth="14"
                        strokeDasharray="256 377"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />

                      {/* Segment 2: Product (25%) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="url(#donutPink)"
                        strokeWidth="14"
                        strokeDasharray="94 377"
                        strokeDashoffset="-262"
                        strokeLinecap="round"
                      />

                      {/* Segment 3: Income (14%) */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="url(#donutGreen)"
                        strokeWidth="14"
                        strokeDasharray="52 377"
                        strokeDashoffset="-360"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-black text-white tracking-tight">68%</span>
                      <span className="text-xs text-slate-400 font-medium">Total Sales</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#1f283e] text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="text-slate-300">Sales</span>
                      </div>
                      <span className="font-bold text-white">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="text-slate-300">Product</span>
                      </div>
                      <span className="font-bold text-white">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-300">Income</span>
                      </div>
                      <span className="font-bold text-white">14%</span>
                    </div>
                  </div>
                </div>

                {/* 2. SALES & VIEWS (DUAL BAR CHART) - spans 7 cols */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#151c2e] border border-[#1f283e] flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">Sales & Views</h3>
                    <button className="text-slate-400 hover:text-white p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dual Column Bar Chart Area */}
                  <div className="relative pt-4">
                    {/* Y-axis guidelines */}
                    <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-500">
                      <div className="border-b border-[#1c2438] pb-1 flex justify-between"><span>60</span></div>
                      <div className="border-b border-[#1c2438] pb-1 flex justify-between"><span>40</span></div>
                      <div className="border-b border-[#1c2438] pb-1 flex justify-between"><span>20</span></div>
                      <div className="border-b border-[#1c2438] pb-1 flex justify-between"><span>0</span></div>
                    </div>

                    {/* Bars Container */}
                    <div className="relative h-44 flex items-end justify-between px-6 pt-2">
                      {salesViewsData.map((d) => (
                        <div
                          key={d.month}
                          onMouseEnter={() => setHoveredMonth(d.month)}
                          onMouseLeave={() => setHoveredMonth(null)}
                          className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                          {/* Tooltip on hover */}
                          {hoveredMonth === d.month && (
                            <div className="absolute -top-7 px-2 py-0.5 rounded-md bg-[#0a0e1a] border border-[#222c44] text-[10px] font-bold text-white shadow-lg pointer-events-none z-20">
                              Sales: {d.sales} | Views: {d.views}
                            </div>
                          )}

                          {/* Bars Pair */}
                          <div className="flex items-end gap-1">
                            {/* Orange/Amber Bar (Sales) */}
                            <div
                              className="w-2.5 sm:w-3.5 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-sm transition-all duration-300 group-hover:brightness-125"
                              style={{ height: `${(d.sales / 65) * 140}px` }}
                            />
                            {/* Cyan/Blue Bar (Views) */}
                            <div
                              className="w-2.5 sm:w-3.5 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-sm transition-all duration-300 group-hover:brightness-125"
                              style={{ height: `${(d.views / 65) * 140}px` }}
                            />
                          </div>

                          {/* Month Label */}
                          <span className="text-[10px] text-slate-400 font-medium group-hover:text-white transition">
                            {d.month}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center justify-center gap-6 pt-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-amber-400"></span>
                        <span className="text-slate-300">Sales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-cyan-400"></span>
                        <span className="text-slate-300">Views</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Dials: Monthly and Yearly Circular Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f283e]">
                    {/* Gauge 1: Monthly */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-[#111728] border border-[#1d263d]">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg viewBox="0 0 60 60" className="w-full h-full transform -rotate-90">
                          <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2942" strokeWidth="6" />
                          <circle
                            cx="30"
                            cy="30"
                            r="24"
                            fill="none"
                            stroke="#00d2ff"
                            strokeWidth="6"
                            strokeDasharray="110 150"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">Monthly</div>
                        <div className="text-lg font-black text-white">65,127</div>
                        <div className="text-[10px] font-bold text-emerald-400">
                          16.5% <span className="text-slate-400 font-normal">55.21 USD</span>
                        </div>
                      </div>
                    </div>

                    {/* Gauge 2: Yearly */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-[#111728] border border-[#1d263d]">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg viewBox="0 0 60 60" className="w-full h-full transform -rotate-90">
                          <circle cx="30" cy="30" r="24" fill="none" stroke="#1f2942" strokeWidth="6" />
                          <circle
                            cx="30"
                            cy="30"
                            r="24"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="6"
                            strokeDasharray="125 150"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">Yearly</div>
                        <div className="text-lg font-black text-white">984,246</div>
                        <div className="text-[10px] font-bold text-emerald-400">
                          24.9% <span className="text-slate-400 font-normal">267.35 USD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 3: QUICK RECENT ORDERS OVERVIEW */}
              <div className="p-6 rounded-2xl bg-[#151c2e] border border-[#1f283e] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1f283e]">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-blue-400" />
                    <span>{language === "ru" ? "Последние заказы" : language === "en" ? "Recent Orders" : "So'nggi Buyurtmalar"}</span>
                  </h3>
                  <button
                    onClick={() => {
                      setActiveTab("orders");
                      playSound("click", soundEnabled);
                    }}
                    className="text-xs font-bold text-blue-400 hover:underline"
                  >
                    {language === "ru" ? "Посмотреть все" : language === "en" ? "View all" : "Barchasini ko'rish"} ({orders.length})
                  </button>
                </div>

                <div className="divide-y divide-[#1f283e]">
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-black text-blue-400">#{ord.id}</span>
                        <span className="text-white font-bold ml-2">{ord.customerName}</span>
                        <span className="text-slate-400 ml-2">({ord.phone})</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-black text-white">
                          {ord.total.toLocaleString()} {t.cart?.currency || "so'm"}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : ord.status === "delivering"
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {ord.status === "completed"
                            ? (t.admin?.statusCompleted || "Yakunlandi")
                            : ord.status === "delivering"
                            ? (t.admin?.statusDelivering || "Yetkazilmoqda")
                            : (t.admin?.statusPending || "Kutilmoqda")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS TAB (CRUD) */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">
                    {language === "ru" ? "Управление товарами" : language === "en" ? "Product Management" : "Mahsulotlar Boshqaruvi"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {language === "ru"
                      ? `Всего ${products.length} товаров в каталоге`
                      : language === "en"
                      ? `Total ${products.length} products in catalog`
                      : `Jami ${products.length} ta mahsulot katalogda mavjud`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedProductIds.length > 0 && (
                    <button
                      onClick={handleBatchDelete}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>
                        {language === "ru"
                          ? `Удалить выбранные (${selectedProductIds.length})`
                          : language === "en"
                          ? `Delete selected (${selectedProductIds.length})`
                          : `Tanlanganlarni o'chirish (${selectedProductIds.length})`}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin?.addProduct || "Yangi Tovar Qo'shish"}</span>
                  </button>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0e1626] border border-slate-800">
                <div className="relative">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder={language === "ru" ? "Поиск (название, ID)..." : language === "en" ? "Search (name, ID)..." : "Qidiruv (nomi, ID)..."}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">
                    {language === "ru" ? "Все категории" : language === "en" ? "All Categories" : "Barcha Kategoriyalar"}
                  </option>
                  {productCategories
                    .filter((c) => c.id !== "all")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {getCategoryLabel(c.id, language)}
                      </option>
                    ))}
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">
                    {language === "ru" ? "Любой статус остатка" : language === "en" ? "All stock status" : "Barcha Zaxira holati"}
                  </option>
                  <option value="in_stock">
                    {language === "ru" ? "В наличии (>5)" : language === "en" ? "In stock (>5)" : "Mavjud (>5)"}
                  </option>
                  <option value="low">
                    {language === "ru" ? "Заканчивается (1-5)" : language === "en" ? "Low stock (1-5)" : "Kam qolgan (1-5)"}
                  </option>
                  <option value="out">
                    {language === "ru" ? "Закончился (0)" : language === "en" ? "Out of stock (0)" : "Tugagan (0)"}
                  </option>
                </select>
              </div>

              {/* Products Table */}
              <div className="rounded-3xl bg-[#0e1626] border border-slate-800/80 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121c30] text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-4 w-10">
                          <input
                            type="checkbox"
                            checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedProductIds(filteredProducts.map((p) => p.id));
                              else setSelectedProductIds([]);
                            }}
                            className="rounded accent-emerald-500"
                          />
                        </th>
                        <th className="p-4">
                          {language === "ru" ? "Фото и Название" : language === "en" ? "Image & Name" : "Rasm & Nomi"}
                        </th>
                        <th className="p-4">
                          {t.admin?.productCategory || "Kategoriya"}
                        </th>
                        <th className="p-4">
                          {t.admin?.productPrice || "Narxi"}
                        </th>
                        <th className="p-4">
                          {t.admin?.productStock || "Zaxira"}
                        </th>
                        <th className="p-4 text-right">
                          {language === "ru" ? "Действия" : language === "en" ? "Actions" : "Amallar"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={selectedProductIds.includes(p.id)}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedProductIds((prev) => [...prev, p.id]);
                                else setSelectedProductIds((prev) => prev.filter((id) => id !== p.id));
                              }}
                              className="rounded accent-emerald-500"
                            />
                          </td>
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                            />
                            <div className="max-w-xs">
                              <div className="font-bold text-white truncate">{p.name}</div>
                              <div className="text-[10px] text-slate-400">{p.id}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0b1120] text-slate-300 border border-slate-700">
                              {getCategoryLabel(p.category, language)}
                            </span>
                          </td>
                          <td className="p-4 font-black text-white">
                            {p.price.toLocaleString()} {t.cart?.currency || "so'm"}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.stock > 5
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : p.stock > 0
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-rose-500/10 text-rose-400"
                              }`}
                            >
                              {p.stock} {language === "ru" ? "шт." : language === "en" ? "pcs" : "ta"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 rounded-xl text-teal-400 hover:bg-slate-800 transition"
                                title={t.admin?.editProduct || "Tahrirlash"}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(t.admin?.confirmDelete || "Mahsulotni o'chirmoqchimisiz?")) {
                                    deleteProduct(p.id);
                                    playSound("warn", soundEnabled);
                                  }
                                }}
                                className="p-2 rounded-xl text-rose-400 hover:bg-slate-800 transition"
                                title={t.admin?.deleteProduct || "O'chirish"}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">
                    {language === "ru" ? "Управление заказами" : language === "en" ? "Order Management" : "Buyurtmalar Nazorati"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {language === "ru" ? "Заказы, поступившие от покупателей" : language === "en" ? "Orders received from customers" : "Xaridorlardan kelib tushgan buyurtmalar"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateTestOrder}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === "ru" ? "Новый тест-заказ" : language === "en" ? "New Test Order" : "Yangi Test Buyurtma"}</span>
                  </button>
                </div>
              </div>

              {/* Search & Status Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder={
                      language === "ru"
                        ? "Поиск по ID заказа, имени, телефону или адресу..."
                        : language === "en"
                        ? "Search by order ID, name, phone or address..."
                        : "Buyurtma ID, ism, telefon yoki manzil bo'yicha qidirish..."
                    }
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0e1626] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                  {orderSearchQuery && (
                    <button
                      onClick={() => setOrderSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0e1626] border border-slate-800 overflow-x-auto">
                  {["all", "pending", "delivering", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setOrderStatusFilter(st);
                        playSound("click", soundEnabled);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        orderStatusFilter === st
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st === "all"
                        ? (language === "ru" ? "Все" : language === "en" ? "All" : "Barchasi")
                        : st === "pending"
                        ? (t.admin?.statusPending || "Kutilmoqda")
                        : st === "delivering"
                        ? (t.admin?.statusDelivering || "Yetkazilmoqda")
                        : st === "completed"
                        ? (t.admin?.statusCompleted || "Yakunlandi")
                        : (t.admin?.statusCancelled || "Bekor qilindi")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800/80 shadow-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-emerald-400">#{ord.id}</span>
                        <span className="text-xs text-slate-400">{ord.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-semibold">{t.admin?.orderStatus || "Holati"}:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0b1120] border border-slate-700 text-white cursor-pointer"
                        >
                          <option value="pending">{t.admin?.statusPending || "Kutilmoqda"}</option>
                          <option value="delivering">{t.admin?.statusDelivering || "Yetkazilmoqda"}</option>
                          <option value="completed">{t.admin?.statusCompleted || "Yakunlandi"}</option>
                          <option value="cancelled">{t.admin?.statusCancelled || "Bekor qilindi"}</option>
                        </select>

                        <button
                          onClick={() => setViewingOrderInvoice(ord)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title={language === "ru" ? "Посмотреть чек (Печать)" : language === "en" ? "View invoice (Print)" : "Chekni ko'rish (Chop etish)"}
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-slate-400 font-semibold mb-1">
                          {t.cart?.recipient || (language === "ru" ? "Получатель:" : language === "en" ? "Recipient:" : "Xaridor:")}
                        </div>
                        <div className="font-bold text-white text-sm">{ord.customerName}</div>
                        <div className="text-slate-300 mt-0.5">📞 {ord.phone}</div>
                        <div className="text-slate-400 mt-1">📍 {ord.address}</div>
                      </div>

                      <div>
                        <div className="text-slate-400 font-semibold mb-1">
                          {language === "ru" ? "Содержимое заказа:" : language === "en" ? "Order items:" : "Buyurtma tarkibi:"}
                        </div>
                        <ul className="space-y-1">
                          {ord.items &&
                            ord.items.map((it, idx) => (
                              <li key={idx} className="text-slate-300">
                                • <b>{it.name}</b> x {it.quantity} ({(it.price * it.quantity).toLocaleString()} {t.cart?.currency || "so'm"})
                              </li>
                            ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t border-slate-800 font-black text-emerald-400 text-sm">
                          {language === "ru" ? "Итого:" : language === "en" ? "Total:" : "Jami:"} {ord.total.toLocaleString()} {t.cart?.currency || "so'm"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. PROMOCODES TAB */}
          {activeTab === "promos" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">
                    {language === "ru" ? "Управление промокодами" : language === "en" ? "Promo Code Management" : "Promokodlar Boshqaruvi"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {language === "ru" ? "Настройка скидочных купонов для клиентов" : language === "en" ? "Configure discount codes for customers" : "Mijozlar uchun chegirma kodlarini sozlash"}
                  </p>
                </div>
              </div>

              {/* Add New Promo Code */}
              <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">
                  {language === "ru" ? "Добавить новый промокод" : language === "en" ? "Add New Promo Code" : "Yangi Promokod Qo'shish"}
                </h3>
                <form onSubmit={handleCreatePromo} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value)}
                    required
                    placeholder={language === "ru" ? "Код (Например: SPORT2026)" : language === "en" ? "Code name (e.g. SPORT2026)" : "Kod nomi (Masalan: SPORT2026)"}
                    className="px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-mono uppercase text-xs font-bold"
                  />
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newPromoPercent}
                    onChange={(e) => setNewPromoPercent(e.target.value)}
                    required
                    placeholder={language === "ru" ? "Процент скидки (15%)" : language === "en" ? "Discount percent (15%)" : "Chegirma foizi (15%)"}
                    className="px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-bold"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                  >
                    {language === "ru" ? "Создать промокод" : language === "en" ? "Create Promo Code" : "Promokod Yaratish"}
                  </button>
                </form>
              </div>

              {/* Promo List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {promoCodesList.map((pr) => (
                  <div
                    key={pr.code}
                    className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-emerald-400 text-base">{pr.code}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                        -{pr.percent}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{pr.desc}</p>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(pr.code);
                          playSound("click", soundEnabled);
                          showToast(`"${pr.code}" nusxalandi!`);
                        }}
                        className="text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{language === "ru" ? "Копировать" : language === "en" ? "Copy" : "Nusxalash"}</span>
                      </button>
                      <button
                        onClick={() => {
                          deletePromoCode(pr.code);
                          playSound("warn", soundEnabled);
                        }}
                        className="text-[11px] font-semibold text-rose-400 hover:underline"
                      >
                        {language === "ru" ? "Удалить" : language === "en" ? "Delete" : "O'chirish"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CUSTOMERS TAB (CRM) */}
          {activeTab === "customers" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-black text-white">
                  {language === "ru" ? "База клиентов (CRM)" : language === "en" ? "Customer Database (CRM)" : "Mijozlar Bazasi (CRM)"}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === "ru" ? "Статистика клиентов, совершивших покупки" : language === "en" ? "Statistics of all customers who made purchases" : "Xarid amalga oshirgan barcha mijozlar statistikasi"}
                </p>
              </div>

              <div className="rounded-3xl bg-[#0e1626] border border-slate-800/80 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121c30] text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">{language === "ru" ? "Имя и Фамилия" : language === "en" ? "Full Name" : "Ism & Familiya"}</th>
                      <th className="p-4">{language === "ru" ? "Телефон" : language === "en" ? "Phone" : "Telefon"}</th>
                      <th className="p-4">{language === "ru" ? "Адрес" : language === "en" ? "Address" : "Manzil"}</th>
                      <th className="p-4">{language === "ru" ? "Заказы" : language === "en" ? "Orders" : "Buyurtmalar"}</th>
                      <th className="p-4">{language === "ru" ? "Всего покупок" : language === "en" ? "Total Spent" : "Jami Xarid"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {customersList.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-white">{c.name}</td>
                        <td className="p-4 text-emerald-400 font-mono font-semibold">{c.phone}</td>
                        <td className="p-4 text-slate-400">{c.address}</td>
                        <td className="p-4 font-bold text-cyan-400">
                          {c.ordersCount} {language === "ru" ? "шт." : language === "en" ? "orders" : "ta"}
                        </td>
                        <td className="p-4 font-black text-white">
                          {c.totalSpent.toLocaleString()} {t.cart?.currency || "so'm"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. TELEGRAM BOT TAB */}
          {activeTab === "telegram" && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="p-8 rounded-3xl bg-[#0e1626] border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Telegram Bot & Broadcast</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Buyurtmalar to'g'ridan-to'g'ri Telegram kanal/guruhga kelib tushadi
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveTelegram} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Telegram Bot Token
                    </label>
                    <div className="relative">
                      <input
                        type={showToken ? "text" : "password"}
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                        placeholder="7654321098:AAEXAMPLE_TOKEN"
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                      >
                        {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {language === "ru"
                        ? "Telegram Admin Chat ID (Личный чат для уведомлений)"
                        : language === "en"
                        ? "Telegram Admin Chat ID (Personal chat for notifications)"
                        : "Telegram Admin Chat ID (Xabarlar boradigan shaxsiy chat)"}
                    </label>
                    <input
                      type="text"
                      value={chatId}
                      onChange={(e) => setChatId(e.target.value)}
                      placeholder="8170197389"
                      className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <div className="flex justify-between items-center mt-1.5">
                      <span className="text-[11px] text-emerald-400 font-medium">
                        {language === "ru"
                          ? "✓ Активный Admin Chat ID: 8170197389 (поступает в @Kitobchalar_bot)"
                          : language === "en"
                          ? "✓ Active Admin Chat ID: 8170197389 (routed to @Kitobchalar_bot)"
                          : "✓ Faol Admin Chat ID: 8170197389 (@Kitobchalar_bot ga keladi)"}
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoDetectChatId}
                        disabled={isDetectingId}
                        className="text-[11px] font-bold text-sky-400 hover:text-sky-300 underline cursor-pointer"
                      >
                        {isDetectingId
                          ? (language === "ru" ? "Поиск..." : language === "en" ? "Searching..." : "Qidirilmoqda...")
                          : (language === "ru" ? "⚡ Автоопределение" : language === "en" ? "⚡ Auto Detect" : "⚡ Avtomatik aniqlash")}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Save className="w-4 h-4" />
                      <span>{language === "ru" ? "Сохранить настройки" : language === "en" ? "Save Settings" : "Sozlamalarni Saqlash"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTestTelegram}
                      disabled={isTestingBot}
                      className="py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isTestingBot
                          ? (language === "ru" ? "Отправка..." : language === "en" ? "Sending..." : "Yuborilmoqda...")
                          : (language === "ru" ? "Тестовое сообщение" : language === "en" ? "Test Message" : "Sinov Xabari")}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Broadcast message section */}
                <div className="pt-6 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {language === "ru" ? "Живое оповещение (Broadcast)" : language === "en" ? "Live Broadcast" : "Jonli Ommaviy E'lon (Broadcast)"}
                  </h4>
                  <textarea
                    rows={3}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder={
                      language === "ru"
                        ? "Отправить объявление всем подписчикам..."
                        : language === "en"
                        ? "Send broadcast announcement to all subscribers..."
                        : "Barcha obunachilarga e'lon xabari yuborish..."
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs resize-none"
                  ></textarea>
                  <button
                    onClick={handleSendBroadcast}
                    disabled={isBroadcasting || !broadcastMessage.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isBroadcasting
                        ? (language === "ru" ? "Отправка..." : language === "en" ? "Sending..." : "Yuborilmoqda...")
                        : (language === "ru" ? "Отправить в канал" : language === "en" ? "Send to Channel" : "Kanalga E'lon Jo'natish")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 7. SYSTEM & TERMINAL MONITOR TAB */}
          {activeTab === "system" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-black text-white">
                  {language === "ru" ? "Мониторинг сервера и системы" : language === "en" ? "Server & System Monitoring" : "Server & Tizim Monitoringi"}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === "ru"
                    ? "Системные показатели в реальном времени и командный терминал"
                    : language === "en"
                    ? "Real-time system indicators and command terminal"
                    : "Real-vaqt tizim ko'rsatkichlari va buyruqlar terminali"}
                </p>
              </div>

              {/* Hardware Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Server Ping</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{serverPing} ms</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Telegram Ping</span>
                  <div className="text-2xl font-black text-sky-400 font-mono">{telegramPing} ms</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">
                    {language === "ru" ? "Загрузка CPU" : language === "en" ? "CPU Usage" : "CPU Bandligi"}
                  </span>
                  <div className="text-2xl font-black text-purple-400 font-mono">{cpuUsage}%</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">
                    {language === "ru" ? "Память RAM" : language === "en" ? "RAM Memory" : "RAM Xotira"}
                  </span>
                  <div className="text-2xl font-black text-cyan-400 font-mono">{ramUsage}%</div>
                </div>
              </div>

              {/* Interactive Terminal */}
              <div className="p-6 rounded-3xl bg-[#070b14] border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="ml-2 font-bold text-slate-300">system-terminal@sogliqsport</span>
                  </div>
                  <span>Uptime: {Math.floor(systemUptime / 3600)}h {Math.floor((systemUptime % 3600) / 60)}m</span>
                </div>

                {/* Logs Screen */}
                <div ref={terminalLogsRef} className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="text-slate-300">
                      <span className="text-slate-500">[{log.time}]</span>{" "}
                      <span
                        className={`font-bold ${
                          log.level === "SUCCESS"
                            ? "text-emerald-400"
                            : log.level === "CMD"
                            ? "text-cyan-400"
                            : "text-slate-400"
                        }`}
                      >
                        [{log.level}]
                      </span>{" "}
                      <span>{log.msg}</span>
                    </div>
                  ))}
                </div>

                {/* Command Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!terminalInput.trim()) return;
                    const cmd = terminalInput.trim().toLowerCase();
                    const now = new Date().toTimeString().slice(0, 8);
                    const echo = { id: Date.now(), time: now, level: "CMD", msg: `admin@sogliq:~$ ${cmd}` };
                    let response = null;

                    if (cmd === "status") {
                      response = { id: Date.now() + 1, time: now, level: "SUCCESS", msg: `STATUS: 100% Barqaror | CPU: ${cpuUsage}% | Tovarlar: ${products.length} ta` };
                    } else if (cmd === "ping") {
                      response = { id: Date.now() + 1, time: now, level: "SUCCESS", msg: `PONG: Server ${serverPing}ms | Telegram: ${telegramPing}ms` };
                    } else if (cmd === "clear" || cmd === "cls") {
                      setSystemLogs([]);
                      setTerminalInput("");
                      return;
                    } else if (cmd === "help") {
                      response = { id: Date.now() + 1, time: now, level: "INFO", msg: "BUYRUQLAR: status, ping, clear, help, backup, products" };
                    } else {
                      response = { id: Date.now() + 1, time: now, level: "INFO", msg: `Noma'lum buyruq: "${cmd}". Yordam uchun 'help' yozing.` };
                    }

                    setSystemLogs((prev) => [...prev, echo, response]);
                    setTerminalInput("");
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-slate-800"
                >
                  <span className="text-emerald-400 font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder={
                      language === "ru"
                        ? "Введите команду (например: status, ping, help, clear)..."
                        : language === "en"
                        ? "Enter command (e.g.: status, ping, help, clear)..."
                        : "Buyruq kiriting (masalan: status, ping, help, clear)..."
                    }
                    className="flex-1 bg-transparent border-0 text-white font-mono text-xs focus:outline-none"
                  />
                </form>
              </div>

              {/* Database Backup & Restore */}
              <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {language === "ru" ? "Резервная копия базы данных" : language === "en" ? "Database Backup & Restore" : "Ma'lumotlar Bazasi Zaxirasi"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === "ru"
                      ? "Сохраняйте или восстанавливайте товары и заказы через JSON-файл"
                      : language === "en"
                      ? "Save or restore products and orders via JSON file"
                      : "Barcha tovarlar va buyurtmalarni JSON faylda saqlang yoki tiklang"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportDatabase}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === "ru" ? "Скачать бэкап" : language === "en" ? "Download Backup" : "Zaxirani Yuklab Olish"}</span>
                  </button>

                  <input
                    ref={restoreFileRef}
                    type="file"
                    accept=".json"
                    onChange={handleRestoreDatabase}
                    className="hidden"
                  />

                  <button
                    onClick={() => restoreFileRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{language === "ru" ? "Восстановить (JSON)" : language === "en" ? "Restore (JSON)" : "Tiklash (JSON)"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0e1626] border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-6">
              {editingProduct
                ? (t.admin?.editProduct || "Mahsulotni Tahrirlash")
                : (t.admin?.addProduct || "Yangi Mahsulot Qo'shish")}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t.admin?.productName || "Mahsulot Nomi"} *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Masalan: Optimum Nutrition Gold Standard Whey 2.27kg"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.admin?.productCategory || "Kategoriya"}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {productCategories
                      .filter((c) => c.id !== "all")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {getCategoryLabel(c.id, language)}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.admin?.productStock || "Zaxira soni"}
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.admin?.productPrice || "Narxi"} ({t.cart?.currency || "so'm"}) *
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    required
                    placeholder="980000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.admin?.productOldPrice || "Eski Narxi"} ({t.cart?.currency || "so'm"})
                  </label>
                  <input
                    type="number"
                    value={formOldPrice}
                    onChange={(e) => setFormOldPrice(e.target.value)}
                    placeholder="1150000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t.admin?.productImage || "Rasm URL"}
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {t.admin?.productDesc || "Tavsifi"}
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Mahsulot haqida batafsil ma'lumot..."
                  className="w-full px-4 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {language === "ru" ? "Характеристики (через запятую)" : language === "en" ? "Specs (comma-separated)" : "Xususiyatlari (vergul bilan ajrating)"}
                </label>
                <input
                  type="text"
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="24g protein, 5.5g BCAA, Shakar qo'shilmagan"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  {t.admin?.cancel || "Bekor qilish"}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  {t.admin?.save || "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {viewingOrderInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white text-slate-900 p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setViewingOrderInvoice(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b pb-4 text-center">
              <h3 className="text-xl font-black text-emerald-600">SOG'LIQ & SPORT</h3>
              <p className="text-xs text-slate-500">Toshkent sh., Amir Temur shoh ko'chasi 45</p>
              <p className="text-[11px] text-slate-400 mt-1">Tel: +998 (71) 200-45-45</p>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between font-bold">
                <span>{t.cart?.orderId || "Buyurtma ID:"}</span>
                <span>#{viewingOrderInvoice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.cart?.recipient || "Mijoz:"}</span>
                <span className="font-semibold">{viewingOrderInvoice.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.cart?.phoneLabel || "Telefon:"}</span>
                <span className="font-semibold">{viewingOrderInvoice.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.cart?.addressLabel || "Manzil:"}</span>
                <span className="font-semibold">{viewingOrderInvoice.address}</span>
              </div>
            </div>

            <div className="border-t border-b py-3 space-y-2 text-xs">
              <div className="font-bold text-slate-700">
                {language === "ru" ? "Состав заказа:" : language === "en" ? "Order items:" : "Xarid tarkibi:"}
              </div>
              {viewingOrderInvoice.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.name} x {it.quantity}</span>
                  <span className="font-bold">{((it.price || 0) * it.quantity).toLocaleString()} {t.cart?.currency || "so'm"}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline font-black text-base">
              <span>{t.cart?.totalToPay || "Jami Summa:"}</span>
              <span className="text-emerald-600">{viewingOrderInvoice.total?.toLocaleString()} {t.cart?.currency || "so'm"}</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{language === "ru" ? "Печать (Print)" : language === "en" ? "Print Invoice" : "Chop Etish (Print)"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
