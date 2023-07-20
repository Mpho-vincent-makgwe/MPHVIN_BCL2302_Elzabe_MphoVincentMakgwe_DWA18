
const PodcastPlayer = ({ selectedPodcast, onClose }) => {


  const handlePlayPodcast = () => {
    console.log(`Playing Podcast with ID: ${selectedPodcast.id}`);
  };

  return (
    <div className="podcast-player">
      <h3>Podcast Player</h3>
      <p>Podcast ID: {selectedPodcast.id}</p>
      {/* Add audio player and other podcast details here */}
      <button onClick={handlePlayPodcast}>Play</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PodcastPlayer;
