import React from 'react'
import getGenreList from "@/api/spotify/getGenreList.jsx";
import getToken from "@/api/auth/getToken.jsx";
import PlayListCard from '@/components/PlayListCard';
import { getAllAlbums, getSearchLists } from "@/api/spotify/getAlbums.jsx";

const Home = async ({ params }) => {
  const token = await getToken();
  // const genre = await getGenreList(token, params.id);

  const genreResponse = await getSearchLists(token, params.id, 'playlist');
  const genre = genreResponse.playlists.items.filter(i => i !== null);
  
  return (
    <div className='text-white px-2'>
        <h1 className='text-8xl whitespace-nowrap font-extrabold pt-24 p-10 bg-gradient-to-b from-lightDecorativeSubdued from-0% to-decorativeSubdued -m-8 mb-4 to-100%'>{params.id}</h1>
        
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]'>
        {
          genre?.map((p, index) => (
            <PlayListCard item={{ path: `/playlist/${p.id}`, image: p?.images[0]?.url ?? '', hidden: false, name: p.name, description: p.description }} key={index} />
          ))
        }
        </div>
    </div>
  )
}

export default Home;