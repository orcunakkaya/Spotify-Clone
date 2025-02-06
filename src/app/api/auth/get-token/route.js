import { NextResponse } from "next/server";
export async function POST() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: response.error_description },
      { status: 400 }
    );
  }

  const data = await response.json();

  return NextResponse.json({ access_token: data.access_token });
}
