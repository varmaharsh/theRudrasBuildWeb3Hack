/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.google.com",
      "images.unsplash.com",
      "images-workbench.99static.com",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
