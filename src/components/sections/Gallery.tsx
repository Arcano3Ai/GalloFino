"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/config/business";
import type { GalleryCategory } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("todos");
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: "todos", label: t.gallery.categories.todos },
    { id: "fade", label: t.gallery.categories.fade },
    { id: "barba", label: t.gallery.categories.barba },
    { id: "clasicos", label: t.gallery.categories.clasicos },
    { id: "designs", label: t.gallery.categories.designs },
    { id: "transformaciones", label: t.gallery.categories.transformaciones },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalImage(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = activeCategory === "todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-darkgray relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="section-label mb-4">{t.gallery.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.gallery.titleMain} <span className="text-gold">{t.gallery.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">✂</div>
          <p className="text-cream-muted text-base mt-4 max-w-md mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase border transition-all duration-200
                ${activeCategory === cat.id
                  ? "bg-gold border-gold text-black"
                  : "bg-transparent border-white/15 text-cream-muted hover:border-gold/50 hover:text-cream"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Uniform Clean Grid (Fixes vertical stretching & uneven gaps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={`
                relative overflow-hidden cursor-pointer group border border-white/10 hover:border-gold/50
                transition-all duration-500 bg-black
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${index * 60}ms` }}
              onClick={() => setModalImage({ src: item.src, alt: item.alt })}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 text-center">
                    <div className="text-white text-3xl mb-1">⊕</div>
                    <p className="text-white text-[10px] font-bold tracking-widest uppercase">{t.gallery.viewLabel}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-gold font-bold tracking-widest uppercase block mb-0.5">
                    {item.category}
                  </span>
                  <p className="text-cream-muted text-[11px] leading-snug line-clamp-1">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <p className="text-cream-muted text-sm mb-4">
            {t.gallery.igPrompt}
          </p>
          <a
            href="https://instagram.com/gallofino.barber"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @gallofino.barber
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-cream-muted hover:text-gold text-sm tracking-widest uppercase transition-colors"
            >
              {t.gallery.closeModal}
            </button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={modalImage.src}
                alt={modalImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-dark border-t border-gold/20 p-3">
              <p className="text-cream-muted text-xs tracking-wider">{modalImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
