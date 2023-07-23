import  { useEffect, useState } from 'react';
import PodcastCard from './PodcastCard'; 
import { fetchPodcasts, fetchPodcastById } from '../services/PodcastService'
import Episode from './Episode';
import Header from './Header'; 
import PodcastShow from './PodcastShows';


const Preview = () => {


  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
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
    <div key={shows.id} className="podcast-container">
      
<Header />
      {loading ? (
        <section>
          <p className={classes.loading}>Loading...</p>
        </section>
      ) : (
        <main className={classes.showsGrid}>
          {shows.map((show) => (
            <div className={classes.show} key={show.id}>
              <PodcastCard
                id={show.id}
                img={show.image}
                rating={show.rating}
                reviewCount={show.reviewCount}
                location={show.location}
                title={show.title}
                price={show.price}
                onClick={() => handleShowClick(show.id)}
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

      {/* Display the list of seasons for the selected show */}
      {selectedShowData[selectedShow] &&
        selectedShowData[selectedShow].seasons.map((season, index) => (
          <button key={index} onClick={() => handleSeasonChange(index)}>
            Season {index + 1}
          </button>
        ))}

      {/* Display only episodes for the selected season */}
      {selectedShowData[selectedShow] &&
        selectedShowData[selectedShow].seasons[selectedSeasonIndex].episodes.map(
          (episode) => (
            <Episode
              key={episode.id}
              episode={episode}
              onPlay={handlePlayEpisode}
            />
          )
        )}
    </div>
  );
};
export default Preview;
