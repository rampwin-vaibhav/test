import { i18n } from 'next-i18next';
import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '../Modal';

export enum MessageBoxType {
  Message = 'Message',
  Alert = 'Alert',
  Confirmation = 'Confirmation',
}

export enum MessageBoxResult {
  Nope = 'nope',
  Yes = 'Yes',
  No = 'No',
  OK = 'OK',
}

const defaultProps: {
  title?: string;
  content: ReactElement | string;
  container: string;
  type?: keyof typeof MessageBoxType;
  showHeader?: boolean;
  positiveButton?: string;
  negativeButton?: string;
  showGrid?: boolean;
  showClose?: boolean;
  backdrop?: 'static';
} = {
  content: <></>,
  container: '#app-message-box',
  type: MessageBoxType.Message,
  showHeader: false,
  positiveButton: undefined,
  negativeButton: undefined,
  showGrid: false,
  showClose: true,
};

const MessageBox = {
  open: (
    props: Omit<typeof defaultProps, 'container'>
  ): Promise<MessageBoxResult> => {
    return new Promise<MessageBoxResult>((resolve) => {
      const { title, content, container, type, showGrid, showClose, backdrop } =
        {
          ...defaultProps,
          ...props,
        };

      const handleClose = (value: MessageBoxResult) => {
        containerRoot.unmount();
        return resolve(value);
      };

      const containerElement = document.querySelector(container);
      if (!containerElement) throw Error(`can't find container ${container}`);
      const containerRoot = createRoot(containerElement);

      containerRoot.render(
        <Modal
          show={true}
          onClose={() => handleClose(MessageBoxResult.Nope)}
          size={ModalSize.SMALL}
          showClose={showClose}
          backdrop={backdrop}
        >
          <>
            <ModalHeader showGrid={showGrid}>
              <>
                {(props.showHeader || title) && (
                  <>
                    {title
                      ? title
                      : type === MessageBoxType.Message
                      ? 'Message Box'
                      : type === MessageBoxType.Alert
                      ? 'Alert'
                      : type === MessageBoxType.Confirmation
                      ? 'Confirmation'
                      : 'Message Box'}
                  </>
                )}
              </>
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="flex justify-center text-base text-dark-gray1">
                  {content}
                </div>
              </div>
            </ModalBody>
            <ModalFooter showGrid={showGrid}>
              <div className="flex justify-center gap-2">
                {type === MessageBoxType.Confirmation ? (
                  <>
                    <button
                      className="btn btn-primary btn-modal uppercase"
                      onClick={() => handleClose(MessageBoxResult.Yes)}
                    >
                      {props.positiveButton
                        ? props.positiveButton
                        : `${i18n?.t(LabelConstants.YES)}`}
                    </button>
                    <button
                      className="btn btn-primary-outline btn-modal uppercase"
                      onClick={() => handleClose(MessageBoxResult.No)}
                    >
                      {props.negativeButton
                        ? props.negativeButton
                        : `${i18n?.t(LabelConstants.NO)}`}
                    </button>
                  </>
                ) : null}
                {type === MessageBoxType.Alert ||
                type === MessageBoxType.Message ? (
                  <button
                    className="btn btn-primary btn-modal uppercase"
                    onClick={() => handleClose(MessageBoxResult.OK)}
                  >
                    {props.positiveButton
                      ? props.positiveButton
                      : `${i18n?.t(LabelConstants.OK)}`}
                  </button>
                ) : null}
              </div>
            </ModalFooter>
          </>
        </Modal>
      );
    });
  },
};

export default MessageBox;
