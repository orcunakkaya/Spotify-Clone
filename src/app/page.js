import getToken from "../api/auth/getToken.jsx";
import getCategories from "../api/spotify/getCategories.jsx";
import CategoryCard from "@/components/CategoryCard.jsx";
import { getMyPlayList } from "@/api/spotify/getPlayList.jsx";
import { getAllPlaylists } from "@/actions/actions";
import PlayListCard from "@/components/PlayListCard.jsx";

export default async function Home() {
  const token = await getToken();
  const categories = await getCategories(token);
  // const myPlayList = await getMyPlayList(token);
  const playlists = await getAllPlaylists();
  
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,_196px)] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]">
      {
        playlists.map((p, index) => (
          <PlayListCard item={{ path: `/playlist/${p.id}`, image: p.playListImage, hidden: true, name: p.title }} key={index} />
        ))
      }
      </div>
      
      <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'}}>
        {categories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
        <pre className="text-white">{JSON.stringify(playlists, null, 2)}</pre>
      </div>
    </div>
  );
}