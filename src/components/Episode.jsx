// Episode.js
import { useState, useEffect, useCallback } from 'react';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
import supabase from '../Services/Supabase'
import { useLocalStorageState } from '../Services/Storage';



const Episode = ({ episode }) => {

  const [isFavourite, setIsFavourite] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useLocalStorageState('selectedEpisodeId',[]);


  useEffect(() => {
    const progress = localStorage.getItem(`progress_${episode.id}`);
    if (progress) {
      const audioElement = document.getElementById(`audio_${episode.id}`);
      audioElement.currentTime = Number(progress);
    }
  }, [episode]);

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


  // const addToFavorites = async (user_id, episode_id) => {
  //   const { data, error } = await supabase.from('Favorites').insert({
  //     user_id: user_id,
  //     episode: episode_id,
  //     added_datetime: new Date().toISOString(),
  //   });
  // };


  // const fetchFavorites = async (user_id) => {
  //   const { data, error } = await supabase
  //     .from('favorites')
  //     .select('*')
  //     .eq('user_id', user_id);
  //   // Handle any errors
  //   return data;
  // };


  // const removeFromFavorites = async (user_id, episode_id) => {
  //   const { data, error } = await supabase
  //     .from('favorites')
  //     .delete()
  //     .eq('user_id', user_id)
  //     .eq('episode_id', episode_id);
  //   // Handle any errors
  // };

  // const getCurrentDateTime = () => {
  //   return new Date().toLocaleString(); // Get the current date and time in a readable format
  // };

  // const handleToggleFavourite  = () => {
  //   // const currentDateTime = getCurrentDateTime();
  //   setIsFavourite((prevIsFavourite) => {
  //     const updatedIsFavourite = !prevIsFavourite;

  //     setSelectedEpisodeId((prevSelectedEpisodes) => {
  //       const updatedSelectedEpisodes = {
  //         ...prevSelectedEpisodes,
  //         [episode.id]: updatedIsFavourite,
  //       };
  //       localStorage.setItem('selectedEpisodeId', JSON.stringify(updatedSelectedEpisodes));
  //       addToFavorites(user.id, episode.id, updatedIsFavourite);
  //       return updatedSelectedEpisodes;
  //     });

  //     return updatedIsFavourite;
  //   });
  // };
  // const groupEpisodesByShowAndSeason = (episodes) => {
  //   const groupedEpisodes = episodes.reduce((acc, episode) => {
  //     const { showId, seasonId } = episode; 

  //     if (!acc[showId]) acc[showId] = {};
  //     if (!acc[showId][seasonId]) acc[showId][seasonId] = [];
  //     acc[showId][seasonId].push(episode);
  //     return acc;
  //   }, {});
  //   return groupedEpisodes;
  // };

  // ... Rest of the code ...

// const groupEpisodesByShowAndSeason = (episodes) => {
//     const groupedEpisodes = episodes.reduce((acc, episode) => {
//       const { showId, seasonId } = episode; // Replace with actual properties for show and season IDs
//       if (!acc[showId]) acc[showId] = {};
//       if (!acc[showId][seasonId]) acc[showId][seasonId] = [];
//       acc[showId][seasonId].push(episode);
//       return acc;
//     }, {});
//     return groupedEpisodes;
//   };
  
const handleToggleFavourite =  () => {
  setIsFavourite((prevIsFavourite) => !prevIsFavourite);
  setSelectedEpisodeId(episode)
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
