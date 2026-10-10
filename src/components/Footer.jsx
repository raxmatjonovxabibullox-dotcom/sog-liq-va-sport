import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Dumbbell,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  HeartHandshake,
} from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const { t, language } = useApp();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Banner / Perks */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.hero.features.delivery}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.hero.features.deliveryDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.hero.features.quality}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.hero.features.qualityDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.hero.features.support}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.hero.features.supportDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                SOG'LIQ <span className="text-emerald-500 dark:text-emerald-400">&</span> SPORT
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {language === "ru"
                ? "Ведущий спортивный интернет-магазин: здоровый образ жизни, качественный инвентарь, сертифицированное спортивное питание и программы тренировок."
                : language === "en"
                ? "Leading fitness hypermarket: authentic gear, certified supplements, and guided workout programs."
                : "Sog'lom turmush tarzi, yuqori sifatli sport anjomlari, xalqaro sertifikatlangan sport ozuqalari va mashg'ulotlar dasturi bo'yicha yetakchi internet gipermarketi."}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me/Kitobchalar_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-sky-500 dark:hover:bg-sky-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition shadow-sm"
                title="Telegram @Kitobchalar_bot"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-pink-600 dark:hover:bg-pink-600 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition shadow-sm"
                title="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-red-600 dark:hover:bg-red-600 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition shadow-sm"
                title="YouTube"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === "ru" ? "Страницы" : language === "en" ? "Pages" : "Sahifalar"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link to="/workouts" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {t.nav.workouts}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-teal-600 dark:text-teal-400 hover:underline">
                  {t.nav.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === "ru" ? "Категории" : language === "en" ? "Categories" : "Kategoriyalar"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/shop?cat=nutrition" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {language === "ru" ? "Спортивное питание" : language === "en" ? "Sports Nutrition" : "Sport ozuqalari"}
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=equipment" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {language === "ru" ? "Тренажеры и инвентарь" : language === "en" ? "Gym & Equipment" : "Trenajyor va anjomlar"}
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=wear" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {language === "ru" ? "Спортивная одежда" : language === "en" ? "Sportswear" : "Sport kiyimlari"}
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=accessories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  {language === "ru" ? "Фитнес аксессуары" : language === "en" ? "Fitness Accessories" : "Aksessuarlar"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t.nav?.contact || "Bog'lanish"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{language === "ru" ? "Ташкент, пр-т Амира Темура 45" : language === "en" ? "Tashkent, Amir Temur 45" : "Toshkent, Amir Temur 45"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                <a href="tel:+998712004545" className="hover:text-slate-900 dark:hover:text-white">
                  +998 (71) 200-45-45
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                <span>{language === "ru" ? "Ежедневно: 09:00 - 21:00" : language === "en" ? "Daily: 09:00 - 21:00" : "Har kuni: 09:00 - 21:00"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                <span>info@sogliqsport.uz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            {language === "ru"
              ? `© ${CURRENT_YEAR} Платформа "Sog'liq va Sport". Все права защищены.`
              : language === "en"
              ? `© ${CURRENT_YEAR} "Sog'liq va Sport" platform. All rights reserved.`
              : `© ${CURRENT_YEAR} "Sog'liq va Sport" platformasi. Barcha huquqlar himoyalangan.`}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {language === "ru" ? "Промокод: SPORT2026 (-15%)" : language === "en" ? "Promo: SPORT2026 (-15%)" : "Promokod: SPORT2026 (-15%)"}
            </span>
            <span>•</span>
            <span>Vercel + GitHub Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
