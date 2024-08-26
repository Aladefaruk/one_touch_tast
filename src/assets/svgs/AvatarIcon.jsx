import React from "react";

const AvatarIcon = ({ className = "", fill = "#A8A8A8" }) => {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.3333 5.41666C13.3333 7.25761 11.8409 8.74999 9.99997 8.74999C8.15902 8.74999 6.66664 7.25761 6.66664 5.41666C6.66664 3.57571 8.15902 2.08332 9.99997 2.08332C11.8409 2.08332 13.3333 3.57571 13.3333 5.41666Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99997 2.49999C8.38914 2.49999 7.08331 3.80583 7.08331 5.41666C7.08331 7.02749 8.38914 8.33332 9.99997 8.33332C11.6108 8.33332 12.9166 7.02749 12.9166 5.41666C12.9166 3.80583 11.6108 2.49999 9.99997 2.49999ZM6.24997 5.41666C6.24997 3.34559 7.9289 1.66666 9.99997 1.66666C12.071 1.66666 13.75 3.34559 13.75 5.41666C13.75 7.48772 12.071 9.16666 9.99997 9.16666C7.9289 9.16666 6.24997 7.48772 6.24997 5.41666Z"
        fill={fill}
      />
      <path
        d="M9.99997 10.4167C6.27535 10.4167 3.66126 13.3457 3.33331 17.0833H16.6666C16.3387 13.3457 13.7246 10.4167 9.99997 10.4167Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.80032 16.6667H16.1996C15.725 13.323 13.3164 10.8333 9.99997 10.8333C6.68352 10.8333 4.27494 13.323 3.80032 16.6667ZM2.91823 17.0469C3.26095 13.1409 6.01533 9.99999 9.99997 9.99999C13.9846 9.99999 16.739 13.1409 17.0817 17.0469L17.1215 17.5H2.87848L2.91823 17.0469Z"
        fill={fill}
      />
    </svg>
  );
};

export default AvatarIcon;
