import React from 'react'
import getToken from '@/api/auth/getToken';
import getPlayList from '@/api/spotify/getPlayList';
import MusicCard from '@/components/MusicCard';
import Time from '../../../../public/assets/Time';

const Home = async ({ params }) => {
    const token = await getToken();
    const playList = await getPlayList(token, params.id);
  return (
    <div className='text-white'>
        <div className='text-subdued px-4 gap-x-4 grid grid-cols-custom-layout h-8 items-center max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border border-transparent border-b-hoverBackgroundColor mb-4'>
            <span>#</span>
            <div className='text-sm'>Başlık</div>
            <div></div>
            <div className='text-sm max-xl:hidden'>Albüm</div>
            <div className='max-2xl:hidden text-sm'>Eklenme Tarihi</div>
            <div className='flex relative items-center'><div className='absolute left-2'><Time /></div></div>
        </div>
        {
            playList.tracks.items.map((music, index) => (
                <MusicCard key={index} music={music} order={index} />
            ))
        }
        <pre>{JSON.stringify(playList.tracks.items[1], null, 2)}</pre>
    </div>
  )
}

export default Home