import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import {
  setOpenWarrantyFlow,
  updateWarrantyStep,
} from '../../../../lib/vas/warranty-flow/warranty.slice';
import { WarrantyConstants } from '../../../../types/i18n.labels';
import { ArrowLeftIcon } from '../../../icons';

type BreadcrumbProps = {
  title?: string;
};

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  const currentStep = useAppSelector(({ warranty }) => warranty.currentStep);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    switch (currentStep) {
      case WarrantyConstants.VerifyYourCar: {
        dispatch(setOpenWarrantyFlow(false));
        break;
      }
      case WarrantyConstants.Authentication: {
        dispatch(updateWarrantyStep(WarrantyConstants.VerifyYourCar));
        break;
      }
      case WarrantyConstants.EnterKmDriven: {
        dispatch(updateWarrantyStep(WarrantyConstants.VerifyYourCar));
        break;
      }

      default:
        return null;
    }
  };
  return (
    <div className="flex items-center gap-1 mx-[20px] my-[20px]  ">
      <div
        className="h-[24px] w-[24px] flex items-center justify-center p-[5px] cursor-pointer"
        onClick={handleBack}
      >
        <ArrowLeftIcon className="!text-[#3E3E3E] rtl:rotate-90" />
      </div>
      <span className="text-[20px] font-medium">{title}</span>
    </div>
  );
};

export default Breadcrumb;
