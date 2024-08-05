import { NextRouter } from 'next/router';
import { BadgeItem } from '../../types/events';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { SessionUtils } from './session.utils';

export const PushDataToGTM = <TValue>(event: GTMEvents, params: TValue) => {
  const pageEvent = {
    event,
    ...params,
  };
  //@ts-ignore
  window && window.dataLayer && window.dataLayer.push(pageEvent);
  return pageEvent;
};

export const PushDataToGTMWithSubEvents = <TValue>(
  event: GTMEvents,
  subevent: GTMSubEvents,
  params: TValue
) => {
  const pageEvent = {
    event,
    subevent,
    ...params,
  };
  //@ts-ignore
  window && window.dataLayer && window.dataLayer.push(pageEvent);
  return pageEvent;
};

//method to create filter data object
export const getFilterDataObj = (
  badges: Array<BadgeItem>,
  router: NextRouter
) => {
  const selectedMake = badges
    .filter((x: any) => x.type === 'Make')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedModel = badges
    .filter((x: any) => x.type === 'Model')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedBody = badges
    .filter((x: any) => x.type === 'BodyType')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedSpec = badges
    .filter((x: any) => x.type === 'Spec')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedPriceRange: any = badges
    .filter((x: any) => x.type === 'Price')
    .map((x: any) => x.value);

  const selectedYearRange: any = badges
    .filter((x: any) => x.type === 'Year')
    .map((x: any) => x.value);

  const selectedMileageRange: any = badges
    .filter((x: any) => x.type === 'Mileage')
    .map((x: any) => x.value);

  const selectedFeatures = badges
    .filter((x: any) => x.type === 'Feature')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedCity = badges
    .filter((x: any) => x.type === 'City')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedFuel = badges
    .filter((x: any) => x.type === 'FuelType')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedExteriorColor = badges
    .filter((x: any) => x.type === 'ExteriorColor')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedInteriorColor = badges
    .filter((x: any) => x.type === 'InteriorColor')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedOwnership = badges
    .filter((x: any) => x.type === 'Ownership')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedTransmission = badges
    .filter((x: any) => x.type === 'Transmission')
    .map((x: any) => x.displayValue)
    .join(',');

  const selectedSearchKey = badges
    .filter((x: any) => x.type === 'SearchKey')
    .map((x: any) => x.displayValue);

  const user = SessionUtils.getUserDetails();

  return {
    userId: user?.UserId
      ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
      : null,
    languageId: router.locale,
    make: selectedMake,
    searchKey: selectedSearchKey.length > 0 ? selectedSearchKey : null,
    model: selectedModel,
    trim: selectedSpec,
    bodyType: selectedBody,
    priceRangeFrom: selectedPriceRange[0]?.min,
    priceRangeTo: selectedPriceRange[0]?.max,
    mileageFrom: selectedMileageRange[0]?.min,
    mileageTo: selectedMileageRange[0]?.max,
    yearFrom: selectedYearRange[0]?.min,
    yearTo: selectedYearRange[0]?.max,
    features: selectedFeatures,
    city: selectedCity,
    fuelType: selectedFuel,
    interiorColor: selectedInteriorColor,
    exteriorColor: selectedExteriorColor,
    owner: selectedOwnership,
    transmissionType: selectedTransmission,
  };
};
