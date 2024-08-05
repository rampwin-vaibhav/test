import React from 'react';

export const SuccessIcon = ({ className = '', tickFill = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <g id="Group_1204" transform="translate(-920 -376)">
        <circle
          id="Ellipse_94"
          cx="16"
          cy="16"
          r="16"
          transform="translate(920 376)"
          fill="currentColor"
        ></circle>
        <path
          id="checked"
          d="M.194,10.117a.625.625,0,0,1,0-.906L1.1,8.305a.625.625,0,0,1,.906,0l.065.065,3.558,3.817a.313.313,0,0,0,.453,0l8.67-8.993h.065a.625.625,0,0,1,.906,0l.906.906a.625.625,0,0,1,0,.906h0L6.276,15.746a.625.625,0,0,1-.906,0L.323,10.311l-.129-.194Z"
          transform="translate(927.042 381.998)"
          fill={tickFill ? tickFill : '#FFFFFFFF'}
        ></path>
      </g>
    </svg>
  );
};
