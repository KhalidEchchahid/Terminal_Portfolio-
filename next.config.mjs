/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: "hNvYJxherm9EBhejiCijk9pWzWi3dvn4sQ/hxORTMho=",
  },

  images: {
    remotePatterns: [
      {
        hostname: "media.licdn.com",
      },
      {
        hostname: "www.google.com",
      },
    ],
  },
};

export default nextConfig;
