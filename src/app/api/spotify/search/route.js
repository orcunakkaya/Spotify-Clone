import { NextResponse } from 'next/server';

export async function GET(request) {
  try {

    const accessToken = request.headers.get('Authorization');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const type = url.searchParams.get('type');

    if (!query || !type) {
      return NextResponse.json(
        { error: 'Query and type parameters are required' },
        { status: 400 }
      );
    }
 
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=20`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch search results' },
        { status: 500 }
      );
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