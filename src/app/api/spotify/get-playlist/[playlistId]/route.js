import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  const accessToken = headers().get('Authorization');
  try {

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
      if(response.status === 401) {
        const cookieStore = cookies();
        cookieStore.delete('spotify_access_token');
        cookieStore.delete('spotify_user');
        cookieStore.delete('spotify_api_token');
      }
      return NextResponse.json({ error: 'Failed to fetch playlist details' }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist details' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const accessToken = headers().get('Authorization');
  const { name, description } = await request.json();

  try {

    if (!accessToken) {
      return NextResponse.redirect('/login');
    }

    const { playlistId } = params;
  
    if (!playlistId) {
      return NextResponse.json({ error: 'Playlist ID is missing' }, { status: 400 });
    }
    
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        public: true
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      if(response.status === 401) {
        const cookieStore = cookies();
        cookieStore.delete('spotify_access_token');
        cookieStore.delete('spotify_user');
        cookieStore.delete('spotify_api_token');
      }
      return NextResponse.json({ error: response.statusText }, { status: response.status });
    }
    
    revalidatePath(`/collection/${playlistId}`);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching playlist details put:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist details' }, { status: 500 });
  }
}