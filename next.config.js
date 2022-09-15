/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      name: true
    },
    runtimeChunk: true
  },
};

module.exports = nextConfig;
