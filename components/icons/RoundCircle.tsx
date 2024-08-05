export const RoundCircle = ({ className = 'h-8 w-8' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1918 22.1418L39.1484 37.7055L40.1854 11.004C40.1854 11.004 50.7714 10.9743 58.7956 19.455C70.6365 32.2355 65.4821 45.7886 65.4821 45.7886C61.5538 59.0896 51.0524 63.2073 51.0524 63.2073C39.9556 69.0171 28.2441 64.2855 28.2441 64.2855C28.2441 64.2855 -0.706507 54.2121 16.1933 22.1396L16.1918 22.1418Z"
        fill="url(#paint0_angular_14173_223636)"
      />
      <g filter="url(#filter0_d_14173_223636)">
        <path
          d="M26.3985 55.9803C21.8771 52.915 18.8919 48.4309 17.6371 43.5271C16.4395 37.9914 17.42 31.9944 20.8482 26.9378C27.5038 17.1207 40.8624 14.5628 50.6879 21.2241C55.2094 24.2895 58.193 28.7758 59.45 33.6811C60.6476 39.2168 59.6671 45.2137 56.2389 50.2703C49.5833 60.0875 36.2248 62.6454 26.3992 55.984L26.3985 55.9803Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_14173_223636"
          x="7.14844"
          y="14.5161"
          width="62.7891"
          height="62.1758"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="7" />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14173_223636"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_14173_223636"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_angular_14173_223636"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(38.5726 38.5866) rotate(-118.894) scale(27.2075 27.1584)"
        >
          <stop stopColor="#FF8300" stopOpacity="5" />
          <stop offset="1" stopColor="#DE2A00" />
        </radialGradient>
      </defs>
    </svg>
  );
};
