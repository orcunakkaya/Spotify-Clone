import PlayListCard from "@/components/PlayListCard.jsx";
import Slider from "@/components/Slider.jsx";
import { cookies } from "next/headers";
import SettingsButton from "@/components/Settings/SettingsButton";
import { notFound, redirect } from "next/navigation";

export default async function Home() {
  let myOriginalPlaylistsData = {};
  let albumData = {};
  let theWeekendAlbums = {};
  let rock = {};
  let pop = {};

  const cookieStore = cookies();
  const user = cookieStore.get("spotify_user");

  if (!user) {
    return null;
  }

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

    const myOriginalPlaylists = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/my-playlist`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          spotify_user: `${user.value}`,
        },
      }
    );

    myOriginalPlaylistsData = await myOriginalPlaylists.json();

    const albumResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/albums`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    albumData = await albumResponse.json();

    const theWeekendAlbumResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=artist:The%20Weekend&type=album`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    theWeekendAlbums = await theWeekendAlbumResponse.json();

    const rockResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=Rock&type=playlist`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    rock = await rockResponse.json();

    const popResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=Pop&type=playlist`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    pop = await popResponse.json();

    if (!res.ok || !albumResponse.ok || !theWeekendAlbumResponse.ok || !rockResponse.ok || !popResponse.ok) {
      if (res.status === 401 || albumResponse.status === 401 || theWeekendAlbumResponse.status === 401 || rockResponse.status === 401 || popResponse.status === 401) {
        throw new Error(`Authorization Error`);
      }
      throw new Error(res.error || albumResponse.error || theWeekendAlbumResponse.error || rockResponse.error || popResponse.error);
    }
  } catch (error) {
    if(error.message === "Authorization Error") {
      return redirect("/login");
    }else{
      notFound();
    }
  }

  return (
    <div className="text-white">
      <div className="justify-between hidden py-3 pl-1 pr-4 max-lg:flex">
        <div>user name</div>
        <SettingsButton />
      </div>
      <Slider>
        {myOriginalPlaylistsData?.items?.map((p, index) => (
          <PlayListCard
            item={{
              path: `/collection/${p.id}`,
              image: p?.images ? p.images[0].url : null,
              hidden: true,
              name: p.name,
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
