import '../styles/PodcastShow.css'
import  { useState, useEffect } from 'react';
import Episode from './Episode';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import FavoriteEpisodes from './FavoriteEpisodes';
import { useLocalStorageState } from '../Services/Storage';


const PodcastShow = ({ podcast, onClose, onPlay }) => {


const { title, image, description, genres, seasons, updated, episode } = podcast;
const [, setSelectedSeasonIndex] = useState(0);
const [showDescriptions, setShowDescriptions] = useState({});
const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);


useEffect(() => {
  const fetchFavoriteEpisodes = async () => {
    // Simulate fetching favorite episodes data
    const favoriteEpisodesData = useLocalStorageState([
{FavoriteEpisodes}
    ]);
    setFavoriteEpisodes(favoriteEpisodesData);
  };
  const selectedEpisodeId = localStorage.getItem('selectedEpisodeId');
      if (selectedEpisodeId) {
        setFavoriteEpisodes(JSON.parse(selectedEpisodeId));
      }
  fetchFavoriteEpisodes();
}, []);



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
                      <li key={episode.id}>
                        <Episode
                          key={episode.id}
                          episode={episode}
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
    <FavoriteEpisodes favoriteEpisodes={favoriteEpisodes} />
  </div>
</Container>
);
};

export default PodcastShow;