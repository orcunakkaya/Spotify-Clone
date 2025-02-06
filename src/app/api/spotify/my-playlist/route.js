import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const accessToken = request.headers.get('Authorization');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch my playlists' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch my playlists' }, { status: 500 });
  }
}