import '../styles/PodcastShow.css'
import  { useState } from 'react';
import Episode from './Episode';


const PodcastShow = ({ podcast, onClose, onPlay }) => {

  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
const { title, image, description, genres, seasons, updated, rating, reviewCount, episode } = podcast;
const [, setSelectedSeasonIndex] = useState(0);
const [showDescriptions, setShowDescriptions] = useState({});

if (!podcast) {
return null;
}

const toggleSeasonDescription = (seasonIndex) => {
  setShowDescriptions((prevShowDescriptions) => ({
    ...prevShowDescriptions,
    [seasonIndex]: !prevShowDescriptions[seasonIndex],
  }));
};

const handlePlayEpisode = (episode) => {
  setSelectedEpisodeId(episode.id); // Update the selected episode ID when a new episode is played
onPlay(episode);
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

        
      </div>
      {seasons.map((season, index) => (
        <div key={index} className="grid-table-row">

<button className='season-buttons' key={index} onClick={() => toggleSeasonDescription(index)}>
            Season {index + 1}
          </button>
          {showDescriptions[index] && (
                <div className="episode-list">
                  <ol key={index.id}>
                    {season.episodes.map((episode) => (
                      <li key={episode.id}>
                        <Episode
                          key={episode.id}
                          episode={episode}
                          onPlay={handlePlayEpisode}
                        />
                          <audio controls>
                            <source key={episode.id} src={episode.file} />
                            Your browser does not support the audio element.
                          </audio>

                      </li>
                    ))}
                  </ol>
                </div>
              )}
        </div>
      ))}
    </div>
    <p>
      Last Updated: {new Date(updated).toLocaleDateString()}
    </p>
    <p>Rating: {rating}</p>
    <p>Review Count: {reviewCount}</p>
    {/* Audio player to play the selected episode */}

  </div>
</div>
);
};

export default PodcastShow;