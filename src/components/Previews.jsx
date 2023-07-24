import genres  from '../Services/genres'
import  { useEffect, useState } from 'react';
import PodcastCard from './PodcastCard'; 
import { fetchPodcasts, fetchPodcastById } from '../services/PodcastService'
import Header from './Header'; 
import PodcastShow from './PodcastShows';
import '../styles/Preview.css';


const useLocalStorageState = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};



const Preview = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useLocalStorageState('shows', []);
  const [selectedShow, setSelectedShow] = useLocalStorageState('selectedShow', null);
  const [, setSelectedSeason] = useState(0);
  const [selectedShowData, setSelectedShowData] = useLocalStorageState('selectedShowData', {});
  const [maxLength] = useState(4);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);




useEffect(() => {
  const storedSelectedShow = localStorage.getItem('selectedShow');
  const storedSelectedSeasonIndex = localStorage.getItem('selectedSeasonIndex');
  const storedSelectedShowData = JSON.parse(localStorage.getItem('selectedShowData'));

  if (storedSelectedShow) {
    setSelectedShow(storedSelectedShow);
  }

  if (storedSelectedSeasonIndex) {
    setSelectedSeasonIndex(parseInt(storedSelectedSeasonIndex));
  }

  if (storedSelectedShowData) {
    setSelectedShowData(storedSelectedShowData);
  }

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

  useEffect(() => {
    localStorage.setItem('selectedShow', selectedShow);
    localStorage.setItem('selectedSeasonIndex', selectedSeasonIndex);
    localStorage.setItem('selectedShowData', JSON.stringify(selectedShowData));
  }, [selectedShow, selectedSeasonIndex, selectedShowData]);


  const getCurrentDateTime = () => {
    return new Date().toLocaleString(); // Get the current date and time in a readable format
  };



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

    localStorage.setItem('selectedShow', showId);
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
    localStorage.setItem('selectedSeasonIndex', seasonIndex);
  };

  const handleFavoriteChange = (showId, isFavorite) => {
    const currentDateTime = getCurrentDateTime();
    setSelectedShowData((prevShowData) => ({
      ...prevShowData,
      [showId]: {
        ...prevShowData[showId],
        isFavorite,
        favoriteDateTime: isFavorite ? currentDateTime : null,
      },
    }));

    localStorage.setItem(`favorite_${showId}`, isFavorite ? '1' : '0');
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
                onFavoriteChange={(isFavorite) => handleFavoriteChange(show.id, isFavorite)}
              />
              <p>Seasons: {show.seasons}</p>
              <p>Pricing: {show.pricing}</p>
              <p>
                Genres:
                {show.genres.map((genreId) => {
                  const genre = genres.find((genre) => genre.id === genreId);
                  return genre ? genre.title : '';
                }).join(', ')}
              </p>

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
            name={`favorite_${show.id}`}
            type="checkbox"
            id={`favorite_${show.id}`}
            checked={selectedShowData[show.id]?.isFavorite || false}
            onChange={(e) => handleFavoriteChange(show.id, e.target.checked)}
          />
          <label htmlFor={`favorite_${show.id}`}>
            Favourite  {selectedShowData[show.id]?.isFavorite ? `: ${getCurrentDateTime()}` : ''}
          </label>
            </div>
          ))}
        </main>
      )}
      {/* Render the PodcastShow component when a podcast is selected */}
      {selectedShowData[selectedShow] && (
        <PodcastShow
          podcast={selectedShowData[selectedShow]}
          onClose={() => setSelectedShow(null)}
        />
      )}
    </div>
  );
};
export default Preview;