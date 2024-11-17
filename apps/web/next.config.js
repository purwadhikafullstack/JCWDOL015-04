/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'platform-lookaside.fbsbx.com', 'img.daisyui.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
