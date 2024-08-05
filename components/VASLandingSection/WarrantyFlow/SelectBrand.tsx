import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewCarService } from '../../../helpers/services';
import { useAppDispatch } from '../../../lib/hooks';
import {
  setLoader,
  updateWarrantyFlow,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import { LabelConstants, WarrantyConstants } from '../../../types/i18n.labels';
import { VehicleBrand } from '../../../types/models';
import { FadeUp } from '../../common/Animations';
import FormInputV1 from '../../common/Form/FormInputV1';
import { ImageWithFallback } from '../../common/ImageWithFallback';
import { SearchIcon } from '../../icons';

const SelectBrand = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, watch } = useForm();

  const [brands, setBrands] = useState<Array<VehicleBrand>>([]);
  const [filteredBrands, setFilteredBrands] = useState<Array<VehicleBrand>>([]);
  useEffect(() => {
    const fetchPopularBrands = async () => {
      dispatch(setLoader(true));
      const brands = await NewCarService.fetchNewCarsMake();
      dispatch(setLoader(false));
      setBrands([
        ...brands
          .filter((x) => x.SequenceNumber !== null)
          ?.sort((a, b) => a.SequenceNumber - b.SequenceNumber),
        ...brands.filter((x) => x.SequenceNumber === null),
      ]);
    };
    fetchPopularBrands();
  }, [dispatch]);

  const handleBrandSelection = (selectedBrand: VehicleBrand) => {
    dispatch(
      updateWarrantyFlow({
        brand: {
          brandId: selectedBrand.MakeId,
          brandName: selectedBrand.MakeDisplayName,
        },
      })
    );
    dispatch(updateWarrantyStep(WarrantyConstants.SelectModel));
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
    <div className="flex flex-col h-[82vh] md:h-[460px]">
      <FadeUp duration={0.5 * 1.5}>
        <div className="pl-[26px] pr-[22px]">
          <FormInputV1
            control={control}
            name="searchBrand"
            label={t(LabelConstants.SEARCH_THE_BRAND)}
            placeholder='For eg "BMW"'
            endIcon={
              <SearchIcon className="h-[20px] w-[20px] !text-[#484E50] p-[3px] opacity-[60%]" />
            }
          />
        </div>
      </FadeUp>

      <div className="pl-[26px] pr-[22px] mt-[21px] w-full grid grid-cols-4 gap-2 flex-1 overflow-auto">
        {(searchBrand ? filteredBrands : brands).map((eachBrand, index) => (
          <div
            key={eachBrand.MakeId}
            onClick={() => handleBrandSelection(eachBrand)}
          >
            <BrandIcon brand={eachBrand} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBrand;

export const BrandIcon = ({ brand }: { brand: VehicleBrand }) => {
  return (
    <div className="flex flex-col w-[68px] justify-center cursor-pointer">
      <div className="h-[68px] w-[68px] border border-opacity-[7%] rounded-md flex justify-center items-center">
        <ImageWithFallback
          src={
            brand.UseOriginalLogo
              ? `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${brand.LogoURL}`
              : `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${brand.BlackAndWhiteLogo}`
          }
          alt={brand.MakeDisplayName}
          className="w-full h-full object-contain p-4"
          onErrorRender={() => (
            <div
              className={`uppercase font-bold text-[10px] text-center ${
                brand.UseOriginalLogo ? 'text-primary' : 'text-dark-gray1'
              }`}
            >
              {brand.MakeDisplayName}
            </div>
          )}
          containerClassName="flex justify-center items-center h-full"
        />
      </div>
      <p className="mt-[2px] text-[10px] font-normal text-center">
        {brand.MakeDisplayName}
      </p>
    </div>
  );
};
