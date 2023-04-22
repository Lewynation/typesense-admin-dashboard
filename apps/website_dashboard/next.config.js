/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ui"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
