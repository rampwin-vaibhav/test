import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import SelfListingV1 from '..';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setOpenSelfListingFlow,
  updateSelfListingFlow,
  updateSelfListingStep,
  selfListingInitialState,
} from '../../../lib/self-listing/selfListing.slice';
import { SelfListingConstants } from '../../../types/i18n.labels';
import { FadeIn, FadeUp } from '../../common/Animations';
import ChipV1 from '../../common/ChipV1/ChipV1';
import Spinner from '../../common/Spinner/spinner';
import { CloseBlackIcon, CloseIcon } from '../../icons';
import Breadcrumb from './Breadcrumb';
import SelectedVehicleDetailsCard from './SelectedVehicleDetailsCard';
import Image from 'next/image';

const BaseMobileCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentSelfListingStep = useAppSelector(
    ({ selfListing }) => selfListing.currentStep
  );
  const loader = useAppSelector(({ selfListing }) => selfListing.loader);
  const selfListingData = useAppSelector(({ selfListing }) => selfListing.data);
  const isFormClicked = useAppSelector(
    ({ selfListing }) => selfListing.hasClickedVehicleDetailsForm
  );

  useEffect(() => {
    // document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseSelfListingPopup = () => {
    dispatch(updateSelfListingFlow({ ...selfListingInitialState }));
    dispatch(setOpenSelfListingFlow(false));
  };

  const handleChipClick = (step: SelfListingConstants) => {
    dispatch(updateSelfListingStep(step));
  };

  return (
    <div className="scrollbar-v1 bg-black bg-opacity-50 backdrop-blur h-screen w-screen fixed top-0 left-0 mx-auto z-[50] flex justify-center">
      <div
        className={`h-full transition-all duration-300 w-full ${
          currentSelfListingStep === SelfListingConstants.SelfListingBuyPackage
            ? 'sm:w-full sm:h-full md:rounded-none'
            : 'sm:h-[99%] md:w-[400px] md:min-h-[600px] md:max-h-[650px] md:rounded-2xl'
        } absolute bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 bg-white shadow-[0px_-16px_20px_0px_#00000024] py-[20px] overflow-hidden`}
      >
        {currentSelfListingStep ===
          SelfListingConstants.SelfListingVerifyYourCar && (
          <div className="w-full absolute -z-10 top-0 left-0 bg-[#F8F8F8]">
            <div
              className={`relative w-full ${
                isFormClicked ? 'aspect-[36/14]' : 'aspect-[36/20]'
              } mx-auto mb-[16px] transition-all overflow-hidden`}
            >
              <div className="relative w-full aspect-[36/20]">
                <Image alt="" src={`/images/customer.jpg`} layout="fill" />
                <div
                  className={`absolute ${
                    isFormClicked ? 'backdrop-blur' : 'backdrop-blur-none'
                  } w-full h-full top-0 lef bg-[linear-gradient(217.28deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.5)_100%)]`}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div
          onClick={handleCloseSelfListingPopup}
          className="absolute hidden sm:flex items-center justify-center top-[10px] right-[10px] rtl:right-auto rtl:left-[10px] cursor-pointer w-[24px] h-[24px] rounded-full bg-[#F0F0F0] "
        >
          <CloseIcon className="!h-[8px] !w-[8px] text-[#757575] " />
        </div>
        <AnimatePresence>
          {loader && (
            <FadeIn className="h-full w-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 backdrop-blur-[2px] !z-50">
              {/* <Spinner className="!w-8 !h-8" /> */}
              <div className="relative h-16 aspect-[1000/359] ">
                <Image alt="" src={'/images/loader.gif'} layout="fill" />
              </div>
            </FadeIn>
          )}
        </AnimatePresence>

        <div className="flex gap-[10px] items-center mobile-scroll mx-[48px] rtl:ml-auto rtl:mr-[48px] mb-[16px]">
          {[
            SelfListingConstants.SelfListingSelectBrand,
            SelfListingConstants.SelfListingSelectManufactureYear,
            SelfListingConstants.SelfListingSelectModel,
            SelfListingConstants.SelfListingSelectVariant,
          ].includes(currentSelfListingStep) && (
            <>
              {selfListingData.variant.variantName && (
                <ChipV1
                  active={
                    currentSelfListingStep ===
                    SelfListingConstants.SelfListingSelectVariant
                  }
                  onClick={() =>
                    handleChipClick(
                      SelfListingConstants.SelfListingSelectVariant
                    )
                  }
                  text={selfListingData.variant.variantName}
                />
              )}

              {selfListingData.model.modelName && (
                <ChipV1
                  active={
                    currentSelfListingStep ===
                    SelfListingConstants.SelfListingSelectModel
                  }
                  onClick={() =>
                    handleChipClick(SelfListingConstants.SelfListingSelectModel)
                  }
                  text={selfListingData.model.modelName}
                />
              )}

              {selfListingData.manufacture_year.year && (
                <ChipV1
                  active={
                    currentSelfListingStep ===
                    SelfListingConstants.SelfListingSelectManufactureYear
                  }
                  onClick={() =>
                    handleChipClick(
                      SelfListingConstants.SelfListingSelectManufactureYear
                    )
                  }
                  text={selfListingData.manufacture_year.year.toString()}
                />
              )}

              {selfListingData.brand.brandName && (
                <ChipV1
                  active={
                    currentSelfListingStep ===
                    SelfListingConstants.SelfListingSelectBrand
                  }
                  onClick={() =>
                    handleChipClick(SelfListingConstants.SelfListingSelectBrand)
                  }
                  text={selfListingData.brand.brandName}
                />
              )}
            </>
          )}
        </div>
        {currentSelfListingStep ===
          SelfListingConstants.SelfListingSelectCity && (
          <SelectedVehicleDetailsCard hideDemandInfo />
        )}
        {currentSelfListingStep ===
          SelfListingConstants.SelfListingAuthentication && (
          <SelectedVehicleDetailsCard />
        )}

        <FadeUp>
          <Breadcrumb title={t(SelfListingConstants[currentSelfListingStep])} />
        </FadeUp>
        <div className="h-full md:h-[545px]">
          <SelfListingV1 />
        </div>
      </div>
    </div>
  );
};

export default BaseMobileCard;
