"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/config/business";
import { useLanguage } from "@/context/LanguageContext";

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-black relative overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #B89245 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="section-label mb-4">{t.testimonials.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.testimonials.titleMain} <span className="text-gold">{t.testimonials.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">★</div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <div
              key={test.id}
              className={`
                relative bg-dark border border-white/5 p-6
                transition-all duration-700
                hover:border-gold/30 hover:-translate-y-1
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-gold/20 font-display text-8xl leading-none absolute top-2 right-4 font-black select-none">
                "
              </div>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>

              <p className="text-cream/80 text-sm leading-relaxed mb-6 relative z-10">
                "{test.text}"
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <div className="text-cream font-bold text-sm">{test.name}</div>
                  <div className="text-gold text-xs tracking-wider mt-0.5">{test.service}</div>
                </div>
                <div className="text-2xl">🐓</div>
              </div>
            </div>
          ))}
        </div>

        {/* Average rating */}
        <div className={`
          text-center mt-12 transition-all duration-700 delay-500
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}>
          <div className="inline-flex items-center gap-4 border border-gold/20 px-8 py-4">
            <div>
              <div className="text-gold font-brand text-4xl font-black">5.0</div>
              <div className="flex gap-0.5 justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-gold/20" />
            <div className="text-left">
              <div className="text-cream text-sm font-semibold">{t.testimonials.averageLabel}</div>
              <div className="text-cream-muted text-xs">{t.testimonials.basedOnLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
