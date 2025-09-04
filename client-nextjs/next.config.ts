import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Fast Refresh for better HMR
  reactStrictMode: true,
  
  // Optimize for development
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      // Period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 25 * 1000,
      // Number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 2,
    },
  }),

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5040/api/:path*',
      },
    ];
  },
};

export default nextConfig;
