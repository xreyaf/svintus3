/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
