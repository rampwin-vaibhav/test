import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PopoverContextProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

interface PopoverProps {
  visible?: boolean;
}

interface PopoverTriggerProps {
  children(props: PopoverContextProps): ReactNode;
}

interface PopoverBodyProps {
  children(props: PopoverContextProps): ReactNode;
}

const popoverContext = createContext<PopoverContextProps>({
  visible: false,
  setVisible: () => {},
});

export default function Popover({
  children,
  visible,
}: PropsWithChildren<PopoverProps>) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [_visible, setVisible] = useState(visible);

  const contextValues = {
    visible: _visible,
    setVisible,
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };
    if (_visible) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [_visible]);

  return (
    <div className="relative" ref={popoverRef}>
      <popoverContext.Provider value={contextValues}>
        {children}
      </popoverContext.Provider>
    </div>
  );
}

Popover.Trigger = function PopoverTrigger(props: PopoverTriggerProps): any {
  const { visible, setVisible } = useContext(popoverContext);

  if (typeof props.children !== 'function') {
    console.warn('children prop must be a function!');
    return null;
  }

  return props.children({ visible, setVisible });
};

Popover.Body = function PopoverBody(props: PopoverBodyProps) {
  const { visible, setVisible } = useContext(popoverContext);
  console.log({ PopoverBody: { visible } });
  if (typeof props.children !== 'function') {
    console.warn('children prop must be a function!');
    return null;
  }

  if (visible)
    return (
      <div className="border shadow-md rounded-md bg-white absolute top-8 z-10 w-auto">
        <div className="m-2">{props.children({ visible, setVisible })}</div>
      </div>
    );

  return <></>;
};
