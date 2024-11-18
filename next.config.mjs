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
      {
        hostname: "samsungbrshop.vtexassets.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "i.dell.com",
      },
      {
        hostname: "media.canva.com",
      },
    ],
  },
}

export default nextConfig
