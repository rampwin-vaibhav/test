import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { Locales } from '../../types/enums';
import { AppTheme } from '../../types/constants';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Brand, ModelYearData } from '../../types/models';
import {
  setHasClickedVehicleDetailsForm,
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
  setOpenSelfListingFlow,
  updateUserDetails,
} from '../../lib/self-listing/selfListing.slice';
import { VehicleService } from '../../helpers/services';
import * as yup from 'yup';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import autoTranslate from '../../utilities/translations/autoTranslate';
import { translationsLang } from '../../utilities/constants';
import VasService from '../../helpers/services/vas.service';
import { toast } from 'react-toastify';
import DetailsReference from '../../components/SelfListingV1/components/DetailsReference';
import { FormInputV1 } from '../../components/common/Form';
import { CardIcon } from '../../components/SelfListingV1/VerifyYourCar';
import { BrandIcon } from '../../components/SelfListingV1/SelectBrand';
import Image from 'next/image';
import BaseMobileCard from '../../components/SelfListingV1/components/BaseMobileCard';
import { FadeIn } from '../../components/common/Animations';

type SelfListingPageProps = {};
type IFormInput = {
  userId: string;
  sequenceNo: string;
};

const SelfListingPage: NextPage<
  SelfListingPageProps
> = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isSelfListingFlowOpen = useAppSelector(
    ({ selfListing }) => selfListing.isOpen
  );
  const loader = useAppSelector(({ selfListing }) => selfListing.loader);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const router = useRouter();
  const [modelYears, setModelYears] = useState<ModelYearData[]>([]);
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const [showCardReference, setShowCardReference] = useState<boolean>(false);

  const [popularBrands, setPopularBrands] = useState<Array<Brand>>([]);
  const currentFlowData = useAppSelector(({ selfListing }) => selfListing.data);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  useEffect(() => {
    VehicleService.fetchPopularBrands(router.locale).then((popBrands) => {
      setPopularBrands(popBrands);
    });
  }, [dispatch, router.locale]);

  useEffect(() => {
    const initialLoad = () => {
      VehicleService.fetchModelYearAutoData().then((yearsData) => {
        setModelYears(
          yearsData.sort(
            (a, b) => parseInt(b.ModelYear) - parseInt(a.ModelYear)
          )
        );
      });
    };
    initialLoad();
  }, [dispatch]);

  const schema = yup.object({
    userId: yup
      .string()
      .min(
        8,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.OWNER_ID),
          length: 8,
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
    let mappingData: any = null;
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
      mappingData = carDetailsData.result.mapping;
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
          brandId: mappingData?.make?.ggm_make_id || carDetails.makeCode,
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
        plate_data: {
          plate1: await getTranslatedText(carDetails.plateText1),
          plate2: await getTranslatedText(carDetails.plateText2),
          plate3: await getTranslatedText(carDetails.plateText3),
          plate_number: carDetails.plateNumber,
        },
      })
    );
    dispatch(
      updateUserDetails({
        ...data,
      })
    );

    if (cleverTap) {
      cleverTap.event?.push('sl_vehicle_registration_flow_selected');
    }

    dispatch(
      updateSelfListingStep(SelfListingConstants.SelfListingVehicleConfirmation)
    );
    dispatch(setOpenSelfListingFlow(true));
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
    dispatch(setOpenSelfListingFlow(true));
    dispatch(
      updateSelfListingStep(
        SelfListingConstants.SelfListingSelectManufactureYear
      )
    );
    if (cleverTap) {
      cleverTap.event?.push('sl_brand_model_flow_selected');
      cleverTap.event?.push('sl_brand_selected');
    }
  };

  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('self_listing_page_loaded');
    }
  }, [cleverTap]);

  return (
    <div className="relative">
      {isSelfListingFlowOpen && <BaseMobileCard />}
      {loader && (
        <FadeIn className="h-full w-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 backdrop-blur-[2px] z-10">
          {/* <Spinner className="!w-8 !h-8" /> */}
          <div className="relative h-16 aspect-[1000/359] ">
            <Image alt="" src={'/images/loader.gif'} layout="fill" />
          </div>
        </FadeIn>
      )}
      <div className="relative w-full !z-0 aspect-[54/30] sm:aspect-[144/34]">
        <Image
          alt=""
          src={'/images/self-listing-hero-desktop.png'}
          layout="fill"
          className="!z-0 invisible sm:visible"
        />
        <Image
          alt=""
          src={'/images/self-listing-hero-mobile.png'}
          layout="fill"
          className="!z-0 visible sm:invisible"
        />
        <div className="absolute sm:hidden top-0 left-0 w-full h-full bg-[linear-gradient(217.28deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.5)_100%)]"></div>
      </div>
      <div className="relative -mt-44 md:-mt-52 lg:-mt-72 !z-10">
        <div className="flex mx-4 sm:mx-[146px] mb-[18px] lg:mb-[113px] justify-start rtl:justify-end">
          <h1
            className={`text-white text-[26px] sm:text-[36px] md:text-[43px] w-[149px] sm:w-auto font-semibold transition-all`}
          >
            {t(LabelConstants.SELL_YOUR_CAR_EFFORTLESSLY)}
          </h1>
        </div>
        <div className="mx-auto w-[312px] sm:w-[484px] ">
          {showCardReference && (
            <div className="w-1/2">
              <DetailsReference closeTips={() => setShowCardReference(false)} />
            </div>
          )}
          <div
            className={`w-full px-[18px] py-[17px] sm:px-[40px] sm:py-[30px] mx-auto transition-all overflow-hidden duration-300 rounded-[12px] bg-white shadow-[0px_1px_8px_0px_#0000001A]`}
          >
            <form
              className="space-y-[22px]"
              onClick={() => dispatch(setHasClickedVehicleDetailsForm(true))}
            >
              <FormInputV1
                control={control}
                name="userId"
                placeholder="e.g. W1N0J8AB1MF29566"
                label={t(
                  selfListingSelector.hasClickedVehicleDetailsForm
                    ? SelfListingConstants.OwnerId
                    : SelfListingConstants.StartWithOwnerId
                )}
                endIcon={
                  <CardIcon onClick={() => setShowCardReference(true)} />
                }
              />
              {selfListingSelector.hasClickedVehicleDetailsForm && (
                <>
                  <FormInputV1
                    control={control}
                    name="sequenceNo"
                    placeholder="e.g. W1N0J8AB1"
                    label={t(SelfListingConstants.SequenceNo)}
                    endIcon={
                      <CardIcon onClick={() => setShowCardReference(true)} />
                    }
                  />
                  <button
                    className="bg-black -mt-[10px] text-white w-full h-[48px] sm:h-[60px] gap-1 rounded-[40px] font-semibold flex items-center justify-center text-[13px] sm:text-[20px]"
                    onClick={handleSubmit(handleGetDetails)}
                  >
                    {t(SelfListingConstants.GetCarDetails)}
                  </button>
                </>
              )}
            </form>
          </div>
          <div className={`flex flex-col gap-[40px] mt-[40px]`}>
            <p className="text-[18px] text-center font-medium text-[#212121] ">
              {t(LabelConstants.OR_SELECT_YOUR_CAR_BRAND)}
            </p>
            <div className="mt-[6px] w-auto grid grid-cols-4 sm:grid-cols-6 gap-2 flex-1">
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
            <button
              onClick={() => {
                dispatch(
                  updateSelfListingStep(
                    SelfListingConstants.SelfListingSelectBrand
                  )
                );
                dispatch(setOpenSelfListingFlow(true));
              }}
              className="-mt-[10px] mb-[30px] sm:mb-0 mx-auto text-[15px] sm:text-[18px] underline flex items-center font-medium text-primary"
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
        {/* How it works */}
        <div className="bg-[#F8F8F8] flex my-[40px] py-[50px] flex-col gap-[40px] items-center">
          <p className="text-[28px] font-medium text-black ">
            {t(LabelConstants.HOW_IT_WORKS_V1)}
          </p>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-[100px] ">
            <div className="flex flex-col items-center gap-[20px]">
              <span className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-black text-white font-medium text-[20px]">
                {t(LabelConstants.NUM_1)}
              </span>
              <span className="text-[20px] w-[127px] text-center font-medium text-black ">
                {t(LabelConstants.VEHICLE_DETAILS)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-[20px]">
              <span className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-black text-white font-medium text-[20px]">
                {t(LabelConstants.NUM_2)}
              </span>
              <span className="text-[20px] w-[184px] text-center font-medium text-black ">
                {t(LabelConstants.ENTER_ADDITIONAL_INFORMATION)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-[20px]">
              <span className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-black text-white font-medium text-[20px]">
                {t(LabelConstants.NUM_3)}
              </span>
              <span className="text-[20px] w-[135px] text-center font-medium text-black ">
                {t(LabelConstants.IMAGES)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-[20px]">
              <span className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-black text-white font-medium text-[20px]">
                {t(LabelConstants.NUM_4)}
              </span>
              <span className="text-[20px] w-[127px] text-center font-medium text-black ">
                {t(LabelConstants.CONFIRM_DETAILS)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfListingPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      applyTheme: AppTheme.V1,
    },
  };
};
