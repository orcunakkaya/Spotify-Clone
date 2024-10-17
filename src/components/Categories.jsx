// 'use client'
// import { useEffect } from "react";
import getToken from '../api/auth/getToken.jsx';
import getCategories from '../api/spotify/getCategories.jsx';

const Categories = async () => {
    const token = await getToken();
    const categories = await getCategories(token);
    console.log(categories)
// console.log(data)
// useEffect(() => {
// (async () => {
//     let data = await getToken()
//     let category = await getCategories(data)
//     console.log(category)
// })()

// },[])

  return <div className='text-white'>Categories
    <div>
    <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  </div>;
};

export default Categories;