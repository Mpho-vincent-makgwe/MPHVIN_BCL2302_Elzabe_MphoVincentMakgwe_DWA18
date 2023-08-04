// Episode.js
import { useState, useEffect, useCallback } from 'react';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
// import supabase from '../Services/Supabase'
// import { useLocalStorageState } from '../Services/Storage';



const Episode = ({ episode, onToggleFavorite, isFavourite }) => {

  const [Favourite, setFavourite] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState([]);
const {title, description,}= episode;

  useEffect(() => {
    setFavourite(selectedEpisodeId.includes(episode));
  }, [episode, selectedEpisodeId]);

  return (
    <div className="episode">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <p>Release Date: {new Date(episode.updated).toLocaleDateString()}</p>
      
      <audio className='audio' controls>
        <source  key={episode.episode} src={episode.file} />
        Your browser does not support the audio element.
      </audio>
      {isFavourite ? (
        <VscHeartFilled
          className={`favourite-icon ${isFavourite ? 'favourite' : ''}`}
          onClick={() => onToggleFavorite(episode.title)}

        />
      ) : (
        <VscHeart
          className={`favourite-icon ${isFavourite ? 'favourite' : ''}`}
          onClick={() =>onToggleFavorite(episode.title)}

        />
      )}
    </div>
  );


};


export default Episode;
