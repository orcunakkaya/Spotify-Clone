"use client";
import { useEffect, useState } from "react";
import { getSpotifyLoginUrl } from "@/actions/auth";

export default function LoginButton() {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    async function fetchLoginUrl() {
      const url = await getSpotifyLoginUrl();
      setLoginUrl(url);
    }
    fetchLoginUrl();
  }, []);

  return (
    <div>
        <a href={loginUrl}>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
            Spotify ile Giriş Yap
        </button>
        </a>
    </div>
  );
}