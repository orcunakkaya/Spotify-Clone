import getToken from '../api/auth/getToken.jsx';
import getCategories from '../api/spotify/getCategories.jsx';

export default async function Home() {
  const token = await getToken();
  const categories = await getCategories(token);

  return (
    <div>
        
    </div>
  );
}