import '../styles/header.css'

const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#2196f6',
  color: '#fff',
  padding: '10px',
};

const menuButtonStyles = {
  marginRight: '1rem',
};

const Header = ({
  onSortAZ,
  onSortZA,
  onSortByDateAscending,
  onSortByDateDescending,
  onFilterByTitle,
  onFuzzySearch,
}) => {
  return (
    <div className='header' style={headerStyles}>
      <div  style={menuButtonStyles}>
        {/* You can add your menu button icon here */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <h4>Pod-Lax with Vincent</h4>
      </div>

      
      
      <div>
        <input type="text" onChange={(e) => onFilterByTitle(e.target.value)} placeholder="Search by title"/>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          {/* Add your search icon SVG path here */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.5c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5zm0 0l-3 3"
          />
        </svg>

        
<div className="dropdown">
          <label htmlFor="sortOptions" className="dropdown-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
            >
              {/* Your sort icon SVG path here */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <select
            id="sortOptions"
            className="dropdown-menu"
            onChange={(e) => {
              const selectedOption = e.target.value;
              switch (selectedOption) {
                case 'sortAZ':
                  onSortAZ();
                  break;
                case 'sortZA':
                  onSortZA();
                  break;
                case 'sortDateAsc':
                  onSortByDateAscending();
                  break;
                case 'sortDateDesc':
                  onSortByDateDescending();
                  break;
                default:
                  break;
              }
            }}
          >
            <option value="default" disabled selected>
              Sort
            </option>
            <option value="sortAZ">Sort A-Z</option>
            <option value="sortZA">Sort Z-A</option>
            <option value="sortDateAsc">Sort by Date Ascending</option>
            <option value="sortDateDesc">Sort by Date Descending</option>
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default Header;
