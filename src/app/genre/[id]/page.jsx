import React from 'react'
import PlayListCard from '@/components/PlayListCard';

const Home = async ({ params }) => {

  const res = await fetch("http://localhost:3000/api/auth/get-token", { method: 'POST', next: { revalidate: 1800 } });
  const data = await res.json();
  const token = data.access_token;

  const genreResponse = await fetch(
    `http://localhost:3000/api/spotify/search?query=${decodeURIComponent(params.id)}&type=playlist`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const genre = await genreResponse.json();
  
  return (
    <div className='px-2 text-white'>
      <div className='pt-24 p-10 bg-gradient-to-b from-lightDecorativeSubdued from-0% to-decorativeSubdued -m-8 mb-4 to-100%'>
      <h1 className='overflow-hidden font-extrabold leading-tight whitespace-normal text-8xl line-clamp-1 text-ellipsis '>{decodeURIComponent(params.id)}</h1>
      </div>
        
        
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]'>
        {
          genre?.playlists.items.filter(i => i !== null).map((p, index) => (
            <PlayListCard item={{ path: `/playlist/${p.id}`, image: p?.images[0]?.url ?? '', hidden: false, name: p.name, description: p.description }} key={index} />
          ))
        }
        </div>
    </div>
  )
}

export default Home;