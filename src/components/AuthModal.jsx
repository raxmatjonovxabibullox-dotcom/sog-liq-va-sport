import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, User, Phone, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { formatUzbekPhone, handlePhoneKeyDown } from "../utils/phoneFormatter";

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, registerUser, t } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [authMethod, setAuthMethod] = useState("username"); // 'username' | 'phone'
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (isRegister) {
      const res = registerUser(name, identifier, password);
      if (res.success) {
        setAuthModalOpen(false);
        resetForm();
      } else {
        setErrorMsg(res.error || "Xatolik yuz berdi");
      }
    } else {
      const res = loginUser(identifier, password);
      if (res.success) {
        setAuthModalOpen(false);
        resetForm();
      } else {
        setErrorMsg(res.error || "Login yoki parol noto'g'ri!");
      }
    }
  };

  const resetForm = () => {
    setIdentifier("");
    setName("");
    setPassword("");
    setErrorMsg("");
  };

  const handleAdminAutofill = () => {
    setAuthMethod("username");
    setIdentifier("admin");
    setPassword("admin123");
    setIsRegister(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isRegister ? t.auth.registerTitle : t.auth.loginTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sog'liq va Sport platformasi shaxsiy kabineti
          </p>
        </div>

        {/* Tab switch for login method */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthMethod("username");
              setIdentifier("");
            }}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              authMethod === "username"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {t.auth.byUsername}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod("phone");
              setIdentifier("+998");
            }}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              authMethod === "phone"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            {t.auth.byPhone}
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.cart.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jasur Aliyev"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {authMethod === "username" ? t.auth.username : t.auth.phone}
            </label>
            <div className="relative">
              {authMethod === "username" ? (
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              ) : (
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              )}
              <input
                type={authMethod === "username" ? "text" : "tel"}
                value={identifier}
                onKeyDown={authMethod === "phone" ? handlePhoneKeyDown : undefined}
                onChange={(e) => {
                  if (authMethod === "phone") {
                    setIdentifier(formatUzbekPhone(e.target.value));
                  } else {
                    setIdentifier(e.target.value);
                  }
                }}
                maxLength={authMethod === "phone" ? 17 : 40}
                placeholder={authMethod === "username" ? "sportchi_2026" : "+998 90 123 45 67"}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.auth.password}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition"
          >
            <span>{isRegister ? t.auth.registerBtn : t.auth.loginBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
          {isRegister ? t.auth.haveAccount : t.auth.noAccount}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg("");
            }}
            className="font-semibold text-emerald-500 hover:underline ml-1"
          >
            {isRegister ? t.auth.loginBtn : t.auth.registerBtn}
          </button>
        </div>

        {/* Quick Admin Test Helper */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 mb-2">
            💡 {t.auth.quickAdminHint}
          </p>
          <button
            type="button"
            onClick={handleAdminAutofill}
            className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-full hover:bg-emerald-100 transition"
          >
            Admin ma'lumotlarini tez kiritish
          </button>
        </div>
      </div>
    </div>
  );
};
