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
    <div className="absolute w-full h-full top-0 left-0 z-10 bg-boxBackgroundColor grid place-items-center">
      <a href={loginUrl}>
      <button className="bg-green text-black px-8 py-2 rounded-full font-semibold">
        Spotify ile Giriş Yap
      </button>
    </a>
    </div>
  );
};

export default Login;


// "use client";

// import { useAuthContext } from "@/context/AuthContext";
// import { useEffect, useState } from "react";
// import { getSpotifyLoginUrl } from "@/actions/auth";

// const Login = () => {
//     const [accessToken, setAccessToken] = useState(null);

//     useEffect(() => {
//       const hash = new URLSearchParams(window.location.hash.substring(1));
//       const token = hash.get("access_token");
  
//       if (token) {
//         setAccessToken(token);
//         window.history.replaceState({}, document.title, "/");
//       }
//     }, []);
  
//     const loginWithSpotify = () => {
//       const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
//       const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
//       const scope = encodeURIComponent("streaming user-read-playback-state user-modify-playback-state");
//       const state = Math.random().toString(36).substring(7);
//       const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${"http://localhost:3000"}&scope=${encodeURIComponent(scope)}`;
      
//       window.location.href = authUrl;
//     };
  

//   return (
//     <div className="absolute w-full h-full top-0 left-0 z-10 bg-boxBackgroundColor">
   
//       <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={loginWithSpotify}>
//         Spotify ile Giriş Yap
//       </button>
    
//     </div>
//   );
// };

// export default Login;