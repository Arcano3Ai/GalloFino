"use client";

import { useEffect, useRef, useState } from "react";
import { businessConfig } from "@/config/business";
import { MerchCategory, MerchItem } from "@/types";
import { getWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";
import { ProductMockup } from "@/components/ui/ProductMockup";

export function Merch() {
  const [activeCategory, setActiveCategory] = useState<MerchCategory>("todos");
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  const categories: { id: MerchCategory; label: string }[] = [
    { id: "todos", label: t.merch.categories.todos },
    { id: "cabello", label: t.merch.categories.cabello },
    { id: "barba", label: t.merch.categories.barba },
    { id: "ropa", label: t.merch.categories.ropa },
    { id: "kits", label: t.merch.categories.kits },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredItems = activeCategory === "todos"
    ? businessConfig.merch
    : businessConfig.merch.filter((item) => item.category === activeCategory);

  return (
    <section
      id="tienda"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-dark relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, #B89245 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="section-label mb-4">{t.merch.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.merch.titleMain} <span className="text-gold">{t.merch.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">✂</div>
          <p className="text-cream-muted text-base mt-4 max-w-md mx-auto">
            {t.merch.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-5 py-2 text-xs font-bold tracking-widest uppercase border transition-all duration-300
                ${activeCategory === cat.id
                  ? "bg-gold border-gold text-black shadow-[0_0_15px_rgba(184,146,69,0.4)]"
                  : "bg-black/40 border-white/10 text-cream-muted hover:border-gold/50 hover:text-cream"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid with 100% Accurate Product Mockups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const itemT = t.merch.items[item.id as keyof typeof t.merch.items];
            const price = lang === "es" ? item.priceMxn : item.priceUsd;
            const waOrderMsg = `Hola, Gallo Fino Barber. Me interesa comprar el producto: ${itemT?.name} (${price}). ¿Tienen disponibilidad?`;
            const waUrl = getWhatsAppUrl(waOrderMsg, businessConfig.whatsapp);

            return (
              <div
                key={item.id}
                className={`
                  relative bg-black/80 border border-gold/20 overflow-hidden group cursor-pointer
                  hover:border-gold transition-all duration-500 flex flex-col justify-between
                  shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(184,146,69,0.25)]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  ${item.featured ? "ring-1 ring-gold/30" : ""}
                `}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* 3D Product Packaging Mockup */}
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <ProductMockup
                      id={item.id}
                      name={itemT?.name || "Product"}
                      category={item.category}
                      badge={item.badge}
                    />

                    {/* Badge Overlay */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-gold text-black text-[9px] font-black px-2.5 py-1 tracking-widest uppercase shadow-md">
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="bg-gold text-black text-xs font-brand font-black px-5 py-2.5 uppercase tracking-wider hover:bg-white transition-colors shadow-2xl"
                      >
                        {t.merch.detailsBtn} ⊕
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-gold tracking-widest uppercase flex items-center gap-1">
                        <span>{item.icon}</span>
                        <span>{t.merch.categories[item.category]}</span>
                      </span>
                      <span className="text-[10px] text-cream-muted font-mono uppercase">
                        GALLO FINO MERCH
                      </span>
                    </div>

                    <h3 className="font-brand font-bold text-cream text-lg sm:text-xl mb-2 group-hover:text-gold transition-colors leading-tight">
                      {itemT?.name}
                    </h3>

                    <p className="text-cream-muted text-xs leading-relaxed mb-4 line-clamp-2">
                      {itemT?.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-gold/15 pt-4">
                      <span className="text-gold font-brand font-black text-2xl">
                        {price}
                      </span>
                      <span className="text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                        ✓ EN STOCK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 pt-0 flex gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex-1 justify-center text-xs py-3 text-center"
                  >
                    {t.merch.orderViaWa}
                  </a>
                  <button
                    onClick={() => setSelectedProduct(item)}
                    aria-label="Ver detalles del producto"
                    className="p-3 border border-gold/20 text-cream-muted hover:border-gold hover:text-gold transition-colors text-xs"
                  >
                    🔍
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Product Modal */}
      {selectedProduct && (() => {
        const itemT = t.merch.items[selectedProduct.id as keyof typeof t.merch.items];
        const price = lang === "es" ? selectedProduct.priceMxn : selectedProduct.priceUsd;
        const waOrderMsg = `Hola, Gallo Fino Barber. Me interesa comprar el producto: ${itemT?.name} (${price}). ¿Tienen disponibilidad?`;
        const waUrl = getWhatsAppUrl(waOrderMsg, businessConfig.whatsapp);

        return (
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-dark border-2 border-gold p-6 sm:p-8 shadow-[0_0_60px_rgba(184,146,69,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-cream-muted hover:text-gold font-mono text-xs tracking-widest uppercase transition-colors"
              >
                {t.merch.closeDetails}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-square w-full border border-gold/40 overflow-hidden bg-black flex items-center justify-center">
                  <ProductMockup
                    id={selectedProduct.id}
                    name={itemT?.name || "Product"}
                    category={selectedProduct.category}
                    badge={selectedProduct.badge}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{selectedProduct.icon}</span>
                    {selectedProduct.badge && (
                      <span className="bg-gold text-black text-[9px] font-black px-2 py-0.5 tracking-widest uppercase">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-brand font-black text-2xl text-cream mb-2">
                    {itemT?.name}
                  </h3>

                  <div className="text-gold font-brand font-black text-3xl mb-4">
                    {price}
                  </div>

                  <p className="text-cream-muted text-xs sm:text-sm leading-relaxed mb-6">
                    {itemT?.description}
                  </p>

                  <div className="space-y-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full justify-center text-xs py-3.5"
                    >
                      {t.merch.orderViaWa}
                    </a>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="btn-outline w-full justify-center text-xs py-2.5"
                    >
                      Seguir Viendo Tienda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
