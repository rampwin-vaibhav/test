import { useTranslation } from 'next-i18next';
import { CMSConstants, LabelConstants } from '../../../types/i18n.labels';
import { Modal, ModalBody, ModalFooter, ModalSize } from '../Modal';
import { SetStateAction, useEffect, useState } from 'react';
import ConfigurationService from '../../../helpers/services/configuration.service';
import { CMSPageKey } from '../../../types/constants';
import { useRouter } from 'next/router';

type ShowRestrictUserDropdownProps = {
  showDropdown: boolean;
  setShowDropdown: (value: SetStateAction<boolean>) => void;
};

const ShowRestrictUserDropdown = ({
  showDropdown,
  setShowDropdown,
}: ShowRestrictUserDropdownProps) => {
  const [disclaimerText, setDisclaimerText] = useState<{ [x: string]: string }>(
    {}
  );
  const router = useRouter();
  useEffect(() => {
    const loadDisclaimerText = async () => {
      const disclaimerTextData =
        await ConfigurationService.fetchCMSCLabelConstant(
          CMSPageKey.Information,
          null,
          router.locale
        );
      setDisclaimerText(disclaimerTextData);
    };
    loadDisclaimerText();
  }, [router.locale]);

  const { t } = useTranslation();
  return (
    <Modal
      show={showDropdown}
      onClose={() => setShowDropdown(false)}
      size={ModalSize.DEFAULT}
    >
      <>
        <ModalBody>
          <div className="sm:w-[35.563rem] w-auto">
            <h1 className="text-xl text-primary leading-7 pt-5">
              {disclaimerText[CMSConstants.RESTRICT_ONBOARDING]}
            </h1>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center gap-1 sm:gap-5 border-t-2 pt-4">
            <button
              className="btn btn-secondary btn-auto !w-32 text-center uppercase"
              onClick={() => setShowDropdown(false)}
            >
              {t(LabelConstants.OK)}
            </button>
          </div>
        </ModalFooter>
      </>
    </Modal>
  );
};

export default ShowRestrictUserDropdown;
