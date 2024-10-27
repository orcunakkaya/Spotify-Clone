const getPlayList = async (accessToken, listId) => {
  
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

  export default getPlayList;