interface SliderItemProps<T> {
  children: JSX.Element;
  item: T;
  onClick?: (item: T) => void;
}

const SliderItem = <T extends unknown>(props: SliderItemProps<T>) => {
  const handleOnClick = () => {
    if (props.onClick) props.onClick(props.item);
  };

  return (
    <div className="text-center relative" onClick={handleOnClick}>
      {props.children}
    </div>
  );
};

export default SliderItem;
