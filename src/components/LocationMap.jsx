import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MapPin, Navigation, Phone, Clock, Copy, Check, ExternalLink } from "lucide-react";

export const LocationMap = () => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const address = "Toshkent shahar, Amir Temur shoh ko'chasi, 45-uy";
  const coords = "41.311081, 69.279737";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    showToast("Manzil nusxalandi!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Info Sidebar */}
        <div className="p-8 lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Flagman Do'konimiz</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
              Sog'liq va Sport Markazi
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Toshkent shahridagi eng katta sport inventarlari va sertifikatlangan sport ozuqalari gipermarketi. Keling, murabbiylarimiz bilan jonli maslahat oling!
            </p>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Manzil:</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {address}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline mt-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Nusxalandi" : "Manzilni nusxalash"}</span>
                  </button>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Ish vaqti:</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Har kuni: 09:00 - 21:00 (Dam olishsiz)
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Telefon:</div>
                  <a
                    href="tel:+998712004545"
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition"
                  >
                    +998 (71) 200-45-45
                  </a>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Qo'shimcha: +998 (90) 123-45-67
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
            <a
              href={`https://maps.google.com/?q=${coords}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>

            <a
              href={`https://yandex.uz/maps/?text=${coords}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Yandex Xarita</span>
            </a>
          </div>
        </div>

        {/* Interactive Map Embed */}
        <div className="lg:col-span-7 relative h-[360px] lg:h-auto min-h-[380px] bg-slate-200 dark:bg-slate-800">
          <iframe
            title="Sog'liq va Sport do'koni joylashuvi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.9532854911183!2d69.2771622765355!3d41.31108107130985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2931f41001%3A0xf0829ad5969818cf!2z0JDQvNC40YAg0KLQtdC80YPRgCDQpdC40LXQsdC-0L3QuA!5e0!3m2!1sru!2s!4v1700000000000!5m2!1sru!2s"
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Marker Card */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-xs p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <MapPin className="w-5 h-5 animate-bounce" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">
                Sog'liq va Sport Markazi
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                Amir Temur shoh ko'chasi, 45
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
