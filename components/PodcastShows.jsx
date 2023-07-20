import React, { useEffect, useState } from 'react';
import { fetchPodcastById } from './PodcastService';

const PodcastShow = ({ podcast }) => {
const [seasons, setSeasons] = useState([]);

useEffect(() => {
fetchPodcastById(podcast.id) // Fetch the podcast data by its ID
    .then(data => setSeasons(data?.seasons || []))
    .catch(error => console.log(error));
}, [podcast.id]);

return (
<div>
    <h2>{podcast.title}</h2>
    <p>{podcast.description}</p>
    {seasons.map(season => (
    <Season key={season.id} season={season} />
    ))}
</div>
);
};

const Season = ({ season }) => {
return (
<div>
    <h3>{season.title}</h3>
    {season.episodes.map(episode => (
    <Episode key={episode.id} episode={episode} />
    ))}
</div>
);
};

const Episode = ({ episode }) => {
return (
<div>
    <h4>{episode.title}</h4>
    <p>{episode.description}</p>
</div>
);
};

export default PodcastShow;
