const getCategories = async (accessToken) => {
  
    try {
      const response = await fetch('https://api.spotify.com/v1/browse/categories', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      return data.categories.items;

    } catch (error) {
        console.error('Error fetching music categories:', error);
        throw error;
    }
  }

  export default getCategories;