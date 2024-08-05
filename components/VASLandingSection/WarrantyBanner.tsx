import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setOpenWarrantyFlow,
  setWarrantyFlowType,
} from '../../lib/vas/warranty-flow/warranty.slice';
import { WarrantyTypeConstants } from '../../types/i18n.labels';
import { FadeUp } from '../common/Animations';
import { BackArrowIcon } from '../icons';

const WarrantyBanner = () => {
  const { t } = useTranslation();
  const [isWarrantyBannerOpen, setIsWarrantyBannerOpen] = useState(true);

  const isWarrantyFlowOpen = useAppSelector(({ warranty }) => warranty.isOpen);

  const dispatch = useAppDispatch();
  const handleOpenWarrantyFlow = (type: WarrantyTypeConstants) => {
    dispatch(setOpenWarrantyFlow(true));
    dispatch(setWarrantyFlowType(type));
  };

  return (
    <Fragment>
      <AnimatePresence>
        <FadeUp className="w-full left-0 sticky -bottom-2 md:m-auto bg-primary py-[16px] px-[20px] flex items-center justify-between flex-row md:w-[960px] pt-[46px] gap-3 rounded-t-2xl z-10  rtl:flex-row">
          <button
            className="absolute top-[16px] ltr:right-[16px] rtl:left-[16px] text-[14px] font-semibold underline border-none bg-none text-white"
            onClick={() =>
              setIsWarrantyBannerOpen(isWarrantyBannerOpen ? false : true)
            }
          >
            {isWarrantyBannerOpen ? t('HIDE') : t('SHOW')}
          </button>

          {isWarrantyBannerOpen && (
            <>
              <p className="relative text-white text-[18px] leading-[22px] w-[292px] md:w-full text-center md:text-left md:text-[24px] rtl:flex">
                {t('WARRANTY_BANNER_TEXT')}
              </p>

              <button
                className="w-[154px] bg-white rounded-[60px] text-black py-[14px] text-[15px] font-semibold  flex gap-1 justify-center items-center"
                onClick={() =>
                  handleOpenWarrantyFlow(WarrantyTypeConstants.PreOwnedCar)
                }
              >
                {t('BUY_NOW')}
                <BackArrowIcon className="w-[20px] h-[20px]" fill="#000000" />
              </button>
            </>
          )}
        </FadeUp>
      </AnimatePresence>
    </Fragment>
  );
};

export default WarrantyBanner;
