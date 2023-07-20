import { useEffect, useState } from 'react';



export default function Preview() {
    const [shows, setShows] = useState([]);
    const [maxLength, setMaxLength] = useState(50);

    
useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
    .then(response => response.json())
    .then(data => setShows(data))
    .catch(error => console.log(error));
}, []);


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


return (
<div className="podcast-container">
    <h1>Podcast And Video With Vincent</h1>
    <div className="shows-grid">
    {shows.map((show) => (
        <div className="show" key={show.id}>
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
        </div>
    ))}
    </div>
</div>
);
}