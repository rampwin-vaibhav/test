type ModalHeaderProps = {
  /**
   * JSX Element/HTML content of modal footer.
   */
  children: JSX.Element;
  showGrid?: boolean;
};

const ModalHeader = (props: ModalHeaderProps) => {
  return (
    <div
      className={`flex justify-between items-start p-5 arabic ${
        props.showGrid ? 'border-b border-light-gray' : ''
      } `}
    >
      <div className="text-xl font-semibold text-gray-900 lg:text-2xl w-full">
        {props.children}
      </div>
    </div>
  );
};

export default ModalHeader;
