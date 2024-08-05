import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RedirectURL } from '../../../types/constants';
import { LabelConstants } from '../../../types/i18n.labels';
import { Modal, ModalBody } from '../../common/Modal';

type SignInModalProps = {
  message?: string;
  show: boolean;
  onClose: () => void;
};

/**
 * This modal component open a window with vehicle sharing options.
 * @returns JSX.Element
 */
const SignInModal = ({ message, show, onClose }: SignInModalProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onSignInClickHandler = async () => {
    localStorage.setItem(RedirectURL, router.asPath);
    // const response = await AuthService.fetchSignInUrl(
    //   CommonUtils.getLanguageId(router.locale!)
    // );
    // if (response) {
    //   window.location.href = response;
    // }
    router.push('/sign-in');
  };

  return (
    <Modal backdrop="static" show={show} onClose={onClose}>
      <ModalBody>
        <div className="flex flex-col gap-10 p-2 items-center justify-center">
          <div className="text-lg font-bold text-gray-600">
            {message ? message : t(LabelConstants.SIGN_IN_TO_GET_STARTED)}
          </div>
          <div className="flex justify-center gap-3 w-full">
            <button
              className="btn btn-primary btn-modal font-bold uppercase"
              onClick={onSignInClickHandler}
            >
              {t(LabelConstants.SIGN_IN)}
            </button>
            <button
              className="btn btn-secondary btn-modal font-bold uppercase"
              onClick={onClose}
            >
              {t(LabelConstants.CANCEL)}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SignInModal;
