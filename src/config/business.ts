// ============================================================
//  GALLO FINO BARBER — CONFIGURACIÓN CENTRAL
//  Modifica este archivo para cambiar cualquier dato del negocio
//  sin tocar los componentes.
// ============================================================

export const businessConfig = {
  name: "Gallo Fino Barber",
  tagline: "Puro Porte, Puro Estilo.",
  description:
    "Barbería mexicana-americana con estética norteña. Cortes de respeto, barba con carácter.",

  // ─── CONTACTO ──────────────────────────────────────────────
  // Número en formato internacional SIN espacios ni guiones
  whatsapp: "528112345678",
  phone: "+52 81 1234 5678",
  email: "hola@gallofino.com",

  // ─── UBICACIÓN ─────────────────────────────────────────────
  address: "104 S Front St",
  city: "Fremont, Ohio",
  country: "USA (OH 43420)",
  // Enlace directo a Google Maps
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11956.123456789!2d-83.1165!3d41.3445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b6329c2ad21c5%3A0x6b4c1001c2345678!2sFremont%2C+OH+43420%2C+USA!5e0!3m2!1ses!2sus!4v1692600000000",
  googleMapsUrl: "https://maps.google.com/?q=Fremont+OH+43420+USA",

  // ─── HORARIOS ──────────────────────────────────────────────
  // Formato: { open: "HH:MM", close: "HH:MM" } | null (cerrado)
  hours: {
    lunes:    { open: "10:00", close: "20:00" },
    martes:   { open: "10:00", close: "20:00" },
    miercoles:{ open: "10:00", close: "20:00" },
    jueves:   { open: "10:00", close: "20:00" },
    viernes:  { open: "10:00", close: "21:00" },
    sabado:   { open: "09:00", close: "21:00" },
    domingo:  { open: "10:00", close: "15:00" },
  } as Record<string, { open: string; close: string } | null>,

  // ─── SERVICIOS ─────────────────────────────────────────────
  services: [
    {
      id: "corte-gallo",
      name: "Corte Gallo",
      description: "Corte clásico o moderno personalizado según tu estilo.",
      price: "$150 MXN",
      duration: "30 min",
      icon: "✂",
      image: "/assets/service-corte-gallo.png",
      popular: false,
    },
    {
      id: "gallo-bravo",
      name: "Gallo Bravo",
      description: "Corte completo + arreglo y perfilado de barba.",
      price: "$250 MXN",
      duration: "50 min",
      icon: "🔥",
      image: "/assets/service-gallo-bravo.png",
      popular: true,
    },
    {
      id: "la-cresta",
      name: "La Cresta",
      description: "Fade degradé + diseños personalizados en las líneas.",
      price: "$200 MXN",
      duration: "40 min",
      icon: "⚡",
      image: "/assets/service-la-cresta.png",
      popular: false,
    },
    {
      id: "barba-fino",
      name: "Barba Fino",
      description:
        "Perfilado, arreglo y tratamiento de barba con productos premium.",
      price: "$120 MXN",
      duration: "25 min",
      icon: "🪒",
      image: "/assets/service-barba-fino.png",
      popular: false,
    },
    {
      id: "gallo-de-oro",
      name: "Gallo de Oro",
      description:
        "Experiencia premium completa: corte + barba + tratamiento facial + styling. La experiencia más fina.",
      price: "$400 MXN",
      duration: "80 min",
      icon: "👑",
      image: "/assets/service-gallo-de-oro.png",
      popular: false,
    },
  ],

  // ─── MERCH & PRODUCTOS OFICIALES ────────────────────────────
  merch: [
    {
      id: "pomada-la-cresta",
      category: "cabello",
      priceMxn: "$220 MXN",
      priceUsd: "$12 USD",
      image: "/assets/service-la-cresta.png",
      icon: "💈",
      badge: "MÁS VENDIDO",
      featured: true,
    },
    {
      id: "aceite-barba-oro",
      category: "barba",
      priceMxn: "$280 MXN",
      priceUsd: "$15 USD",
      image: "/assets/service-barba-fino.png",
      icon: "🧪",
      badge: "PREMIUM",
      featured: true,
    },
    {
      id: "gel-puro-porte",
      category: "cabello",
      priceMxn: "$180 MXN",
      priceUsd: "$10 USD",
      image: "/assets/service-corte-gallo.png",
      icon: "⚡",
      badge: "NUEVO",
      featured: false,
    },
    {
      id: "gorra-trucker-gallo",
      category: "ropa",
      priceMxn: "$450 MXN",
      priceUsd: "$25 USD",
      image: "/assets/Media2.png",
      icon: "🧢",
      badge: "EDICIÓN LIMITADA",
      featured: true,
    },
    {
      id: "playera-puro-porte",
      category: "ropa",
      priceMxn: "$500 MXN",
      priceUsd: "$28 USD",
      image: "/assets/barbershop-craft-real.jpg",
      icon: "👕",
      badge: "STREETWEAR",
      featured: false,
    },
    {
      id: "kit-grooming-vip",
      category: "kits",
      priceMxn: "$950 MXN",
      priceUsd: "$50 USD",
      image: "/assets/service-gallo-de-oro.png",
      icon: "👑",
      badge: "KIT REGALO",
      featured: true,
    },
  ],

  // ─── FUNDADOR & HISTORIA ─────────────────────────────────
  founder: {
    name: "Jaime 'El Gallo Master'",
    title: "Fundador & Maestro Barbero",
    tagline: "De Chicago y Ohio a Monterrey. La verdadera navaja de tres tierras.",
    story:
      "Con una trayectoria forjada en las emblemáticas barberías urbanas de Chicago y la cultura de trabajo pesado de Ohio, Jaime trajo a Monterrey la precisión quirúrgica del fade americano y el estilo chicano midwest, fusionándolos con la calidez y el orgullo de sus raíces mexicanas. Gallo Fino Barber es el resultado de 15 años perfeccionando el arte de la navaja libre, uniendo la técnica estadounidense y el carácter norteño.",
    quote: "En Chicago aprendí la velocidad del fade urbano, en Ohio la disciplina del oficio, y en Monterrey mantengo vivo el respeto y las raíces mexicanas. Aquí el porte se trae en la sangre.",
    experience: "15+ Años • Chicago • Ohio • Monterrey",
    image: "/assets/jaime.jpg",
  },

  // ─── BARBEROS ──────────────────────────────────────────────
  barbers: [
    {
      id: "gallo-01",
      number: "01",
      name: "Jaime 'El Gallo Master'",
      specialty: "Chicago Fades • Midwest Style • Fundador",
      bio: "15 años forjando estilo entre Chicago, Ohio y Monterrey. Especialista en la fusión de cortes urbanos americanos, freestyle designs y perfilado tradicional a navaja limpia.",
      image: "/assets/jaime.jpg",
      instagram: "@jaime_gallofino",
    },
    {
      id: "gallo-02",
      number: "02",
      name: "El Barba Brava",
      specialty: "Sculpting & Barba de Autor",
      bio: "Maestro del perfilado. Escultura de barba con toalla caliente, aceites esenciales y navaja barbera de filo norteño.",
      image: "/assets/barber-02-real.jpg",
      instagram: "@barbabrava_gallo",
    },
    {
      id: "gallo-03",
      number: "03",
      name: "El Clásico",
      specialty: "Pompadour, Tijera & Vintage Cuts",
      bio: "Técnica tradicional de tijera sobre peine. Pompadours, comb overs y cortes ejecutivos atemporales con fijación pomada.",
      image: "/assets/barber-03-real.jpg",
      instagram: "@elclasico_barber",
    },
  ],

  // ─── REDES SOCIALES & REPOSITORIO ──────────────────────────
  social: {
    instagram: "https://instagram.com/gallofino.barber",
    facebook: "https://facebook.com/gallofinobarber",
    tiktok: "https://tiktok.com/@gallofino.barber",
    github: "https://github.com/Arcano3Ai/GalloFino",
  },

  // ─── SEO ───────────────────────────────────────────────────
  seo: {
    title: "Gallo Fino Barber | Barbería en Monterrey",
    description:
      "Gallo Fino Barber. Puro porte, puro estilo. Cortes, barba y grooming masculino premium en Monterrey, NL. Agenda tu cita por WhatsApp.",
    keywords:
      "barberia monterrey, cortes de cabello monterrey, barba monterrey, gallo fino barber, barbershop monterrey, fade monterrey",
    ogImage: "/assets/og-image.jpg",
  },
} as const;

