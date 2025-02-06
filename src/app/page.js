import { getAllPlaylists } from "@/actions/actions";
import PlayListCard from "@/components/PlayListCard.jsx";
import Slider from "@/components/Slider.jsx";

//http://localhost:3000
export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-token`, {
    method: "POST",
    next: { revalidate: 1800 },
  });
  const data = await res.json();
  const token = data.access_token;

  const playlists = await getAllPlaylists();

  const albumResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/albums`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const albumData = await albumResponse.json();

  const theWeekendAlbumResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=artist:The%20Weekend&type=album`,
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const theWeekendAlbums = await theWeekendAlbumResponse.json();

  const rockResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=Rock&type=playlist`,
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const rock = await rockResponse.json();

  const popResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=Pop&type=playlist`,
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const pop = await popResponse.json();

  if(!res.ok || !albumResponse.ok || !theWeekendAlbumResponse.ok || !rockResponse.ok || !popResponse.ok) {
    throw new Error(`Hata: ${res.status} - ${res.statusText}`);
  }

  return (
    <div className="text-white">
      <Slider>
        {playlists?.map((p, index) => (
          <PlayListCard
            item={{
              path: `/collection/${p.id}`,
              image: p.playListImage,
              hidden: true,
              name: p.title,
            }}
            key={index}
          />
        ))}
      </Slider>

      <div className="text-2xl font-bold text-white">The Weekend</div>
      <Slider>
        {theWeekendAlbums?.albums?.items
          ?.filter((i) => i !== null)
          .map((a, index) => (
            <PlayListCard
              className="w-[196px]"
              item={{
                path: `/album/${a.id}`,
                image: a?.images[0]?.url ?? "",
                hidden: true,
                description: a.artists.map((i) => i.name).join(", "),
                name: a.name,
              }}
              key={index}
            />
          ))}
      </Slider>
      <div className="text-2xl font-bold text-white">Popüler Albümler</div>
      <Slider>
        {albumData?.albums?.items?.map((a, index) => (
          <PlayListCard
            item={{
              path: `/album/${a.id}`,
              image: a?.images[0]?.url ?? "",
              hidden: true,
              description: a.artists.map((i) => i.name).join(", "),
              name: a.name,
            }}
            key={index}
          />
        ))}
      </Slider>

      <div className="text-2xl font-bold text-white">Rock</div>
      <Slider>
        {rock?.playlists?.items
          ?.filter((i) => i !== null)
          .map((p, index) => (
            <PlayListCard
              item={{
                path: `/playlist/${p.id}`,
                image: p?.images[0]?.url ?? "",
                hidden: true,
                name: p.name,
              }}
              key={index}
            />
          ))}
      </Slider>

      <div className="text-2xl font-bold text-white">Pop</div>
      <Slider>
        {pop?.playlists?.items
          ?.filter((i) => i !== null)
          .map((p, index) => (
            <PlayListCard
              item={{
                path: `/playlist/${p.id}`,
                image: p?.images[0]?.url ?? "",
                hidden: true,
                name: p.name,
              }}
              key={index}
            />
          ))}
      </Slider>
    </div>
  );
}
