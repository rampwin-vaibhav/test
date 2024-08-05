import React from 'react';
import { RootState } from '../../lib/store';
import { useSelector } from 'react-redux';
import { SelfListingConstants } from '../../types/i18n.labels';
import SelectBrand from './SelectBrand';
import SelectManufactureYear from './SelectManufactureYear';
import SelectModel from './SearchModel';
import SelectVariant from './SelectVariant';
import SelectCity from './SelectCity';
import Auth from './Auth';
import EnterKmDriven from './EnterKmDriven';
import UploadCarImages from './UploadCarImages';
import VerifyYourCar from './VerifyYourCar';
import SelectCoverImage from './SelectCoverImage';
import SetExpectedPrice from './SetExpectedPrice';
import CarListingReady from './CarListingReady';
import CarSuccessfullyListed from './CarSuccessfullyListed';
import BuyPackage from './packages/BuyPackage';
import ConfirmYourDetails from './packages/ConfirmYourDetails';
import PaymentRecieved from './packages/PaymentRecieved';
import VehicleConfirmation from './components/VehicleConfirmation';

const SelfListingV1 = () => {
  const selector = useSelector(({ selfListing }: RootState) => selfListing);
  switch (selector.currentStep) {
    case SelfListingConstants.SelfListingVerifyYourCar:
      return <VerifyYourCar />;
    case SelfListingConstants.SelfListingVehicleConfirmation:
      return <VehicleConfirmation />;
    case SelfListingConstants.SelfListingSelectBrand:
      return <SelectBrand />;
    case SelfListingConstants.SelfListingSelectManufactureYear:
      return <SelectManufactureYear />;
    case SelfListingConstants.SelfListingSelectModel:
      return <SelectModel />;
    case SelfListingConstants.SelfListingSelectVariant:
      return <SelectVariant />;
    case SelfListingConstants.SelfListingSelectCity:
      return <SelectCity />;
    case SelfListingConstants.SelfListingAuthentication:
      return <Auth />;
    case SelfListingConstants.SelfListingEnterKmDriven:
      return <EnterKmDriven />;
    case SelfListingConstants.SelfListingUploadCarImages:
      return <UploadCarImages />;
    case SelfListingConstants.SelfListingSelectCoverImage:
      return <SelectCoverImage />;
    case SelfListingConstants.SelfListingEnterExpectedPrice:
      return <SetExpectedPrice />;
    case SelfListingConstants.SelfListingCarListingReady:
      return <CarListingReady />;
    case SelfListingConstants.SelfListingCarSuccessfullyListed:
      return <CarSuccessfullyListed />;
    case SelfListingConstants.SelfListingBuyPackage:
      return <BuyPackage />;
    case SelfListingConstants.SelfListingConfirmYourDetails:
      return <ConfirmYourDetails />;
    case SelfListingConstants.SelfListingPaymentRecieved:
      return <PaymentRecieved />;
    default:
      return <></>;
  }
};

export default SelfListingV1;
