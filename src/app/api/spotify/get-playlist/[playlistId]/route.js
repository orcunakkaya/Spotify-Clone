import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // Access token'ı almak için (örneğin, request headers'dan veya bir token alma API'sinden)
    const accessToken = request.headers.get('Authorization');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    // Dinamik parametre olarak listId'yi al
    const { playlistId } = params;
  
    if (!playlistId) {
      return NextResponse.json({ error: 'Playlist ID is missing' }, { status: 400 });
    }
    
    // Spotify API'sinden çalma listesi detaylarını çekme
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }
 
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist details' }, { status: 500 });
  }
}