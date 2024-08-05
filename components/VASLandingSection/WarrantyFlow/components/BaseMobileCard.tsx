import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import WarrantyFlow from '..';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import {
  setOpenWarrantyFlow,
  updateWarrantyFlow,
  warrantyInitialState,
} from '../../../../lib/vas/warranty-flow/warranty.slice';
import { WarrantyConstants } from '../../../../types/i18n.labels';
import { FadeIn, FadeUp } from '../../../common/Animations';
import Chip from '../../../common/Chip/Chip';
import Spinner from '../../../common/Spinner/spinner';
import { CloseBlackIcon } from '../../../icons';
import Breadcrumb from './Breadcrumb';

const BaseMobileCard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentWarrantyStep = useAppSelector(
    ({ warranty }) => warranty.currentStep
  );
  const loader = useAppSelector(({ warranty }) => warranty.loader);
  const isWarrantyOpen = useAppSelector(({ warranty }) => warranty.isOpen);
  const warrantyData = useAppSelector(({ warranty }) => warranty.data);

  useEffect(() => {
    console.log(isWarrantyOpen);
    if (isWarrantyOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isWarrantyOpen]);

  const handleCloseWarrantyPopup = () => {
    dispatch(updateWarrantyFlow({ ...warrantyInitialState }));
    dispatch(setOpenWarrantyFlow(false));
  };
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur h-screen w-screen fixed top-0 left-0 mx-auto z-[50] flex justify-center overflow-y-auto md:overflow-none">
      <div className="h-[99%] w-full md:w-[400px] md:min-h-[600px] md:max-h-[700px] absolute bottom-0 md:top-[120px] rounded-tr-2xl rounded-tl-2xl md:rounded-br-2xl md:rounded-bl-2xl z-20 bg-white shadow-[0px_-16px_20px_0px_#00000024] py-[20px] overflow-y-auto md:overflow-none">
        <div onClick={handleCloseWarrantyPopup}>
          <CloseBlackIcon
            className={`!h-[12px] !w-[12px] absolute top-[20px] ${
              router.locale! == 'ar' ? 'left-[21.6px]' : 'right-[21.6px]'
            } cursor-pointer`}
          />
        </div>
        <AnimatePresence>
          {loader && (
            <FadeIn className="h-full w-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 backdrop-blur-[2px] z-10">
              <Spinner className="!w-8 !h-8" />
            </FadeIn>
          )}
        </AnimatePresence>

        {/* {[
          WarrantyConstants.SelectManufactureYear,
          WarrantyConstants.EnterKmDriven,
        ].includes(currentWarrantyStep) && (
          <>
            <div className="mt-[40px] bg-[#F5F5F5] w-full h-[72px] pl-[62px] flex flex-col justify-center">
              <p className="text-[12px] opacity-[70%]">
                {warrantyData.brand.brandName} {warrantyData.model.modelName}{' '}
                {warrantyData.variant.variantName}
              </p>
              <div className="flex items-center text-[15px] font-medium gap-2">
                <p>2 Cylinder</p>
                <span className="text-[20px] font-medium">•</span>
                <p>1500cc</p>
                <span className="text-[20px] font-medium">•</span>
                <p>GCC</p>
              </div>
            </div>
          </>
        )} */}

        <div className="flex gap-[10px] items-center mx-[48px] mb-[16px]">
          {/* {![
            WarrantyConstants.SelectManufactureYear,
            WarrantyConstants.EnterKmDriven,
          ].includes(currentWarrantyStep) && (
          )} */}
          <>
            {warrantyData.brand.brandName && (
              <Chip text={warrantyData.brand.brandName} />
            )}
            {warrantyData.model.modelName && (
              <Chip text={warrantyData.model.modelName} />
            )}
            {warrantyData.variant.variantName && (
              <Chip text={warrantyData.variant.variantName} />
            )}
          </>
        </div>

        <FadeUp>
          <Breadcrumb title={t(WarrantyConstants[currentWarrantyStep])} />
        </FadeUp>
        <div className="h-auto md:min-h-[395px]">
          <WarrantyFlow />
        </div>
      </div>
    </div>
  );
};

export default BaseMobileCard;
