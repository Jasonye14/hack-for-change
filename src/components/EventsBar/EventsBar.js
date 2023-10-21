import React, { useState } from 'react';
import './EventsBar.css';

function EventBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleDropdownChange = (e) => {
    if (e.target.value && !selectedTags.includes(e.target.value)) {
      setSelectedTags(prevTags => [...prevTags, e.target.value]);
    }

    // Reset the dropdown value
    // e.target.value = '';
  }

  const removeTag = (tagToRemove) => {
    setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  }

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

      {/* Tags Display */}
      <div className="tags-container">
        {selectedTags.map(tag => (
          <div className="tag" key={tag}>
            {tag}
            <span className="remove-tag" onClick={() => removeTag(tag)}>x</span>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      {/* Note: Repeated dropdowns for demonstration; consider abstracting to a reusable component */}
      <select className="dropdown" onChange={handleDropdownChange}>
        <option value="">Locations</option>
        <option value="Bethlehem">Bethlehem</option>
        <option value="New York">New York</option>
        <option value="San Francisco">San Francisco</option>
      </select>

      <select className="dropdown" onChange={handleDropdownChange}>
        <option value="">Select an option...</option>
        <option value="Option 4">Option 4</option>
        <option value="Option 5">Option 5</option>
        <option value="Option 6">Option 6</option>
      </select>

      <select className="dropdown" onChange={handleDropdownChange}>
        <option value="">Select an option...</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
    </div>
  );
}

export default EventBar;
