import React from 'react'

const Categories = (props) => {
    console.log(props)
  return (
    <div>Categories</div>
  )
}


 
export default Categories;

export async function getStaticProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    return { props: { repo } }
  }
   