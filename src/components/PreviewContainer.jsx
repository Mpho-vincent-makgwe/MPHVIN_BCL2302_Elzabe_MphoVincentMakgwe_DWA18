import genres  from '../Services/genres'
import  { useEffect, useState, useRef,  useMemo, useCallback  } from 'react';
import PodcastCard from './PodcastCard'; 
import { fetchPodcasts, fetchPodcastById } from '../Services/PodcastService'
import  SortAndSearch from './SortAndSearch';
import  Header from './Header';
import PodcastShow from './PodcastShows';
import '../styles/Preview.css';
import Fuse from 'fuse.js';
import AuthForm from '../Authentication/Auth';
import {useAuthentication} from '../Services/Supabase';
import { VscArrowSmallLeft, VscArrowUp } from "react-icons/vsc";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button,Row, Col  } from 'react-bootstrap';
import FavoritesList from './FavouritesList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocalStorageState } from '../Services/Storage';


/**
 * PreviewContainer Component renders the main view of the application.
 * It displays a list of podcasts, allows filtering and sorting, and shows details of a selected podcast.
 * @returns {JSX.Element} The JSX element representing the PreviewContainer component.
 */

  const PreviewContainer = () => {

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



  const handleShowClick = useCallback(
    async (showId) => {
      toggleDescription();
      setSelectedShow(showId);
      setSelectedSeason(0);
      setLoading(true);

      try {
        const showData = await fetchPodcastById(showId);
        setSelectedShowData((prevShowData) => ({
          ...prevShowData,
          [showId]: {
            ...showData,
            descriptionExpanded: false,
          },
        }));
      } catch (error) {
        console.error(`Error fetching podcast with ID ${showId}:`, error);
      } finally {
        setLoading(false);
      }

      localStorage.setItem('selectedShow', showId);
    },
    []
  );

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



  const handleFavoriteChange = useCallback(
    (showId, isFavorite) => {
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
          return [...prevFavorites, showId];
        } else {
          return prevFavorites.filter((favoriteId) => favoriteId !== showId);
        }
      });
    },
    []
  );



  // Sortingc functions
   /**
   * Handle sorting of podcasts in ascending order based on their title.
   */
  const handleSortAZ = () => {
    const sortedShows = [...shows].sort((a, b) => a.title.localeCompare(b.title));
    setShows(sortedShows);
  };
 /**
   * Handle sorting of podcasts in descending order based on their title.
   */
  const handleSortZA = () => {
    const sortedShows = [...shows].sort((a, b) => b.title.localeCompare(a.title));
    setShows(sortedShows);
  };

  /**
   * Handle sorting of podcasts by date in ascending order.
   */
  const handleSortByDateAscending = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(a.updated) - new Date(b.updated));
    setShows(sortedShows);
  };
/**
   * Handle sorting of podcasts by date in descending order.
   */
  const handleSortByDateDescending = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(b.updated) - new Date(a.updated));
    setShows(sortedShows);
  };

  // Filtering function
   /**
   * Handle filtering of podcasts by their title.
   * @param {string} searchQuery - The search query to filter the podcasts by title.
   */
  const handleFilterByTitle = (searchQuery) => {
    const filteredShows = shows.filter((show) =>
      show.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setShows(filteredShows);
  };

  // Fuzzy search function
  /**
   * Handle fuzzy search of podcasts by title.
   * @param {string} searchQuery - The search query to perform fuzzy search on podcasts by title.
   */
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
/**
   * Handle fuzzy search of podcasts by title.
   * @param {string} searchQuery - The search query to perform fuzzy search on podcasts by title.
   */
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


  // Separate component for rendering individual podcast cards
  const PodcastCardContainer = ({ show, selectedShowData, onShowClick, onFavoriteChange, maxLength }) => {

    return (
      <div className="Container-container" key={show.id}>
        <PodcastCard
          id={show.id}
          img={show.image}
          reviewCount={show.reviewCount}
          location={show.location}
          title={show.title}
          price={show.price}
          onClick={() => onShowClick(show.id)}
          podcast={selectedShowData[show.id]}
          onClose={() => onShowClick(null)}
          onSeasonChange={handleSeasonChange}
          selectedSeasonIndex={selectedSeasonIndex}
          onFavoriteChange={(isFavorite) => onFavoriteChange(show.id, isFavorite)}
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
    );
  };



  // Separate component for rendering the list of podcasts
  const PodcastListContainer = ({
    shows,
    selectedShowData,
    handleShowClick,
    handleSeasonChange,
    handleFavoriteChange,
    maxLength,
  }) => {
    return (
      <div className="podcast-cards" key={shows.id}>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {shows.map((show) => (
            <Col key={show.id}>
              <PodcastCardContainer
                show={show}
                selectedShowData={selectedShowData}
                onShowClick={handleShowClick}
                onFavoriteChange={handleFavoriteChange}
                maxLength={maxLength}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  
  

  const FavoritesContainer = ({
    show,
    favorites,
    selectedShowData,
    onFavoriteChange,
    maxLength,
  }) => {

    // FavoritesList rendering code here
    return (
      <div className="favorites-container">
        <Carousel showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          infiniteLoop
          autoPlay
          interval={5000}
          stopOnHover={false}
          transitionTime={500} 
          className="favorites-carousel"
          >

<div className="favorites-row">
        <FavoritesList
          show={show}
          favorites={favorites}
          selectedShowData={selectedShowData}
          onFavoriteChange={onFavoriteChange}
          maxLength={maxLength}
          onClick={() => onShowClick(show.id)}
          podcast={selectedShowData[show.id]}
          onClose={() => onShowClick(null)}
          onSeasonChange={handleSeasonChange}
          selectedSeasonIndex={selectedSeasonIndex}
        /></div>

        </Carousel>
        {/* ... Other details for the favorites list ... */}
      </div>
    );
  };


//   const podcastCards = useMemo(
//     () =>
//       shows.map((show) => (
//         <PodcastCardContainer
//           key={show.id}
//           show={show}
//           selectedShowData={selectedShowData}
//           onShowClick={handleShowClick}
//           onFavoriteChange={(isFavorite) => handleFavoriteChange(show.id, isFavorite)}
//           maxLength={maxLength}
//         />
//       )),
//     [shows, selectedShowData, handleShowClick, handleFavoriteChange, maxLength]
//   );

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
    <section>



      <header className="header">
        <Header />

        <SortAndSearch
          onSortAZ={handleSortAZ}
          onSortZA={handleSortZA}
          onSortByDateAscending={handleSortByDateAscending}
          onSortByDateDescending={handleSortByDateDescending}
          onFilterByTitle={handleFilterByTitle}
          onFuzzySearch={handleFuzzySearch}
        />
      </header>

      <FavoritesContainer
        show={shows}
        favorites={favorites}
        selectedShowData={selectedShowData}
        onFavoriteChange={handleFavoriteChange}
        maxLength={maxLength}
      />

      <PodcastListContainer
        shows={shows}
        selectedShowData={selectedShowData}
        handleShowClick={handleShowClick}
        handleSeasonChange={handleSeasonChange}
        handleFavoriteChange={handleFavoriteChange}
        maxLength={maxLength}
      />

      {selectedShowData[selectedShow] && (
        <PodcastShow
          podcast={selectedShowData[selectedShow]}
          seasons={selectedShowData[selectedShow]?.seasons}
          onClose={() => setSelectedShow(null)}
        />
      )}

      <Button className="backButton" onClick={handleBack}>
        <VscArrowSmallLeft />
      </Button>
      <Button className="">
        <VscArrowUp />
      </Button>


      
    </section>
  );
}
  }
export default PreviewContainer;
