
import Episode from './Episode';

const FavoriteEpisodes = ({ favoriteEpisodes, onToggleFavorite }) => {
  
  return (
    <div>
      <h2>Favorites List</h2>
      {Object.entries(favoriteEpisodes).map(([episode]) => (
        <div key={episode.title}>
          <Episode
            episode={{
              title: episode.title,
              description: episode.description,
              releaseDate: episode.episode?.title,
              file: episode.episode?.file,
            }}
            onToggleFavorite={() => onToggleFavorite(episode.title)} // Call the parent's onToggleFavorite with the episodeId
          />
        </div>
      ))}
    </div>
  );
};


export default FavoriteEpisodes;
