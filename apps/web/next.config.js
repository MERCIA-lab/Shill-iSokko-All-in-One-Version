/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@imeek/ui", "@imeek/types"],
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] }
};

module.exports = nextConfig;
