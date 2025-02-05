// import getToken from "@/app/api/auth/getToken.js";
// import getCategories from "@/api/spotify/getCategories.jsx";
import CategoryCard from "@/components/CategoryCard.jsx";
import SearchBar from "@/components/SearchBar";
import BackArrow from "../../../public/assets/BackArrow";
import Link from "next/link";

const Home = async () => {
  const res = await fetch("http://localhost:3000/api/auth/get-token", {
    method: "POST",
    next: { revalidate: 1800 },
  });
  const data = await res.json();
  const token = data.access_token;

  const categoriesResponse = await fetch(
    "http://localhost:3000/api/spotify/categories",
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const categories = await categoriesResponse.json();

  return (
    <div>
      <div className="mt-8 mb-4 text-2xl font-bold text-white">Ara</div>

      <SearchBar />

      <div className="mt-4 mb-8 font-bold text-white">Hepsine goz at</div>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
      >
        {categories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
