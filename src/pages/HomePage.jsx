import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { productCategories, getCategoryLabel } from "../data/mockProducts";
import {
  ArrowRight,
  Sparkles,
  Flame,
  Activity,
  Scale
} from "lucide-react";

export const HomePage = () => {
  const { products, t, language } = useApp();

  // Interactive BMI Calculator state
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height > 0 && weight > 0) {
      const hMeters = height / 100;
      const val = +(weight / (hMeters * hMeters)).toFixed(1);
      let status = "";
      let color = "";
      let advice = "";

      if (val < 18.5) {
        status =
          language === "ru"
            ? "Дефицит массы (Нужен белок и калории)"
            : language === "en"
            ? "Underweight (Needs protein & calories)"
            : "Kam vazn (Oqsil va kaloriya kerak)";
        color = "text-sky-500";
        advice =
          language === "ru"
            ? "Вам рекомендуется гейнер и сывороточный протеин для набора сухой мышечной массы."
            : language === "en"
            ? "Gainer and Whey Protein supplements are recommended to build lean muscle mass."
            : "Sizga mushak massasini oshirish uchun Gainer va Protein ozuqalari tavsiya etiladi.";
      } else if (val >= 18.5 && val <= 24.9) {
        status =
          language === "ru"
            ? "Нормальный и здоровый вес (Отличная форма!)"
            : language === "en"
            ? "Normal & healthy weight (Great shape!)"
            : "Normal va sog'lom vazn (A'lo darajada!)";
        color = "text-emerald-500";
        advice =
          language === "ru"
            ? "Вы в отличной форме! Поддерживайте ее регулярными кардио-тренировками и витаминами."
            : language === "en"
            ? "You are in great shape! Maintain it with regular cardio workouts and daily vitamins."
            : "Ajoyib shakldasiz! Ushbu holatni saqlab qolish uchun muntazam kardio va vitaminlar qabul qiling.";
      } else if (val >= 25 && val <= 29.9) {
        status =
          language === "ru"
            ? "Избыточный вес (Рекомендуется кардио и диета)"
            : language === "en"
            ? "Overweight (Cardio & diet recommended)"
            : "Ortiqcha vazn (Kardio va parhez tavsiya)";
        color = "text-amber-500";
        advice =
          language === "ru"
            ? "Рекомендуются кардио HIIT-тренировки 3-4 раза в неделю и жиросжигатель L-карнитин."
            : language === "en"
            ? "Cardio HIIT workouts 3-4 times a week and L-Carnitine are recommended."
            : "Haftasiga 3-4 marta yog' yoqish kardio mashqlari (HIIT) va L-Karnitin tavsiya etiladi.";
      } else {
        status =
          language === "ru"
            ? "Степень ожирения (Требует внимания)"
            : language === "en"
            ? "Obesity level (Requires attention)"
            : "Semizlik darajasi (E'tibor talab)";
        color = "text-rose-500";
        advice =
          language === "ru"
            ? "Рекомендуется консультация врача и тренера для коррекции рациона и программы."
            : language === "en"
            ? "Consult a physician and personal trainer for structured nutrition and cardio."
            : "Shifokor va murabbiy maslahati bilan to'g'ri rejim hamda parhezga o'tish zarur.";
      }

      setBmiResult({ val, status, color, advice });
    }
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12 lg:pb-24">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-sm animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {t.hero.titleStart}{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>{" "}
                {t.hero.titleEnd}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <span>{t.hero.shopBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/workouts"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <span>{t.hero.workoutsBtn}</span>
                </Link>
              </div>

              {/* Live Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    5,000+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.hero.activeAthletes}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.hero.originalQuality}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">
                    24/7
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.hero.fastDelivery}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                  alt="Fitness & Healthy Lifestyle"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                {/* Floating Discount Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-emerald-500" />
                      <span>{t.hero.specialOffer}</span>
                    </div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {language === "ru" ? "Промокод SPORT2026" : language === "en" ? "Promo Code SPORT2026" : "SPORT2026 Promokodi"}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t.hero.promoSubtitle}
                    </div>
                  </div>
                  <Link
                    to="/shop"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
                  >
                    {t.hero.useBtn}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              {t.hero.catalogTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.hero.categoriesTitle}
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{t.hero.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {productCategories
            .filter((c) => c.id !== "all")
            .map((cat, idx) => {
              const bgImages = {
                nutrition: "/products/prod_1_on_whey.jpg",
                equipment: "/products/prod_6_bowflex.jpg",
                wear: "/products/prod_11_nike_pegasus.jpg",
                accessories: "/products/prod_15_apple_watch.jpg",
              };
              const localizedCatName = getCategoryLabel(cat.id, language);
              return (
                <Link
                  key={cat.id}
                  to={`/shop?cat=${cat.id}`}
                  className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={bgImages[cat.id]}
                    alt={localizedCatName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-semibold text-emerald-400 block mb-1">
                      {t.hero.categoryNumber} #{idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-400 transition">
                      {localizedCatName}
                    </h3>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (HAFTA XITLARI) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              {t.hero.featuredSubtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.hero.featuredTitle}
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{language === "ru" ? "Смотреть больше" : language === "en" ? "View more" : "Ko'proq xarid qilish"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE BMI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-200">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Scale className="w-4 h-4" />
                <span>{language === "ru" ? "Проверка здоровья" : language === "en" ? "Health Assessment" : "Salomatlik Tekshiruvi"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-snug text-slate-900 dark:text-white">
                {t.hero.bmiTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.hero.bmiSubtitle}
              </p>

              {/* BMI Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                  <div className="text-sky-500 dark:text-sky-400 font-bold">&lt; 18.5</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{language === "ru" ? "Дефицит" : language === "en" ? "Underweight" : "Kam vazn"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                  <div className="text-emerald-500 dark:text-emerald-400 font-bold">18.5 - 24.9</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{language === "ru" ? "Норма" : language === "en" ? "Normal" : "Normal"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                  <div className="text-amber-500 dark:text-amber-400 font-bold">25 - 29.9</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{language === "ru" ? "Избыток" : language === "en" ? "Overweight" : "Ortiqcha"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                  <div className="text-rose-500 dark:text-rose-400 font-bold">&gt; 30</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{language === "ru" ? "Ожирение" : language === "en" ? "Obese" : "Semizlik"}</div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-6 bg-white/90 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 shadow-lg dark:shadow-none backdrop-blur-sm">
              <form onSubmit={calculateBMI} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.hero.heightLabel}
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="240"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.hero.weightLabel}
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="250"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-sm text-white shadow-lg shadow-emerald-500/25 transition active:scale-[0.99]"
                >
                  {t.hero.calculateBtn}
                </button>
              </form>

              {bmiResult && (
                <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {language === "ru" ? "Ваш показатель ИМТ:" : language === "en" ? "Your BMI Score:" : "Sizning BMI ko'rsatkichingiz:"}
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{bmiResult.val}</span>
                  </div>
                  <div className={`text-sm font-bold ${bmiResult.color} mb-1.5`}>
                    {bmiResult.status}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {bmiResult.advice}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ATHLETES & TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {language === "ru" ? "Отзывы чемпионов" : language === "en" ? "Athlete Reviews" : "Fikr-Mulohazalar"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {language === "ru" ? "Выбор Профессиональных Спортсменов и Олимпийских Чемпионов" : language === "en" ? "Trusted by Pro Athletes & Olympic Champions" : "Professional Sportchilar va Olimpiada Chempionlari E'tirofi"}
          </h2>
          <p className="text-xs text-slate-500">
            {language === "ru" ? "Лучшие спортсмены Узбекистана доверяют качеству Sog'liq va Sport" : language === "en" ? "Uzbekistan's top athletes trust the quality of Sog'liq va Sport" : "O'zbekistonning eng sara sportchilari va chempionlari \"Sog'liq va Sport\" sifatiga ishonishadi"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-lg transition">
            <div className="flex items-center gap-3.5">
              <img
                src="/athletes/bahodir.jpg"
                alt="Bahodir Jalolov"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-md"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Bahodir Jalolov
                </h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === "ru" ? "2-кратный Олимпийский чемпион (Бокс)" : language === "en" ? "2x Olympic & World Champion (Boxing)" : "2 karra Olimpiada & Jahon chempioni (Boks)"}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {language === "ru"
                ? "\"Заказал Optimum Nutrition Gold Standard и разборные гантели Bowflex. Доставка по Ташкенту заняла пару часов, упаковка целая, продукция 100% оригинал.\""
                : language === "en"
                ? "\"Ordered Optimum Nutrition Gold Standard and Bowflex dumbbells. Delivered in Tashkent within hours, fully sealed and 100% authentic.\""
                : "\"Optimum Nutrition Gold Standard va Bowflex gantellarni xarid qildim. Yetkazib berish Toshkent ichida bir necha soatda amalga oshirildi, qadoqlari butun va 100% original.\""}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-lg transition">
            <div className="flex items-center gap-3.5">
              <img
                src="/athletes/diyora.jpg"
                alt="Diyora Keldiyorova"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-md"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Diyora Keldiyorova
                </h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === "ru" ? "Олимпийская чемпионка Париж-2024 (Дзюдо)" : language === "en" ? "Paris-2024 Olympic Champion (Judo)" : "Parij-2024 Olimpiada chempioni (Dzyudo)"}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {language === "ru"
                ? "\"Протеин Dymatize ISO100 и одежда Gymshark идеального качества и очень удобные! Для тренировок выбираю только Sog'liq va Sport.\""
                : language === "en"
                ? "\"Dymatize ISO100 protein and Gymshark activewear are top notch! I recommend this platform for professional fitness.\""
                : "\"Dymatize ISO100 proteini va Gymshark fitnes kiyimlari juda sifatli va qulay! Mashg'ulotlar uchun faqat shu platformadan olishni tavsiya qilaman.\""}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-lg transition">
            <div className="flex items-center gap-3.5">
              <img
                src="/athletes/ulugbek.jpg"
                alt="Ulug'bek Rashitov"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-md"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Ulug'bek Rashitov
                </h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === "ru" ? "2-кратный Олимпийский чемпион (Тхэквондо)" : language === "en" ? "2x Olympic Champion (Taekwondo)" : "2 karra Olimpiada chempioni (Taekvondo)"}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {language === "ru"
                ? "\"Кроссовки Nike Pegasus и термос Hydro Flask незаменимы на сборах и тренировках. Качество на высоте, всем рекомендую!\""
                : language === "en"
                ? "\"Nike Pegasus shoes and Hydro Flask were perfect for intense tournament camps. Top-tier quality, highly recommended!\""
                : "\"Nike Pegasus 40 krossovkalari va Hydro Flask sport idishi musobaqa hamda mashg'ulotlarda juda qo'l keldi. Sifatiga gap yo'q, barchaga tavsiya etaman!\""}
            </p>
          </div>
        </div>
      </section>

      {/* 6. PROMO DISCOUNT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
              {language === "ru" ? "Специальная Скидка" : language === "en" ? "Special Discount" : "Chegirma Imkoniyati"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              {language === "ru" ? "Промокод:" : language === "en" ? "Promo Code:" : "Promokod:"} <span className="underline decoration-amber-400">SPORT2026</span>
            </h3>
            <p className="text-sm text-emerald-100 max-w-md">
              {language === "ru"
                ? "Введите промокод в корзине и получите 15% скидку на всё спортивное питание и инвентарь!"
                : language === "en"
                ? "Apply this coupon in your cart to receive 15% OFF on all sports nutrition and gym gear!"
                : "Savatda ushbu kodni kiritib barcha sport ozuqalari va mashq anjomlariga 15% chegirma oling!"}
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 flex-shrink-0">
            <Link
              to="/shop"
              className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-slate-100 font-black text-sm shadow-xl transition active:scale-95"
            >
              {language === "ru" ? "Купить со скидкой" : language === "en" ? "Shop with Discount" : "Hozir xarid qilish"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
