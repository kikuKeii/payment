/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath: "/payment",
  output: "export",
};

module.exports = nextConfig;
