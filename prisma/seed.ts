// import prisma from '@/lib/db'; // Prisma Client'ı içe aktar
import prisma from '../src/lib/db'; // Prisma Client'ı içe aktar

async function main() {
  const existingPlaylist = await prisma.playlist.findFirst({
    where: { title: 'Liked Songs' },
  });

  if (!existingPlaylist) {
    await prisma.playlist.create({
      data: {
        title: 'Liked Songs',
        playListImage: '/assets/liked-songs.png',
        songs: [],
        defaultList: true,
      },
    });
    console.log('🎵 "Liked Songs" playlisti başarıyla oluşturuldu!');
  } else {
    console.log('🎵 "Liked Songs" playlisti zaten mevcut.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // npx prisma db seed