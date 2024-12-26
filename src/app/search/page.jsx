import getToken from "@/api/auth/getToken.jsx";
import getCategories from "@/api/spotify/getCategories.jsx";
import CategoryCard from "@/components/CategoryCard.jsx";

const Home = async () => {
    const token = await getToken();
  const categories = await getCategories(token);
  return (
    <div>
        <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'}}>
        {categories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home