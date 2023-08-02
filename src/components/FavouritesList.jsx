import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { MenuItem, Select } from '@mui/material';
import '../styles/fav.css'
import Slider from 'react-slick'; // Import the Slider component from react-slick
import 'slick-carousel/slick/slick.css'; // Import the slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import the slick carousel theme CSS
import '../styles/fav.css';


const FavoritesList = ({ show, favorites, selectedShowData }) => {
// Additional state for sorting favorites
const [favoritesSortOrder, setFavoritesSortOrder] = useState('');
const [descriptionExpanded, setDescriptionExpanded] = useState(false);
const [selectedOption, setSelectedOption] = React.useState('');
const {} = favorites;

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


  const maxLength = 15; // Adjust the number to your desired length

  const toggleDescriptionLength = () => {
    setDescriptionExpanded((prevExpanded) => !prevExpanded);
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Set autoplay to true initially
    autoplaySpeed: 2000,
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
    <div className=''>
    <Slider {...settings}>
  {favorites.length > 0 ? (
    favorites.map((favoriteId) => {
      const favoriteShow = show.find((showItem) => showItem.id === favoriteId);

      if (!favoriteShow) return null; // Handle the case if the show is not found
      return (
        <div className="favorite" key={favoriteId}>
                <h3>{favoriteShow.title}</h3>
                <img className="favImg" src={favoriteShow.image} />
                <p>Added to favorites: {selectedShowData[favoriteId].favoriteDateTime}</p>
                {descriptionExpanded ? (
                  <p>{favoriteShow.description}</p>
                ) : (
                  <p>{favoriteShow.description.slice(0, maxLength)}...</p>
                )}
                
              </div>
      );
    })
  ) : (
    <p>No favorites yet.</p>
  )}
  </Slider>
</div>

</div>
);
};

export default FavoritesList;
