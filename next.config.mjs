/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '5mb',
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
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
              { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
              {
                key: "Content-Security-Policy",
                value: `
                  default-src 'self';
                  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sdk.scdn.co;
                  style-src 'self' 'unsafe-inline';
                  img-src 'self' data: https:;
                  font-src 'self' data:;
                  connect-src 'self' https://accounts.spotify.com https://api.spotify.com;
                  frame-src 'self' https://open.spotify.com https://sdk.scdn.co;
                `.replace(/\s{2,}/g, " ").trim(), // Fazla boşlukları kaldırır
              },
            ],
          },
        ];
      }
};

export default nextConfig;
