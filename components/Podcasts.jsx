import { useEffect, useState } from 'react';
import { fetchPodcasts, fetchPodcastById } from './PodcastService';
import '../styles/Podcasts.css'
import Login from './LoginAndRegister';
import Preview from './Previews';
import PodcastPlayer from './PodcastPlayer';
import PodcastShow from './PodcastShows';

const Podcast = () => {
    const [formData, setFotmData] = useState(true);
    const [selectedPodcastId, setSelectedPodcastId] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);


useEffect(() => {
    // Check if the user is already logged in
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
        setFotmData(true);
    }
}, []);

const handleLoginAndRegister = () => {
    setFotmData(true)
}



const handlePodcastClick = (podcastId) => {
    setSelectedPodcastId(podcastId);

    // Fetch the podcast details when a podcast is clicked
    fetchPodcastById(podcastId)
      .then((data) => setSelectedPodcast(data))
      .catch((error) => console.log(error));
  };
  const handlePodcastPlayerClose = () => {
    setSelectedPodcastId(null);
    setSelectedPodcast(null);
  };

return (
<div>
    {formData ? (
    <>
        {/* If a podcast is selected, display either the PodcastShow or PodcastPlayer component */}
        {selectedPodcast ? (
        <>
            <PodcastShow podcast={selectedPodcast} />
            <PodcastPlayer
            podcastId={selectedPodcast.id}
            onClose={handlePodcastPlayerClose}
            />
        </>
        ) : (
        // If no podcast is selected, display the Preview component
        <Preview onPodcastClick={handlePodcastClick} />
        )}
    </>
    ) : (
    <Login onLogin={handleLoginAndRegister} />
    )}
</div>
);
};
export default Podcast;
