// PodcastApp.jsx
import { useEffect, useState } from 'react';
import { fetchPodcasts, fetchPodcastById } from './PodcastService';
import PodcastShow from './PodcastShows'; // Import the PodcastShow component

const PodcastApp = () => {
const [podcasts, setPodcasts] = useState([]);

useEffect(() => {
fetchPodcasts()
    .then(data => setPodcasts(data))
    .catch(error => console.log(error));
}, []);

return (
<div>
    <h1>Podcast App</h1>
    {podcasts.map(podcast => (
    <PodcastShow key={podcast.id} podcast={podcast} />
    ))}
</div>
);
};

export default PodcastApp;
