"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { href: "#inicio", label: t.nav.home },
    { href: "#el-porte", label: t.elPorte.sectionLabel },
    { href: "#servicios", label: t.nav.services },
    { href: "#barberos", label: t.nav.barbers },
    { href: "#tienda", label: t.nav.merch },
    { href: "#galeria", label: t.nav.gallery },
    { href: "#citas", label: t.nav.appointments },
    { href: "#ubicacion", label: t.nav.location },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-500
        ${isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-gold/20 shadow-2xl py-3"
          : "bg-transparent py-5"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#inicio")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 overflow-hidden rounded-full border-2 border-gold/60 group-hover:border-gold transition-all duration-300 shadow-[0_0_15px_rgba(184,146,69,0.3)] group-hover:scale-105">
              <Image
                src="/assets/Media2.png"
                alt="Gallo Fino Barber"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <span className="font-brand text-gold text-sm sm:text-lg font-black tracking-wider block leading-none drop-shadow">
                GALLO FINO
              </span>
              <span className="font-brand text-cream-muted text-[9px] sm:text-[10px] tracking-[0.2em] block mt-0.5 font-bold">
                BARBER
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="
                  text-cream-muted hover:text-cream
                  text-xs font-semibold tracking-widest uppercase
                  transition-colors duration-200
                  relative group
                "
              >
                {link.label}
                <span className="
                  absolute -bottom-1 left-0 right-0 h-px bg-gold
                  scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 origin-left
                " />
              </button>
            ))}
          </div>

          {/* Language & Theme Toggle + CTA Button + Mobile Menu */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />

            <button
              onClick={() => handleNavClick("#citas")}
              className="hidden sm:flex btn-primary text-xs py-2.5 px-5"
              id="navbar-cta"
            >
              {t.nav.bookBtn}
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-cream transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-cream transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-cream transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`
        lg:hidden
        overflow-hidden transition-all duration-500
        ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="bg-dark/98 backdrop-blur-xl border-t border-gold/20 px-4 py-6">
          <div className="flex flex-col gap-4">
            {navItems.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="
                  text-left text-cream text-sm font-semibold tracking-widest uppercase
                  py-3 border-b border-white/5
                  hover:text-gold transition-colors
                "
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#citas")}
              className="btn-primary mt-2 justify-center"
            >
              ✂ {t.nav.bookBtn}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
