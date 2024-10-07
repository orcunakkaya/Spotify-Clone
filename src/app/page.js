import getToken from "../api/auth/getToken.jsx";
import getCategories from "../api/spotify/getCategories.jsx";
import CategoryCard from "@/components/CategoryCard.jsx";

export default async function Home() {
  const token = await getToken();
  const categories = await getCategories(token);
  return (
    <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'}}>
      {categories.map((category, index) => (
        <CategoryCard category={category} key={index} />
      ))}
       {categories.map((category, index) => (
        <CategoryCard category={category} key={index} />
      ))}
    </div>
  );
}


{/* <div className="flex gap-6 flex-wrap">
{categories.map((category, index) => (
  <CategoryCard category={category} key={index} />
))}
 {categories.map((category, index) => (
  <CategoryCard category={category} key={index} />
))}
</div> */}