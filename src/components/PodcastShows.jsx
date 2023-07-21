import '../styles/PodcastShow.css'
import  { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PodcastShow = ({ podcast, onClose, onPlay }) => {
  if (!podcast) {
    return null;
  }

  const { title, image, description, genres, seasons, updated, rating, reviewCount } = podcast;
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handlePlayEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="podcast-overlay">
      <div className="podcast-details">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2 className="podcast-title">{title}</h2>
        <img src={image} alt={title} className="podcast-img" />
        <p className="podcast-description">{description}</p>
        {genres && genres.length > 0 ? (
          <ul className="list-disc list-inside mb-4">
            Genres:
            {genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No genres available.</Typography>
        )}

        <div className="grid-table">
          <div className="grid-table-header">
            <Typography variant="body1">Seasons</Typography>
            
          </div>
          {seasons.map((season, index) => (
            <div key={index} className="grid-table-row">
              <Typography variant="body1">Season {index + 1}</Typography>
              <Typography variant="body1">Episodes</Typography>
              <ul>
                {season.episodes.map((episode) => (
                  <li key={episode.id}>
                    <span>{episode.title}</span>
                    <Button onClick={() => handlePlayEpisode(episode)}>Play</Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Typography variant="body1">
          Last Updated: {new Date(updated).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">Rating: {rating}</Typography>
        <Typography variant="body1">Review Count: {reviewCount}</Typography>

        {/* Audio player to play the selected episode */}
        {selectedEpisode && (
          <div className="audio-player">
            <Typography variant="h3">Now Playing: {selectedEpisode.title}</Typography>
            {/* Add your audio player component here */}
            <audio controls>
              <source src={selectedEpisode.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastShow;
