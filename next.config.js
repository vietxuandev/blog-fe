/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'strapi-iurp.onrender.com'],
  },
};

module.exports = nextConfig;
