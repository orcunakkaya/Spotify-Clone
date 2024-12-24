import React from 'react'
import { getAlbum } from "@/api/spotify/getAlbums.jsx";
import getToken from '@/api/auth/getToken';
import PlaylistPagesHeader from '@/components/PlaylistPagesHeader';
import Time from '../../../../public/assets/Time';
import MusicCard from '@/components/MusicCard';

const Home = async ({ params }) => {
    const token = await getToken();
    const album = await getAlbum(token, params.id);
 
  return (
    <div className='text-white'>
         <PlaylistPagesHeader playlist={
            {
                title: album?.name ?? '',
                playListImage: album?.images[0]?.url ?? '',
                playListCount: album?.tracks?.items?.length ?? 0,
                hiddenOptions: true
            }} 
            type={'Album'}
            name={album?.name}
            />
       
        <div className='text-subdued px-4 gap-x-4 grid grid-cols-custom-layout h-8 items-center max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border border-transparent border-b-hoverBackgroundColor mb-4'>
            <span>#</span>
            <div className='text-sm'>Başlık</div>
            <div></div>
            <div className='text-sm max-xl:hidden'>Albüm</div>
            <div className='max-2xl:hidden text-sm'>Eklenme Tarihi</div>
            <div className='flex relative items-center'><div className='absolute left-2'><Time /></div></div>
        </div>
         
        {
            album?.tracks?.items?.map((music, index) => (
                <MusicCard key={index} music={{ 
                    image: album?.images[0]?.url ?? '',
                    name: music?.name, 
                    artistName: music?.artists.map((artist) => artist.name).join(", "),
                    albumName: album?.name,
                    duration_ms: music?.duration_ms,
                    release_date: album?.release_date
                }} 
                order={index} />
            ))
        }
        <pre className="text-white">{JSON.stringify(album, null, 2)}</pre>

    </div>
  )
}

export default Home