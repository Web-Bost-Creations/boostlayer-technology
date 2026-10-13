import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/invoice/app/:tier",
        destination: "/account",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
