import  { useEffect, useState } from 'react';
import PodcastCard from './PodcastCard'; 
import { fetchPodcasts, fetchPodcastById } from '../Services/PodcastService'
import Episode from './Episode';
import Header from './Header'; 
import PodcastShow from './PodcastShows';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';




const theme = createMuiTheme();
const useStyles = makeStyles((theme) => ({
  root: {},
  podcastContainer: {
    padding: theme.spacing(3),
  },
  header: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },
  loading: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },
  showsGrid: {
    display: '',
    gridTemplateRows: 'repeat(4, 1fr)', // Four cards per row
    gap: theme.spacing(4), // Gap between cards
  },
  show: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
    color: 'black',
    '& img': {
      width: '100% auto',
      height: '100% auto',
      marginBottom: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
    },
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  genres: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  showMoreBtn: {
    marginBottom: theme.spacing(2),
  },
}));



const Preview = () => {
  const classes = useStyles();

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
    <ThemeProvider theme={theme}>
    <div key={shows.id} className="podcast-container">
      <Header />
        {/* <h1 className={classes.header}>Podcast And Relax</h1>
      </Header> */}
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
              
              <p >Genres:{(show.genres.map((genre)=>genre)).join(', ')}</p>
              <p>{new Date(show.updated).toLocaleDateString()}</p>
              <p>
                {selectedShowData[show.id]?.descriptionExpanded
                  ? show.description
                  : `${show.description.split(' ').slice(0, maxLength).join(' ')}...`}
              </p>
              {show.description.split(' ').length > maxLength && (
                <button onClick={() => toggleDescription(show.id)}>
                  {selectedShowData[show.id]?.descriptionExpanded ? 'Show Less' : 'Show More'}
                </button>
              )}

        
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
    </ThemeProvider>
  );
};
export default Preview;
