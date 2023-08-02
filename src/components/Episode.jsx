// Episode.js
import { useState } from 'react';
import supabase from '../Services/Supabase'



const Episode = ({ episode}) => {


  const [, setSelectedEpisodeId] = useState(null);


  const handlePlayEpisode = (episode) => {
    setSelectedEpisodeId(episode.episode);
    
    const { user } = supabase.auth.currentUser;
    if (user) {
      const { data, error } =  supabase(user)
        .from('user_progress')
        .insert({
          user_id: user.id,
          podcast_id: podcast.id,
          episode_id: episode.id,
          progress_time: 0, // Set the initial progress time to 0
        });
      // Handle any errors
    } 
  };


  return (
    <div className="episode">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <p>Release Date: {new Date(episode.updated).toLocaleDateString()}</p>
      
      <audio onClick={handlePlayEpisode} className='audio' controls>
        <source key={episode.episode} src={episode.file} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Episode;
