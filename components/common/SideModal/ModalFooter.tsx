type ModalFooterProps = {
  /**
   * JSX Element/HTML content of modal footer.
   */
  children: JSX.Element;
  showGrid?: boolean;
};

const ModalFooter = (props: ModalFooterProps) => {
  return (
    <div
      className={`p-6 space-x-2 rounded-b ${
        props.showGrid ? 'border-t border-light-gray' : ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default ModalFooter;
