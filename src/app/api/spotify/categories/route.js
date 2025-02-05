import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Access token'ı almak için (örneğin, request headers'dan veya bir token alma API'sinden)
    const accessToken = request.headers.get('Authorization');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    // Spotify API'sinden kategorileri çekme
    const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=50', {
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
    return NextResponse.json(data.categories.items);
  } catch (error) {
    console.error('Error fetching music categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}