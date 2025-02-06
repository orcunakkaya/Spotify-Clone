"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [auth, setAuth] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("spotify_access_token");
    if (localToken) {
      setIsLoggedIn(true);
      setAuth(localToken);
    }else {
      router.push("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("spotify_access_token");
    setIsLoggedIn(false);
  };

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
      // Token almak için backend'e gönder
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
            localStorage.setItem("spotify_access_token", data.access_token);
            localStorage.setItem("expires_in", data.expires_in);
            setAuth(data.access_token);
            router.push("/"); // Token'ı aldıktan sonra URL temizle
          }
        })
        .catch((error) => console.error("Access Token error:", error));
    }
  }, [router]);

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
        localStorage.removeItem("spotify_access_token");
        localStorage.removeItem("expires_in");
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
        logout,
        deviceId,
        auth,
        player,
        setPlayer,
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
