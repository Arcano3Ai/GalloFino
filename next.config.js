/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── GitHub Pages ──────────────────────────────────────────
  // Descomenta para hacer deploy en GitHub Pages:
  // output: "export",
  // basePath: "/gallo-fino-barber",   // ← Tu nombre de repo
  // assetPrefix: "/gallo-fino-barber/",
  // trailingSlash: true,

  images: {
    unoptimized: true, // Necesario para static export
    qualities: [75, 95],
  },

  // Permite acceso desde 127.0.0.1 en desarrollo
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

module.exports = nextConfig;
