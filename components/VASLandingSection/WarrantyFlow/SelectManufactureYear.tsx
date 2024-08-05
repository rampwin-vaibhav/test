import { Fragment } from 'react';
import { useAppDispatch } from '../../../lib/hooks';
import {
  updateWarrantyFlow,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import { WarrantyConstants } from '../../../types/i18n.labels';
import List from './components/List';

const SelectManufactureYear = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const handleManufactureYear = (value: {
    value: number | string;
    label: string | null;
  }) => {
    dispatch(updateWarrantyFlow({ manufacture_year: value }));
    dispatch(updateWarrantyStep(WarrantyConstants.EnterKmDriven));
  };

  return (
    <Fragment>
      <div className="mx-[26px] mt-[4px] h-[82vh] md:h-[350px] overflow-scroll overflow-x-hidden">
        <List
          items={[...Array(10)].map((_, index) => ({
            label: `${currentYear - index}`,
            value: currentYear - index,
          }))}
          onClick={(value) => handleManufactureYear(value)}
        />
      </div>
    </Fragment>
  );
};

export default SelectManufactureYear;
