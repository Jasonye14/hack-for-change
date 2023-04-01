import React from 'react';

const GoogleButton = (props) => {

  return (
    <button
      onClick={props.onClick}
      style={{
        backgroundColor: '#fff',
        border: '1px solid #dbdbdb',
        borderRadius: '4px',
        color: '#5A5A5A',
        padding: '8px 16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        alt="Google logo"
        src="https://developers.google.com/identity/images/g-logo.png"
        style={{ marginRight: '8px' }}
      />
      Sign in with Google
    </button>
  );
};

export default GoogleButton;