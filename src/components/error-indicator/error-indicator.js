import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src='https://icons.iconarchive.com/icons/goodstuff-no-nonsense/free-space/512/death-star-icon.png' alt="error icon"/>
      <span className="boom">BOOM!</span>
      <span>
        something has gone terribly wrong
      </span>
      <span>
        (but we already sent droids to fix it)
      </span>
    </div>
  );
};

export default ErrorIndicator;