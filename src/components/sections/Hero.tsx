"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { businessConfig } from "@/config/business";
import { getWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleModalClose = () => {
    setIsVideoModalOpen(false);
  };

  const handleVideoEnded = () => {
    // Auto-close popup modal when video finishes playing
    setIsVideoModalOpen(false);
  };

  const scrollToAppointments = () => {
    document.getElementById("citas")?.scrollIntoView({ behavior: "smooth" });
  };

  const waUrl = getWhatsAppUrl(
    "Hola, Gallo Fino Barber. Quiero agendar una cita. ¿Qué horarios tienen disponibles?",
    businessConfig.whatsapp
  );

  const indicators = [
    { icon: "✂", label: t.hero.feat1 },
    { icon: "🪒", label: t.hero.feat2 },
    { icon: "⚡", label: t.hero.feat3 },
    { icon: "👑", label: t.hero.feat4 },
  ];

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black py-28 sm:py-36"
    >
      {/* ── Background Image & Layer ─────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/barbershop-interior-real.jpg"
          alt="Gallo Fino Barber Shop"
          fill
          className="object-cover object-center scale-105 filter brightness-60"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 35% 45%, #B89245 0%, transparent 65%)`,
          }}
        />
      </div>

      {/* ── Decorative Side Accent ───────────────────────────── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block z-10">
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold/60" />
          <div className="text-gold text-[10px] tracking-[0.5em] rotate-90 font-mono uppercase whitespace-nowrap my-10">
            MONTERREY · CHICAGO · OHIO
          </div>
          <div className="w-px h-24 bg-gradient-to-t from-transparent to-gold/60" />
        </div>
      </div>

      {/* ── Main Hero Content ───────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl">

          {/* Hero Brand Emblem Logo & Status Pill */}
          <div
            className={`
              flex flex-wrap items-center gap-4 mb-6
              transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <div className="relative w-14 h-14 sm:w-18 sm:h-18 overflow-hidden rounded-full border-2 border-gold shadow-[0_0_20px_rgba(184,146,69,0.4)] flex-shrink-0 animate-pulse-gold">
              <Image
                src="/assets/Media2.png"
                alt="Gallo Fino Barber Emblem"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-md border border-gold/40 px-3.5 py-1 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-cream text-[11px] font-mono font-bold tracking-wider">
                  {t.hero.statusBadge}
                </span>
              </div>
              <div className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
                EST. 2024 · PURO PORTE
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className={`
              font-brand font-black leading-none mb-4 tracking-wider
              transition-all duration-700 delay-200
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <span className="block text-cream text-5xl sm:text-7xl lg:text-8xl drop-shadow-2xl">
              GALLO FINO
            </span>
            <span className="block text-gold text-3xl sm:text-4xl lg:text-5xl mt-2 tracking-widest">
              BARBER
            </span>
          </h1>

          {/* Slogan */}
          <div
            className={`
              mb-6 transition-all duration-700 delay-300
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <p className="font-display text-2xl sm:text-3xl text-gold font-bold italic leading-tight">
              {t.hero.slogan}
            </p>
          </div>

          {/* Subtitle */}
          <p
            className={`
              text-cream-muted text-base sm:text-lg leading-relaxed mb-10 max-w-xl
              transition-all duration-700 delay-400
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={`
              flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14
              transition-all duration-700 delay-500
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <button
              onClick={scrollToAppointments}
              className="btn-primary text-xs py-4 px-8 justify-center shadow-[0_10px_35px_rgba(184,146,69,0.35)] hover:shadow-[0_15px_45px_rgba(184,146,69,0.6)] transition-all"
            >
              {t.hero.ctaBook}
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="btn-outline text-xs py-4 px-6 justify-center inline-flex items-center gap-2 border-gold text-gold hover:bg-gold hover:text-black font-bold tracking-wider uppercase transition-all"
            >
              🎬 VER REEL INTRO
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs py-4 px-6 justify-center inline-flex items-center gap-2"
            >
              ✂ {t.hero.ctaWa}
            </a>
          </div>

          {/* Service Features Badges */}
          <div
            className={`
              grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gold/15 pt-8
              transition-all duration-700 delay-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            {indicators.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="text-gold text-lg">{item.icon}</span>
                <span className="text-cream-muted text-[10px] font-bold tracking-widest uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── AUTO INTRO POPUP VENTANA EMERGENTE CON AUTO-CLOSE AL TERMINAR ─────────────────── */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-6 backdrop-blur-2xl animate-fade-in"
          onClick={handleModalClose}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] border-2 border-gold bg-black shadow-[0_0_100px_rgba(184,146,69,0.75)] rounded-none flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar of popup with title and TACHA (X) button */}
            <div className="bg-dark border-b border-gold/30 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gold text-base">🐓</span>
                <span className="font-brand font-bold text-cream text-xs sm:text-sm tracking-wider uppercase">
                  GALLO FINO BARBER — INTRO OFICIAL
                </span>
              </div>
              
              {/* TACHA PARA CERRAR (X) */}
              <button
                onClick={handleModalClose}
                aria-label="Cerrar video"
                className="bg-wine hover:bg-wine-light text-cream hover:text-white px-3 py-1 font-bold text-xs sm:text-sm font-mono tracking-widest transition-all border border-wine-light flex items-center gap-1 shadow-lg cursor-pointer"
              >
                <span className="text-lg leading-none">✕</span> CERRAR
              </button>
            </div>

            {/* Video Player Display (Object Contain — NO CROPPING AT ALL & AUTO-CLOSES ON END) */}
            <div className="relative w-full flex-1 bg-black flex items-center justify-center min-h-[50vh] max-h-[75vh] p-2">
              <video
                autoPlay
                muted
                controls
                playsInline
                onEnded={handleVideoEnded}
                className="w-full h-full max-h-[72vh] object-contain rounded-none"
              >
                <source src="/assets/videologo.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>

            {/* Footer bar */}
            <div className="bg-dark border-t border-gold/20 px-4 py-2.5 flex justify-between items-center text-xs">
              <span className="text-cream-muted text-[11px]">
                Se cerrará automáticamente al terminar el video ⏱
              </span>
              <button
                onClick={handleModalClose}
                className="text-gold hover:text-cream font-bold underline"
              >
                Cerrar Ahora (✕)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
