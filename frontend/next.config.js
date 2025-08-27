/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#remove-react-properties
    reactRemoveProperties: true,
  },
  // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  // > Next.js can automatically create a standalone folder that copies only the necessary files for a production deployment including select files in node_modules.
  output: 'standalone',
  publicRuntimeConfig: {
    PACKAGE_NAME: process.env.npm_package_name || 'frontend+undef',
    PACKAGE_VERSION: process.env.npm_package_version || '0.0.0+undef',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
