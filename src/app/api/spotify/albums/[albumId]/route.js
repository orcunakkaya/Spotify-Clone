// src/app/api/albums/[albumId]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // Access token'ı almak için (örneğin, request headers'dan veya bir token alma API'sinden)
    const accessToken = request.headers.get('Authorization');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    // Dinamik parametre olarak albumId'yi al
    const { albumId } = params;

    if (!albumId) {
      return NextResponse.json({ error: 'Album ID is missing' }, { status: 400 });
    }

    // Spotify API'sinden belirli bir albümü çekme
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
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
    console.error('Error fetching album details:', error);
    return NextResponse.json({ error: 'Failed to fetch album details' }, { status: 500 });
  }
}


// useEffect(() => {
//     const fetchAlbumDetails = async () => {
//       try {
//         const accessToken = 'YOUR_ACCESS_TOKEN'; // Access token'ı buraya ekleyin
//         const response = await fetch(`/api/albums/${params.albumId}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch album details');
//         }

//         const data = await response.json();
//         setAlbum(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbumDetails();
//   }, [params.albumId]);