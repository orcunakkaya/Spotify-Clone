import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
    const accessToken = headers().get('Authorization');
    const { playlist_id, uri } = await request.json();

    try {
  
      if (!accessToken) {
        return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
      }
    
      if (!playlist_id || !uri) {
        return NextResponse.json({ error: 'bad request' }, { status: 400 });
      }
      
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify({
            uris: [uri],
            position: 0
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
      revalidatePath(`/collection/${playlist_id}`);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error creating playlist:', error);
      return NextResponse.json({ error: 'Failed to add track' }, { status: 500 });
    }
  }

export async function DELETE(request) {
    const accessToken = headers().get('Authorization');
    const { playlist_id, snapshot_id, uri } = await request.json();

    try {
  
      if (!accessToken) {
        return NextResponse.redirect('/login');
      }
    
      if (!playlist_id) {
        return NextResponse.json({ error: 'playlist_id' }, { status: 400 });
      }
      
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify({
            tracks: [{uri: uri}],
            snapshot_id: snapshot_id
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
      revalidatePath(`/collection/${playlist_id}`);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error creating playlist:', error);
      return NextResponse.json({ error: 'Failed to delete track' }, { status: 500 });
    }
  }