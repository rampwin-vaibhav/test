import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewCarService, VehicleService } from '../../helpers/services';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { Brand, VehicleBrand } from '../../types/models';
import { FadeUp } from '../common/Animations';
import FormInputV1 from '../common/Form/FormInputV1';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SearchIcon } from '../icons';
import List from './components/List';
import { ClearSearchIcon } from './components/ClearSearchIcon';
import { useRouter } from 'next/router';
import SearchResultsNotFound from './components/SearchResultsNotFound';

const SelectBrand = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, watch, setValue } = useForm();
  const router = useRouter();

  const [brands, setBrands] = useState<Array<VehicleBrand>>([]);
  const currentFlowData = useAppSelector(({ selfListing }) => selfListing.data);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const [filteredBrands, setFilteredBrands] = useState<Array<VehicleBrand>>([]);
  const [popularBrands, setPopularBrands] = useState<Array<Brand>>([]);

  useEffect(() => {
    console.log(router.locale);
    const fetchPopularBrands = async () => {
      dispatch(setLoader(true));
      const brands = await NewCarService.fetchNewCarsMake(router.locale);
      const popBrands = await VehicleService.fetchPopularBrands(router.locale);
      dispatch(setLoader(false));
      setBrands([
        ...brands
          .filter((x) => x.SequenceNumber !== null)
          ?.sort((a, b) => a.MakeDisplayName.localeCompare(b.MakeDisplayName)),
        ...brands.filter((x) => x.SequenceNumber === null),
      ]);
      setPopularBrands(popBrands);
    };
    fetchPopularBrands();
  }, [dispatch, router.locale]);

  const handleBrandSelection = (selectedBrand: Brand | number) => {
    console.log(typeof selectedBrand);
    if (typeof selectedBrand === 'number') {
      let tempSelectedBrand = brands.find(
        (item) => item.MakeId === selectedBrand
      );
      if (!tempSelectedBrand) {
        return;
      }
      dispatch(
        updateSelfListingFlow({
          brand: {
            brandId: tempSelectedBrand.MakeId,
            brandName: tempSelectedBrand.MakeDisplayName,
          },
        })
      );
    } else {
      dispatch(
        updateSelfListingFlow({
          brand: {
            brandId: selectedBrand.VehicleMakeCode,
            brandName: selectedBrand.VehicleMake,
          },
        })
      );
    }
    dispatch(
      updateSelfListingStep(
        SelfListingConstants.SelfListingSelectManufactureYear
      )
    );
    if (cleverTap) {
      cleverTap.event?.push('sl_brand_selected');
    }
  };

  const { searchBrand } = watch();

  useEffect(() => {
    if (searchBrand?.length) {
      setFilteredBrands(
        brands
          .filter((eachBrand) => {
            if (searchBrand) {
              if (
                !eachBrand.DoNotUseBrand &&
                eachBrand.MakeDisplayName.toLowerCase().includes(
                  searchBrand.toLowerCase()
                )
              ) {
                return true;
              }
            } else {
              return true;
            }
          })
          .filter((x) => x)
      );
    }
  }, [brands, searchBrand]);

  return (
    <div className="flex flex-col h-[82vh] md:h-[530px]">
      <FadeUp duration={0.5 * 1.5}>
        <div className="pl-[26px] pr-[22px]">
          <FormInputV1
            control={control}
            name="searchBrand"
            label={t(LabelConstants.SEARCH_THE_BRAND)}
            placeholder={t(LabelConstants.SEARCH_THE_BRAND_PLACEHOLDER)}
            endIcon={
              searchBrand?.length ? (
                <ClearSearchIcon
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(control);
                    setValue('searchBrand', '');
                  }}
                />
              ) : (
                <SearchIcon className="h-[20px] w-[20px] !text-[#484E50] p-[3px] opacity-[60%]" />
              )
            }
          />
        </div>
      </FadeUp>

      {!searchBrand || (searchBrand && filteredBrands.length > 0) ? (
        <div className="overflow-y-auto">
          {!searchBrand && (
            <div className="pl-[26px] pr-[22px] mt-[21px] w-auto grid grid-cols-4 gap-2 flex-1">
              {popularBrands.map((eachBrand, index) => (
                <div
                  key={eachBrand.VehicleMakeCode}
                  onClick={() => handleBrandSelection(eachBrand)}
                >
                  <BrandIcon
                    isSelected={
                      eachBrand.VehicleMakeCode ===
                      currentFlowData.brand.brandId
                    }
                    brand={eachBrand}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mx-[26px] mt-[12px] overflow-x-hidden">
            {!searchBrand && (
              <p className="text-[#757575] mt-[12px] text-[13px] ">
                {t(LabelConstants.ALL_BRANDS)}
              </p>
            )}
            <List
              itemsClasses="text-[15px] text-[#212121] py-[12px]"
              selectedId={currentFlowData.brand.brandId}
              items={[...(searchBrand ? filteredBrands : brands)]
                .sort((a, b) =>
                  a.MakeDisplayName.toLowerCase().localeCompare(
                    b.MakeDisplayName.toLowerCase()
                  )
                )
                .map((eachBrand) => ({
                  label: eachBrand.MakeDisplayName,
                  value: eachBrand.MakeId,
                }))}
              onClick={(val) =>
                handleBrandSelection(
                  typeof val.value === 'number'
                    ? val.value
                    : parseInt(val.value)
                )
              }
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <SearchResultsNotFound />
        </div>
      )}
    </div>
  );
};

export default SelectBrand;

export const BrandIcon = ({
  brand,
  isSelected = false,
}: {
  brand: Brand;
  isSelected?: boolean;
}) => {
  return (
    <div className="flex flex-col w-[64px] justify-center cursor-pointer">
      <div
        className={`h-[64px] w-[64px] border ${
          isSelected
            ? 'border-[#038700] bg-[#F8F8F8]'
            : 'border-transparent bg-[#F8F8F8]'
        } rounded-[6.86px] flex justify-center items-center`}
      >
        <ImageWithFallback
          src={brand.ImageUrlPath}
          alt={brand.VehicleMake}
          className="w-full h-full object-contain"
          onErrorRender={() => (
            <div
              className={`uppercase font-bold text-[10px] text-center text-primary`}
            >
              {brand.VehicleMake}
            </div>
          )}
          containerClassName="flex justify-center items-center h-full"
        />
      </div>
      <p className="mt-[2px] text-[13px] text-[#212121] font-normal text-center">
        {brand.VehicleMake}
      </p>
    </div>
  );
};
