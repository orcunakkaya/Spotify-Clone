export const getPreviewMusic = async (accessToken, id) => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: 'no-store'
        });
        const data = await response.json();
        console.log('data', data);
        return data;
      } catch (error) {
          console.error('Error fetching my playlists:', error);
          throw error;
      }
    }