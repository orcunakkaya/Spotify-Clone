"use client";

import React, { useState, useEffect, createContext, useContext, use } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const spotify_api_token = Cookies.get('spotify_api_token')
    const spotify_access_token = Cookies.get('spotify_access_token')

    try {
      if (spotify_api_token && spotify_access_token) {
        setAuth(spotify_access_token);
        setToken(spotify_api_token);
        getUserId(spotify_access_token);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("AuthContext error:", error);
    }
  }, [Cookies]);

  useEffect(() => {
    const checkLogin = () => {
      const spotify_api_token = Cookies.get('spotify_api_token')
      const spotify_access_token = Cookies.get('spotify_access_token')
      const spotify_user = Cookies.get('spotify_user')
      if (!spotify_api_token || !spotify_access_token || !spotify_user) {
        setIsLoggedIn(false);
        router.push("/login");
      }
    }
  
    const timer = setTimeout(() => {
      checkLogin();
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [Cookies]);

  useEffect(() => {
    fetch("/api/auth/get-token", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.access_token);
      });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      fetch("/api/auth/access-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: authCode,
          grant_type: "authorization_code",
          redirect_uri: process.env.NEXT_PUBLIC_BASE_URL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            setAuth(data.access_token);
            getUserId(data.access_token);
          }
        })
        .catch((error) => console.error("Access Token error:", error));
    }
  }, [router]);

  const getUserId = (access_token) => {
    fetch("/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    .then(res => {
      setUser(res.user);
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      if(authCode) {
        router.push("/");
      }
    });
  }

  const [deviceId, setDeviceId] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!auth) return;

    // Spotify Web Playback SDK'yı yükle
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(auth);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error("Initialization Error:", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Authentication Error:", message);
        router.push("/login");
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Account Error:", message);
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });

      setPlayer(player);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
      document.body.removeChild(script);
    };
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        deviceId,
        auth,
        player,
        setPlayer,
        user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
