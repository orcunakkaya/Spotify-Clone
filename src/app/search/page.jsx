import CategoryCard from "@/components/CategoryCard.jsx";
import { notFound, redirect } from "next/navigation";
import dynamic from 'next/dynamic'
const SearchBar = dynamic(() => import("@/components/SearchBar"), { ssr: false });

const Home = async () => {
  let categories = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-token`,
      {
        method: "POST",
        next: { revalidate: 1800 },
      }
    );
    const data = await res.json();
    const token = data.access_token;

    const categoriesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/categories`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if(!res.ok || !categoriesResponse.ok) {
      if(res.status === 401 || categoriesResponse.status === 401) {
        throw new Error(`Authorization Error`);
      }
      throw new Error(res.error || categoriesResponse.error);
    }

    categories = await categoriesResponse.json();

  } catch (error) {
    if(error.message === "Authorization Error") {
      return redirect("/login");
    }else{
        notFound();
    }
  }

  return (
    <div>
      <div className="mt-8 mb-4 text-2xl font-bold text-white">Search</div>
      <SearchBar />
      <div className="mt-4 mb-8 font-bold text-white">Browse all</div>
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
