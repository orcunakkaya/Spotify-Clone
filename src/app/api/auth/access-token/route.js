import { NextResponse } from "next/server";

export async function POST(req) {
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

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ error: data.error_description }, { status: 400 });
  }

  return NextResponse.json({ access_token: data.access_token, expires_in: data.expires_in });
}