import '../styles/PodcastShow.css'
import  { useState, useEffect, useCallback } from 'react';
import Episode from './Episode';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import FavoriteEpisodes from './FavoriteEpisodes';
import { useLocalStorageState } from '../Services/Storage';

/**
 * PodcastShow Component displays details of a selected podcast, including episodes, descriptions, and favorites.
 * @param {Object} podcast - The selected podcast data to be displayed.
 * @param {Function} onClose - Callback function to close the podcast details view.
 * @returns {JSX.Element} The JSX element representing the PodcastShow component.
 */
const PodcastShow = ({ podcast, onClose, onPlay }) => {


const { title, image, description, genres, seasons, updated, episode } = podcast;
const [showDescriptions, setShowDescriptions] = useState({});
const [favoriteEpisodes, setFavoriteEpisodes] = useLocalStorageState('favoriteEpisodes', {});
const [filteredFavoriteEpisodes, setFilteredFavoriteEpisodes] = useState({});

useEffect(() => {
  if (!podcast) return;

  // Filter episodes by show/podcast id and store them in favoriteEpisodesData
  const favoriteEpisodesData = {};
  seasons.forEach((season) => {
    season.episodes.forEach((episode) => {
      if (favoriteEpisodes[episode.title]?.isFavorite) {
        if (!favoriteEpisodesData[podcast.id]) {
          favoriteEpisodesData[podcast.id] = {};
        }
        if (!favoriteEpisodesData[podcast.id][season.id]) {
          favoriteEpisodesData[podcast.id][season.id] = [];
        }
        favoriteEpisodesData[podcast.id][season.id].push(episode);
      }
    });
  });

  // Update the state with the filtered episodes
  setFilteredFavoriteEpisodes(favoriteEpisodesData);
}, [podcast]);

// Update the favoriteEpisodes state after the useEffect has run and the filteredFavoriteEpisodes is updated
useEffect(() => {
  setFavoriteEpisodes((prevFavoriteEpisodes) => ({
    ...prevFavoriteEpisodes,
    ...filteredFavoriteEpisodes,
  }));
}, [filteredFavoriteEpisodes, setFavoriteEpisodes]);



/**
   * Get the current date and time in a readable format.
   * @returns {string} The current date and time in a human-readable format.
   */

const getCurrentDateTime = () => {
  return new Date().toLocaleString(); // Get the current date and time in a readable format
};
 /**
   * Handle toggling favorite status of an episode.
   * @param {string} episodeId - The ID of the episode to toggle favorite status.
   */
const handleToggleFavourite = useCallback(
  (episodeId) => {
    const currentDateTime = getCurrentDateTime();

    setFavoriteEpisodes((prevFavoriteEpisodes) => {
      const updatedFavorites = { ...prevFavoriteEpisodes };
      updatedFavorites[episodeId] = {
        isFavorite: !prevFavoriteEpisodes[episodeId]?.isFavorite,
        favoriteDateTime: !prevFavoriteEpisodes[episodeId]?.isFavorite
          ? currentDateTime
          : null,
      };
      return updatedFavorites;
    });
  },
  []
);

if (!podcast) {
  return null;
  }
const toggleSeasonDescription = (seasonIndex) => {
  setShowDescriptions((prevShowDescriptions) => ({
    ...prevShowDescriptions,
    [seasonIndex]: !prevShowDescriptions[seasonIndex],
  }));
};



return (
<Container className="podcast-overlay">
  <div className="podcast-details">
    
    <h2 className="podcast-title">{title}</h2>
    <img src={image} alt={title} className="podcast-img" />
    <p className="podcast-description">{description}</p>
 {genres && genres.length > 0 ? (
      <ul className="list-disc list-inside mb-4">
        Genres:
        {genres.map((genre) => (
          <li key={genre.id}>{genre}</li>
        ))}
      </ul>
    ) : (
      <section>
      <div className="loading-container">
      <div className="loading-spinner"></div>
      </div>
      <p>No genres available.</p>
    </section>
      
    )}

    <div className="grid-table">
    
      <div className="grid-table-header">

        
      </div>
{seasons && seasons.map((season, index) => (
        <div key={index} className="grid-table-row">
          <Container className='button-grid'>
<Row>
    <Col>
      <Button className='season-buttons' key={index} onClick={() => toggleSeasonDescription(index)}>
            Season {index + 1}
          </Button>
    </Col>
  </Row>

</Container>
          <br/>

          
          {showDescriptions[index] && (
                <div className="new-Overlay">
                  <Button onClick={() => toggleSeasonDescription(index)}>Back</Button>
                  <ol key={index.id}>
                    <h4>{season.title}</h4>
                  <img className='season-picture' src={season.image} alt={season.title}/>
                    {season.episodes.map((episode) => (
                      <li key={episode.title}>
                        <Episode
                          key={episode.title}
                          episode={episode}
                          onToggleFavorite={handleToggleFavourite}
  isFavourite={favoriteEpisodes[episode.title]?.isFavorite}
                        />
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
    
    <Button className="close-Button" onClick={onClose}>
      Close
    </Button>
    {Object.entries(podcast.episodes).map((episode) => (
    <FavoriteEpisodes 
    key={episode.title}
    favoriteEpisodes={favoriteEpisodes} 
    onToggleFavorite={handleToggleFavourite}
    isFavourite={favoriteEpisodes[episode.title]?.isFavorite} />
    ))}
  </div>
</Container>
);
};

export default PodcastShow;