import getToken from "../api/auth/getToken.jsx";
import getCategories from "../api/spotify/getCategories.jsx";
import CategoryCard from "@/components/CategoryCard.jsx";

export default async function Home() {
  const token = await getToken();
  const categories = await getCategories(token);
  return (
    <div className="grid grid-cols-5">
      {categories.map((category, index) => (
        <CategoryCard category={category} index={index} />
      ))}
    </div>
  );
}
