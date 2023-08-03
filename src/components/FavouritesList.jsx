import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { MenuItem, Select } from '@mui/material';
import '../styles/fav.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import supabase from '../Services/Supabase';

const FavoritesList = ({ show, favorites, selectedShowData }) => {
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [favoritesSortOrder, setFavoritesSortOrder] = useState('');
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');

  const fetchUserFavorites = async () => {
    const { user } = supabase;
    if (user) {
    //   const favoritesData = await fetchFavorites(user.id);
      // Process and set the favoritesData state
    }
  };


  useEffect(() => {
    fetchUserFavorites();
  }, [])



// Helper function to sort favorites by show titles
const handleSortFavoritesByTitle = (order) => {
setFavoritesSortOrder(order);
const sortedFavorites = [...favorites].sort((a, b) =>
order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
);
setFavorites(sortedFavorites);
};

// Helper function to sort show by date updated
const handleSortFavoritesByDate = (order) => {
setFavoritesSortOrder(order);
const sortedFavorites = [...favorites].sort((a, b) =>
order === 'asc'
? new Date(a.updated) - new Date(b.updated)
: new Date(b.updated) - new Date(a.updated)
);
setFavorites(sortedFavorites);
};
const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    // Handle the selected option here
    console.log(`Selected option: ${event.target.value}`);
  };

//   const groupEpisodesByShowAndSeason = (episodes) => {
//     const groupedEpisodes = episodes.reduce((acc, episode) => {
//       const { showId, seasonId } = selectedShowData; 
//       if (!acc[showId]) acc[showId] = {};
//       if (!acc[showId][seasonId]) acc[showId][seasonId] = [];
//       acc[showId][seasonId].push(episode);
//       return acc;
//     }, {});
//     return groupedEpisodes;
//   };

  const maxLength = 15; // Adjust the number to your desired length


  const handleFavoriteClick = (favoriteId) => {
    setSelectedFavorite(favoriteId);
    console.log('clicked')
  };



return (
<div className="favorites">
    <h2>Favorites</h2>
    <Dropdown className="favorites">
<Select
value={selectedOption}
onChange={handleSelectChange}
variant="outlined"
label="Select an option"
>
<MenuItem value="option1"><Button onClick={() => handleSortFavoritesByTitle('asc')}>Sort by Title (A-Z)</Button></MenuItem>
<MenuItem value="option2"><Button onClick={() => handleSortFavoritesByTitle('desc')}>Sort by Title (Z-A)</Button></MenuItem>
<MenuItem value="option3"><Button onClick={() => handleSortFavoritesByDate('asc')}>Sort by Date (Asc)</Button></MenuItem>
<MenuItem value="option4"><Button onClick={() => handleSortFavoritesByDate('desc')}>Sort by Date (Desc)</Button></MenuItem>
</Select>

</Dropdown>
    {/* ... Rest of the sorting buttons ... */}
    <div className="slider-container">
    <div className="slider-content" >
  {favorites.length > 0 ? (
    favorites.map((favoriteId) => {
      const favoriteShow = show.find((showItem) => showItem.id === favoriteId);

      if (!favoriteShow) return null; // Handle the case if the show is not found
      return (
        <div className="slider-item" key={favoriteId} onClick={() => handleFavoriteClick(favoriteId)}>
                <h3>{favoriteShow.title}</h3>
                <img className="favImg" src={favoriteShow.image} />
                <p>Added to favorites: {selectedShowData[favoriteId].favoriteDateTime}</p>
                {descriptionExpanded ? (
                  <p>{favoriteShow.description}</p>
                ) : (
                  <p>{favoriteShow.description.slice(0, maxLength)}...</p>
                  
                )}
                <p>Release Date: {new Date(favoriteShow.updated).toLocaleDateString()}</p>
              </div>
      );
    })
  ) : (
    <p>No favorites yet.</p>
  )}
  </div>
</div>

</div>
);
};

export default FavoritesList;
