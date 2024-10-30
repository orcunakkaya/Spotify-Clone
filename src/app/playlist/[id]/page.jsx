import React from 'react'
import getToken from '@/api/auth/getToken';
import getPlayList from '@/api/spotify/getPlayList';
import MusicCard from '@/components/MusicCard';

const Home = async ({ params }) => {
    const token = await getToken();
    const playList = await getPlayList(token, params.id);

  return (
    <div className='text-white'>
        {
            playList.tracks.items.map((music, index) => (
                <MusicCard key={index} music={music} order={index} />
            ))
        }
        <pre>{JSON.stringify(playList.tracks.items[1].track, null, 2)}</pre>
    </div>
  )
}

export default Home