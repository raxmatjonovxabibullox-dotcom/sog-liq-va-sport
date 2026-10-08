import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { Heart, Trash2, ArrowRight } from "lucide-react";

export const WishlistPage = () => {
  const { wishlist, products, clearWishlist, t } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>{t.wishlist.title}</span>
            <span className="text-sm font-bold text-slate-400">({wishlistedProducts.length})</span>
          </h1>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.wishlist.clearAll}</span>
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {t.wishlist.empty}
          </h3>
          <p className="text-xs text-slate-500">
            {t.wishlist.emptyDesc}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25"
          >
            <span>Mahsulotlarni ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
