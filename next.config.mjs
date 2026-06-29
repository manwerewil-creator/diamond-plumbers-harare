/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // REPLACE_WITH_REAL_IMAGE_HOST — e.g. your Supabase storage / CDN domain
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Keep the production bundle lean for slow (3G) connections.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
