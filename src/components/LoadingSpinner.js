import React from 'react';

import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      <div
        aria-busy="true"
        aria-label="Loading"
        role="progressbar"
        className="LoadingSpinner__container"
      >
        <div className="LoadingSpinner__swing">
          <div className="LoadingSpinner__swing-l"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="LoadingSpinner__swing-r"></div>
        </div>
        <div className="LoadingSpinner__shadow">
          <div className="LoadingSpinner__shadow-l"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="LoadingSpinner__shadow-r"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
