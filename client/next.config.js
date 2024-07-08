/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s3.us-east-005.backblazeb2.com"],
  },
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    return config;
  },
};

module.exports = nextConfig;