// ─── TESTIMONIOS ─────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Rodrigo M.",
    text: "Buen ambiente, excelente corte y atención. Aquí sí saben dejarte fino. El fade quedó perfecto, exactamente como pedí.",
    rating: 5,
    service: "La Cresta",
  },
  {
    id: 2,
    name: "Carlos V.",
    text: "El Gallo de Oro es lo máximo. La experiencia completa, desde el corte hasta el styling. Salí sintiéndome diferente.",
    rating: 5,
    service: "Gallo de Oro",
  },
  {
    id: 3,
    name: "Diego A.",
    text: "Ya tengo mi barbero de confianza aquí. La barba me la dejan impecable siempre. Lugar con mucho estilo y buena música.",
    rating: 5,
    service: "Barba Fino",
  },
  {
    id: 4,
    name: "Marco R.",
    text: "Primera vez que fui y ya quedé como cliente regular. La atención, el ambiente y el resultado son de primer nivel.",
    rating: 5,
    service: "Gallo Bravo",
  },
  {
    id: 5,
    name: "Ernesto L.",
    text: "Vine de recomendación y no me arrepentí. La barbería tiene un vibe único, muy auténtico. El corte quedó finísimo.",
    rating: 5,
    service: "Corte Gallo",
  },
  {
    id: 6,
    name: "Alejandro T.",
    text: "Este lugar es diferente. No solo te cortan el cabello, te transforman. El Gallo Mayor es un artista con la máquina.",
    rating: 5,
    service: "La Cresta",
  },
];

// ─── GALERÍA PLACEHOLDER ─────────────────────────────────────
export const galleryItems = [
  { id: 1, category: "fade",           src: "/assets/gallery-fade-1.png",          alt: "High skin fade limpio" },
  { id: 2, category: "barba",          src: "/assets/gallery-barba-1.png",         alt: "Barba perfilada con navaja" },
  { id: 3, category: "clasicos",       src: "/assets/gallery-clasico-1.png",       alt: "Pompadour clásico norteño" },
  { id: 4, category: "fade",           src: "/assets/gallery-fade-2.png",          alt: "Taper fade neckline" },
  { id: 5, category: "designs",        src: "/assets/gallery-designs-1.png",       alt: "Diseño tribal en fade" },
  { id: 6, category: "barba",          src: "/assets/gallery-barba-2.png",         alt: "Straight razor beard shaping" },
  { id: 7, category: "transformaciones", src: "/assets/gallery-transformacion-1.png", alt: "Transformación antes y después" },
  { id: 8, category: "fade",           src: "/assets/gallery-fade-3.png",          alt: "Mid fade con textured crop" },
  { id: 9, category: "clasicos",       src: "/assets/barbershop-interior-real.jpg",  alt: "Gallo Fino Barber — Instalaciones & Ambiente" },
];

export type Service = (typeof businessConfig.services)[number];
export type Barber = (typeof businessConfig.barbers)[number];
