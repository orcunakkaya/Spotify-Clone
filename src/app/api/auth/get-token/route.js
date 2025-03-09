import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
      { status: response.status }
    );
  }
 
  const data = await response.json();

  const cookieStore = cookies();
  cookieStore.set('spotify_api_token', data.access_token, {
    httpOnly: false,
    secure: true,
    maxAge: data.expires_in,
    path: "/",
  });

 
  return NextResponse.json({ access_token: data.access_token });
}
