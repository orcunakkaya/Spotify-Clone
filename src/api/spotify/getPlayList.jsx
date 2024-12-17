  export const getPlayList = async (accessToken, listId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${listId}`, {
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

  export const getMyPlayList = async (accessToken) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching my playlists:', error);
        throw error;
    }
  }