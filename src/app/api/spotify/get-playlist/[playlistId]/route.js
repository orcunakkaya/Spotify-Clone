import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const accessToken = request.headers.get('Authorization');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    const { playlistId } = params;
  
    if (!playlistId) {
      return NextResponse.json({ error: 'Playlist ID is missing' }, { status: 400 });
    }
    
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch playlist details' }, { status: 500 });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist details' }, { status: 500 });
  }
}