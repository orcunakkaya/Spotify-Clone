import React from 'react'

const Lala = ({message}) => {
    console.log(message)
  return (
    <div>index</div>
  )
}

export default Lala

// export async function getServerSideProps() {
//     try {
      
//     //   const accessToken = await getToken();
    
//     //   const categoriesData = await getCategories(accessToken);
  
//     //   const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/getCategories?accessToken=${accessToken}`);
//     //   const categoriesData = await categoriesResponse.json();
        
//       return {
//         props: {
//         //   categories: categoriesData,
//         //   accessToken: accessToken,
//    message: `Next.js is awesome`
//         },
//       };

//     } catch (error) {
//       return {
//         props: {
//           categories: { items: [] },
//           message: `Next.js is awesome`
//         },
//       };
//     }
//   }