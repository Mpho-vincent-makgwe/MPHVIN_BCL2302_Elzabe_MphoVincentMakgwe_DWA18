import {useState, useEffect} from 'react'
import supabase from '../Services/Supabase'

const FavoriteEpisodes = ({ favoriteEpisodes }) => {

  const [syncedEpisodes, setSyncedEpisodes] = useState([]);

  
  useEffect(() => {
    // Function to sync favorite episodes with Supabase
    const syncFavoriteEpisodes = async () => {
      const { user } = supabase;
      if (user) {
        // Get the favorite episodes from Supabase Storage table
        const { data, error } = await supabase
          .from('favorite_episodes')
          .select('episode_title, added_datetime')
          .in('title', favoriteEpisodes);

        if (!error) {
          setSyncedEpisodes(data);
        }
      }
    };

    syncFavoriteEpisodes();
  }, [favoriteEpisodes]);

  return (
    <div>
      <h2>Favorite Episodes</h2>
      {favoriteEpisodes.map((episode) => (
        <div key={episode.title}>
            <ul>
                <li>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                <p>Release Date: {new Date(episode.updated).toLocaleDateString()}</p>
                </li>
            </ul>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default FavoriteEpisodes;
