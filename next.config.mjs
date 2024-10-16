/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "lasalle.edu.br",
      },
    ],
  },
}

export default nextConfig
