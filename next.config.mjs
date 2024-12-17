/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb',
      },
    },
    env: {
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      },
      images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**scdn**',
          },
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
      async headers() {
        return [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Content-Security-Policy",
                value: `
                  default-src 'self';
                  script-src 'self' 'unsafe-inline' 'unsafe-eval';
                  style-src 'self' 'unsafe-inline';
                  img-src 'self' data: https:;
                  font-src 'self' data:;
                  connect-src 'self';
                  frame-src 'self';
                `.replace(/\s{2,}/g, " ").trim(), // Fazla boşlukları kaldırır
              },
            ],
          },
        ];
      }
};

export default nextConfig;
