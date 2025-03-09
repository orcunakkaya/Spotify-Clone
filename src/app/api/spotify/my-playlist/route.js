import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const accessToken = headers().get('Authorization');
  const user = JSON.parse(headers().get('spotify_user')); 

  try {

    if (!accessToken) {
      return NextResponse.redirect('/login');
    }

    const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
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
      return NextResponse.json({ error: response.statusText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch my playlists' }, { status: 500 });
  }
}

export async function POST(request) {
  const accessToken = headers().get('Authorization');
  const { user_id } = await request.json();

  try {

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }
  
    if (!user_id) {
      return NextResponse.json({ error: 'user_id' }, { status: 401 });
    }
    
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store',
      body: JSON.stringify({
        name: 'New Playlist',
        description: "New playlist description",
        public: true
      })
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
    
    const data = await response.json();
    revalidatePath(`/`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json({ error: 'Failed to create playlist' }, { status: 500 });
  }
}