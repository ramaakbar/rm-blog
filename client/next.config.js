/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "loremflickr.com",
      "marketplace.canva.com",
      "minio.ramaakbar.xyz",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
