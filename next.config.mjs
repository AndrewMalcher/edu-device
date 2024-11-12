/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "www.unilasalle.edu.br",
      },
      {
        hostname: "lasalle.edu.br",
      },
      {
        hostname: "cdn.dooca.store",
      },
      {
        hostname: "images.tcdn.com.br",
      },
    ],
  },
}

export default nextConfig
