import React from 'react';

const GoogleButton = ({ onClick }) => {

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        height: '50px',
        width: '100%',
        border: '1px solid #dbdbdb',
        borderRadius: '4px',
        color: '#5A5A5A',
        marginBottom: '10px',
        padding: '12px 17% 12px 28%',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        alt="Google logo"
        src="https://developers.google.com/identity/images/g-logo.png"
        style={{ 
            marginRight: '8px',
            height: '30px', 
         }}
      />
      Use Google Account
    </button>
  );
};

export default GoogleButton;