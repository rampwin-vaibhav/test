import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { Modal, ModalBody, ModalSize } from '../common/Modal';
import { SetStateAction, useState } from 'react';
import MessageBox, { MessageBoxType } from '../common/MessageBox';
import { ProductReferenceType } from '../../types/enums';
import { ListingService } from '../../helpers/services';
import { useRouter } from 'next/router';
import { ImageWithFallback } from '../common/ImageWithFallback';

type modalProps = {
  openCashFinanceModal: boolean;
  setOpenCashFinanceModal: (value: SetStateAction<boolean>) => void;
  vehicleId: number;
};

const CashFinanceModal = (props: modalProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [markedForFinance, setMarkedForFinance] = useState(false);

  const handleAddToCart = async (markedForFinance: boolean) => {
    setMarkedForFinance(markedForFinance);
    const payload = {
      ProductReferenceType: ProductReferenceType.Vehicle,
      ProductReferenceId: props.vehicleId,
      VehicleListingId: props.vehicleId,
      MarkedForFinance: markedForFinance,
    };
    const res = await ListingService.addToCart(payload);
    if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
      await MessageBox.open({
        content: `${t(LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM)}`,
        type: MessageBoxType.Message,
      });
    }
    if (res.MessageCode === 'SHOPPIONG_CARD_CONTAINS_ANOTHER_ITEM') {
      setShowValidationModal(true);
    }
    if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
      await MessageBox.open({
        content: `${t(LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM)}`,
        type: MessageBoxType.Message,
      });
    }
    if (res.IsSuccess) {
      router.push('/cart');
    }
  };

  const handleReplaceItem = async () => {
    const payload = {
      ProductReferenceType: ProductReferenceType.Vehicle,
      ProductReferenceId: props.vehicleId,
      VehicleListingId: props.vehicleId,
      MarkedForFinance: markedForFinance,
      IsAllowToProceed: true,
    };
    const res = await ListingService.addToCart(payload);
    if (res.IsSuccess) {
      router.push('/cart');
    }
  };
  return (
    <>
      <Modal
        show={props.openCashFinanceModal}
        onClose={() => {
          props.setOpenCashFinanceModal(false);
        }}
        containerClassName="min-w-md max-w-3xl"
      >
        <ModalBody>
          <div className="flex flex-col gap-5">
            <div className="text-primary text-2xl text-start">
              {t(LabelConstants.HOW_WOULD_YOU_LIKE_TO_PROCEED_MSG)}
            </div>
            <hr />
            <div className="text-base text-dark-gray1">
              {t(LabelConstants.CASH_FINANCE_OPTION_MSG)}
            </div>
            <div className="flex gap-[18px] w-full">
              <div
                className="border border-dark-gray2 rounded-[4px] w-1/2 p-4 flex flex-col gap-6 cursor-pointer"
                onClick={() => {
                  handleAddToCart(false);
                }}
              >
                <div className="text-2xl font-bold">
                  {t(LabelConstants.PAY_BY_LBL)}
                </div>
                <div className="flex flex-wrap gap-[10px]">
                  <div className="border px-0.5">
                    <ImageWithFallback
                      src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/casamada.svg`}
                      className="w-10 h-8"
                      onErrorRender={() => (
                        <div className="bg-slate-100 h-full w-full"></div>
                      )}
                    />
                  </div>
                  <div className="border px-0.5">
                    <ImageWithFallback
                      src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/mastercard-1.svg`}
                      className="w-10 h-8"
                      onErrorRender={() => (
                        <div className="bg-slate-100 h-full w-full"></div>
                      )}
                    />
                  </div>
                  <div className="border px-0.5">
                    <ImageWithFallback
                      src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/visa-1.svg`}
                      className="w-10 h-8"
                      onErrorRender={() => (
                        <div className="bg-slate-100 h-full w-full"></div>
                      )}
                    />
                  </div>
                  <div className="border px-0.5">
                    <ImageWithFallback
                      src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/stcpay.svg`}
                      className="w-10 h-8"
                      onErrorRender={() => (
                        <div className="bg-slate-100 h-full w-full"></div>
                      )}
                    />
                  </div>
                  <div className="border px-0.5 w-12 h-8 sm:h-auto flex items-center">
                    <ImageWithFallback
                      src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/iban.png`}
                      onErrorRender={() => (
                        <div className="bg-slate-100 h-full w-full"></div>
                      )}
                    />
                  </div>
                </div>
                <div className="text-sm text-dark-gray2">
                  {t(LabelConstants.PAY_FULL_AMOUNT_MSG)}
                </div>
              </div>
              <div
                className="border border-dark-gray2 rounded-[4px] w-1/2 p-4 flex flex-col gap-3 cursor-pointer"
                onClick={() => {
                  handleAddToCart(true);
                }}
              >
                <div className="text-2xl font-bold">
                  {t(LabelConstants.FINANCE_IT_MSG)}
                </div>
                <div className="w-14 h-14">
                  <ImageWithFallback
                    src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/finpal_logo2.png`}
                    onErrorRender={() => (
                      <div className="bg-slate-100 h-full w-full"></div>
                    )}
                  />
                </div>
                <div className="text-sm mb-4 text-dark-gray2">
                  <span>
                    {t(LabelConstants.MULTIPLE_FINANCE_MSG)}
                    <picture className="inline">
                      <source
                        srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/finpal_logo1.png`}
                        type="image/png"
                      />
                      <img
                        src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/finpal_logo1.png`}
                        alt="gogo motor"
                        className="w-14 inline lt:mr-1 rtl:ml-1"
                      />
                    </picture>
                    -{t(LabelConstants.FINANCE_SERVICE_MSG)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        show={showValidationModal}
        onClose={() => {
          setShowValidationModal(false);
        }}
        size={ModalSize.MEDIUM}
      >
        <ModalBody>
          <div className="flex flex-col flex-wrap gap-8">
            <h1 className="text-large leading-7">{`${t(
              LabelConstants.EXISTING_ITEM_MESSAGE
            )}`}</h1>
            <div className="flex items-center justify-center gap-4">
              <button
                className="btn btn-secondary uppercase btn-modal"
                onClick={() => setShowValidationModal(false)}
              >
                {t(LabelConstants.NO)}
              </button>
              <button
                className="btn btn-primary uppercase btn-modal"
                onClick={() => handleReplaceItem()}
              >
                {t(LabelConstants.REPLACE)}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CashFinanceModal;
