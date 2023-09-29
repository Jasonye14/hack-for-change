import React, { useState } from 'react';
import './EventsBar.css';
function EventBar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="event-bar">
      {/* Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search by events"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dropdown */}
      <select className="dropdown">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        {/* Add more options as needed */}
      </select>

      <select className="dropdown">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        {/* Add more options as needed */}
      </select>

      <select className="dropdown">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default EventBar;
