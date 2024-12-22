export const getAllAlbums = async (accessToken) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching genre categories:', error);
        throw error;
    }
  }

export const getAlbum = async (accessToken, albumId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching genre categories:', error);
        throw error;
    }
  }
  