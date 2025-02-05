const getGenreList = async (accessToken, categoryId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=50`, {
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

  export default getGenreList;