import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { productCategories } from "../data/mockProducts";
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
  Crown
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
    deletePromoCode
  } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'products' | 'orders' | 'promos' | 'customers' | 'telegram' | 'system'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("sport_admin_sound") !== "false");
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem("sport_admin_accent") || "emerald"); // emerald, cyan, violet, amber, rose
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Telegram Config & Live Broadcast state
  const [botToken, setBotToken] = useState(telegramConfig?.botToken || "");
  const [chatId, setChatId] = useState(telegramConfig?.chatId || "");
  const [showToken, setShowToken] = useState(false);
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

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
    saveTelegramConfig({ botToken, chatId });
    playSound("success", soundEnabled);
  };

  const handleTestTelegram = async () => {
    setIsTestingBot(true);
    playSound("click", soundEnabled);
    const start = performance.now();
    const res = await sendTelegramMessage(
      `⚡ <b>SOG'LIQ VA SPORT — ADMIN STUDIYASI</b>\n\nTelegram bot integratsiyasi 100% muvaffaqiyatli ishga tushirildi! Ping: ${Math.round(performance.now() - start)}ms\n🕒 Vaqt: ${new Date().toLocaleString()}`
    );
    setIsTestingBot(false);
    if (res.success) {
      playSound("success", soundEnabled);
      showToast("Telegramga test xabar yetkazildi!");
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
      customerName: "Sardor Qodirov (Test Buyurtma)",
      phone: "+998 90 987 65 43",
      address: "Toshkent sh., Yunusobod 14, 22-uy",
      items: [{ id: randomProduct.id, name: randomProduct.name, price: randomProduct.price, quantity: 1 }],
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
        setAdminAuthError("Login yoki parol noto'g'ri!");
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
              "Sog'liq va Sport" Boshqaruv Markazi
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
                Admin Foydalanuvchi Nomi
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
                Admin Paroli
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
              Boshqaruv Paneliga Kirish
            </button>
          </form>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bosh sahifaga (Do'konga) qaytish</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex font-sans antialiased relative selection:bg-emerald-500 selection:text-black">
      {/* 1. LEFT EXECUTIVE SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#0e1626] border-r border-slate-800/80 transition-all duration-300 md:sticky md:top-0 md:h-screen shrink-0 overflow-y-auto flex flex-col justify-between ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isSidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="p-4 space-y-6">
          {/* Brand Logo & Collapse Toggle */}
          <div className="flex items-center justify-between px-2 pt-1">
            <Link
              to="/admin"
              onClick={() => playSound("click", soundEnabled)}
              className="flex items-center gap-3 group"
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activeAccent.primary} flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition`}
              >
                <Crown className="w-5 h-5" />
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <span className="font-black text-lg text-white tracking-tight">SPORT</span>
                  <span className={`text-[10px] ${activeAccent.text} font-black uppercase ml-1.5 tracking-wider`}>
                    STUDIO
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => {
                setIsSidebarCollapsed(!isSidebarCollapsed);
                playSound("click", soundEnabled);
              }}
              className="hidden md:flex text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
              title="Sidebar kengaytirish"
            >
              <ArrowLeft className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {/* Dashboard */}
            <button
              onClick={() => {
                setActiveTab("dashboard");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "dashboard" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Dashboard & Analitika</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-extrabold">
                  Live
                </span>
              )}
            </button>

            {/* Products */}
            <button
              onClick={() => {
                setActiveTab("products");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "products" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Mahsulotlar (CRUD)</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[11px] font-bold text-slate-400">{products.length}</span>
              )}
            </button>

            {/* Orders */}
            <button
              onClick={() => {
                setActiveTab("orders");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "orders" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Buyurtmalar</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 font-bold">
                  {orders.length}
                </span>
              )}
            </button>

            {/* Promocodes */}
            <button
              onClick={() => {
                setActiveTab("promos");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "promos" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Promokodlar</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold">
                  {promoCodesList.length}
                </span>
              )}
            </button>

            {/* Customers (CRM) */}
            <button
              onClick={() => {
                setActiveTab("customers");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "customers" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Mijozlar (CRM)</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[11px] font-bold text-slate-400">{customersList.length}</span>
              )}
            </button>

            {/* Telegram Bot */}
            <button
              onClick={() => {
                setActiveTab("telegram");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "telegram" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Telegram Bot</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>

            {/* System / Server Monitor */}
            <button
              onClick={() => {
                setActiveTab("system");
                playSound("click", soundEnabled);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition ${
                activeTab === "system" ? activeAccent.activeTab : "text-slate-400 hover:text-white hover:bg-[#131d33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4" />
                {!isSidebarCollapsed && <span>Server & Tizim</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-mono text-purple-400 font-bold">{serverPing}ms</span>
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Back to Store */}
        <div className="p-4 border-t border-slate-800/80">
          <Link
            to="/"
            onClick={() => playSound("click", soundEnabled)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {!isSidebarCollapsed && <span>Do'konga qaytish</span>}
          </Link>
        </div>
      </aside>

      {/* 2. MAIN EXECUTIVE CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 h-16 bg-[#0e1626]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              <Layers className="w-5 h-5" />
            </button>

            {/* Digital Clock */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1120] border border-slate-800 font-mono text-xs font-bold text-emerald-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentTime.toTimeString().slice(0, 8)}</span>
            </div>
          </div>

          {/* Utilities: Accent Color, Sound, Fullscreen, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Color Accent Picker */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-xl bg-[#0b1120] border border-slate-800">
              {Object.keys(accentStyles).map((col) => (
                <button
                  key={col}
                  onClick={() => handleAccentChange(col)}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    accentColor === col ? "scale-125 ring-2 ring-white" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: accentStyles[col].hex }}
                  title={`${col} accent`}
                />
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-[#0b1120] border border-slate-800 text-slate-300 hover:text-white transition"
              title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-xl bg-[#0b1120] border border-slate-800 text-slate-300 hover:text-white transition"
              title="To'liq ekran"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#0b1120] border border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center">
                A
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">Admin</span>
              <button
                onClick={() => {
                  logoutUser();
                  playSound("warn", soundEnabled);
                }}
                className="text-slate-400 hover:text-rose-400 ml-1"
                title="Chiqish"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* TAB CONTENTS */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* 1. DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Umumiy Tushum</span>
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {totalRevenue.toLocaleString()} <span className="text-xs text-emerald-400">so'm</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+24% o'tgan haftaga nisbatan</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Jami Buyurtmalar</span>
                    <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {totalOrdersCount} <span className="text-xs text-slate-400">ta</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-bold">
                    {pendingOrdersCount} ta yangi kutilmoqda
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Faol Mahsulotlar</span>
                    <Package className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {products.length} <span className="text-xs text-slate-400">xil</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    4 ta asosiy toifada
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Mijozlar Bazasi (CRM)</span>
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {customersList.length} <span className="text-xs text-slate-400">nafar</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold">
                    Doimiy sportchilar
                  </div>
                </div>
              </div>

              {/* Quick Action Bar */}
              <div className="p-4 rounded-2xl bg-[#0e1626] border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yangi Mahsulot</span>
                  </button>

                  <button
                    onClick={handleCreateTestOrder}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Test Buyurtma Yaratish</span>
                  </button>

                  <button
                    onClick={handleTestTelegram}
                    disabled={isTestingBot}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram Sinov</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportDatabase}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON Backup</span>
                  </button>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800/80 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>So'nggi Buyurtmalar</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-emerald-400 hover:underline"
                  >
                    Barchasini ko'rish ({orders.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-black text-emerald-400">#{ord.id}</span>
                        <span className="text-slate-300 font-bold ml-2">{ord.customerName}</span>
                        <span className="text-slate-500 ml-2">({ord.phone})</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-black text-white">
                          {ord.total.toLocaleString()} so'm
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            ord.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : ord.status === "delivering"
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {ord.status}
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
                  <h2 className="text-xl font-black text-white">Mahsulotlar Boshqaruvi</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Jami {products.length} ta mahsulot katalogda mavjud</p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedProductIds.length > 0 && (
                    <button
                      onClick={handleBatchDelete}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Tanlanganlarni o'chirish ({selectedProductIds.length})</span>
                    </button>
                  )}

                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Tovar Qo'shish</span>
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
                    placeholder="Qidiruv (nomi, ID)..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">Barcha Kategoriyalar</option>
                  <option value="nutrition">Sport ozuqalari</option>
                  <option value="equipment">Trenajyor va Anjomlar</option>
                  <option value="wear">Sport kiyimlari</option>
                  <option value="accessories">Aksessuarlar</option>
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">Barcha Zaxira holati</option>
                  <option value="in_stock">Mavjud (&gt;5)</option>
                  <option value="low">Kam qolgan (1-5)</option>
                  <option value="out">Tugagan (0)</option>
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
                        <th className="p-4">Rasm & Nomi</th>
                        <th className="p-4">Kategoriya</th>
                        <th className="p-4">Narxi</th>
                        <th className="p-4">Zaxira</th>
                        <th className="p-4 text-right">Amallar</th>
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
                              {p.categoryLabel || p.category}
                            </span>
                          </td>
                          <td className="p-4 font-black text-white">
                            {p.price.toLocaleString()} so'm
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
                              {p.stock} ta
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 rounded-xl text-teal-400 hover:bg-slate-800 transition"
                                title="Tahrirlash"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Mahsulotni o'chirmoqchimisiz?")) {
                                    deleteProduct(p.id);
                                    playSound("warn", soundEnabled);
                                  }
                                }}
                                className="p-2 rounded-xl text-rose-400 hover:bg-slate-800 transition"
                                title="O'chirish"
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
                  <h2 className="text-xl font-black text-white">Buyurtmalar Nazorati</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Xaridorlardan kelib tushgan buyurtmalar</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateTestOrder}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Test Buyurtma</span>
                  </button>
                </div>
              </div>

              {/* Search & Status Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buyurtma ID, ism, telefon yoki manzil bo'yicha qidirish..."
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
                      className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                        orderStatusFilter === st
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st === "all" ? "Barchasi" : st}
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
                        <span className="text-xs text-slate-400 font-semibold">Holati:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0b1120] border border-slate-700 text-white cursor-pointer"
                        >
                          <option value="pending">Kutilmoqda</option>
                          <option value="delivering">Yetkazilmoqda</option>
                          <option value="completed">Yakunlandi</option>
                          <option value="cancelled">Bekor qilindi</option>
                        </select>

                        <button
                          onClick={() => setViewingOrderInvoice(ord)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Chekni ko'rish (Chop etish)"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-slate-400 font-semibold mb-1">Xaridor:</div>
                        <div className="font-bold text-white text-sm">{ord.customerName}</div>
                        <div className="text-slate-300 mt-0.5">📞 {ord.phone}</div>
                        <div className="text-slate-400 mt-1">📍 {ord.address}</div>
                      </div>

                      <div>
                        <div className="text-slate-400 font-semibold mb-1">Buyurtma tarkibi:</div>
                        <ul className="space-y-1">
                          {ord.items &&
                            ord.items.map((it, idx) => (
                              <li key={idx} className="text-slate-300">
                                • <b>{it.name}</b> x {it.quantity} ({(it.price * it.quantity).toLocaleString()} so'm)
                              </li>
                            ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t border-slate-800 font-black text-emerald-400 text-sm">
                          Jami: {ord.total.toLocaleString()} so'm
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
                  <h2 className="text-xl font-black text-white">Promokodlar Boshqaruvi</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Mijozlar uchun chegirma kodlarini sozlash</p>
                </div>
              </div>

              {/* Add New Promo Code */}
              <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">Yangi Promokod Qo'shish</h3>
                <form onSubmit={handleCreatePromo} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value)}
                    required
                    placeholder="Kod nomi (Masalan: SPORT2026)"
                    className="px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-mono uppercase text-xs font-bold"
                  />
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newPromoPercent}
                    onChange={(e) => setNewPromoPercent(e.target.value)}
                    required
                    placeholder="Chegirma foizi (15%)"
                    className="px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-bold"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                  >
                    Promokod Yaratish
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
                        <span>Nusxalash</span>
                      </button>
                      <button
                        onClick={() => {
                          deletePromoCode(pr.code);
                          playSound("warn", soundEnabled);
                        }}
                        className="text-[11px] font-semibold text-rose-400 hover:underline"
                      >
                        O'chirish
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
                <h2 className="text-xl font-black text-white">Mijozlar Bazasi (CRM)</h2>
                <p className="text-xs text-slate-400 mt-0.5">Xarid amalga oshirgan barcha mijozlar statistikasi</p>
              </div>

              <div className="rounded-3xl bg-[#0e1626] border border-slate-800/80 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121c30] text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Ism & Familiya</th>
                      <th className="p-4">Telefon</th>
                      <th className="p-4">Manzil</th>
                      <th className="p-4">Buyurtmalar</th>
                      <th className="p-4">Jami Xarid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {customersList.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-white">{c.name}</td>
                        <td className="p-4 text-emerald-400 font-mono font-semibold">{c.phone}</td>
                        <td className="p-4 text-slate-400">{c.address}</td>
                        <td className="p-4 font-bold text-cyan-400">{c.ordersCount} ta</td>
                        <td className="p-4 font-black text-white">{c.totalSpent.toLocaleString()} so'm</td>
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
                      Telegram Chat ID (Guruh yoki Kanal ID)
                    </label>
                    <input
                      type="text"
                      value={chatId}
                      onChange={(e) => setChatId(e.target.value)}
                      placeholder="-1001234567890 yoki 123456789"
                      className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Save className="w-4 h-4" />
                      <span>Sozlamalarni Saqlash</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTestTelegram}
                      disabled={isTestingBot}
                      className="py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isTestingBot ? "Yuborilmoqda..." : "Sinov Xabari"}</span>
                    </button>
                  </div>
                </form>

                {/* Broadcast message section */}
                <div className="pt-6 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Jonli Ommaviy E'lon (Broadcast)
                  </h4>
                  <textarea
                    rows={3}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Barcha obunachilarga e'lon xabari yuborish..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs resize-none"
                  ></textarea>
                  <button
                    onClick={handleSendBroadcast}
                    disabled={isBroadcasting || !broadcastMessage.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isBroadcasting ? "Yuborilmoqda..." : "Kanalga E'lon Jo'natish"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 7. SYSTEM & TERMINAL MONITOR TAB */}
          {activeTab === "system" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-black text-white">Server & Tizim Monitoringi</h2>
                <p className="text-xs text-slate-400 mt-0.5">Real-vaqt tizim ko'rsatkichlari va buyruqlar terminali</p>
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
                  <span className="text-[11px] text-slate-400 font-bold uppercase">CPU Bandligi</span>
                  <div className="text-2xl font-black text-purple-400 font-mono">{cpuUsage}%</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">RAM Xotira</span>
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
                    placeholder="Buyruq kiriting (masalan: status, ping, help, clear)..."
                    className="flex-1 bg-transparent border-0 text-white font-mono text-xs focus:outline-none"
                  />
                </form>
              </div>

              {/* Database Backup & Restore */}
              <div className="p-6 rounded-3xl bg-[#0e1626] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Ma'lumotlar Bazasi Zaxirasi</h4>
                  <p className="text-xs text-slate-400">Barcha tovarlar va buyurtmalarni JSON faylda saqlang yoki tiklang</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportDatabase}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Zaxirani Yuklab Olish</span>
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
                    <span>Tiklash (JSON)</span>
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
              {editingProduct ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mahsulot Nomi *
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
                    Kategoriya
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="nutrition">Sport ozuqalari</option>
                    <option value="equipment">Trenajyor va Anjomlar</option>
                    <option value="wear">Sport kiyimlari</option>
                    <option value="accessories">Aksessuarlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Zaxira soni
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
                    Narxi (so'm) *
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
                    Eski Narxi (so'm)
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
                  Rasm URL
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
                  Tavsifi
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
                  Xususiyatlari (vergul bilan ajrating)
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
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Saqlash
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
                <span>Buyurtma ID:</span>
                <span>#{viewingOrderInvoice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mijoz:</span>
                <span className="font-semibold">{viewingOrderInvoice.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telefon:</span>
                <span className="font-semibold">{viewingOrderInvoice.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Manzil:</span>
                <span className="font-semibold">{viewingOrderInvoice.address}</span>
              </div>
            </div>

            <div className="border-t border-b py-3 space-y-2 text-xs">
              <div className="font-bold text-slate-700">Xarid tarkibi:</div>
              {viewingOrderInvoice.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.name} x {it.quantity}</span>
                  <span className="font-bold">{((it.price || 0) * it.quantity).toLocaleString()} so'm</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline font-black text-base">
              <span>Jami Summa:</span>
              <span className="text-emerald-600">{viewingOrderInvoice.total?.toLocaleString()} so'm</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Chop Etish (Print)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
