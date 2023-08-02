import genres  from '../Services/genres'
import  { useEffect, useState, useRef } from 'react';
import PodcastCard from './PodcastCard'; 
import { fetchPodcasts, fetchPodcastById } from '../Services/PodcastService'
import  SortAndSearch from './SortAndSearch';
import  Header from './Header';
import PodcastShow from './PodcastShows';
import '../styles/Preview.css';
import Fuse from 'fuse.js';
import AuthForm from '../Authentication/Auth';
import useAuthentication from '../Services/Supabase';
import { VscArrowSmallLeft, VscArrowUp } from "react-icons/vsc";

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button } from 'react-bootstrap';
import FavoritesList from './FavouritesList';





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
  const [maxLength] = useState(5);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [favorites, setFavorites] = useLocalStorageState('favorites', []);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuthentication();


  const prevShowsRef = useRef([]);

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
    setFavorites((prevFavorites) => {
      if (isFavorite) {
        // Add the showId to favorites if it's not already present
        return [...prevFavorites, showId];
      } else {
        // Remove the showId from favorites if it's already present
        return prevFavorites.filter((favoriteId) => favoriteId !== showId);
      }
    });
  };

  // Sorting functions
  const handleSortAZ = () => {
    const sortedShows = [...shows].sort((a, b) => a.title.localeCompare(b.title));
    setShows(sortedShows);
  };

  const handleSortZA = () => {
    const sortedShows = [...shows].sort((a, b) => b.title.localeCompare(a.title));
    setShows(sortedShows);
  };

  const handleSortByDateAscending = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(a.updated) - new Date(b.updated));
    setShows(sortedShows);
  };

  const handleSortByDateDescending = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(b.updated) - new Date(a.updated));
    setShows(sortedShows);
  };

  // Filtering function
  const handleFilterByTitle = (searchQuery) => {
    const filteredShows = shows.filter((show) =>
      show.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setShows(filteredShows);
  };

  // Fuzzy search function
  const handleFuzzySearch = (searchQuery) => {

    setSearchQuery(searchQuery);
  if (!searchQuery) {
    setShows(prevShowsRef.current); // If the search query is empty, reset to the original list of shows
  } else {
    const fuse = new Fuse(shows, { keys: ['title'] });
    const fuzzyResults = fuse.search(searchQuery);
    const fuzzyMatches = fuzzyResults.map((result) => result.item);
    prevShowsRef.current = shows;
    setShows(fuzzyMatches);
  }
  };

  const handleBack = () => {
  window.location.reload();
  if (searchQuery) {
    // If a search query was entered, clear it and reload the page
    setSearchQuery('');
    window.location.reload(); // Reload the page to go back to its original state
  } else {
    // If no search query was entered, show the previous state
    setShows(prevShowsRef.current);
  }
       // Reload the page to go back to its original state


  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (!user && loading) {
    return (
<div>



<div className="podcast-cards">
  <section>
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  </section>
</div>
</div>
  
    );
} else if (!user) {
    return <AuthForm />;
    }else{
  return (
    <section >
      <header className='header'>
     <Header/>

      < SortAndSearch
            onSortAZ={handleSortAZ}
            onSortZA={handleSortZA}
            onSortByDateAscending={handleSortByDateAscending}
            onSortByDateDescending={handleSortByDateDescending}
            onFilterByTitle={handleFilterByTitle}
            onFuzzySearch={handleFuzzySearch}
            /> 
    </header>
< >
    <FavoritesList
    show={shows} // Pass the list of shows to the FavoritesList component
    favorites={favorites} // Pass the list of favorite shows to the FavoritesList component
    selectedShowData={selectedShowData} // Pass the selectedShowData state to the FavoritesList component
    onFavoriteChange={handleFavoriteChange} // Pass the handleFavoriteChange function to the FavoritesList component
    maxLength={maxLength} // Pass the maxLength value to the FavoritesList component
    />
</>

<div className="podcast-cards" key={shows.id} >
      {loading ? (
        
        <section>
          <div className="loading-container">
          <div className="loading-spinner"></div>
          </div>
        </section>
      ) : (
        <div 
        className="podcast-main" key={shows.id}>

{/**This is for Redering my favourites when Clicked */}



{/**
 * This is my Preview part*/} 

          {shows.map((show) => (
            
            <div className="Container-container" key={show.id}>

              <PodcastCard
                id={show.id}
                img={show.image}
                reviewCount={show.reviewCount}
                location={show.location}
                title={show.title}
                price={show.price}
                onClick={() => handleShowClick(show.id)}
                podcast={selectedShowData[selectedShow]}
                onClose={() => setSelectedShow(null)}
                onSeasonChange={handleSeasonChange}
                selectedSeasonIndex={selectedSeasonIndex}
                onFavoriteChange={(isFavorite) => handleFavoriteChange(show.id, isFavorite)}
              />
              <p>Seasons: {show.seasons}</p>
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
              {show.description.split(' ').length > maxLength && (

                <Button onClick={() => toggleDescription(show.id) }className='ShowMore-less'>
                  {selectedShowData[show.id]?.descriptionExpanded ? 'Show Less' : 'Show More'}
                </Button>
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
        </div>
      )}
      
      
      
      
      {/* Render the PodcastShow component when a podcast is selected */}
      {selectedShowData[selectedShow] && (
        <PodcastShow
          podcast={selectedShowData[selectedShow]}
          seasons={selectedShowData[selectedShow]?.seasons}
          onClose={() => setSelectedShow(null)}
        />
      )}

<Button className='backButton' onClick={handleBack}><VscArrowSmallLeft/></Button>
<Button className='' ><VscArrowUp/></Button>
    </div>
    </section>
  );
}


};
export default Preview;