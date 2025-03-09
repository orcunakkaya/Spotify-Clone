import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req, res) {
  const { code, grant_type, redirect_uri } = await req.json();

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
        grant_type, // Bu parametreyi unutma
        code, // Authorization kodunu gönder
        redirect_uri, // Spotify'da tanımladığın redirect URI
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: response.statusText }, { status: response.status });
  }

  const data = await response.json();
  const cookieStore = cookies(); 
  
  cookieStore.set('spotify_access_token', data.access_token, {
    httpOnly: false,
    secure: true,
    maxAge: data.expires_in,
    path: "/",
  });

  return NextResponse.json({ access_token: data.access_token, expires_in: data.expires_in });
}