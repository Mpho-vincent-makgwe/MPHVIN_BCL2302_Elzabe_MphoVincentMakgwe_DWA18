import  { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { MenuItem, Select } from '@mui/material';
import '../styles/fav.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {supabase, useAuthentication} from '../Services/Supabase';

const FavoritesList = ({ show, favorites, selectedShowData }) => {
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesSortOrder, setFavoritesSortOrder] = useState(''); // 'asc' or 'desc'

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const { user } = useAuthentication();

  const fetchUserFavorites = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('Favourites')
        .insert([selectedFavorite])

      if (!error) {
        // Process and set the favorites state
        const userFavorites = data.map((item) => item.episode);
        setSelectedFavorite(userFavorites);
      }
    }
  };


const updateUserFavorites = async (favoriteId) => {
    if (user) {
      const existingFavorite = favorites.includes(favoriteId);

      if (existingFavorite) {
        // If it's already a favorite, remove it
        await supabase
          .from('Favourites')
          .delete()
          .eq('id', user.id)
          .eq('episode', favoriteId);
      } else {
        await supabase.from('Favourites').insert([
          {
            id: user.id,
            episode: favoriteId,
            added_datetime: new Date().toISOString(),
          },
        ]);
      }
      fetchUserFavorites();
    }
  };

  useEffect(() => {
    // fetchUserFavorites();
    updateUserFavorites()
  }, [user]);

  const handleSortFavoritesByTitle = (order) => {
    setFavoritesSortOrder(order);
    const sortedFavorites = [...favorites].sort((a, b) =>
      order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setSelectedFavorite(sortedFavorites);
  };
  
  const handleSortFavoritesByDate = (order) => {
    setFavoritesSortOrder(order);
    const sortedFavorites = [...favorites].sort((a, b) =>
      order === 'asc' ? new Date(a.updated) - new Date(b.updated) : new Date(b.updated) - new Date(a.updated)
    );
    setSelectedFavorite(sortedFavorites);
  };

const handleFilterByTitle = (searchQuery) => {
  setSearchQuery(searchQuery);
  const filteredFavorites = favorites.filter((favorite) =>
    favorite.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setSelectedFavorite(filteredFavorites);
};
  

  
const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    // Handle the selected option here
    console.log(`Selected option: ${event.target.value}`);
  };

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
    value={favoritesSortOrder}
    onChange={(event) => handleSortFavoritesByTitle(event.target.value)}
    variant="outlined"
    label="Sort by Title"
  >
    <MenuItem value="asc">
      <Button>Sort by Title (A-Z)</Button>
    </MenuItem>
    <MenuItem value="desc">
      <Button>Sort by Title (Z-A)</Button>
    </MenuItem>
  </Select>
</Dropdown>
<input
  type="text"
  placeholder="Search by title"
  value={searchQuery}
  onChange={(event) => handleFilterByTitle(event.target.value)}
/>
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
