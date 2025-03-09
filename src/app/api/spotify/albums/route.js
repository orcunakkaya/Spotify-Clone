import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
export async function GET(request) {
  const accessToken = headers().get('Authorization');
  try {

    if (!accessToken) {
      return NextResponse.redirect('/login');
    }

    const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
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
    console.error('Error fetching new releases:', error);
    return NextResponse.json({ error: 'Failed to fetch new releases' }, { status: 500 });
  }
}