import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/Modal';
import { useTranslation } from 'next-i18next';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CMSPageKey } from '../../types/constants';
import { Locales } from '../../types/enums';

type DisclaimerModalProps = {
  show: boolean;
  onClose: () => void;
  handleUserAcknowledgement: (isSelected: boolean) => void;
  configurationKey: string;
};

/**
 * This modal component open a window with disclaimer text and user acknowledgement checkbox.
 * @returns JSX.Element
 */
const DisclaimerModal = ({
  show,
  onClose,
  handleUserAcknowledgement,
  configurationKey,
}: DisclaimerModalProps) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [disclaimerMessage, setDisclaimerMessage] = useState<{
    [x: string]: string;
  }>({});
  const [disclaimerMessageInArabic, setDisclaimerMessageInArabic] = useState<{
    [x: string]: string;
  }>({});

  useEffect(() => {
    const fetchDisclaimerText = async () => {
      const data = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        configurationKey,
        Locales.EN
      );
      setDisclaimerMessage(data);
      const arabicData = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        configurationKey,
        Locales.AR
      );
      setDisclaimerMessageInArabic(arabicData);
    };
    fetchDisclaimerText();
  }, [configurationKey]);

  const handleCheckBox = (event: any) => {
    setIsSelected(event.target.checked);
    setShowWarning(false);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      containerClassName="lg:w-[75rem] w-auto"
    >
      <>
        <ModalHeader>
          <div className="justify-start border-b-2 pb-4">
            <h1 className="text-2xl text-gray-700 font-bold">
              {t(LabelConstants.DISCLAIMER)}
            </h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col">
            <div className="justify-center">
              <p dir="ltr">
                {
                  disclaimerMessage[
                    CMSConstants.OutletVehiclePurchaseDisclaimer
                  ]
                }
              </p>
              <br />
              <p dir="rtl">
                {
                  disclaimerMessageInArabic[
                    CMSConstants.OutletVehiclePurchaseDisclaimer
                  ]
                }
              </p>
            </div>
            <div className="mt-20">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={isSelected}
                  onChange={handleCheckBox}
                />
                <span className="font-normal">
                  {t(LabelConstants.I_ACKNOWLEDGE)}
                </span>
              </label>
            </div>
            {showWarning && (
              <>
                <p className=" pt-4 text-red-500">
                  {t(LabelConstants.PLEASE_SELECT_THE_CHECKBOX)}
                </p>
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-1 !text-sm sm:gap-5 border-t-2 pt-6 items-center ">
            <button
              className="btn btn-secondary btn-auto !w-32 text-center uppercase !min-h-[3.4rem]"
              onClick={onClose}
            >
              {t(LabelConstants.CANCEL)}
            </button>
            <button
              className="btn btn-primary btn-auto !w-32 text-center uppercase !min-h-[3.4rem]"
              onClick={() => {
                if (!isSelected) {
                  setShowWarning(true);
                } else if (isSelected) {
                  handleUserAcknowledgement(isSelected);
                  onClose();
                }
              }}
            >
              {t(LabelConstants.PROCEED)}
            </button>
          </div>
        </ModalFooter>
      </>
    </Modal>
  );
};

export default DisclaimerModal;
