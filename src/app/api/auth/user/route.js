import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
export async function GET() {
  
  const accessToken = headers().get("Authorization");

  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${accessToken}`,
    },
    cache: "no-store",
  });

  const cookieStore = cookies();

  if (!response.ok) {
    if(response.status === 401) {
      cookieStore.delete('spotify_access_token');
      cookieStore.delete('spotify_user');
      cookieStore.delete('spotify_api_token');
    }
    return NextResponse.json(
      { error: response.error_description },
      { status: response.status }
    );
  }
  
  const data = await response.json();

    cookieStore.set("spotify_user", JSON.stringify(data), {
        httpOnly: false,
        secure: true,
        maxAge: data.expires_in,
        path: "/",
    });

  return NextResponse.json({ user: data });
}
