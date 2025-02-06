"use client";

import { useEffect, useState } from "react";
import { getSpotifyLoginUrl } from "@/actions/auth";

const Login = () => {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    async function fetchLoginUrl() {
      const url = await getSpotifyLoginUrl();
      setLoginUrl(url);
    }
    fetchLoginUrl();
  }, []);

  return (
    <div className="absolute top-0 left-0 z-10 grid w-full h-full bg-boxBackgroundColor place-items-center">
      <a href={loginUrl}>
      <button className="px-8 py-2 font-semibold text-black rounded-full bg-green">
        Login with Spotify
      </button>
    </a>
    </div>
  );
};

export default Login;