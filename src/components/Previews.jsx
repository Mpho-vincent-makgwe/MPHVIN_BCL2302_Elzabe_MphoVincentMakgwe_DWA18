import  { useEffect, useState } from 'react';
import PodcastCard from './PodcastCard'; 
import { fetchPodcasts, fetchPodcastById } from '../services/PodcastService'
import Header from './Header'; 
import PodcastShow from './PodcastShows';
import '../styles/Preview.css';


const Preview = () => {


  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [, setSelectedSeason] = useState(0);
  const [selectedShowData, setSelectedShowData] = useState({});
  const [maxLength] = useState(4);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);



 useEffect(() => {
    fetchPodcasts()
      .then((data) => {
        setShows(data);
        setLoading(false);
        const maxLengthData = {};
        data.forEach(show => maxLengthData[show.id] = show.length)
      })
      .catch((error) => {
        console.error('Error fetching podcasts:', error);
        setLoading(false);
      });
  }, []);


  const handleShowClick = async (showId) => {
    toggleDescription()
    setSelectedShow(showId);
    setSelectedSeason(0);
    setLoading(true);

    try {
      const showData = await fetchPodcastById(showId);
      setSelectedShowData((prevShowData) => ({
        ...prevShowData,
        [showId]: {
          ...showData,
          descriptionExpanded:false,
        },
      }));
    } catch (error) {
      console.error(`Error fetching podcast with ID ${showId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDescription = (showId) => {
    setSelectedShowData((prevShowData) => ({
      ...prevShowData,
      [showId]: {
        ...prevShowData[showId],
        descriptionExpanded: !prevShowData[showId]?.descriptionExpanded,
      },
    }));
  };
  const handlePlayEpisode = (episode) => {
    console.log('Playing episode:', episode);
    // You can implement the audio playback logic here
  };
  const handleSeasonChange = (seasonIndex) => {
    setSelectedSeasonIndex(seasonIndex);
  };

  return (
    // < theme={theme}>
    
    <div className="podcast-card"key={shows.id} >
      <Header className="header" />

      {loading ? (
        
        <section>
          <div className="loading-container">
          <div className="loading-spinner"></div>
          </div>
          
        </section>
      ) : (
        
        <main 
        className="podcast-container-main" key={shows.id}
        >


          {shows.map((show) => (
            
            <div className="Container-info" key={show.id}>

              <PodcastCard
                id={show.id}
                img={show.image}
                rating={show.rating}
                reviewCount={show.reviewCount}
                location={show.location}
                title={show.title}
                price={show.price}
                onClick={() => handleShowClick(show.id)}
                podcast={selectedShowData[selectedShow]}
                onClose={() => setSelectedShow(null)}
                onPlay={handlePlayEpisode}
                onSeasonChange={handleSeasonChange}
                selectedSeasonIndex={selectedSeasonIndex}

              />

              <p>Seasons: {show.seasons}</p>
              <p>Pricing: {show.pricing}</p>
              
              <p >Genres:{(show.genres.map((genre)=>genre)).join(', ')}</p>
              <p>{new Date(show.updated).toLocaleDateString()}</p>
              <p>
                {selectedShowData[show.id]?.descriptionExpanded
                  ? show.description
                  : `${show.description.split(' ').slice(0, maxLength).join(' ')}...`}
              </p>
              <p>Rating: {show.pricing}</p>
              {show.description.split(' ').length > maxLength && (
                <button onClick={() => toggleDescription(show.id)}>
                  {selectedShowData[show.id]?.descriptionExpanded ? 'Show Less' : 'Show More'}
                </button>

                
              )}
<input 
                name="isFavourite"
                type="checkbox" 
                id="isFavourite" 

            />
            <label htmlFor="isFavourite">Favourite</label>
            </div>
          ))}
        </main>
      )}
      {/* Render the PodcastShow component when a podcast is selected */}
      {selectedShowData[selectedShow] && (
        <PodcastShow
          podcast={selectedShowData[selectedShow]}
          onClose={() => setSelectedShow(null)} // Add a function to handle closing the selected podcast details
        />
      )}
    </div>
  );
};
export default Preview;
