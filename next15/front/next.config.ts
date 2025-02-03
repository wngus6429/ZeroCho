/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async rewrites() {
    return [
      {
        source: "/upload/:slug", // 이런 파일 만나면, 아래와 같이 붙여라
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // Matched parameters can be used in the destination
      },
    ];
  },
};

module.exports = nextConfig;
