import React, { useState } from "react";
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
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  X,
  Save,
  AlertTriangle,
  Lock,
} from "lucide-react";

export const AdminPage = () => {
  const {
    user,
    loginUser,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    telegramConfig,
    saveTelegramConfig,
    sendTelegramMessage,
    showToast,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'products' | 'orders' | 'telegram'

  // Admin login state if not logged in
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");

  // Product Add / Edit Modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("nutrition");
  const [formPrice, setFormPrice] = useState("");
  const [formOldPrice, setFormOldPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formStock, setFormStock] = useState("20");
  const [formDescription, setFormDescription] = useState("");
  const [formSpecs, setFormSpecs] = useState("");

  // Telegram Config state
  const [botToken, setBotToken] = useState(telegramConfig.botToken || "");
  const [chatId, setChatId] = useState(telegramConfig.chatId || "");
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);

  // If user is not admin, show admin login gateway
  if (!user || user.role !== "admin") {
    const handleAdminLogin = (e) => {
      e.preventDefault();
      const res = loginUser(adminUsername, adminPassword);
      if (!res.success || res.user.role !== "admin") {
        setLoginError("Noto'g'ri admin login yoki parol!");
      }
    };

    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-500 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Admin Boshqaruv Paneli
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Faqat administratorlar uchun maxsus hudud
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Admin Login
              </label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Admin Parol
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-lg shadow-teal-500/25 transition"
            >
              Panelga kirish
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
            💡 Standart admin: <b>admin</b>, parol: <b>admin123</b>
          </p>
        </div>
      </div>
    );
  }

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "pending").length;

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("nutrition");
    setFormPrice("");
    setFormOldPrice("");
    setFormImage("https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80");
    setFormStock("25");
    setFormDescription("");
    setFormSpecs("100% toza mahsulot, Tez yetkazish");
    setProductModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOldPrice(p.oldPrice || "");
    setFormImage(p.image);
    setFormStock(p.stock);
    setFormDescription(p.description);
    setFormSpecs(Array.isArray(p.specs) ? p.specs.join(", ") : "");
    setProductModalOpen(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) {
      showToast("Nom va narxni kiriting!");
      return;
    }

    const payload = {
      name: formName,
      category: formCategory,
      categoryLabel:
        formCategory === "nutrition"
          ? "Sport ozuqalari"
          : formCategory === "equipment"
          ? "Trenajyor va Anjomlar"
          : formCategory === "wear"
          ? "Sport kiyimlari"
          : "Aksessuarlar",
      price: Number(formPrice),
      oldPrice: formOldPrice ? Number(formOldPrice) : null,
      image: formImage || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      stock: Number(formStock),
      description: formDescription,
      specs: formSpecs.split(",").map((s) => s.trim()).filter(Boolean),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setProductModalOpen(false);
  };

  const handleSaveTelegram = (e) => {
    e.preventDefault();
    saveTelegramConfig({ botToken, chatId });
  };

  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    const testText = "🔔 <b>SOG'LIQ VA SPORT PLATFORMASI</b>\n\nTelegram bot integratsiyasi muvaffaqiyatli ishga tushdi! Buyurtmalar ushbu kanalga kelib tushadi.";
    const res = await sendTelegramMessage(testText);
    setIsTestingTelegram(false);
    if (res.success) {
      showToast(t.admin.testSuccess);
    } else {
      showToast(t.admin.testFail);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            Boshqaruv Tizimi
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.admin.title}
          </h1>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "dashboard"
                ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.admin.tabStats}</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "products"
                ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t.admin.tabProducts} ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "orders"
                ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.admin.tabOrders} ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("telegram")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "telegram"
                ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.admin.tabTelegram}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>{t.admin.totalRevenue}</span>
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {totalRevenue.toLocaleString()} so'm
              </div>
              <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18% oxirgi haftada</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>{t.admin.totalOrders}</span>
                <ShoppingBag className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {totalOrdersCount} ta
              </div>
              <div className="text-[11px] text-amber-500 font-semibold">
                {pendingOrdersCount} ta yangi kutilmoqda
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>{t.admin.totalProducts}</span>
                <Package className="w-5 h-5 text-teal-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {products.length} ta
              </div>
              <div className="text-[11px] text-slate-400">
                4 ta asosiy toifada
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>{t.admin.activeUsers}</span>
                <Users className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                1,280+
              </div>
              <div className="text-[11px] text-emerald-500 font-semibold">
                Doimiy mijozlar
              </div>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                So'nggi Buyurtmalar
              </h3>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs font-semibold text-teal-500 hover:underline"
              >
                Barchasini ko'rish
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white">#{ord.id}</span>{" "}
                    - {ord.customerName} ({ord.phone})
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {ord.total.toLocaleString()} so'm
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        ord.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : ord.status === "delivering"
                          ? "bg-cyan-500/10 text-cyan-500"
                          : "bg-amber-500/10 text-amber-500"
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

      {/* TAB 2: PRODUCTS CRUD */}
      {activeTab === "products" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Mahsulotlar Boshqaruvi
            </h3>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin.addProduct}</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase font-bold text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Rasm & Nomi</th>
                    <th className="p-4">Kategoriya</th>
                    <th className="p-4">Narxi</th>
                    <th className="p-4">Zaxira</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                        />
                        <div className="max-w-xs">
                          <div className="font-bold text-slate-900 dark:text-white truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-400">ID: {p.id}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {p.categoryLabel || p.category}
                        </span>
                      </td>
                      <td className="p-4 font-black text-slate-900 dark:text-white">
                        {p.price.toLocaleString()} so'm
                      </td>
                      <td className="p-4 font-bold text-slate-700 dark:text-slate-300">
                        {p.stock} ta
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-xl text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30"
                            title={t.admin.editProduct}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(t.admin.confirmDelete)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            title={t.admin.deleteProduct}
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

      {/* TAB 3: ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Mijozlar Buyurtmalari
          </h3>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-teal-600 dark:text-teal-400">
                      #{ord.id}
                    </span>
                    <span className="text-xs text-slate-400">{ord.date}</span>
                  </div>

                  {/* Status changer */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{t.admin.orderStatus}:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="pending">{t.admin.statusPending}</option>
                      <option value="delivering">{t.admin.statusDelivering}</option>
                      <option value="completed">{t.admin.statusCompleted}</option>
                      <option value="cancelled">{t.admin.statusCancelled}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400 font-semibold mb-1">Xaridor:</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {ord.customerName} ({ord.phone})
                    </div>
                    <div className="text-slate-500 mt-1">
                      Manzil: {ord.address}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-semibold mb-1">Buyurtma tarkibi:</div>
                    <ul className="space-y-1">
                      {ord.items &&
                        ord.items.map((it, idx) => (
                          <li key={idx} className="text-slate-700 dark:text-slate-300">
                            • <b>{it.name}</b> x {it.quantity} ({(it.price * it.quantity).toLocaleString()} so'm)
                          </li>
                        ))}
                    </ul>
                    <div className="mt-2 font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      Jami: {ord.total.toLocaleString()} so'm
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TELEGRAM BOT SETTINGS */}
      {activeTab === "telegram" && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {t.admin.telegramConfigTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.admin.telegramDesc}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveTelegram} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.admin.botToken}
                </label>
                <input
                  type="text"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="Masalan: 7654321098:AAEXAMPLE_TOKEN"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.admin.chatId}
                </label>
                <input
                  type="text"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  placeholder="Masalan: -1001234567890 yoki 123456789"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.admin.saveConfig}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestTelegram}
                  disabled={isTestingTelegram}
                  className="py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTestingTelegram ? "Yuborilmoqda..." : t.admin.testSend}</span>
                </button>
              </div>
            </form>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Qisqa Yo'riqnoma:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>Telegram'da <b>@BotFather</b> orqali yangi bot yarating va <i>Bot Token</i> oling.</li>
                <li>Guruh yoki kanalingizga botni admin qilib qo'shing.</li>
                <li>Guruh yoki profilingizning <i>Chat ID</i> sini aniqlang (Masalan, @userinfobot orqali).</li>
                <li>Ushbu formaga kiritib, "Sinov xabarini yuborish" tugmasini bosing!</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT ADD / EDIT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
              {editingProduct ? t.admin.editProduct : t.admin.addProduct}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.admin.productName} *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Masalan: Whey Protein Isolate 1kg"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.admin.productCategory}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="nutrition">Sport ozuqalari</option>
                    <option value="equipment">Trenajyor va Anjomlar</option>
                    <option value="wear">Sport kiyimlari</option>
                    <option value="accessories">Aksessuarlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.admin.productStock}
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.admin.productPrice} *
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    required
                    placeholder="450000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.admin.productOldPrice} (Chegirma uchun)
                  </label>
                  <input
                    type="number"
                    value={formOldPrice}
                    onChange={(e) => setFormOldPrice(e.target.value)}
                    placeholder="520000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.admin.productImage}
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.admin.productDesc}
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Mahsulot haqida batafsil ma'lumot..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Xususiyatlar (vergul bilan ajrating)
                </label>
                <input
                  type="text"
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="24g protein, 5.5g BCAA, Shakar qo'shilmagan"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-md shadow-teal-500/20"
                >
                  {t.admin.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
