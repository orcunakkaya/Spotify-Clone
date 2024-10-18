import React from 'react'
import getGenreList from "@/api/spotify/getGenreList.jsx";
import getToken from "@/api/auth/getToken.jsx";

const Home = async ({ params }) => {
  const token = await getToken();
  const categories = await getGenreList(token, params.id);

  return (
    <div className='text-white'>page</div>
  )
}

export default Home;