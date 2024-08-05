import { useState } from 'react';
import { SessionUtils } from '../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setHasClickedVehicleDetailsForm,
  setOpenSelfListingFlow,
  updateSelfListingStep,
} from '../../../lib/self-listing/selfListing.slice';
import { SelfListingConstants } from '../../../types/i18n.labels';
import { ArrowLeftIcon } from '../../icons';
import PhotosTipsChip from './PhotosTipsChip';
import PhotosTips from './PhotosTips';

type BreadcrumbProps = {
  title?: string;
};

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  const currentStep = useAppSelector(
    ({ selfListing }) => selfListing.currentStep
  );
  const userData = useAppSelector(
    ({ selfListing }) => selfListing.user_details
  );
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const dispatch = useAppDispatch();

  const [showPhotosTips, setShowPhotosTips] = useState<boolean>(false);

  const handleBack = () => {
    switch (currentStep) {
      case SelfListingConstants.SelfListingSelectBrand: {
        dispatch(setOpenSelfListingFlow(false));
        dispatch(setHasClickedVehicleDetailsForm(false));
        break;
      }
      // case SelfListingConstants.SelfListingSelectBrand: {
      //   dispatch(
      //     updateSelfListingStep(SelfListingConstants.SelfListingVerifyYourCar)
      //   );
      //   break;
      // }
      case SelfListingConstants.SelfListingSelectManufactureYear: {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingSelectBrand)
        );
        break;
      }
      case SelfListingConstants.SelfListingSelectModel: {
        dispatch(
          updateSelfListingStep(
            SelfListingConstants.SelfListingSelectManufactureYear
          )
        );
        break;
      }
      case SelfListingConstants.SelfListingSelectVariant: {
        if (userData.userId && userData.sequenceNo) {
          dispatch(setOpenSelfListingFlow(false));
          dispatch(setHasClickedVehicleDetailsForm(false));
        } else {
          dispatch(
            updateSelfListingStep(SelfListingConstants.SelfListingSelectModel)
          );
        }
        break;
      }
      case SelfListingConstants.SelfListingSelectCity: {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingSelectVariant)
        );
        break;
      }
      case SelfListingConstants.SelfListingAuthentication: {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingSelectCity)
        );
        break;
      }
      case SelfListingConstants.SelfListingEnterKmDriven: {
        if (!SessionUtils.isValidSession()) {
          dispatch(
            updateSelfListingStep(
              SelfListingConstants.SelfListingAuthentication
            )
          );
        } else {
          dispatch(
            updateSelfListingStep(SelfListingConstants.SelfListingSelectCity)
          );
        }
        break;
      }
      case SelfListingConstants.SelfListingUploadCarImages: {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingEnterKmDriven)
        );
        break;
      }
      case SelfListingConstants.SelfListingEnterExpectedPrice: {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingUploadCarImages)
        );
        break;
      }
      case SelfListingConstants.SelfListingCarListingReady: {
        dispatch(
          updateSelfListingStep(
            SelfListingConstants.SelfListingEnterExpectedPrice
          )
        );
        break;
      }

      case SelfListingConstants.SelfListingCarSuccessfullyListed: {
        dispatch(setOpenSelfListingFlow(false));
        dispatch(setHasClickedVehicleDetailsForm(false));
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingVerifyYourCar)
        );
        break;
      }
      case SelfListingConstants.SelfListingBuyPackage: {
        dispatch(
          updateSelfListingStep(
            SelfListingConstants.SelfListingCarSuccessfullyListed
          )
        );
        break;
      }

      case SelfListingConstants.SelfListingConfirmYourDetails: {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingBuyPackage)
        );
        break;
      }

      case SelfListingConstants.SelfListingPaymentRecieved: {
        dispatch(setOpenSelfListingFlow(false));
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingVerifyYourCar)
        );
        break;
      }

      default:
        return null;
    }
  };
  return (
    <div className="flex items-center gap-1 justify-between ml-[20px] mr-[20px] rtl:ml-[20px] rtl:mr-[20px] my-[20px]">
      {currentStep === SelfListingConstants.SelfListingVerifyYourCar ? (
        <div
          className="h-[32px] w-[32px] bg-white shadow-[0px_1px_8px_0px_#0000001A] rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleBack}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rtl:rotate-180"
          >
            <path
              d="M7.99972 14.8569L1.14258 7.99972L7.99972 1.14258"
              stroke="#212121"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.8569 8H1.14258"
              stroke="#212121"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {currentStep ===
            SelfListingConstants.SelfListingCarSuccessfullyListed ||
          currentStep === SelfListingConstants.SelfListingPaymentRecieved ? (
            <div
              className="h-[24px] w-[24px] z-10 flex items-center justify-center p-[5px] cursor-pointer"
              onClick={handleBack}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L1 13"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1L13 13"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div
              className="h-[24px] w-[24px] z-10 flex items-center justify-center p-[5px] cursor-pointer"
              onClick={handleBack}
            >
              <ArrowLeftIcon className="!text-[#3E3E3E] rtl:rotate-90" />
            </div>
          )}
          {currentStep !==
            SelfListingConstants.SelfListingCarSuccessfullyListed &&
            currentStep !== SelfListingConstants.SelfListingPaymentRecieved &&
            currentStep && (
              <span className={'text-[20px] font-medium'}>{title}</span>
            )}
        </div>
      )}
      {(currentStep === SelfListingConstants.SelfListingUploadCarImages ||
        currentStep === SelfListingConstants.SelfListingSelectCoverImage) && (
        <PhotosTipsChip
          onClick={(e) => {
            e.preventDefault();
            setShowPhotosTips(true);
            if (cleverTap) {
              cleverTap.event?.push('sl_tips_of_photos_clicked');
            }
          }}
        />
      )}
      {showPhotosTips && (
        <PhotosTips
          closeTips={(e) => {
            e.preventDefault();
            setShowPhotosTips(false);
          }}
        />
      )}
    </div>
  );
};

export default Breadcrumb;
