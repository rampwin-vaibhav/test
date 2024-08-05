import { SetStateAction } from 'react';
import router from 'next/router';
import { Range } from '../../types/models';
import RangeSlider from '../common/RangeSlider';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { formatNumber } from '../../helpers/utilities';
import { NextPage } from 'next';

type BudgetProps = {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  conciergeID: number | null;
  route: string | undefined;
  setSelectedPriceRange: (value: SetStateAction<Range | undefined>) => void;
  selectedPriceRange: Range | undefined;
};

const Budget: NextPage<BudgetProps> = ({
  minPrice,
  maxPrice,
  conciergeID,
  route,
  setSelectedPriceRange,
  selectedPriceRange,
}) => {
  const { t } = useTranslation();

  const handlePriceChange = (price: Range) => {
    setSelectedPriceRange(price);
  };

  return (
    <div className="min-h-[28.125rem] p-8 pb-8 flex flex-col">
      <div className="mt-36 flex flex-col items-center justify-center">
        <div className="w-full md:px-36 lg:px-52">
          <div className="flex min-[430px]:flex-row flex-col text-xl justify-between items-center gap-4 mb-4">
            <span className="uppercase font-bold">
              {t(LabelConstants.PRICE)}
            </span>
            <div className="flex gap-2 items-center rtl:flex-row-reverse">
              <div>
                <label>{t(LabelConstants.SAR)}</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="!h-12 p-1 w-40 bg-gray-100 px-6"
                  value={formatNumber(
                    (selectedPriceRange ? selectedPriceRange.min : minPrice) ||
                      0
                  )}
                  readOnly
                ></input>
                {`-`}
                <input
                  className="!h-12 p-1 w-40 bg-gray-100 px-6"
                  value={formatNumber(
                    (selectedPriceRange ? selectedPriceRange?.max : maxPrice) ||
                      0
                  )}
                  readOnly
                ></input>
              </div>
            </div>
          </div>
          <RangeSlider
            min={minPrice!}
            max={maxPrice!}
            step={500}
            value={selectedPriceRange}
            onChange={(selectedPrice) => {
              setSelectedPriceRange(selectedPrice);
            }}
            onAfterChange={(selectedPrice) => {
              handlePriceChange(selectedPrice);
            }}
            formatLabel={(value) =>
              `<span>${t(LabelConstants.SAR)}</span> <span>${formatNumber(
                value
              )}</span>`
            }
            labelClassName="!text-base font-bold flex rtl:flex-row-reverse"
          />
        </div>
      </div>
      <div className="mt-36 flex sm:justify-end justify-center gap-4">
        <button
          className="btn btn-secondary btn-sm !text-xl uppercase"
          onClick={() =>
            router.push(
              `${
                conciergeID || route
                  ? `/vehicle-wizard/${conciergeID || route}?tab=BodyType`
                  : '/vehicle-wizard?tab=BodyType'
              }`,
              undefined,
              {
                shallow: true,
              }
            )
          }
        >
          {t(LabelConstants.BACK)}
        </button>
        <button
          className="btn btn-primary btn-sm !text-xl uppercase"
          onClick={() =>
            router.push(
              `${
                conciergeID || route
                  ? `/vehicle-wizard/${
                      conciergeID || route
                    }?tab=TransmissionFuel`
                  : '/vehicle-wizard?tab=TransmissionFuel'
              }`,
              undefined,
              {
                shallow: true,
              }
            )
          }
          disabled={selectedPriceRange == undefined}
        >
          {t(LabelConstants.NEXT)}
        </button>
      </div>
    </div>
  );
};

export default Budget;
