import React, { useState } from 'react';
import { Input, Button, Dropdown, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/header.css';

const Header = ({
  onSortAZ,
  onSortZA,
  onSortByDateAscending,
  onSortByDateDescending,
  onFuzzySearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onFuzzySearch(searchQuery);
  };

  const handleSortIconClick = () => {
    setShowSortOptions((prev) => !prev);
  };

  const handleSearchIconClick = () => {
    setShowSearchForm((prev) => !prev);
  };

  const handleThemeOptionClick = (theme) => {
    setIsDarkTheme(theme === 'dark');
    setShowSettingsMenu(false);
  };

  return (
    <div className='header'>
    <div className={`header ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div onClick={handleSearchIconClick} className='header-Search'>
        <Icon name='search' />
      </div>

      {showSearchForm && (
        <form onSubmit={handleSearchSubmit}>
          <Input
            icon='search'
            iconPosition='left'
            type='text'
            placeholder='Search by title'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type='submit'>Search</Button>
        </form>
      )}

      <div onClick={handleSortIconClick} className={`sort-container ${showSortOptions ? 'active' : ''}`}>
        <Icon name={`sort content ${showSortOptions ? 'up' : 'down'}`} />
        <Dropdown
          placeholder='Sort By'
          selection
          options={[
            { key: 'az', value: 'az', text: 'A-Z' },
            { key: 'za', value: 'za', text: 'Z-A' },
            { key: 'asc', value: 'asc', text: 'Date Ascending' },
            { key: 'desc', value: 'desc', text: 'Date Descending' },
          ]}
          onChange={(e, { value }) => {
            if (value === 'az') {
              onSortAZ();
            } else if (value === 'za') {
              onSortZA();
            } else if (value === 'asc') {
              onSortByDateAscending();
            } else if (value === 'desc') {
              onSortByDateDescending();
            }
          }}
        />
      </div>

      <h5>Pod-Lax</h5>
      
      <div className="SearchButton" onClick={() => setShowSettingsMenu(!showSettingsMenu)}>
        <Icon name={`settings ${showSettingsMenu ? 'active' : ''}`} />
        {showSettingsMenu && (
          <div className="settings-menu">
            <h4>Choose Theme:</h4>
            <Button onClick={() => handleThemeOptionClick('light')}>Light Theme</Button>
            <Button onClick={() => handleThemeOptionClick('dark')}>Dark Theme</Button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Header;
