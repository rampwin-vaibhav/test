import { useCallback, useEffect, useRef } from 'react';
import { CloseIcon } from '../../icons';

export enum ModalSize {
  SMALL = 'SMALL',
  DEFAULT = 'DEFAULT',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE',
  MEDIUM = 'MEDIUM',
}

type ModalProps = {
  show: boolean;
  onClose: () => void;
  keyboard?: boolean;
  backdrop?: 'static';
  transparent?: boolean;
  size?: ModalSize;
  containerClassName?: string;
  /**
   * JSX Element/HTML content of modal footer.
   */
  children: JSX.Element;
  showClose?: boolean;
  position?: string;
};

const Modal = ({
  show,
  keyboard = false,
  backdrop,
  transparent = false,
  size = ModalSize.DEFAULT,
  children,
  onClose,
  containerClassName = '',
  showClose = true,
  position = 'center',
  ...props
}: ModalProps) => {
  const nodeRef = useRef(null);
  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (keyboard) {
      document.body.addEventListener('keydown', closeOnEscapeKeyDown);
      return () => {
        document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
      };
    }
  }, [closeOnEscapeKeyDown, keyboard]);

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return function () {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <div
      className={`modal overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-end h-modal h-full md:inset-0 modal-rtl 
   ${show && 'enter-done'}`}
      onClick={() => {
        if (backdrop !== 'static') onClose();
      }}
      ref={nodeRef}
    >
      <div
        className={`no-scrollbar modal-content fixed overflow-y-auto max-h-screen md:relative h-auto ${
          size === ModalSize.LARGE
            ? 'min-w-4xl'
            : size === ModalSize.EXTRA_LARGE
            ? 'min-w-7xl'
            : size === ModalSize.SMALL
            ? 'min-w-[24.25rem] max-w-lg'
            : size === ModalSize.MEDIUM
            ? 'min-w-[24.25rem] max-w-2xl'
            : 'xl:w-[50rem] 2xl:min-w-xl 3xl:min-w-2xl max-sm:w-4/5'
        } ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative min-h-full ${
            transparent ? 'bg-transparent' : 'bg-white shadow'
          }`}
          onClick={(e) => {
            keyboard && e.stopPropagation();
          }}
        >
          {showClose && (
            <div
              className="absolute ltr:right-0 rtl:left-0 p-4 cursor-pointer"
              onClick={() => onClose()}
            >
              <CloseIcon />
            </div>
          )}
          <div className="h-full min-h-[50px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;