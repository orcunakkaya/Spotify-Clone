import React from 'react'
import getToken from '@/api/auth/getToken';
import getPlayList from '@/api/spotify/getPlayList';

const Home = async ({ params }) => {
    const token = await getToken();
    const playList = await getPlayList(token, params.id);

  return (
    <div className='text-white'>
        <pre>{JSON.stringify(playList, null, 2)}</pre>
    </div>
  )
}

export default Home