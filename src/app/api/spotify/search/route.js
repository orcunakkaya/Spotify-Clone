import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

export async function GET(request) {
  const accessToken = headers().get('Authorization');
  try {

    if (!accessToken) {
      return NextResponse.redirect('/login');
    }

    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const type = url.searchParams.get('type');
    const limit = url.searchParams.get('limit') || 20;

    if (!query || !type) {
      return NextResponse.json(
        { error: 'Query and type parameters are required' },
        { status: 400 }
      );
    }
 
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

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
    console.error('Error fetching search results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}