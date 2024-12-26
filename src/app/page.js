import getToken from "../api/auth/getToken.jsx";
import getCategories from "../api/spotify/getCategories.jsx";
import CategoryCard from "@/components/CategoryCard.jsx";
import { getMyPlayList } from "@/api/spotify/getPlayList.jsx";
import { getAllPlaylists } from "@/actions/actions";
import PlayListCard from "@/components/PlayListCard.jsx";
import { getAllAlbums, getSearchLists } from "@/api/spotify/getAlbums.jsx";

export default async function Home() {
  const token = await getToken();
  const categories = await getCategories(token);
  // const myPlayList = await getMyPlayList(token);
  const playlists = await getAllPlaylists();
  const albumData = await getAllAlbums(token);
  const theWeekendAlbumResponse = await getSearchLists(token, 'artist:The%20Weekend', 'album', );
  const theWeekendAlbums = theWeekendAlbumResponse.albums.items.filter(i => i !== null);

  const rockResponse = await getSearchLists(token, 'Rock', 'playlist');
  const rock = rockResponse.playlists.items.filter(i => i !== null);

  const popResponse = await getSearchLists(token, 'Pop', 'playlist');
  const pop = popResponse.playlists.items.filter(i => i !== null);

  return (
    <div className="text-white">
      <div className="grid grid-cols-[repeat(auto-fill,_196px)] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]">
      {
        playlists.map((p, index) => (
          <PlayListCard item={{ path: `/collection/${p.id}`, image: p.playListImage, hidden: true, name: p.title }} key={index} />
        ))
      }
      </div>

      <div className="text-2xl text-white font-bold">The Weekend</div>
      <div className="grid grid-cols-[repeat(auto-fill,_196px)] grid-rows-[repeat(auto-fill,_minmax(0,_1fr)]">
        {
          theWeekendAlbums.map((a, index) => (
            <PlayListCard item={{ path: `/album/${a.id}`, image: a?.images[0]?.url ?? '', hidden: true, description: a.artists.map(i => i.name).join(', '), name: a.name }} key={index} />
          ))
        }
      </div>

      <div className="text-2xl text-white font-bold">Popüler Albümler</div>
      <div className="grid grid-cols-[repeat(auto-fill,_196px)] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]">
      {
        albumData?.albums?.items?.map((a, index) => (
          <PlayListCard item={{ path: `/album/${a.id}`, image: a?.images[0]?.url ?? '', hidden: true, description: a.artists.map(i => i.name).join(', '), name: a.name }} key={index} />
        ))
      }
      </div>

      <div className="text-2xl text-white font-bold">Rock</div>
      <div className="grid grid-cols-[repeat(auto-fill,_196px)] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]">
      {
        rock?.map((p, index) => (
          <PlayListCard item={{ path: `/playlist/${p.id}`, image: p?.images[0]?.url ?? '', hidden: true, name: p.name }} key={index} />
        ))
      }
      </div>

      <div className="text-2xl text-white font-bold">Pop</div>
      <div className="grid grid-cols-[repeat(auto-fill,_196px)] grid-rows-[repeat(auto-fill,_minmax(0,_1fr))]">
      {
        pop?.map((p, index) => (
          <PlayListCard item={{ path: `/playlist/${p.id}`, image: p?.images[0]?.url ?? '', hidden: true, name: p.name }} key={index} />
        ))
      }
      </div>
      
      <div className="grid gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'}}>
        {categories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </div>
  );
}