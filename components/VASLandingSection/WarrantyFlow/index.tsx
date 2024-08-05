import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { WarrantyConstants } from '../../../types/i18n.labels';
import Auth from './Auth';
import EnterKmDriven from './EnterKmDriven';
import SelectModel from './SearchModel';
import SelectManufactureYear from './SelectManufactureYear';
import SelectVariant from './SelectVariant';
import VerifyYourCars from './VerifyYourCars';

const WarrantyFlow = () => {
  const selector = useSelector(({ warranty }: RootState) => warranty);
  switch (selector.currentStep) {
    case WarrantyConstants.VerifyYourCar:
      return <VerifyYourCars />;
    case WarrantyConstants.SelectModel:
      return <SelectModel />;
    case WarrantyConstants.SelectVariant:
      return <SelectVariant />;
    case WarrantyConstants.Authentication:
      return <Auth />;
    case WarrantyConstants.SelectManufactureYear:
      return <SelectManufactureYear />;
    case WarrantyConstants.EnterKmDriven:
      return <EnterKmDriven />;
    default:
      return <></>;
  }
};

export default WarrantyFlow;
