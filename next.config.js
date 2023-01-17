/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: true,
  images: {
    domains: ['i2-prod.mirror.co.uk', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
