type ModalBodyProps = {
  /**
   * JSX Element/HTML content of modal body.
   */
  children: JSX.Element;
};

const ModalBody = (props: ModalBodyProps) => {
  return <div className="p-5 md:p-7 space-y-6">{props.children}</div>;
};

export default ModalBody;
