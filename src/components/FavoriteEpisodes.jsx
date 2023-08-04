
import Episode from './Episode';

const FavoriteEpisodes = ({ favoriteEpisodes, onToggleFavorite }) => {
  return (
    <div>
      <h2>Favorites List</h2>
      {Object.entries(favoriteEpisodes).map(([episodeId, episode]) => (
        <div key={episodeId}>
          <Episode
            episode={episode}
            onToggleFavorite={() => onToggleFavorite(episodeId)} // Call the parent's onToggleFavorite with the episodeId
          />
        </div>
      ))}
    </div>
  );
};


export default FavoriteEpisodes;
