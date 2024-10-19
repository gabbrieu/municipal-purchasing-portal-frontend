/** @type {import('next').NextConfig} */
const nextConfig = {
  //   rewrites: async () => [
  //     { source: '/api/:path*', destination: 'http://localhost:3000/api/:path*' },
  //   ],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
