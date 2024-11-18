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
                value: "'self' data: https:; default-src 'self' data: 'unsafe-inline' 'unsafe-eval'; img-src *",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
