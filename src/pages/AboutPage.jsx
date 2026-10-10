import React from "react";
import { useApp } from "../context/AppContext";
import { LocationMap } from "../components/LocationMap";
import {
  ShieldCheck,
  Award,
  Target,
} from "lucide-react";

export const AboutPage = () => {
  const { t, language } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <Target className="w-4 h-4" />
          <span>{language === "ru" ? "Наша Миссия" : language === "en" ? "Our Mission" : "Bizning Missiyamiz"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {t.about.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {t.about.subtitle}
        </p>
      </div>

      {/* Story & Image Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {t.about.storyTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
            {language === "ru"
              ? "Здоровый образ жизни должен быть доступен каждому!"
              : language === "en"
              ? "A healthy lifestyle should be accessible to everyone!"
              : "Sog'lom hayot har bir inson uchun erisharli bo'lishi kerak!"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.storyP1}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.storyP2}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {language === "ru" ? "Сертифицировано" : language === "en" ? "Certified" : "Sertifikatlangan"}
              </div>
              <div className="text-xs text-slate-500">
                {language === "ru" ? "Гарантия качества США и Европы" : language === "en" ? "USA & European Quality Assured" : "AQSH va Yevropa sifat kafolati"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <Award className="w-6 h-6 text-amber-500 mb-2" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                100% Original
              </div>
              <div className="text-xs text-slate-500">
                {language === "ru" ? "Только официальные поставки" : language === "en" ? "Direct official distributors only" : "Faqat rasmiy distribyutorlar"}
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
          <img
            src="/team/tashkent_gym.jpg"
            alt="Toshkent Luxury Fitness Center"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Numerical Stats */}
      <section className="rounded-3xl bg-emerald-500 text-white p-8 sm:p-12 shadow-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black">50,000+</div>
            <div className="text-xs text-emerald-100 mt-1 font-semibold">
              {t.about.stats.customers}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black">500+</div>
            <div className="text-xs text-emerald-100 mt-1 font-semibold">
              {t.about.stats.products}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black">25+</div>
            <div className="text-xs text-emerald-100 mt-1 font-semibold">
              {t.about.stats.trainers}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black">6+</div>
            <div className="text-xs text-emerald-100 mt-1 font-semibold">
              {t.about.stats.years}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Trainers Team */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {language === "ru" ? "Наша Команда" : language === "en" ? "Our Team" : "Bizning Jamoa"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {language === "ru" ? "Руководство и Ведущие Специалисты" : language === "en" ? "Leadership & Head Fitness Specialists" : "Rahbariyat va Yetakchi Mutaxassislarimiz"}
          </h2>
          <p className="text-xs text-slate-500">
            {language === "ru"
              ? "Эксперты, помогающие подобрать лучшее спортивное питание и тренировки"
              : language === "en"
              ? "Experts advising on optimal nutrition and training routines"
              : "Sizga to'g'ri ozuqa va mashg'ulot tanlashda professional maslahat beruvchi ekspertlar"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 group hover:border-emerald-500/40 hover:shadow-xl transition">
            <img
              src="/team/khabibullo.jpg"
              alt="Khabibullo Raxmatjonov"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-emerald-500/20 group-hover:border-emerald-500 transition shadow-lg"
            />
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Khabibullo Raxmatjonov
              </h4>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {language === "ru" ? "Основатель и Руководитель Платформы" : language === "en" ? "Founder & Executive Director" : "Platforma Asoschisi & Bosh Rahbari"}
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "ru"
                ? "Создатель экосистемы для развития спорта, правильного питания и здорового образа жизни в Узбекистане."
                : language === "en"
                ? "Creator of the premier sports nutrition and wellness ecosystem across Uzbekistan."
                : "O'zbekistonda professional sport ozuqalari va sog'lom turmush tarzi madaniyatini rivojlantirishga qaratilgan ekotizim muallifi."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 group hover:border-emerald-500/40 hover:shadow-xl transition">
            <img
              src="/team/jahongir.jpg"
              alt="Jahongir To'xtayev"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-emerald-500/20 group-hover:border-emerald-500 transition shadow-lg"
            />
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Jahongir To'xtayev
              </h4>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {language === "ru" ? "Главный Фитнес-Тренер & Кроссфит Атлет" : language === "en" ? "Head Fitness Coach & Crossfit Athlete" : "Bosh Fitnes Murabbiy & Krossfit Atleti"}
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "ru"
                ? "Специалист с 8-летним международным тренерским стажем. Помог более 1000 ученикам обрести идеальную форму."
                : language === "en"
                ? "8+ years of certified training experience, coaching 1,000+ athletes to athletic transformation."
                : "8 yillik xalqaro murabbiylik tajribasiga ega mutaxassis. 1,000 dan ortiq shogirdlarga kuch va qomatni shakllantirishda yordam bergan."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 group hover:border-emerald-500/40 hover:shadow-xl transition">
            <img
              src="/team/nargiza.jpg"
              alt="Nargiza Karimova"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-emerald-500/20 group-hover:border-emerald-500 transition shadow-lg"
            />
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Nargiza Karimova
              </h4>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {language === "ru" ? "Главный Нутрициолог & Эксперт по рациону" : language === "en" ? "Lead Nutritionist & Diet Specialist" : "Bosh Nutrisiolog & Ratsion Mutaxassisi"}
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "ru"
                ? "Эксперт с 7-летним опытом в составлении персонального рациона, баланса нутриентов и спортивного питания."
                : language === "en"
                ? "7+ years specializing in athletic nutrition planning, hormonal wellness, and lean muscle building."
                : "Sog'lom vazn tashlash, gormonal balans va sportchilar uchun individual ratsion tuzish bo'yicha 7 yillik amaliy tajribaga ega ekspert."}
            </p>
          </div>
        </div>
      </section>

      {/* Physical Store Location with Interactive Map */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {t.about.mapTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.about.mapSubtitle}
          </h2>
          <p className="text-xs text-slate-500">
            {t.about.addressText}
          </p>
        </div>

        <LocationMap />
      </section>
    </div>
  );
};
