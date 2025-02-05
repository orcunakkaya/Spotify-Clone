import React from 'react'
import PlaylistPagesHeader from '@/components/PlaylistPagesHeader/PlaylistPagesHeader';
import Time from '../../../../public/assets/Time';
import MusicCard from '@/components/MusicCard';

const Home = async ({ params }) => {
    const res = await fetch("http://localhost:3000/api/auth/get-token", { method: 'POST', next: { revalidate: 1800 } });
    const data = await res.json();
    const token = data.access_token;

    const albumResponse = await fetch(`http://localhost:3000/api/spotify/albums/${params.id}`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    });
    const album = await albumResponse.json();
 
  return (
    <div className='text-white'>
         <PlaylistPagesHeader playlist={
            {
                title: album?.name ?? '',
                playListImage: album?.images[0]?.url ?? '',
                playListCount: album?.tracks?.items?.length ?? 0,
                hiddenOptions: true,
                uris: album?.tracks?.items?.map((music) => music.uri)
            }} 
            type={'Album'}
            name={album?.name}
            />
       
        <div className='grid items-center h-8 px-4 mb-4 border border-transparent text-subdued gap-x-4 grid-cols-custom-layout max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border-b-hoverBackgroundColor'>
            <span>#</span>
            <div className='text-sm'>Başlık</div>
            <div></div>
            <div className='text-sm max-xl:hidden'>Albüm</div>
            <div className='text-sm max-2xl:hidden'>Eklenme Tarihi</div>
            <div className='relative flex items-center'><div className='absolute left-2'><Time /></div></div>
        </div>
         
        {
            album?.tracks?.items?.map((music, index) => (
                <MusicCard key={index} music={{ 
                    image: album?.images[0]?.url ?? '',
                    name: music?.name, 
                    artistName: music?.artists.map((artist) => artist.name).join(", "),
                    albumName: album?.name,
                    duration_ms: music?.duration_ms,
                    release_date: album?.release_date,
                    uri: music.uri,
                    id: music?.id
                }} 
                order={index} />
            ))
        }
    </div>
  )
}

export default Home