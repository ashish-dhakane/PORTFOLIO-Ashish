/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Set to true if deploying to static hosting (GitHub Pages, Netlify, etc.)
    // unoptimized: true,
  },
};

export default nextConfig;
