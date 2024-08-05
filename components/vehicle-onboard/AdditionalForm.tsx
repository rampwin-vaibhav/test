import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { GlobalService, VehicleService } from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import {
  AutoDataMarketValueIndicators,
  UnitOfMeasureId,
} from '../../types/constants';
import {
  ConfigurationKey,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import {
  Cities,
  City,
  Color,
  MyCarValueResponse,
  OutstandingFinance,
  Ownership,
  PackageResponse,
  TestDriveAvailableDetails,
  VehicleCondition,
  VehicleListingData,
} from '../../types/models';
import FormInput, { FormRadio, FormTextarea } from '../common/Form';
import FormColorPicker from '../common/Form/FormColorPicker';
import FormDropdown from '../common/Form/FormDropdown';
import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { AskingPriceRedIcon, AskingPriceYellowIcon } from '../icons';

interface IFormInput {
  additionalFeatures: string;
  city: City | null;
  exteriorColorId: number | null;
  interiorColorId: number | null;
  listingSummary: string | null;
  notes: string;
  odometerReading: string | null;
  outstandingFinance: OutstandingFinance | null;
  ownership: Ownership | null;
  vehicleConditionId: string | null;
  AskingPrice: string;
}

type AdditionalInformationProps = {
  listingId: number | null;
  listingData: {
    data: VehicleListingData | null;
    testDriveDates: TestDriveAvailableDetails | null;
  } | null;
  setIsDirty: (value: SetStateAction<boolean>) => void;
  packageName: string | undefined;
  p_id: string;
  order_id: string;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  setIsTabValid: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  packageId: string | string[] | number | undefined;
  orderId: string | string[] | number | undefined;
};

export const AdditionalForm: FC<AdditionalInformationProps> = ({
  listingId,
  listingData,
  setIsDirty,
  packageName,
  p_id,
  order_id,
  setOpenSignInModal,
  setIsTabValid,
  packageDetails,
  setIsLoading,
  packageId,
  orderId,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [minAskingPrice, setMinAskingPrice] = useState<number>(0);
  const [maxAskingPrice, setMaxAskingPrice] = useState<number>(0);
  const [milage, setMilage] = useState<number>(0);
  const schema = yup
    .object({
      city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
      listingSummary: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD)
        .test(
          'listingSummaryLengthCheck',
          LabelConstants.ALLOWED_MAX_5000_CHAR,
          (value) => String(value)?.length <= 5000
        ),
      odometerReading: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD)
        .matches(/^[0-9\b]+$/, LabelConstants.ENTER_NUMBER_ONLY)
        .test(
          'maxDigits',
          t(LabelConstants.VEHICLE_MORE_THAN_KM_ERROR, {
            MaxVehicleMileage: 175000,
          }),
          function (odometerReading) {
            if (Number(odometerReading) > 175000) {
              return false;
            } else return true;
          }
        )
        .test(
          'compareDigit',
          t(LabelConstants.MILAGE_REDUCE_ERROR),
          function (odometerReading) {
            if (milage > Number(odometerReading!)) {
              return false;
            } else return true;
          }
        )
        .test(
          'ZeroValidation',
          t(LabelConstants.MILEAGE_ZERO_ERROR),
          (value: any) => parseInt(value) > 0
        ),
      AskingPrice: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD)
        .test(
          'minDigits',
          t(LabelConstants.SELECT_PRICE_RANGE, {
            MinAskingPrice: minAskingPrice,
          }),
          (value: any) => parseInt(value) >= minAskingPrice
        )
        .test(
          'maxDigits',
          t(LabelConstants.SELECT_PRICE_RANGE_MAX, {
            MaxAskingPrice: maxAskingPrice,
          }),
          (value: any) => parseInt(value) <= maxAskingPrice
        ),
      outstandingFinance: yup
        .object()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      ownership: yup
        .object()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      vehicleConditionId: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      exteriorColorId: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      interiorColorId: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
    })
    .required();
  const {
    control,
    handleSubmit,
    reset,
    getFieldState,
    formState: { errors, isDirty },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const [cities, setCities] = useState<Array<Cities>>([]);
  const [ownership, setOwnership] = useState<Array<Ownership>>([]);
  const [vehicleCondition, setVehicleCondition] = useState<
    Array<VehicleCondition>
  >([]);
  const [exteriorColor, setExteriorColor] = useState<Array<Color>>([]);
  const [interiorColor, setInteriorColor] = useState<Array<Color>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [additionalInfoData, setAdditionalInfoData] = useState<any>('');
  const [myCarValue, setMyCarValue] = useState<MyCarValueResponse>();
  const askingPriceRef = useRef<any>(null);
  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Additional Info Initiated
    PushDataToGTMWithSubEvents(
      GTMEvents.ListMyCar,
      GTMSubEvents.AdditionalForm,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  }, [router.locale]);

  useEffect(() => {
    const initialLoad = async () => {
      const minPrice = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.MinAskingPrice,
        router.locale
      );
      setMinAskingPrice(parseInt(minPrice.ConfigurationValue));
      const maxPrice = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.MaxAskingPrice,
        router.locale
      );
      setMaxAskingPrice(parseInt(maxPrice.ConfigurationValue));
    };
    initialLoad();
  }, [router]);

  useEffect(() => {
    const initialLoad = async () => {
      const citiesData = await GlobalService.fetchCities(router.locale);
      setCities(citiesData.cities);
      const res = await VehicleService.fetchFilterMetadata(router.locale);
      setOwnership(res.Ownerships);
      setVehicleCondition(res.VehicleConditions);
      setInteriorColor(res.InteriorColors);
      setExteriorColor(res.ExteriorColors);
    };
    initialLoad();
  }, [router]);

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty, setIsDirty]);

  // This useEffect handle the edit case
  useEffect(() => {
    if (listingData) {
      reset({
        city: listingData?.data?.Overview.City
          ? {
              City: listingData?.data?.Overview.City,
              CityId: listingData?.data?.Overview.CityId,
            }
          : null,
        ownership: listingData?.data?.Overview.Ownership
          ? {
              Ownership: listingData?.data?.Overview.Ownership,
              OwnershipId: listingData?.data?.Overview.OwnershipId,
            }
          : null,
        vehicleConditionId: listingData?.data?.Overview.VehicleConditionId
          ? String(listingData?.data?.Overview.VehicleConditionId)
          : null,
        listingSummary: listingData?.data?.Overview.ListingSummary,
        additionalFeatures: listingData?.data?.Overview.AdditionalFeatures,
        odometerReading: listingData?.data?.Overview.OdometerReading
          ? String(listingData?.data?.Overview.OdometerReading)
          : null,
        outstandingFinance: {
          label: listingData?.data?.Overview.OutstandingFinance
            ? t(LabelConstants.YES).toUpperCase()
            : t(LabelConstants.NO).toUpperCase(),
          value: listingData?.data?.Overview.OutstandingFinance || false,
        },
        exteriorColorId: listingData?.data?.Overview.ExteriorColorId
          ? listingData?.data?.Overview.ExteriorColorId
          : null,
        interiorColorId: listingData?.data?.Overview?.InteriorColorId
          ? listingData?.data?.Overview.InteriorColorId
          : null,
        notes: listingData?.data?.Overview.Notes!,
        AskingPrice: String(listingData?.data?.Overview.AskingPrice),
      });
      setMilage(listingData?.data?.Overview.OdometerReading!);
    }
  }, [reset, listingData, t]);

  // This useEffect use to call myCarValue foe edit case
  useEffect(() => {
    if (
      listingData?.data?.Overview?.AskingPrice &&
      vehicleCondition.length > 0
    ) {
      const initialLoad = async () => {
        const bodyObj = {
          ModelYearCode: listingData?.data?.Overview.ModelYearCode,
          MakeCode: listingData?.data?.Overview.MakeCode,
          ModelCode: listingData?.data?.Overview.ModelCode,
          SpecCode: listingData?.data?.Overview.SpecCode,
          VehicleConditionId: parseInt(
            String(listingData?.data?.Overview?.VehicleConditionId)
          ),
          VehicleCondition:
            vehicleCondition &&
            vehicleCondition.filter(
              (x) =>
                x.VehicleConditionId ===
                parseInt(
                  String(listingData?.data?.Overview?.VehicleConditionId)
                )
            )[0].VehicleConditionKey,
          OdometerReading: parseInt(
            String(listingData?.data?.Overview?.OdometerReading)
          ),
          AskingPrice: parseInt(
            String(listingData?.data?.Overview?.AskingPrice)
          ),
        };
        const validMarketPrice =
          await VehicleService.getMyCarValueVehicleListing(bodyObj);
        setMyCarValue(validMarketPrice);
      };
      initialLoad();
    }
  }, [
    listingData?.data?.Overview?.AskingPrice,
    listingData?.data?.Overview.MakeCode,
    listingData?.data?.Overview.ModelCode,
    listingData?.data?.Overview.ModelYearCode,
    listingData?.data?.Overview?.OdometerReading,
    listingData?.data?.Overview.SpecCode,
    listingData?.data?.Overview?.VehicleCondition,
    listingData?.data?.Overview?.VehicleConditionId,
    vehicleCondition,
  ]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      const field = getFieldState('AskingPrice');

      setAdditionalInfoData(data);
      const bodyObj = {
        ModelYearCode: listingData?.data?.Overview.ModelYearCode,
        MakeCode: listingData?.data?.Overview.MakeCode,
        ModelCode: listingData?.data?.Overview.ModelCode,
        SpecCode: listingData?.data?.Overview.SpecCode,
        VehicleConditionId:
          vehicleCondition &&
          vehicleCondition.filter(
            (x) =>
              x.VehicleConditionId ===
              parseInt(String(data?.vehicleConditionId))
          )[0].VehicleConditionId,
        VehicleCondition:
          vehicleCondition &&
          vehicleCondition.filter(
            (x) =>
              x.VehicleConditionId ===
              parseInt(String(data?.vehicleConditionId))
          )[0].VehicleConditionKey,
        OdometerReading: parseInt(String(data?.odometerReading)),
        AskingPrice: parseInt(data?.AskingPrice),
      };

      const validMarketPrice = await VehicleService.getMyCarValueVehicleListing(
        bodyObj
      );
      setMyCarValue(validMarketPrice);

      if (
        listingData?.data?.Overview.VehicleListingWorkflowNumber! >=
          VehicleListingWorkflowNumber.Sold ||
        !validMarketPrice?.IsSuccess ||
        validMarketPrice?.RelativePricePercentage === 0 ||
        !field.isDirty
      ) {
        continueSubmit(data, validMarketPrice);
      } else {
        setModalOpen(true);
      }
    }
  };

  // This function is used to call on continue button on popup.
  const continueSubmit = async (
    data?: IFormInput,
    validMarketPrice?: MyCarValueResponse
  ) => {
    setIsLoading(true);
    const formData = {
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      VehicleListingId: listingId,
      CityId: additionalInfoData
        ? additionalInfoData.city?.CityId
        : data?.city?.CityId,
      OwnershipId: additionalInfoData
        ? additionalInfoData.ownership?.OwnershipId
        : data?.ownership?.OwnershipId,
      VehicleConditionId: additionalInfoData
        ? additionalInfoData.vehicleConditionId
        : data?.vehicleConditionId,
      OdometerReading: additionalInfoData
        ? additionalInfoData.odometerReading
        : data?.odometerReading,
      ExteriorColorId: additionalInfoData
        ? additionalInfoData.exteriorColorId
        : data?.exteriorColorId,
      InteriorColorId: additionalInfoData
        ? additionalInfoData.interiorColorId
        : data?.interiorColorId,
      Notes: additionalInfoData ? additionalInfoData.notes : data?.notes,
      AdditionalFeatures: additionalInfoData
        ? additionalInfoData.additionalFeatures
        : data?.additionalFeatures,
      ListingSummary: additionalInfoData
        ? additionalInfoData.listingSummary
        : data?.listingSummary,
      UnitOfMeasureId: UnitOfMeasureId,
      OutstandingFinance: additionalInfoData
        ? additionalInfoData.outstandingFinance?.value
        : data?.outstandingFinance?.value,
      MarketValueIndicator: myCarValue
        ? myCarValue?.IsSuccess
          ? myCarValue?.MarketValueIndicator
          : null
        : validMarketPrice?.IsSuccess
        ? validMarketPrice?.MarketValueIndicator
        : null,
      RelativePricePercentage: myCarValue
        ? myCarValue?.RelativePricePercentage
        : validMarketPrice?.RelativePricePercentage,
      AskingPrice: additionalInfoData
        ? additionalInfoData.AskingPrice
        : data?.AskingPrice,
    };
    try {
      const res = await VehicleService.addAdditionalInformation(formData);
      if (res) {
        router.push(
          `/vehicle-onboard/${listingId}?tab=Images
          `,
          // ${
          //   p_id !== 'undefined' ? `&p_id=${p_id}&OrderItemId=${order_id}` : ''
          // }
          undefined,
          {
            shallow: true,
          }
        );
        setIsDirty(false);
      }
    } catch (err) {
      const user = SessionUtils.getUserDetails();
      //Added GTM event for List My Car Error
      PushDataToGTMWithSubEvents(
        GTMEvents.ListMyCar,
        GTMSubEvents.ListMyCarError,
        {
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        }
      );
    }
    setIsLoading(false);
  };

  const getMessage = (): string => {
    let message = '';
    if (myCarValue?.IsSuccess) {
      if (myCarValue?.RelativePricePercentage === 0) {
        message = t(LabelConstants.THE_REQUESTED_VALUE_IN_RANGE_MARKET_VALUE);
      } else {
        const genericMessage = `${t(LabelConstants.YOUR_VEHICLE_PRICE_IS)}
           ${myCarValue?.PricePercentage} % `;

        let marketValueMessage = '';
        switch (myCarValue.MarketValueIndicator) {
          case AutoDataMarketValueIndicators.BELOW_MARKET_VALUE:
            marketValueMessage = t(LabelConstants.LESS_THAN_MARKET_PRICE);
            message = genericMessage + marketValueMessage;
            break;
          case AutoDataMarketValueIndicators.ABOVE_MARKET_VALUE:
            marketValueMessage = t(LabelConstants.MORE_THAN_MARKET_PRICE);
            message = genericMessage + marketValueMessage;
            break;
          case AutoDataMarketValueIndicators.TOO_LOW_THAN_MARKET_PRICE:
            message = t(LabelConstants.TOO_LOW_THAN_MARKET_PRICE);
            break;
          case AutoDataMarketValueIndicators.TOO_HIGH_THAN_MARKET_PRICE:
            message = t(LabelConstants.TOO_HIGH_THAN_MARKET_PRICE);
            break;
          default:
            break;
        }
      }
    } else {
      message = t(LabelConstants.GENERIC_ERROR_MY_CAR_VALUE);
    }
    return message;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="additional-form-tab container lg:!px-52">
          {/* {packageDetails?.DisplayName && (
            <div className="flex items-center justify-between">
              <div className="text-gradient text-2xl font-bold">
                {router.locale === Locales.EN
                  ? `${packageDetails?.DisplayName} ${t(
                      LabelConstants.PACKAGE
                    )}`
                  : `${t(LabelConstants.PACKAGE)} ${
                      packageDetails?.DisplayName
                    }`}
              </div>
              {(listingId
                ? listingData?.data?.Overview.IsEligibleForUpgrade
                : packageDetails.IsSelfListedPackage) &&
                listingData?.data?.Overview.VehicleListingStatusID &&
                StatusIDsAllowedForUpgrade.includes(
                  listingData?.data?.Overview.VehicleListingStatusID
                ) && (
                  <button
                    className="bg-gradient rounded-[0.375rem] text-xl h-[3.125rem] w-[15rem] uppercase"
                    onClick={() =>
                      router.push(
                        `/select-package?CurrentPackageId=${packageId}&IsUpgradePackage=true&OrderItemId=${orderId}`
                      )
                    }
                  >
                    {t(LabelConstants.UPGRADE_PACKAGE)}
                  </button>
                )}
            </div>
          )} */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[1.875rem] gap-x-28 mt-16">
            <FormDropdown
              options={cities}
              labelAccessor="City"
              valueAccessor="CityId"
              labelText={`${t(LabelConstants.CITY)}*`}
              placeHolderText={t(LabelConstants.SELECT_CITY)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="city"
              disabled={
                listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                VehicleListingWorkflowNumber.Saved
                  ? true
                  : false
              }
            />
            <FormInput
              control={control}
              name="odometerReading"
              label={`${t(LabelConstants.MILEAGE)}*`}
              showUnit={true}
              unitText={t(LabelConstants.KM)}
              className="rtl:rounded-l-none ltr:rounded-r-none"
              pattern={/[^0-9]+/}
              disabled={
                listingData?.data?.Overview.VehicleListingWorkflowNumber! ===
                  VehicleListingWorkflowNumber.QCRejected ||
                listingData?.data?.Overview.VehicleListingWorkflowNumber! ===
                  VehicleListingWorkflowNumber.InspectionRejected
                  ? true
                  : false
              }
            />
            <FormDropdown
              options={ownership}
              asOption={true}
              labelAccessor="Ownership"
              valueAccessor="OwnershipId"
              labelText={`${t(LabelConstants.OWNERSHIP)}*`}
              placeHolderText={t(LabelConstants.SELECT_OWNERSHIP)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="ownership"
              disabled={
                listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                VehicleListingWorkflowNumber.Saved
                  ? true
                  : false
              }
            />
            <div className="relative">
              <FormInput
                control={control}
                name="AskingPrice"
                label={`${t(LabelConstants.ASKING_PRICE)}*`}
                pattern={/[^0-9]+/}
                showUnit={true}
                className="rtl:rounded-l-none ltr:rounded-r-none"
                unitText={t(LabelConstants.SAR)}
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! ===
                    VehicleListingWorkflowNumber.QCRejected ||
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! ===
                    VehicleListingWorkflowNumber.InspectionRejected
                    ? true
                    : false
                }
                userRef={askingPriceRef}
                maxLength={10}
              />
              {myCarValue &&
                myCarValue?.IsSuccess &&
                myCarValue?.RelativePricePercentage !== 0 &&
                (myCarValue?.MarketValueIndicator ===
                  AutoDataMarketValueIndicators.TOO_LOW_THAN_MARKET_PRICE ||
                myCarValue?.MarketValueIndicator ===
                  AutoDataMarketValueIndicators.TOO_HIGH_THAN_MARKET_PRICE ? (
                  <AskingPriceRedIcon className="absolute ltr:right-16 rtl:left-24 top-9 h-9 w-8" />
                ) : (
                  <AskingPriceYellowIcon className="absolute ltr:right-16 rtl:left-24 top-9 h-9 w-8" />
                ))}
              {myCarValue && myCarValue?.IsSuccess && (
                <div> {getMessage()}</div>
              )}
            </div>

            <div className="lg:col-span-1 flex flex-col">
              <label>{t(LabelConstants.VEHICLE_CONDITION)}*</label>
              {vehicleCondition.map((itm, index) => (
                <div className="flex items-center pb-2" key={index}>
                  <FormRadio
                    control={control}
                    name="vehicleConditionId"
                    value={String(itm.VehicleConditionId)}
                    label={`${itm.VehicleCondition} (${itm.Description})`}
                    disabled={
                      listingData?.data?.Overview
                        .VehicleListingWorkflowNumber! >
                      VehicleListingWorkflowNumber.Saved
                        ? true
                        : false
                    }
                  />
                </div>
              ))}
              {errors.vehicleConditionId &&
                errors.vehicleConditionId?.message && (
                  <p className="error">
                    {t(errors.vehicleConditionId?.message)}
                  </p>
                )}
            </div>
            <div className="flex flex-col gap-5">
              <FormDropdown
                options={[
                  {
                    label: t(LabelConstants.YES).toUpperCase(),
                    value: true,
                  },
                  {
                    label: t(LabelConstants.NO).toUpperCase(),
                    value: false,
                  },
                ]}
                labelAccessor="label"
                valueAccessor="value"
                labelText={`${t(LabelConstants.OUTSTANDING_FINANCE)}*`}
                placeHolderText={t(LabelConstants.SELECT_OUTSTANDING_FINANCE)}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                control={control}
                name="outstandingFinance"
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                  VehicleListingWorkflowNumber.Saved
                    ? true
                    : false
                }
                asOption={true}
              />
              <div className="lg:col-span-1 flex flex-col">
                <div>
                  <label>{t(LabelConstants.EXTERIOR_COLOR_GROUP)}*</label>
                  <div className="flex flex-wrap pt-2">
                    <FormColorPicker
                      control={control}
                      options={exteriorColor}
                      name="exteriorColorId"
                      disabled={
                        listingData?.data?.Overview
                          .VehicleListingWorkflowNumber! >
                        VehicleListingWorkflowNumber.Saved
                          ? true
                          : false
                      }
                    />
                  </div>
                  {errors.exteriorColorId &&
                    errors.exteriorColorId?.message && (
                      <p className="error">
                        {t(errors.exteriorColorId?.message)}
                      </p>
                    )}
                </div>
                <div className="pt-2">
                  <label>{t(LabelConstants.INTERIOR_COLOR_GROUP)}*</label>
                  <div className="pt-2 flex flex-wrap w-full lg:w-3/5">
                    <FormColorPicker
                      control={control}
                      options={interiorColor}
                      name="interiorColorId"
                      disabled={
                        listingData?.data?.Overview
                          .VehicleListingWorkflowNumber! >
                        VehicleListingWorkflowNumber.Saved
                          ? true
                          : false
                      }
                    />
                  </div>
                  {errors.interiorColorId &&
                    errors.interiorColorId?.message && (
                      <p className="error">
                        {t(errors.interiorColorId?.message)}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col">
              <FormTextarea
                control={control}
                placeholder={t(LabelConstants.LISTING_SUMMARY_PLACEHOLDER)}
                label={`${t(LabelConstants.LISTING_SUMMARY)}*`}
                name="listingSummary"
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                  VehicleListingWorkflowNumber.Saved
                    ? true
                    : false
                }
              />
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <FormTextarea
                control={control}
                label={`${t(LabelConstants.NOTES)}`}
                name="notes"
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! >=
                  VehicleListingWorkflowNumber.Sold
                    ? true
                    : false
                }
              />
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <FormTextarea
                control={control}
                label={`${t(LabelConstants.CAR_DESCRIPTION)}`}
                name="additionalFeatures"
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                  VehicleListingWorkflowNumber.Saved
                    ? true
                    : false
                }
              />
            </div>
          </div>
          <div className="mt-20 flex justify-end">
            <button type="submit" className="btn btn-primary uppercase">
              {t(LabelConstants.NEXT)}
            </button>
          </div>
        </div>
      </form>
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <ModalBody>
            <div className="title flex md:flex-row flex-col justify-around gap-8 gap-x-8 mt-10 ">
              <div className="justify-center flex flex-col gap-6">
                <div className="flex flex-col justify-between gap-4 items-center">
                  <div className="text-lg font-bold w-full max-w-xl">
                    {getMessage()}
                  </div>
                  <div className="text-sm">
                    {t(LabelConstants.DO_YOU_WANT_TO_CHANGE_PRICE_MSG)}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                className="btn btn-primary btn-sm uppercase"
                onClick={() => {
                  setModalOpen(false);
                  askingPriceRef?.current?.focus();
                }}
              >
                {t(LabelConstants.CHANGE_PRICE)}
              </button>

              <button
                className="btn btn-secondary btn-sm uppercase"
                onClick={() => continueSubmit()}
              >
                {t(LabelConstants.CONTINUE_LBL)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
    </>
  );
};
