import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Star, Heart, ShoppingBag, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryLabel } from "../data/mockProducts";

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, t, language } = useApp();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const isFav = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
    setQty(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            setQuickViewProduct(null);
            setQty(1);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="h-full w-full object-cover object-center"
            />
            {quickViewProduct.featured && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
                {t.shop?.topProduct || "Top"}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
              {getCategoryLabel(quickViewProduct.category, language)}
            </span>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-snug">
              {quickViewProduct.name}
            </h3>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({quickViewProduct.reviewsCount} {language === "ru" ? "отзывов" : language === "en" ? "reviews" : "sharh"})
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {quickViewProduct.stock > 0
                  ? `${t.shop.inStock} (${quickViewProduct.stock} ${language === "ru" ? "шт." : language === "en" ? "pcs" : "ta"})`
                  : t.shop.outOfStock}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {quickViewProduct.price.toLocaleString()} <span className="text-sm font-bold text-emerald-600">{t.cart?.currency || "so'm"}</span>
              </span>
              {quickViewProduct.oldPrice && (
                <span className="text-base text-slate-400 line-through">
                  {quickViewProduct.oldPrice.toLocaleString()} {t.cart?.currency || "so'm"}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Specs */}
            {quickViewProduct.specs && quickViewProduct.specs.length > 0 && (
              <div className="space-y-1.5 mb-6 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                {quickViewProduct.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-slate-900 dark:text-white min-w-[36px] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(quickViewProduct.stock, q + 1))}
                  className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={quickViewProduct.stock <= 0}
                className="flex-1 py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.shop.addToCart}</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-2xl border transition ${
                  isFav
                    ? "border-rose-500 bg-rose-500/10 text-rose-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-rose-500" : ""}`} />
              </button>
            </div>

            <Link
              to={`/product/${quickViewProduct.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>
                {language === "ru" ? "Открыть полную страницу" : language === "en" ? "Open full page" : "To'liq sahifada ochish"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
