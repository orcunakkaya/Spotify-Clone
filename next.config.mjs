/** @type {import('next').NextConfig} */
const nextConfig = {
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
        //   {
        //     protocol: 'https',
        //     hostname: '**charts-images.scdn.co**',
        //   },
        ],
      },
};

export default nextConfig;
