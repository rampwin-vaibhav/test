import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import VasService from '../../helpers/services/vas.service';
import { SessionUtils } from '../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateUserDetails,
  updateSelfListingFlow,
  updateSelfListingStep,
  setHasClickedVehicleDetailsForm,
} from '../../lib/self-listing/selfListing.slice';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { translationsLang } from '../../utilities/constants';
import autoTranslate from '../../utilities/translations/autoTranslate';
import { FormInputV1 } from '../common/Form';
import { ArrowRightIcon } from '../icons';
import { useRouter } from 'next/router';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Brand, ModelYearData, VehicleBrand } from '../../types/models';
import {
  ListingService,
  NewCarService,
  PackageSubscription,
  VehicleService,
} from '../../helpers/services';
import DetailsReference from './components/DetailsReference';
import { BrandIcon } from './SelectBrand';

type IFormInput = {
  userId: string;
  sequenceNo: string;
};

const VerifyYourCar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [modelYears, setModelYears] = useState<ModelYearData[]>([]);
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const [showCardReference, setShowCardReference] = useState<boolean>(false);

  const [popularBrands, setPopularBrands] = useState<Array<Brand>>([]);
  const currentFlowData = useAppSelector(({ selfListing }) => selfListing.data);
  useEffect(() => {
    const fetchBrands = async () => {
      dispatch(setLoader(true));
      const popBrands = await VehicleService.fetchPopularBrands(router.locale);
      dispatch(setLoader(false));
      setPopularBrands(popBrands);
    };
    fetchBrands();
  }, [dispatch, router.locale]);

  useEffect(() => {
    const initialLoad = async () => {
      let yearsData = await VehicleService.fetchModelYearAutoData();
      setModelYears(
        yearsData.sort((a, b) => parseInt(b.ModelYear) - parseInt(a.ModelYear))
      );
    };
    initialLoad();
  }, [dispatch]);

  const schema = yup.object({
    userId: yup
      .string()
      .min(
        9,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.OWNER_ID),
          length: 9,
        })
      )
      .max(
        10,
        t(LabelConstants.MAX_NUMBER_ERR_MSG, {
          name: t(LabelConstants.OWNER_ID),
          length: 10,
        })
      )
      .typeError(LabelConstants.NUMBER_ERR_MSG)
      .required(LabelConstants.REQUIRED_FIELD),
    sequenceNo: yup
      .string()
      .min(
        9,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.SEQUENCE_NUMBER),
          length: 9,
        })
      )
      .max(
        10,
        t(LabelConstants.MAX_NUMBER_ERR_MSG, {
          name: t(LabelConstants.SEQUENCE_NUMBER),
          length: 10,
        })
      )
      .typeError(LabelConstants.NUMBER_ERR_MSG)
      .required(LabelConstants.REQUIRED_FIELD),
  });

  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      sequenceNo: selfListingSelector.user_details?.sequenceNo || '',
      userId: selfListingSelector.user_details?.userId || '',
    },
  });
  const getTranslatedText = async (text: string) => {
    const res = await autoTranslate(
      text,
      translationsLang.Arabic,
      translationsLang.English
    );
    return res[0]?.translations[0]?.text;
  };
  const handleGetDetails = async (data: IFormInput) => {
    let carDetails: any = null;
    try {
      dispatch(setLoader(true));
      const carDetailsData = await VasService.verifyCarDetails(data);
      if (![200, 201].includes(carDetailsData.status_code)) {
        dispatch(setLoader(false));
        toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
          position: 'bottom-right',
        });
        return;
      }
      carDetails = carDetailsData.result.vehicleInfo;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
        position: 'bottom-right',
      });
      return;
    }
    dispatch(setLoader(false));
    let selectedYear = modelYears.find(
      (item) => item.ModelYear === carDetails.modelYear
    );
    dispatch(
      updateSelfListingFlow({
        brand: {
          brandId: carDetails.makeCode,
          brandName: await getTranslatedText(carDetails.make),
        },
        model: {
          modelId: carDetails.modelCode,
          modelName: await getTranslatedText(carDetails.model),
          modelYear: carDetails.modelYear,
        },
        manufacture_year: {
          year: parseInt(selectedYear!.ModelYear),
          yearCode: selectedYear?.ModelYearCode,
        },
      })
    );
    dispatch(
      updateUserDetails({
        ...data,
      })
    );

    dispatch(
      updateSelfListingStep(SelfListingConstants.SelfListingSelectVariant)
    );
  };

  const handleBrandSelection = (selectedBrand: Brand) => {
    dispatch(
      updateSelfListingFlow({
        brand: {
          brandId: selectedBrand.VehicleMakeCode,
          brandName: selectedBrand.VehicleMake,
        },
      })
    );
    dispatch(
      updateSelfListingStep(
        SelfListingConstants.SelfListingSelectManufactureYear
      )
    );
  };

  return (
    <div className="">
      <div className="mx-[25px]">
        {showCardReference && (
          <DetailsReference closeTips={() => setShowCardReference(false)} />
        )}
        <div className="flex justify-start rtl:justify-end">
          <h1
            className={`${
              selfListingSelector.hasClickedVehicleDetailsForm
                ? 'text-transparent text-[6px]'
                : 'text-white text-[26px]'
            } w-[149px] font-semibold transition-all`}
          >
            {t(LabelConstants.SELL_YOUR_CAR_EFFORTLESSLY)}
          </h1>
        </div>
        <div
          className={`w-full p-[16px] mx-auto transition-all overflow-hidden duration-300 rounded-[12px] bg-white ${
            selfListingSelector.hasClickedVehicleDetailsForm
              ? 'h-auto mt-0'
              : 'h-[112px] mt-[19px]'
          } shadow-[0px_1px_8px_0px_#0000001A]`}
        >
          <form
            className="space-y-[22px]"
            onClick={() => dispatch(setHasClickedVehicleDetailsForm(true))}
          >
            <FormInputV1
              control={control}
              name="userId"
              label={t(
                selfListingSelector.hasClickedVehicleDetailsForm
                  ? SelfListingConstants.OwnerId
                  : SelfListingConstants.StartWithOwnerId
              )}
              endIcon={<CardIcon onClick={() => setShowCardReference(true)} />}
            />
            <FormInputV1
              control={control}
              name="sequenceNo"
              label={t(SelfListingConstants.SequenceNo)}
              endIcon={<CardIcon onClick={() => setShowCardReference(true)} />}
            />
            <button
              className="bg-black text-white w-full h-[48px] gap-1 rounded-[40px] font-medium flex items-center justify-center text-[13px]"
              onClick={handleSubmit(handleGetDetails)}
            >
              {t(SelfListingConstants.GetCarDetails)}
              <ArrowRightIcon className="!text-white  h-[5px] ml-[12.5px] rtl:-rotate-90" />
            </button>
          </form>
        </div>
        <div
          className={`mt-[19px] h-auto ${
            selfListingSelector.hasClickedVehicleDetailsForm
              ? 'sm:h-[230px]'
              : 'sm:h-[300px]'
          } overflow-y-auto`}
        >
          <p className="launch-text text-[15px] py-[10px] font-medium text-[#212121] ">
            {t(LabelConstants.OR_SELECT_YOUR_CAR_BRAND)}
          </p>
          <div className="mt-[6px] py-[16px] w-auto grid grid-cols-4 gap-2 flex-1">
            {popularBrands.map((eachBrand, index) => (
              <div
                key={eachBrand.VehicleMakeCode}
                onClick={() => handleBrandSelection(eachBrand)}
              >
                <BrandIcon
                  isSelected={
                    eachBrand.VehicleMakeCode === currentFlowData.brand.brandId
                  }
                  brand={eachBrand}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              dispatch(
                updateSelfListingStep(
                  SelfListingConstants.SelfListingSelectBrand
                )
              )
            }
            className="mt-[12px] mx-auto text-[15px] flex items-center font-medium text-primary"
          >
            {t(LabelConstants.VIEW_ALL_BRANDS)}
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rtl:rotate-180"
            >
              <path
                d="M6 12.5L10 8.5L6 4.5"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyYourCar;

interface CardIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
}
export const CardIcon: React.FC<CardIconProps> = ({ onClick = () => {} }) => {
  return (
    <svg
      width="31"
      height="19"
      viewBox="0 0 31 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <rect
        x="0.25"
        y="0.25"
        width="29.8115"
        height="17.9439"
        rx="1.77077"
        fill="url(#paint0_radial_708_38928)"
        stroke="#9DC0CD"
        strokeWidth="0.5"
      />
      <rect
        x="1.68457"
        y="2.02051"
        width="9.76705"
        height="1.34718"
        fill="#80A3B3"
      />
      <rect
        x="18.8604"
        y="2.02051"
        width="9.09346"
        height="1.34718"
        fill="#80A3B3"
      />
      <rect
        x="9.42969"
        y="7.07275"
        width="12.1246"
        height="1.68397"
        fill="#647D88"
      />
      <rect
        x="14.8184"
        y="10.7773"
        width="6.73589"
        height="1.68397"
        fill="#647D88"
      />
      <rect
        x="11.4512"
        y="15.1558"
        width="10.1038"
        height="1.68397"
        fill="#647D88"
      />
      <rect
        x="23.2393"
        y="7.07275"
        width="4.71513"
        height="1.34718"
        fill="#80A3B3"
      />
      <rect
        x="23.2393"
        y="11.1138"
        width="4.71513"
        height="1.34718"
        fill="#80A3B3"
      />
      <rect x="2" y="11.6807" width="3" height="1" fill="#80A3B3" />
      <rect x="2" y="14.6807" width="3" height="1" fill="#80A3B3" />
      <rect
        x="23.2393"
        y="15.1558"
        width="4.71513"
        height="1.34718"
        fill="#80A3B3"
      />
      <defs>
        <radialGradient
          id="paint0_radial_708_38928"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15.1558 9.22196) rotate(90) scale(9.22196 15.1558)"
        >
          <stop stopColor="#ECECCD" />
          <stop offset="1" stopColor="#ABD6E8" />
        </radialGradient>
      </defs>
    </svg>
  );
};
