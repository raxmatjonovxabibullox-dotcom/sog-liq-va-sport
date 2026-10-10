import React from "react";
import { useApp } from "../context/AppContext";
import { LocationMap } from "../components/LocationMap";
import {
  ShieldCheck,
  Award,
  Target,
} from "lucide-react";

export const AboutPage = () => {
  const { t } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <Target className="w-4 h-4" />
          <span>Bizning Missiyamiz</span>
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
            Sog'lom hayot har bir inson uchun erisharli bo'lishi kerak!
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
                Sertifikatlangan
              </div>
              <div className="text-xs text-slate-500">
                AQSH va Yevropa sifat kafolati
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <Award className="w-6 h-6 text-amber-500 mb-2" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                100% Original
              </div>
              <div className="text-xs text-slate-500">
                Faqat rasmiy distribyutorlar
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80"
            alt="Sport zal va murabbiylar"
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
            Bizning Jamoa
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Professional Murabbiylar va Nutrisiologlar
          </h2>
          <p className="text-xs text-slate-500">
            Sizga to'g'ri ozuqa va mashg'ulot tanlashda bepul maslahat beruvchi ekspertlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 group hover:border-emerald-500/40 transition">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="Rustam Qosimov"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-500/20 group-hover:border-emerald-500 transition"
            />
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Rustam Qosimov
              </h4>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Bosh Fitnes Murabbiy & Krossfit Atleti
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              9 yillik tajribaga ega xalqaro sertifikatli instruktor. 1,000 dan ortiq shogirdlarga kuch va chidamlilikni oshirishda yordam bergan.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 group hover:border-emerald-500/40 transition">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Nilufar Karimova"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-500/20 group-hover:border-emerald-500 transition"
            />
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Nilufar Karimova
              </h4>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Yetakchi Nutrisiolog & Ayollar Fitnesi
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sog'lom vazn tashlash, gormonal balans va to'g'ri ratsion tuzish bo'yicha 7 yillik amaliy tajribaga ega ekspert.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 group hover:border-emerald-500/40 transition">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              alt="Jasur Saidov"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-500/20 group-hover:border-emerald-500 transition"
            />
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">
                Jasur Saidov
              </h4>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Sport Reabilitatsiyasi & Fizioterapevt
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Jarohatlardan keyin tiklanish, bo'g'imlar salomatligi va to'g'ri mashq biomexanikasi bo'yicha 11 yillik shifokorlik tajribasi.
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
