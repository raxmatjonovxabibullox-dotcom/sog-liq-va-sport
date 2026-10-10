import React from "react";
import { useApp } from "../context/AppContext";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryLabel } from "../data/mockProducts";

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, t, language } = useApp();
  const isFav = isInWishlist(product.id);

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const categoryName = getCategoryLabel(product.category, language);
  const currency = t.cart?.currency || "so'm";

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800/50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-500 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
          {product.featured && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-md">
              {t.shop?.topProduct || "Top"}
            </span>
          )}
        </div>

        {/* Action buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product.id)}
            title={t.shop.addToWishlist}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFav
                ? "bg-rose-500 text-white scale-110"
                : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:scale-110"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
          </button>

          <button
            onClick={() => setQuickViewProduct(product)}
            title={t.shop.quickView}
            className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-emerald-500 hover:scale-110 backdrop-blur-md transition-all shadow-md opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
            {categoryName}
          </span>
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-emerald-500 transition mb-3 text-sm leading-snug flex-1"
        >
          {product.name}
        </Link>

        {/* Price & Cart button */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white">
              {product.price.toLocaleString()} <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{currency}</span>
            </div>
            {product.oldPrice && product.oldPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {product.oldPrice.toLocaleString()} {currency}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              product.stock > 0
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 active:scale-95"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            }`}
            title={product.stock > 0 ? t.shop.addToCart : t.shop.outOfStock}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
