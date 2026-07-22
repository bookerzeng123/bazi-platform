/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' because Railway runs in Node server mode
  // and expects the .next directory + `next start` command
  images: { unoptimized: true },
}

module.exports = nextConfig
