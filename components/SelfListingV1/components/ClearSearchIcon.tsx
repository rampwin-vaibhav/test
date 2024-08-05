import React from 'react';

export const ClearSearchIcon = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}) => (
  <svg
    width="24"
    onClick={onClick}
    className="cursor-pointer"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12.1074" r="12" fill="#F0F0F0" />
    <path
      d="M16 8.10742L8 16.1074"
      stroke="#212121"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 8.10742L16 16.1074"
      stroke="#212121"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
