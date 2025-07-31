/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  i18n: {
    locales: ["en", "sr", "de"], // Dodaj svoje jezike
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: ["localhost", "your-wordpress-domain.com"],
  },
};

module.exports = nextConfig;
