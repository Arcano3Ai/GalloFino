"use client";

interface ProductMockupProps {
  id: string;
  name: string;
  category: string;
  badge?: string;
  className?: string;
}

export function ProductMockup({ id, name, category, badge, className = "" }: ProductMockupProps) {
  switch (id) {
    case "pomada-la-cresta":
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#1C1A17] to-[#0A0908] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}>
          {/* Studio Spotlight Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(184,146,69,0.25),transparent_70%)]" />
          
          {/* 3D Pomade Jar Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Lid Top Chrome Reflection */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#2D2922] via-[#12100E] to-[#050505] border-4 border-gold/70 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(184,146,69,0.3)] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
              {/* Inner Metallic Gold Ring */}
              <div className="w-28 h-28 sm:w-34 sm:h-34 rounded-full border border-gold/40 flex flex-col items-center justify-center p-2 text-center bg-radial from-[#1E1B15] to-[#080706]">
                <span className="text-gold text-2xl sm:text-3xl mb-0.5">💈</span>
                <span className="font-brand font-black text-cream text-[10px] sm:text-xs tracking-widest uppercase block leading-none">
                  GALLO FINO
                </span>
                <span className="text-gold font-mono text-[8px] sm:text-[9px] tracking-wider uppercase block mt-1">
                  LA CRESTA POMADE
                </span>
                <span className="text-cream-muted text-[7px] tracking-widest uppercase block mt-0.5 opacity-70">
                  MATTE FINISH · 100G
                </span>
              </div>
            </div>

            {/* Jar Base Body Shadow */}
            <div className="w-32 h-4 bg-black/80 rounded-full blur-md mt-2" />
          </div>
        </div>
      );

    case "aceite-barba-oro":
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#1E1912] to-[#090806] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}>
          {/* Warm Amber Studio Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,146,69,0.3),transparent_65%)]" />

          {/* 3D Beard Oil Dropper Bottle */}
          <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
            {/* Rubber Bulb Pipette */}
            <div className="w-8 h-7 bg-gradient-to-b from-[#2A2A2A] to-[#111111] rounded-t-full border-t border-white/20 shadow-md" />
            {/* Gold Metallic Cap Ring */}
            <div className="w-10 h-4 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark border-y border-gold/60 shadow-sm" />
            {/* Glass Bottle Body */}
            <div className="w-24 sm:w-28 h-36 sm:h-40 bg-gradient-to-r from-[#2A1B0B] via-[#4A3215] to-[#1A1005] rounded-b-2xl border border-gold/40 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-center p-2">
              {/* Amber Liquid Refraction Line */}
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-gold-dark/40 to-transparent" />
              
              {/* Gold Foil Label */}
              <div className="relative z-10 w-full bg-black/90 border border-gold/60 py-2 px-1 text-center shadow-lg">
                <span className="text-gold text-lg block leading-none mb-0.5">🧪</span>
                <span className="font-brand font-black text-cream text-[9px] sm:text-[11px] tracking-wider uppercase block">
                  GALLO FINO
                </span>
                <span className="text-gold text-[7px] font-mono tracking-widest uppercase block mt-0.5">
                  ACEITE GALLO DE ORO
                </span>
                <span className="text-cream-muted text-[6px] tracking-widest uppercase block">
                  ORGANIC OILS · 50ML
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "gel-puro-porte":
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#181C1A] to-[#060807] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}>
          {/* Emerald Green Studio Backlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,211,102,0.15),transparent_70%)]" />

          {/* 3D Squeeze Tube */}
          <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
            {/* Tube Body */}
            <div className="w-24 sm:w-28 h-36 sm:h-40 bg-gradient-to-r from-[#111111] via-[#222222] to-[#0A0A0A] rounded-t-xl rounded-b-md border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative flex flex-col items-center justify-center p-3">
              {/* Crimp Top Line */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
              
              <span className="text-gold text-2xl mb-1">⚡</span>
              <span className="font-brand font-black text-cream text-[10px] sm:text-xs tracking-wider uppercase text-center block">
                GALLO FINO
              </span>
              <span className="text-emerald-400 font-mono text-[8px] tracking-widest uppercase text-center block mt-1 font-bold">
                GEL PURO PORTE
              </span>
              <span className="text-cream-muted text-[7px] tracking-widest uppercase text-center block mt-1 opacity-70">
                ULTRA HOLD · 250ML
              </span>
            </div>
            {/* Flip Cap */}
            <div className="w-16 h-5 bg-gradient-to-r from-[#222] via-[#333] to-[#111] rounded-b-lg border-t border-black shadow-md" />
          </div>
        </div>
      );

    case "gorra-trucker-gallo":
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#221F1A] to-[#0A0907] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}>
          {/* Gold Crest Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(184,146,69,0.3),transparent_65%)]" />

          {/* 3D Trucker Cap Mockup Badge */}
          <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
            <div className="w-36 sm:w-44 h-28 sm:h-32 bg-gradient-to-b from-[#181818] to-[#0A0A0A] rounded-t-3xl border-2 border-gold/50 relative flex items-center justify-center p-3 shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              {/* Curved Visor Shadow */}
              <div className="absolute -bottom-3 inset-x-2 h-6 bg-gradient-to-b from-black to-black/80 rounded-full border-t border-gold/40 shadow-lg" />

              {/* Embroidered Rooster Patch */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black border-2 border-gold flex flex-col items-center justify-center p-1 shadow-inner text-center">
                <span className="text-gold text-2xl sm:text-3xl leading-none">🐓</span>
                <span className="font-brand font-black text-cream text-[8px] sm:text-[9px] tracking-widest uppercase block mt-1">
                  GALLO FINO
                </span>
                <span className="text-gold font-mono text-[6px] tracking-wider uppercase block">
                  ORIGINAL CAP
                </span>
              </div>

              {/* Gold Authenticity Sticker Seal */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold text-black font-black text-[7px] flex items-center justify-center shadow-md rotate-12">
                100%
              </div>
            </div>
          </div>
        </div>
      );

    case "playera-puro-porte":
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#191919] to-[#0A0A0A] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}>
          {/* Subtle Ambient Light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_70%)]" />

          {/* 3D Folded Heavyweight T-Shirt Mockup */}
          <div className="relative z-10 w-36 sm:w-44 h-40 sm:h-44 bg-[#121212] border border-white/15 rounded-md p-4 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between group-hover:scale-105 transition-transform duration-500">
            {/* Woven Collar Tag */}
            <div className="bg-black border border-gold/60 px-2 py-0.5 text-gold font-mono text-[7px] tracking-widest uppercase font-bold">
              GALLO FINO · HEAVY COTTON
            </div>

            {/* Vintage Chest Print Graphic */}
            <div className="text-center my-auto">
              <span className="font-brand font-black text-cream text-sm sm:text-base tracking-widest block leading-tight">
                GALLO FINO
              </span>
              <span className="font-display font-bold italic text-gold text-[10px] sm:text-xs block mt-1">
                "Puro Porte, Puro Estilo"
              </span>
              <span className="text-cream-muted text-[7px] font-mono tracking-widest uppercase block mt-1">
                EST. 2024 · MONTERREY
              </span>
            </div>

            {/* Fabric Hem Accent */}
            <div className="w-full h-1 bg-gold/40 rounded-full" />
          </div>
        </div>
      );

    case "kit-grooming-vip":
      return (
        <div className={`relative w-full h-full bg-gradient-to-b from-[#251B10] to-[#0B0805] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}>
          {/* Luxury Gold Crate Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,146,69,0.35),transparent_65%)]" />

          {/* 3D Wooden Gift Box Crate */}
          <div className="relative z-10 w-44 sm:w-52 h-36 sm:h-40 bg-gradient-to-br from-[#3A2818] via-[#24170C] to-[#120B05] border-2 border-gold rounded-none p-3 shadow-[0_25px_50px_rgba(0,0,0,0.95)] flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
            {/* Brass Corner Clutches */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gold" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gold" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gold" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gold" />

            {/* Burnished Wood Brand Stamp Header */}
            <div className="border-b border-gold/40 pb-1 text-center">
              <span className="font-brand font-black text-gold text-xs sm:text-sm tracking-widest uppercase block">
                GALLO FINO VIP
              </span>
              <span className="text-cream-muted text-[7px] font-mono tracking-widest uppercase block">
                EL PORTE REAL GIFT BOX
              </span>
            </div>

            {/* Crate Items Mini Display */}
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-xl">💈</span>
              <span className="text-xl">🧪</span>
              <span className="text-xl">🧢</span>
              <span className="text-xl">👑</span>
            </div>

            {/* Brass Latch Lock */}
            <div className="bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark text-black text-[7px] font-black text-center py-1 uppercase tracking-widest shadow-md">
              EDICIÓN ESPECIAL DE REGALO
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative w-full h-full bg-black flex items-center justify-center p-6 ${className}`}>
          <span className="text-gold text-4xl">🐓</span>
        </div>
      );
  }
}
