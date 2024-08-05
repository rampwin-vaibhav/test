import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { SelfListingConstants } from '../../types/i18n.labels';
import List from './components/List';
import { VehicleService } from '../../helpers/services';
import { ModelYearData } from '../../types/models';

const SelectManufactureYear = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const [modelYears, setModelYears] = useState<ModelYearData[]>([]);
  const currentFlowData = useAppSelector(({ selfListing }) => selfListing.data);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);

  useEffect(() => {
    const initialLoad = async () => {
      dispatch(setLoader(true));
      let yearsData = await VehicleService.fetchModelYearAutoData();
      dispatch(setLoader(false));
      setModelYears(
        yearsData
          .filter(
            (item, index) =>
              yearsData.findIndex(
                (prevItem) => prevItem.ModelYear === item.ModelYear
              ) === index
          )
          .sort((a, b) => parseInt(b.ModelYear) - parseInt(a.ModelYear))
      );
    };
    initialLoad();
  }, [dispatch]);

  const handleManufactureYear = async (value: {
    value: number | string;
    label: string | null;
  }) => {
    let selectedYear = modelYears.find(
      (item) => item.ModelYearCode === value.value
    );
    dispatch(
      updateSelfListingFlow({
        manufacture_year: {
          year: parseInt(selectedYear!.ModelYear),
          yearCode: selectedYear!.ModelYearCode,
        },
      })
    );
    dispatch(
      updateSelfListingStep(SelfListingConstants.SelfListingSelectModel)
    );
    if (cleverTap) {
      cleverTap.event?.push('sl_manufacture_year_selected');
    }
  };

  return (
    <Fragment>
      <div className="mx-[26px] mt-[4px] h-[82vh] md:h-[488px] overflow-scroll overflow-x-hidden">
        <List
          itemsClasses="text-[15px] text-[#000000] py-[20px] border-b border-[#E0E0E0] "
          selectedId={currentFlowData.manufacture_year.yearCode}
          items={modelYears
            .filter((itm) => parseInt(itm.ModelYear) <= currentYear)
            .map((item) => ({
              label: item.ModelYear,
              value: item.ModelYearCode,
            }))}
          onClick={(value) => handleManufactureYear(value)}
        />
      </div>
    </Fragment>
  );
};

export default SelectManufactureYear;
