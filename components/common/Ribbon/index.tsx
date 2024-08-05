import { ReactElement } from 'react';
import { LabelConstants } from '../../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { RibbonIcon } from '../../icons';
import { ListingStatus } from '../../../types/enums';
/**
 * This component renders a ribbon element on the cars card if the car is new.
 * @returns JSX.Element
 */
type RibbonProps = {
  type?: 'New' | 'Sold' | 'Outlet' | 'Booked';
  isLarge?: boolean;
};
const Ribbon = ({
  type = 'New',
  isLarge = false,
}: RibbonProps): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="absolute">
      {isLarge ? (
        <>
          <RibbonIcon className={`h-[7.166rem] rtl:scale-x-[-1]`} />
          <span className="absolute bottom-0 ltr:rotate-[-40deg] rtl:rotate-[40deg] top-7 left-10 text-white text-2xl font-bold leading-6">
            {type === 'Sold'
              ? t(LabelConstants.SOLD)
              : type === 'Outlet'
              ? t(LabelConstants.OUTLET)
              : type === 'Booked'
              ? t(LabelConstants.BOOKED)
              : t(LabelConstants.NEW)}
          </span>
        </>
      ) : (
        <>
          <RibbonIcon
            className={`w-[4.938rem] h-[4.188rem] rtl:scale-x-[-1]`}
          />
          <span
            className={`absolute bottom-0 text-white text-base font-medium leading-6 ${
              type === 'Outlet' || type === 'Booked'
                ? 'p-2 transform ltr:rotate-[-40deg] rtl:rotate-[40deg] top-1 ltr:left-0 rtl:left-2'
                : 'ltr:rotate-[-40deg] rtl:rotate-[40deg] top-3 left-5'
            }`}
          >
            {type === 'Sold'
              ? t(LabelConstants.SOLD)
              : type === 'Outlet'
              ? t(LabelConstants.OUTLET)
              : type === 'Booked'
              ? t(LabelConstants.BOOKED)
              : t(LabelConstants.NEW)}
          </span>
        </>
      )}
    </div>
  );
};

export default Ribbon;
