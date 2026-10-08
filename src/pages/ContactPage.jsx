import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const ContactPage = () => {
  const { t, sendTelegramMessage, showToast } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setIsSubmitting(true);

    const tgMessage = `💬 <b>YANGI MUROJAAT (SAYTDAN)</b>\n\n` +
      `👤 <b>Ism:</b> ${name}\n` +
      `📞 <b>Telefon:</b> ${phone}\n` +
      `📝 <b>Xabar:</b>\n${message}\n\n` +
      `🕒 <b>Vaqt:</b> ${new Date().toLocaleString()}`;

    await sendTelegramMessage(tgMessage);

    setIsSubmitting(false);
    setIsSuccess(true);
    showToast(t.contact.sentSuccess);
    setName("");
    setPhone("+998");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <MessageSquare className="w-4 h-4" />
          <span>24/7 Aloqa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {t.contact.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.contact.infoTitle}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Manzil:</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Toshkent sh., Amir Temur shoh ko'chasi, 45-uy
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Telefon raqamlar:</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    +998 (71) 200-45-45
                  </div>
                  <div className="text-xs text-slate-500">
                    +998 (90) 123-45-67 (Telegram)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Ish vaqti:</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Dushanba - Yakshanba: 09:00 - 21:00
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Elektron pochta:</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    info@sogliqsport.uz
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Telegram Channel Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition"
              >
                <Send className="w-4 h-4" />
                <span>Rasmiy Telegram Kanalimizga a'zo bo'ling</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Xabaringiz to'g'ridan-to'g'ri Telegram bot orqali operatorlarimizga jo'natiladi.
              </p>
            </div>

            {isSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{t.contact.sentSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.contact.phone}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.contact.message}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Qanday mahsulot yoki mashg'ulot bo'yicha maslahat kerak?..."
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Yuborilmoqda..." : t.contact.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
