import React from 'react';
import PodcastShow from './PodcastShows'


const PodcastPlayer = ({ podcastId, onClose }) => {
    // You can implement the audio player and other functionalities here
    // For demonstration purposes, let's just display the podcast ID and a close button
  
    const handlePlayPodcast = () => {
      // Implement your audio player functionality here
      // For example, you can play the podcast audio using an HTML5 audio element
      // or use a third-party audio player library
      console.log(`Playing Podcast with ID: ${podcastId}`);
    };
  
    return (
      <div className="podcast-player">

        
        <h3>Podcast Player</h3>
        <p>Podcast ID: {podcastId.id}</p>

        <button onClick={handlePlayPodcast}>Play</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

export default PodcastPlayer;