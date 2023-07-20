import { useEffect, useState } from 'react';
import { fetchPodcasts, fetchPodcastById } from './PodcastService';
import PodcastCard from './PodcastCard';
import PodcastShow from './PodcastShows';




export default function Preview() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [shows, setShows] = useState([]);
    const [maxLength, setMaxLength] = useState({});
    const [ ,setSelectedPodcastId] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);


    
useEffect(() => {
    fetchPodcasts()
        .then((data) => {
        setShows(data);
        })
        .catch((error) => console.log(error));
    }, []);

const handlePodcastClick = async (showId) => {
    try {
        const podcastData = await fetchPodcastById({ show: { id: showId } });
        setSelectedPodcast(podcastData);
        setIsOverlayVisible(true); // Show the overlay when a podcast is clicked
    } catch (error) {
        console.log('Error fetching podcast details:', error);
    }
    };



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



const handlePodcastPlayerClose = () => {
    setSelectedPodcastId(null);

};



return (
<div onClick={handlePodcastClick} className="podcast-container">
    <h1>Podcast And Vibe With Vincent</h1>
    <div className="shows-grid">
    {shows.map((show) => (
        <div className="show" key={show.id}>
        <PodcastCard
            img={show.image}
            rating={show.rating}
            reviewCount={show.reviewCount}
            location={show.location}
            title={show.title}
            price={show.price}
            podcast={show}
            
        />
        <p >Genres:{show.genres.join(', ')}</p>
        <p>Seasons {show.seasons}</p>
        <p>{new Date(show.updated).toLocaleDateString()}</p>
        <p></p>

        <p>
            {maxLength[show.id]
            ? show.description
            : truncateDescription(show.description, 25)}
        </p>
        <button onClick={() => toggleDescription(show.id)}>
            {maxLength[show.id] ? 'Read Less' : 'Read More'}
        </button>
        </div>
    ))}
    </div>

    {/* Show the PodcastShow overlay when isOverlayVisible is true */}
    {isOverlayVisible && selectedPodcast && (
    <PodcastShow podcast={selectedPodcast} onClose={handlePodcastPlayerClose} />
    )}
</div>
);

}