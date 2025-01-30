/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
        port: '',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
