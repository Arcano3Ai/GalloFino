"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center bg-black/60 border border-gold/30 rounded-none p-0.5 text-[11px] font-mono">
      <button
        onClick={() => setLang("es")}
        className={`px-2 py-1 font-bold transition-all ${
          lang === "es"
            ? "bg-gold text-black shadow-md"
            : "text-cream-muted hover:text-cream"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 font-bold transition-all ${
          lang === "en"
            ? "bg-gold text-black shadow-md"
            : "text-cream-muted hover:text-cream"
        }`}
      >
        EN
      </button>
    </div>
  );
}
