import React from 'react';

const ProfileDropdown = ({ userProfile, onLogout }) => {
  return (
    <div style={{
      position: 'absolute', 
      top: '100%', 
      right: 0,
      border: '1px solid #ccc',
      background: '#fff',
      borderRadius: '8px',
      zIndex: 1000
    }}>
      <p>Jason Ye</p>
      <button onClick={onLogout}>Logout</button>
      {/* Add more dropdown options as needed */}
    </div>
  );
};

export default ProfileDropdown;
