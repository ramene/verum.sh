const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // standalone output bundles the server + minimal node_modules into
  // .next/standalone, ideal for a small Docker image on Cloud Run.
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
