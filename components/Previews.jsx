import { useEffect, useState } from 'react';
import { fetchPodcasts} from './PodcastService';
import PodcastShow from './PodcastShows'; // Import the PodcastShow component
import PodcastPlayer from './PodcastPlayer';

export default function Preview() {
    const [shows, setShows] = useState([]);
    const [maxLength, setMaxLength] = useState(50);
    const [selectedPodcastId, setSelectedPodcastId] = useState(null);
    
    useEffect(() => {
    fetchPodcasts()
        .then(data => {
        // Initialize maxLength state for each show with the default value (50)
        const maxLengthData = {};
        data.forEach(show => {
            maxLengthData[show.id] = 50;
        });
        setShows(data);
        maxLength(maxLengthData);
        })
        .catch(error => console.log(error));
    }, [PodcastShow]);



const truncateDescription = (description, maxLength) => {
if (description.length <= maxLength) {
    return description;
}
return description.slice(0, maxLength) + '...';
};

const toggleDescription = (showId) => {
setMaxLength(prevMaxLength => ({
    ...prevMaxLength,
    [showId]: !prevMaxLength[showId]
}));
};

const handlePodcastClick = (showId) => {
    setSelectedPodcastId(showId);
  };

  const handlePodcastPlayerClose = () => {
    setSelectedPodcastId(null);
  };

return (
<div className="podcast-container">
    <h1>Podcast And Vibe With Vincent</h1>
    <div className="shows-grid">
    {shows.map((show) => (
        <div 
        className="show" 
        key={show.id}
        onClick={() => handlePodcastClick(show.id)}>
        <h2>{show.title}</h2>
        <img src={show.image} alt={show.title} />
        <p>{show.genres}</p>
        <p>Seasons {show.seasons}</p>
        <p>{new Date(show.updated).toLocaleDateString()}</p>
        <p>
            {maxLength[show.id]
            ? show.description
            : truncateDescription(show.description, 25)}
        </p>
        <button onClick={() => toggleDescription(show.id)}>
            {maxLength[show.id] ? 'Read Less' : 'Read More'}
        </button>
        {/* Open the PodcastPlayer component when a podcast is clicked */}
        {selectedPodcastId === show.id && (
            <PodcastPlayer
            podcastId={show.id}
            onClose={handlePodcastPlayerClose}
            />
        )}
        </div>
    ))}
    </div>
</div>
);
}