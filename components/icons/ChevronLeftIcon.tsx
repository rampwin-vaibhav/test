type Props = {
  className?: string;
};

const ChevronLeftIcon = (props: Props) => {
  return (
    <svg
      className={props.className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18.334L9 12.334L15 6.33398"
        stroke="#3E3E3E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
