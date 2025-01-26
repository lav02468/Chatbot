/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  env: {
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY
  }
}

export default nextConfig;
