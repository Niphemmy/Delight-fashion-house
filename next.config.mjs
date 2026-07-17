/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["@sanity/image-url"],
  },
  async redirects() {
    return [
      // Short brandable link for WhatsApp / Instagram bios
      { source: "/summer", destination: "/young-designers", permanent: false },
      { source: "/academy", destination: "/young-designers", permanent: false },
      { source: "/kids", destination: "/young-designers", permanent: false },
    ];
  },
};

export default nextConfig;
