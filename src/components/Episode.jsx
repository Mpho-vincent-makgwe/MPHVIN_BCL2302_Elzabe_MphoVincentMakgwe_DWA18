// Episode.js
import React from 'react';

const Episode = ({ episode, onPlay }) => {
  return (
    <div className="episode">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <p>Release Date: {new Date(episode.releaseDate).toLocaleDateString()}</p>
      <button onClick={() => onPlay(episode)}>Play Episode</button>
    </div>
  );
};

export default Episode;
