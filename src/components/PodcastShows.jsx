import { build } from 'vite';
import '../styles/PodcastShow.css'
import  { useState } from 'react';



const PodcastShow = ({ podcast, onClose, onPlay }) => {

const [selectedEpisode, setSelectedEpisode] = useState(null);
const { title, image, description, genres, seasons, updated, rating, reviewCount, episode } = podcast;

if (!podcast) {
return null;
}


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
      <p>No genres available.</p>
    )}

    <div className="grid-table">
      <div className="grid-table-header">
        <p>Seasons</p>
        
      </div>
      {seasons.map((season, index) => (
        <div key={index} className="grid-table-row">
          <span >Season {index + 1}</span>
              <p className="description">{season.description}</p>
          <p>Episodes</p>
          <ul>
            {season.episodes.map((episode) => (
              <li key={episode.id}>
                <span name="episode">{episode.title}</span>

            

                <button onClick={() => handlePlayEpisode(episode)}>Play</button>
              <p className="description">{episode.description}</p>


              </li>
              
            ))}
            
          </ul>
          
        </div>

      ))}

    </div>

    <p>
      Last Updated: {new Date(updated).toLocaleDateString()}
    </p>
    <p>Rating: {rating}</p>
    <p>Review Count: {reviewCount}</p>

    {/* Audio player to play the selected episode */}
    {selectedEpisode && (
      <div className="audio-player">
        <span> Playing: {selectedEpisode.title}</span>
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
