/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/ragab-mortgage-website" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/ragab-mortgage-website/" : "",
};

module.exports = nextConfig;
