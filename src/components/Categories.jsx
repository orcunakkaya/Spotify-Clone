'use client'
import { useEffect } from "react";
import getToken from '../api/auth/getToken.jsx';
import getCategories from '../api/spotify/getCategories.jsx';

const Categories = () => {

useEffect(() => {
(async () => {
    let data = await getToken()
    let category = await getCategories(data)
    console.log(category)
})()

},[])
  return <div>Categories</div>;
};

export default Categories;


// export async function getServerSideProps() {
//     try {
      
//       const accessToken = getToken();
  
//       const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/getCategories?accessToken=${accessToken}`);
//       const categoriesData = await categoriesResponse.json();
//         console.log(categoriesData)
//       return {
//         props: {
//           categories: categoriesData.categories,
//         },
//       };
//     } catch (error) {
//       return {
//         props: {
//           categories: { items: [] },
//         },
//       };
//     }
//   }