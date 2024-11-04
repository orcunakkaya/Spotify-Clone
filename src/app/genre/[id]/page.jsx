import React from 'react'
import getGenreList from "@/api/spotify/getGenreList.jsx";
import getToken from "@/api/auth/getToken.jsx";
import PlayListCard from '@/components/PlayListCard';

const Home = async ({ params }) => {
  const token = await getToken();
  const genre = await getGenreList(token, params.id);
  return (
    <div className='text-white px-2'>
        <h1 className='text-8xl whitespace-nowrap font-extrabold pt-24'>{genre.message}</h1>
        
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]'>
        {
          genre?.playlists.items.map((p, index) => (
            <PlayListCard item={p} key={index} />
          ))
        }
        </div>
        <pre>{JSON.stringify(genre, null, 2)}</pre>
    </div>
  )
}

export default Home;