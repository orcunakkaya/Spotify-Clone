import React from 'react'
import PlayListCard from '@/components/PlayListCard';
import { notFound, redirect } from 'next/navigation';

const Home = async ({ params }) => {

  let genre = {};

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-token`, { method: 'POST', next: { revalidate: 1800 } });
    const data = await res.json();
    const token = data.access_token;

    const genreResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=${decodeURIComponent(params.id)}&type=playlist`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if(!res.ok || !genreResponse.ok) {
      if(res.status === 401 || genreResponse.status === 401) {
        throw new Error(`Authorization Error`);
      }
      throw new Error(res.error || genreResponse.error);
    }

    genre = await genreResponse.json();
    
  } catch (error) {
    if(error.message === "Authorization Error") {
      return redirect("/login");
    }else{
        notFound();
    }
  }
  
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