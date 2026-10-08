import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Send,
  X,
} from "lucide-react";

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    promo,
    applyPromo,
    removePromo,
    createOrder,
    user,
    t,
  } = useApp();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  // Checkout inputs
  const [customerName, setCustomerName] = useState(user ? user.name : "");
  const [customerPhone, setCustomerPhone] = useState(user ? user.phone : "+998");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) return;

    const ok = applyPromo(promoInput);
    if (!ok) {
      setPromoError(t.cart.promoInvalid);
    } else {
      setPromoInput("");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      alert("Iltimos, ism, telefon va manzilni to'ldiring!");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customerName,
      phone: customerPhone,
      address,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: cartTotal,
      promoCode: promo ? promo.code : null,
      paymentMethod,
    };

    const order = await createOrder(orderData);
    setIsSubmitting(false);
    setCompletedOrder(order);
  };

  // If order successfully placed
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t.cart.orderSuccess}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
          {t.cart.orderSuccessDesc}
        </p>

        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left max-w-md mx-auto space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Buyurtma ID:</span>
            <span className="text-emerald-500 font-black">#{completedOrder.id}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Qabul qiluvchi:</span>
            <span className="font-bold text-slate-900 dark:text-white">{completedOrder.customerName}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Telefon:</span>
            <span className="font-bold text-slate-900 dark:text-white">{completedOrder.phone}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Manzil:</span>
            <span className="font-bold text-slate-900 dark:text-white">{completedOrder.address}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-black text-sm">
            <span>To'lov summasi:</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {completedOrder.total.toLocaleString()} so'm
            </span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition"
          >
            <span>{t.cart.continueShopping}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // If empty cart
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {t.cart.empty}
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {t.cart.emptyDesc}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition"
        >
          <span>{t.cart.startShopping}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {t.cart.title} ({cart.length})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Savatni tozalash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0"
              />

              <div className="flex-1 text-center sm:text-left space-y-1">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {item.product.categoryLabel || item.product.category}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                  {item.product.name}
                </h4>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {item.product.price.toLocaleString()} so'm
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 py-1 text-xs font-bold text-slate-900 dark:text-white min-w-[28px] text-center">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total & Delete */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-900 dark:text-white min-w-[90px] text-right">
                  {(item.product.price * item.quantity).toLocaleString()} so'm
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Promo Code Input */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-500" />
              <span>{t.cart.promoCode}</span>
            </h4>

            {promo ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <span>
                  Faol kod: <b>{promo.code}</b> ({promo.percent ? `-${promo.percent}%` : `-${promo.fixed.toLocaleString()} so'm`})
                </span>
                <button
                  onClick={removePromo}
                  className="p-1 rounded-lg hover:bg-emerald-500/20 text-rose-500"
                  title="Kodni bekor qilish"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Kupon kodi (Masalan: SPORT2026)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition"
                >
                  {t.cart.applyPromo}
                </button>
              </form>
            )}

            {promoError && (
              <p className="text-xs text-rose-500 font-semibold">{promoError}</p>
            )}

            <div className="text-[11px] text-slate-400">
              💡 Sinab ko'ring: <b className="text-emerald-500">SPORT2026</b> (15% chegirma) yoki <b className="text-emerald-500">FITNESS10</b>
            </div>
          </div>
        </div>

        {/* Right: Checkout & Total Summary */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            {t.cart.checkoutTitle}
          </h3>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.cart.name} *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="Jasur Aliyev"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.cart.phone} *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                placeholder="+998 90 123 45 67"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.cart.address} *
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Toshkent sh., Chilonzor 5, 12-uy"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.cart.paymentMethod}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    paymentMethod === "cash"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Naqd / Yetkazganda
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    paymentMethod === "online"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Payme / Click
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t.cart.subtotal}:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {cartSubtotal.toLocaleString()} so'm
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-500 font-bold">
                  <span>{t.cart.discount}:</span>
                  <span>-{discountAmount.toLocaleString()} so'm</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t.cart.shipping}:</span>
                <span className="text-emerald-500 font-bold">{t.cart.freeShipping}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.cart.total}:
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {cartTotal.toLocaleString()} <span className="text-xs font-bold text-emerald-500">so'm</span>
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Yuborilmoqda..." : t.cart.submitOrder}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
