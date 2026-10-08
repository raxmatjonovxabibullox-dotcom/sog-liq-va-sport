import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Share2,
} from "lucide-react";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist, showToast, t } = useApp();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Mahsulot topilmadi
        </h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Katalogga qaytish</span>
        </Link>
      </div>
    );
  }

  const isFav = isInWishlist(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Havola nusxalandi!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Back button */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Do'konga qaytish</span>
        </Link>
      </div>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-xl aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.featured && (
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-md">
              Top Mahsulot
            </span>
          )}
        </div>

        {/* Right: Info & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                {product.categoryLabel || product.category}
              </span>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
                title="Ulashish"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({product.reviewsCount} ta sharh)
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>
                  {product.stock > 0 ? `${t.shop.inStock} (${product.stock} ta)` : t.shop.outOfStock}
                </span>
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-baseline gap-4">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {product.price.toLocaleString()} <span className="text-sm font-bold text-emerald-500">so'm</span>
            </span>
            {product.oldPrice && (
              <span className="text-base text-slate-400 line-through">
                {product.oldPrice.toLocaleString()} so'm
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs */}
          {product.specs && product.specs.length > 0 && (
            <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Asosiy xususiyatlari:
              </span>
              {product.specs.map((sp, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{sp}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
              >
                -
              </button>
              <span className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-white min-w-[36px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, qty)}
              disabled={product.stock <= 0}
              className="flex-1 py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition active:scale-95 disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t.shop.addToCart}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 rounded-2xl border transition ${isFav
                  ? "border-rose-500 bg-rose-500/10 text-rose-500"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? "fill-rose-500" : ""}`} />
            </button>
          </div>

          {/* Delivery & Perks list */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-500" />
              <span>O'zbekiston bo'ylab 24 soatda</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Original mahsulot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-200/80 dark:border-slate-800">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            O'xshash Mahsulotlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
