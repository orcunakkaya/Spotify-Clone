import { NextResponse } from "next/server";
export async function POST() {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const authString = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
 
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authString}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials", // Spotify API için gerekli parametre
      }),
      cache: 'no-store', // Bu, yanıtın cache'lenmemesini sağlar
    });

    // Yanıtı kontrol et
    if (!response.ok) {
        return NextResponse.json({ error: response.error_description }, { status: 400 });
      }
    
    const data = await response.json(); // JSON verisini al

    // Token'ı döndür
    return NextResponse.json({ access_token: data.access_token });

  }