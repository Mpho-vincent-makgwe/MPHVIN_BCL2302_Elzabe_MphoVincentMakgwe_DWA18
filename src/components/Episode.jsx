// Episode.js
import { useState, useEffect, useCallback } from 'react';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
import supabase from '../Services/Supabase'
import { useLocalStorageState } from '../Services/Storage';



const Episode = ({ episode }) => {

  const [isFavourite, setIsFavourite] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useLocalStorageState('selectedEpisodeId',[]);


  useEffect(() => {
    setIsFavourite(selectedEpisodeId.includes(episode));
  }, [episode, selectedEpisodeId]);

  const handlePlayEpisode = async (episode) => {
    const audioElement = document.getElementById(`audio_${episode.id}`);
    localStorage.setItem(`progress_${episode.id}`, audioElement.currentTime);


    const { user } = supabase;
    if (user) {
      setSelectedEpisodeId(episode.episode);
      if (isFavourite) {
        // If the episode is already a favorite, remove it from favorites
        const { data, error } = await supabase
          .from('Favourites')
          .delete()
          .eq('user_id', user.id)
          .eq('episode_id', episode.id);

        if (!error) {
          setIsFavourite(false);
        }
      } else {
        // If the episode is not a favorite, add it to favorites
        const { data, error } = await supabase
          .from('Favourites')
          .insert({
            user_id: user.id,
            episode_id: episode.id,
            added_datetime: new Date().toISOString(),
          });
        if (!error) {
          setIsFavourite(true);
        }
      }
    }
  };


const handleToggleFavourite = useCallback(() => {
  setIsFavourite((prevIsFavourite) => !prevIsFavourite);
  setSelectedEpisodeId((prevSelectedEpisodes) => {
    const updatedSelectedEpisodes = prevSelectedEpisodes.includes(episode)
      ? prevSelectedEpisodes.filter((id) => id !== episode) // Remove from favorites
      : [...prevSelectedEpisodes, episode]; // Add to favorites

    return updatedSelectedEpisodes;
  });
}, [episode, setSelectedEpisodeId]);


  return (
    <div className="episode">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <p>Release Date: {new Date(episode.updated).toLocaleDateString()}</p>
      
      <audio className='audio' controls>
        <source onLoad={handlePlayEpisode} key={episode.episode} src={episode.file} />
        Your browser does not support the audio element.
      </audio>
      {isFavourite ? (
        <VscHeartFilled
          className={`favourite-icon ${isFavourite ? 'favourite' : ''}`}
          onClick={handleToggleFavourite}
        />
      ) : (
        <VscHeart
          className={`favourite-icon ${isFavourite ? 'favourite' : ''}`}
          onClick={handleToggleFavourite}
        />
      )}
    </div>
  );


};


export default Episode;
