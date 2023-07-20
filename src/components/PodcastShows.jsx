import '../styles/PodcastShow.css';


const PodcastShow = ({ podcast, onClose }) => {
  // Check if podcast is undefined or null
  if (!podcast) {
    return null; // Return null if podcast is not available
  }

  return (
    <div className="podcast-overlay">
      <div className="podcast-details">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{podcast.title}</h2>
        <img src={podcast.image} alt={podcast.title} />
        <p>{podcast.description}</p>
        {podcast.genres && podcast.genres.length > 0 ? (
          <ul>
            {podcast.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        ) : (
          <p>No genres available.</p>
        )}
        <p>Seasons: {podcast.seasons}</p>
        <p>Last Updated: {new Date(podcast.updated).toLocaleDateString()}</p>
        <p>Rating: {podcast.rating}</p>
        <p>Review Count: {podcast.reviewCount}</p>
        {/* Add other details as needed */}
      </div>
    </div>
  );
};

export default PodcastShow;
