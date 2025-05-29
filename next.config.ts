import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{

  },

  images:{
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      port: '',

    }]
  }
};

export default nextConfig;
