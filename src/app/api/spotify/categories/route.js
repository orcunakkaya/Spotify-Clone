import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request) {
  const accessToken = headers().get('Authorization');
  try {

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch music categories' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data.categories.items);
  } catch (error) {
    console.error('Error fetching music categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}