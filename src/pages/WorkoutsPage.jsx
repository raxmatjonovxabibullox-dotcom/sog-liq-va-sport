import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { workoutPlans, healthyTips } from "../data/workoutsData";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Flame,
  Clock,
  Dumbbell,
  Droplet,
  Sparkles,
  HeartPulse,
  CheckCircle,
} from "lucide-react";

export const WorkoutsPage = () => {
  const { language, t } = useApp();

  // Tabata / Workout Timer State
  const [workSec, setWorkSec] = useState(30);
  const [restSec, setRestSec] = useState(15);
  const [currentMode, setCurrentMode] = useState("work"); // 'work' | 'rest'
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  // Water intake calculator
  const [personWeight, setPersonWeight] = useState(70);
  const recommendedWater = (personWeight * 0.035).toFixed(1);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (currentMode === "work") {
        setCurrentMode("rest");
        setTimeLeft(restSec);
      } else {
        setCurrentMode("work");
        setTimeLeft(workSec);
        setRoundsCompleted((r) => r + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentMode, workSec, restSec]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentMode("work");
    setTimeLeft(workSec);
    setRoundsCompleted(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <HeartPulse className="w-4 h-4" />
          <span>Salomatlik & Sport Dasturi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {t.workouts.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {t.workouts.subtitle}
        </p>
      </div>

      {/* Interactive Workout Timer Section */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Timer Display */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
              {t.workouts.timerTitle}
            </span>

            {/* Circular countdown style */}
            <div
              className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full border-8 flex flex-col items-center justify-center my-4 transition-colors duration-500 shadow-2xl ${
                currentMode === "work"
                  ? "border-emerald-500 bg-emerald-950/20 shadow-emerald-500/20"
                  : "border-amber-500 bg-amber-950/20 shadow-amber-500/20"
              }`}
            >
              <span
                className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-1 ${
                  currentMode === "work"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {currentMode === "work" ? "🔥 Ishlash (Mashq)" : "☕ Dam olish"}
              </span>
              <span className="text-6xl sm:text-7xl font-black tracking-tight">
                {timeLeft}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {t.workouts.seconds}
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-300 mb-4">
              Bajarilgan raundlar: <b className="text-emerald-400">{roundsCompleted}</b>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTimer}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition active:scale-95 ${
                  isActive
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-900"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30"
                }`}
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                <span>{isActive ? t.workouts.pause : t.workouts.start}</span>
              </button>

              <button
                onClick={resetTimer}
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title={t.workouts.reset}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Timer Settings & Water Intake */}
          <div className="lg:col-span-6 space-y-6 bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-700/80">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-emerald-400" />
              <span>Interval sozlamalari</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">
                  Mashq vaqti (soniya)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={workSec}
                  disabled={isActive}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWorkSec(v);
                    if (currentMode === "work") setTimeLeft(v);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">
                  Dam olish (soniya)
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={restSec}
                  disabled={isActive}
                  onChange={(e) => setRestSec(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
                />
              </div>
            </div>

            {/* Daily Water Tracker */}
            <div className="pt-6 border-t border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4" />
                  <span>{t.workouts.waterIntake}</span>
                </span>
                <span className="text-base font-black text-white">
                  {recommendedWater} litr / kun
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.workouts.waterDesc}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Vazningiz:</span>
                <input
                  type="range"
                  min="40"
                  max="130"
                  value={personWeight}
                  onChange={(e) => setPersonWeight(Number(e.target.value))}
                  className="flex-1 accent-cyan-400 cursor-pointer"
                />
                <span className="text-xs font-bold text-white w-12 text-right">
                  {personWeight} kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Plans Cards */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Mashg'ulot Rejalari
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Mutaxassislar Tavsiya Etgan Kurslar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workoutPlans.map((plan) => {
            const planTitle = plan.title[language] || plan.title.uz;
            const planLevel = plan.level[language] || plan.level.uz;

            return (
              <div
                key={plan.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg flex flex-col group hover:border-emerald-500/40 transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={planTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                      {planLevel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                      {planTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-4">
                      <Flame className="w-4 h-4 fill-emerald-500" />
                      <span>{plan.calories}</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Mashqlar ro'yxati:
                      </div>
                      {plan.exercises.map((ex, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <span className="font-semibold">{ex.name}</span>
                          <span className="text-slate-400 text-[11px]">{ex.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      resetTimer();
                      setIsActive(true);
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-900 dark:text-white font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Taymer bilan boshlash</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Wellness & Nutrition Guidelines */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Maslahatlar
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.workouts.nutritionTips}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthyTips.map((tip, idx) => {
            const title = tip.title[language] || tip.title.uz;
            const text = tip.text[language] || tip.text.uz;

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base text-slate-900 dark:text-white">
                  {title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
