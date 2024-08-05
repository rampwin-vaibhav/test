import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, SetStateAction, useEffect, useState } from 'react';
import {
  PackageResponse,
  TestDriveAvailableDetails,
  TestDriveData,
  VehicleListingData,
} from '../../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import FormDropdown from '../common/Form/FormDropdown';
import { LabelConstants } from '../../types/i18n.labels';
import { DateObject } from 'react-multi-date-picker';
import {
  ConfigurationKey,
  Locales,
  TestDriveKeys,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormCheckBox, FormInput } from '../common/Form';
import { ProfileService, VehicleService } from '../../helpers/services';
import FormCalendar from '../common/Form/FormCalendar';
import moment from 'moment';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { Modal, ModalBody, ModalFooter, ModalSize } from '../common/Modal';
import { CircleSuccessIcon } from '../icons';
import {
  StatusIDsAllowedForUpgrade,
  apiDateFormat,
} from '../../types/constants';
import Link from 'next/link';

interface IFormInput {
  Agreement: boolean;
  Signature: string;
  testDriveAvailability: TestDriveData | null;
  dates: Array<string>;
}

type ConfirmDetailsProps = {
  listingId: number | null;
  listingData: {
    data: VehicleListingData | null;
    testDriveDates: TestDriveAvailableDetails | null;
  } | null;
  setIsDirty: (value: SetStateAction<boolean>) => void;
  p_id: string;
  order_id: string;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  setIsTabValid: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  packageId: string | string[] | number | undefined;
  orderId: string | string[] | number | undefined;
};

export const ConfirmDetails: FC<ConfirmDetailsProps> = ({
  listingId,
  listingData,
  setIsDirty,
  p_id,
  order_id,
  setOpenSignInModal,
  setIsTabValid,
  packageDetails,
  setIsLoading,
  packageId,
  orderId,
}) => {
  const [testDriveDate, setTestDriveDate] = useState<Array<TestDriveData>>([]);
  const [minAskingPrice, setMinAskingPrice] = useState<number>(0);
  const [maxAskingPrice, setMaxAskingPrice] = useState<number>(0);
  const [rangeStart, setRangeStart] = useState(
    new DateObject().format(apiDateFormat)
  );
  const [showVehicleAddedPopUp, setShowVehicleAddedPopUp] =
    useState<boolean>(false);
  const [isAbsherVerificationRequired, setIsAbsherVerificationRequired] =
    useState<boolean | null>(null);
  const [isAddressVerificationRequired, setIsAddressVerificationRequired] =
    useState<boolean | null>(null);
  const [isAbsherVerified, setIsAbsherVerified] = useState<boolean | null>(
    null
  );
  const [isYakeenVerified, setIsYakeenVerified] = useState<boolean | null>(
    null
  );

  const [globalIsAbsherVerified, setGlobalIsAbsherVerified] = useState<
    boolean | null
  >(null);
  const [globalIsAddressVerified, setGlobalIsAddressVerified] = useState<
    boolean | null
  >(null);

  const defaultEndDate = new DateObject();
  defaultEndDate.add(59, 'days');
  const router = useRouter();
  const { t } = useTranslation();
  const currenDate = moment().format(apiDateFormat);
  const schema = yup
    .object({
      Signature: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD)
        .test(
          'maxDigits',
          LabelConstants.ENTER_100_CHAR,
          (number) => String(number).length <= 100
        )
        .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
      Agreement: yup
        .boolean()
        .required(LabelConstants.REQUIRED_FIELD)
        .oneOf([true], LabelConstants.REQUIRED_FIELD),
      /* Commented the code as test drive date will be hidden for all packages */
      // testDriveAvailability: !packageDetails?.IsSelfListedPackage
      //   ? yup.object().nullable().required(LabelConstants.REQUIRED_FIELD)
      //   : yup.object().nullable(),
    })
    .required();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    getFieldState,
    formState: { errors, isDirty },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { testDriveAvailability } = watch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Confirm Details Initiated
    PushDataToGTMWithSubEvents(
      GTMEvents.ListMyCar,
      GTMSubEvents.ConfirmDetails,
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
      const testDriveAvailableDate =
        await VehicleService.fetchTestDriveAvailabilities(router.locale);
      setTestDriveDate(testDriveAvailableDate);
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
  }, [router, rangeStart, listingId]);

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty, setIsDirty]);

  // This useEffect handle the edit case
  useEffect(() => {
    if (listingData && listingData.data && listingData.testDriveDates) {
      let dates: Array<string> = [];
      if (
        listingData.testDriveDates.TestDriveAvailabilityKey ===
        TestDriveKeys.DateRange
      ) {
        dates = listingData.testDriveDates.TestDriveAvailableDates.map(
          (x) => x.FromDate
        );
      } else if (
        listingData.testDriveDates?.TestDriveAvailabilityKey ===
        TestDriveKeys.Date
      ) {
        dates = listingData.testDriveDates.TestDriveAvailableDates.map(
          (x) => x.FromDate
        );
      } else if (
        listingData.testDriveDates?.TestDriveAvailabilityKey ===
        TestDriveKeys.Weekend
      ) {
        dates = listingData.testDriveDates.TestDriveAvailableDates.map(
          (x) => x.FromDate
        );
      } else if (
        listingData.testDriveDates?.TestDriveAvailabilityKey ===
        TestDriveKeys.AllDate
      ) {
        dates = listingData.testDriveDates.TestDriveAvailableDates.map(
          (x) => x.FromDate
        );
      } else if (
        listingData.testDriveDates?.TestDriveAvailabilityKey ===
        TestDriveKeys.RequestBuyer
      ) {
        dates = [];
      }
      reset({
        Signature: listingData.data.Overview.Signature,
        Agreement: listingData.data.Overview.Agreement,
        testDriveAvailability: listingData.testDriveDates.TestDriveAvailability
          ? {
              TestDriveAvailability:
                listingData.testDriveDates.TestDriveAvailability,
              TestDriveAvailabilityKey:
                listingData.testDriveDates.TestDriveAvailabilityKey,
              TestDriveAvailabilityId:
                listingData.testDriveDates.TestDriveAvailabilityId,
            }
          : null,
        dates,
      });
    }
  }, [listingData, reset]);

  useEffect(() => {
    const field = getFieldState('testDriveAvailability');
    if (testDriveAvailability && field.isDirty) {
      if (
        testDriveAvailability.TestDriveAvailabilityKey === TestDriveKeys.AllDate
      ) {
        const dates: Array<string> = [];
        for (let i = 0; i < 60; i++) {
          dates.push(moment().add(i, 'days').format(apiDateFormat));
        }
        setValue('dates', dates);
      } else if (
        testDriveAvailability.TestDriveAvailabilityKey === TestDriveKeys.Weekend
      ) {
        const dates: Array<string> = [];
        for (let i = 0; i < 60; i++) {
          const isWeekend = [5, 6].includes(
            moment().add(i, 'days').isoWeekday()
          );
          isWeekend &&
            dates.push(moment().add(i, 'days').format(apiDateFormat));
        }
        setValue('dates', dates);
      } else {
        setValue('dates', []);
      }
    }
  }, [testDriveAvailability, getFieldState, setValue]);

  useEffect(() => {
    moment.locale('en');
  }, [router.locale]);

  useEffect(() => {
    const initialLoad = async () => {
      const isAbsher = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.IsAbsherVerificationRequired,
        router.locale
      );
      setGlobalIsAbsherVerified(isAbsher.ConfigurationValue === 'true');
      const isAddress = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.IsUserAddressVerificationRequired,
        router.locale
      );
      setGlobalIsAddressVerified(isAddress.ConfigurationValue === 'true');
      const profileData = await ProfileService.fetchUserData(router.locale);
      setIsAbsherVerificationRequired(profileData.IsAbsherVerificationRequired);
      setIsAddressVerificationRequired(
        profileData.IsAddressVerificationRequired
      );
      setIsAbsherVerified(profileData.IsAbsherVerified);
      setIsYakeenVerified(profileData.IsYakeenVerified);
    };
    initialLoad();
  }, [router, listingId]);

  const mapDays = (
    {
      date,
    }: {
      date: DateObject;
      selectedDate: DateObject | DateObject[];
      currentMonth: object;
      isSameDate(arg1: DateObject, arg2: DateObject): boolean;
    },
    availability: TestDriveData | null
  ) => {
    const toDate = moment().add(59, 'days').format(apiDateFormat);
    const dateStr = date.format(apiDateFormat);
    const isInRange = toDate >= dateStr && currenDate <= dateStr;
    switch (availability?.TestDriveAvailabilityKey) {
      case TestDriveKeys.Date:
      case TestDriveKeys.AllDate:
      case TestDriveKeys.DateRange: {
        return isInRange
          ? { className: 'rmdp-days rmdp-selected-seller text-sm' }
          : { disabled: true };
      }
      case TestDriveKeys.Weekend: {
        let isWeekend = [5, 6].includes(date.weekDay.index);
        return isInRange && isWeekend
          ? { className: 'rmdp-days rmdp-selected-seller text-sm' }
          : { disabled: true };
      }
      default: {
        return { disabled: true };
      }
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      if (
        (globalIsAbsherVerified === false ||
          isAbsherVerificationRequired === false) &&
        (globalIsAddressVerified === false ||
          isAddressVerificationRequired === false)
      ) {
        {
          /* Commented the code as test drive date will be hidden for all packages */
        }
        // if (
        //   data.testDriveAvailability?.TestDriveAvailabilityKey !==
        //     TestDriveKeys.RequestBuyer &&
        //   !packageDetails?.IsSelfListedPackage &&
        //   data.dates.length === 0
        // ) {
        //   return MessageBox.open({
        //     content: t(LabelConstants.NOT_SELECTED_DATES),
        //     type: MessageBoxType.Message,
        //   });
        // }
        setIsLoading(true);
        const dateArray = data.dates.map((x) => {
          return {
            FromDate: x,
            ToDate: x,
          };
        });
        //checking isInspectionNeeded flag for packages
        // if (!packageDetails.IsSelfListedPackage) {
        //   //Q1Fun-603 hide test drive date for gold users
        //   // const testDriveDataPayload = {
        //   //   Dates:
        //   //     data.testDriveAvailability?.TestDriveAvailabilityKey ===
        //   //     TestDriveKeys.RequestBuyer
        //   //       ? []
        //   //       : dateArray,
        //   //   LanguageId: CommonUtils.getLanguageId(router.locale!),
        //   //   TestDriveAvailabilityId:
        //   //     data.testDriveAvailability?.TestDriveAvailabilityId!,
        //   //   VehicleListingId: listingId,
        //   // };
        //   // const testDriveResponse = await VehicleService.addTestDriveDates(
        //   //   testDriveDataPayload
        //   // );
        //   // if (testDriveResponse) {
        //   const confirmDetailsPayload = {
        //     Agreement: data.Agreement,
        //     CurrencySymbol: 'SAR',
        //     LanguageId: CommonUtils.getLanguageId(router.locale!),
        //     Signature: data.Signature,
        //     VehicleListingId: listingId,
        //     IsInspectionNeeded: packageDetails.IsInspectionNeeded,
        //   };
        //   try {
        //     const res = await VehicleService.addConfirmDetails(
        //       confirmDetailsPayload
        //     );
        //     if (res) {
        //       setIsTabValid(true);
        //       !packageDetails.IsSelfListedPackage
        //         ? router.push(
        //             `/vehicle-onboard/${listingId}?tab=Inspection Appointment`,
        //             // ${
        //             //   p_id !== 'undefined'
        //             //     ? `&p_id=${p_id}&OrderItemId=${order_id}`
        //             //     : ''
        //             // }

        //             undefined,
        //             {
        //               shallow: true,
        //             }
        //           )
        //         : setShowVehicleAddedPopUp(true);

        //       setIsDirty(false);
        //     }
        //   } catch (err) {
        //     const user = SessionUtils.getUserDetails();

        //     //Added GTM event for List My Car Error
        //     PushDataToGTMWithSubEvents(
        //       GTMEvents.ListMyCar,
        //       GTMSubEvents.ListMyCarError,
        //       {
        //         userId: user?.UserId
        //           ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
        //           : null,
        //         languageId: router.locale,
        //       }
        //     );
        //   }
        //   // }
        // } else {
        const confirmDetailsPayload = {
          Agreement: data.Agreement,
          CurrencySymbol: 'SAR',
          LanguageId: CommonUtils.getLanguageId(router.locale!),
          Signature: data.Signature,
          VehicleListingId: listingId,
          IsInspectionNeeded: false,
        };
        try {
          const res = await VehicleService.addConfirmDetails(
            confirmDetailsPayload
          );
          if (res) {
            setIsTabValid(true);
            // !packageDetails.IsSelfListedPackage
            //   ? router.push(
            //       `/vehicle-onboard/${listingId}?tab=Inspection Appointment
            //      `,
            //       //  ${
            //       //   p_id !== 'undefined'
            //       //     ? `&p_id=${p_id}&OrderItemId=${order_id}`
            //       //     : ''
            //       // }
            //       undefined,
            //       {
            //         shallow: true,
            //       }
            //     )
            //   :
            setShowVehicleAddedPopUp(true);

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
        // }
      } else {
        if (
          (!(
            globalIsAbsherVerified === false ||
            isAbsherVerificationRequired === false
          ) &&
            !isAbsherVerified) ||
          (!(
            globalIsAddressVerified === false ||
            isAddressVerificationRequired === false
          ) &&
            !isYakeenVerified)
        ) {
          const result = await MessageBox.open({
            content: `${t(
              LabelConstants.PLEASE_COMPLETE_IDENTITY_VERIFICATION
            )}`,
            type: MessageBoxType.Confirmation,
          });
          if (result === MessageBoxResult.Yes) {
            router.push(`/identity-verification?redirectUrl=${router.asPath}`);
          }
        } else {
          {
            /* Commented the code as test drive date will be hidden for all packages */
          }
          // if (
          //   data.testDriveAvailability?.TestDriveAvailabilityKey !==
          //     TestDriveKeys.RequestBuyer &&
          //   !packageDetails?.IsSelfListedPackage &&
          //   data.dates.length === 0
          // ) {
          //   return MessageBox.open({
          //     content: t(LabelConstants.NOT_SELECTED_DATES),
          //     type: MessageBoxType.Message,
          //   });
          // }
          setIsLoading(true);
          const dateArray = data.dates.map((x) => {
            return {
              FromDate: x,
              ToDate: x,
            };
          });
          //checking isInspectionNeeded flag for packages
          // if (!packageDetails.IsSelfListedPackage) {
          //   //Q1Fun-603 hide test drive date for gold users
          //   // const testDriveDataPayload = {
          //   //   Dates:
          //   //     data.testDriveAvailability?.TestDriveAvailabilityKey ===
          //   //     TestDriveKeys.RequestBuyer
          //   //       ? []
          //   //       : dateArray,
          //   //   LanguageId: CommonUtils.getLanguageId(router.locale!),
          //   //   TestDriveAvailabilityId:
          //   //     data.testDriveAvailability?.TestDriveAvailabilityId!,
          //   //   VehicleListingId: listingId,
          //   // };
          //   // const testDriveResponse = await VehicleService.addTestDriveDates(
          //   //   testDriveDataPayload
          //   // );
          //   // if (testDriveResponse) {
          //   const confirmDetailsPayload = {
          //     Agreement: data.Agreement,
          //     CurrencySymbol: 'SAR',
          //     LanguageId: CommonUtils.getLanguageId(router.locale!),
          //     Signature: data.Signature,
          //     VehicleListingId: listingId,
          //     IsInspectionNeeded: packageDetails.IsInspectionNeeded,
          //   };
          //   try {
          //     const res = await VehicleService.addConfirmDetails(
          //       confirmDetailsPayload
          //     );
          //     if (res) {
          //       setIsTabValid(true);
          //       !packageDetails.IsSelfListedPackage
          //         ? router.push(
          //             `/vehicle-onboard/${listingId}?tab=Inspection Appointment`,
          //             // ${
          //             //   p_id !== 'undefined'
          //             //     ? `&p_id=${p_id}&OrderItemId=${order_id}`
          //             //     : ''
          //             // }
          //             undefined,
          //             {
          //               shallow: true,
          //             }
          //           )
          //         : setShowVehicleAddedPopUp(true);

          //       setIsDirty(false);
          //     }
          //   } catch (err) {
          //     const user = SessionUtils.getUserDetails();

          //     //Added GTM event for List My Car Error
          //     PushDataToGTMWithSubEvents(
          //       GTMEvents.ListMyCar,
          //       GTMSubEvents.ListMyCarError,
          //       {
          //         userId: user?.UserId
          //           ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          //           : null,
          //         languageId: router.locale,
          //       }
          //     );
          //   }
          //   // }
          // } else {

          const confirmDetailsPayload = {
            Agreement: data.Agreement,
            CurrencySymbol: 'SAR',
            LanguageId: CommonUtils.getLanguageId(router.locale!),
            Signature: data.Signature,
            VehicleListingId: listingId,
            IsInspectionNeeded: false,
          };
          try {
            const res = await VehicleService.addConfirmDetails(
              confirmDetailsPayload
            );
            if (res) {
              setIsTabValid(true);
              // !packageDetails.IsSelfListedPackage
              //   ? router.push(
              //       `/vehicle-onboard/${listingId}?tab=Inspection Appointment`,
              //       // ${
              //       //   p_id !== 'undefined'
              //       //     ? `&p_id=${p_id}&OrderItemId=${order_id}`
              //       //     : ''
              //       // }
              //       undefined,
              //       {
              //         shallow: true,
              //       }
              //     )
              //   :
              setShowVehicleAddedPopUp(true);

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
          // }
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container lg:!px-52">
      {/* {packageDetails?.DisplayName && (
        <div className="flex items-center justify-between">
          <div className="text-gradient text-2xl font-bold">
            {router.locale === Locales.EN
              ? `${packageDetails?.DisplayName} ${t(LabelConstants.PACKAGE)}`
              : `${t(LabelConstants.PACKAGE)} ${packageDetails?.DisplayName}`}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex flex-col xl:flex-row xl:items-center items-start">
          <p className="w-auto font-bold text-xl pt-4 lg:w-1/4">
            {t(LabelConstants.ASKING_PRICE)}*
          </p>
          <div className="flex flex-col justify-center sm:w-[25rem] w-full">
            <div className="pt-4">
              <FormInput
                control={control}
                name="AskingPrice"
                pattern={/[^0-9]+/}
                showUnit={true}
                className="rtl:rounded-l-none ltr:rounded-r-none"
                unitText={t(LabelConstants.SAR)}
                isStartLabel={router.locale === Locales.EN ? true : false}
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! >=
                    VehicleListingWorkflowNumber.Sold &&
                  listingData?.testDriveDates?.TestDriveAvailabilityId
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </div> */}

        {/* Commented the code as test drive date will be hidden for all packages */}

        {/* {!packageDetails?.IsSelfListedPackage && (
          <div className="flex flex-col xl:flex-row pt-[1.875rem]">
            <p className="font-bold text-xl w-1/4">
              {t(LabelConstants.PREFERRED_TEST_DRIVE_DATE)}*
            </p>
            <div className="flex flex-col gap-y-4 justify-center pt-4 lg:pt-0 sm:w-[25rem] w-full">
              <FormDropdown
                options={testDriveDate}
                labelAccessor="TestDriveAvailability"
                valueAccessor="TestDriveAvailabilityKey"
                control={control}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                name="testDriveAvailability"
                placeHolderText={t(LabelConstants.SELECT_DROPDOWN_LITERAL)}
                disabled={
                  listingData?.data?.Overview.VehicleListingWorkflowNumber! >=
                    VehicleListingWorkflowNumber.Sold &&
                  listingData?.testDriveDates?.TestDriveAvailabilityId
                    ? true
                    : false
                }
              />

              {testDriveAvailability?.TestDriveAvailabilityKey &&
                testDriveAvailability.TestDriveAvailabilityKey !==
                  TestDriveKeys.RequestBuyer && (
                  <FormCalendar
                    control={control}
                    name="dates"
                    mapDays={(e) => mapDays(e, testDriveAvailability)}
                    range={
                      TestDriveKeys.DateRange ===
                      testDriveAvailability?.TestDriveAvailabilityKey
                    }
                    readOnly={
                      testDriveAvailability?.TestDriveAvailabilityKey ===
                        TestDriveKeys.AllDate ||
                      testDriveAvailability?.TestDriveAvailabilityKey ===
                        TestDriveKeys.Weekend
                    }
                  />
                )}
            </div>
          </div>
        )} */}
        <div className="text-gray-500 font-bold pt-10 pb-4 text-xl">
          {t(LabelConstants.ACKNOWLEDGMENT)}
        </div>
        <div className="text-gray-500 text-sm">
          {t(LabelConstants.ACKNOWLEDGEMENT_DATA)}
        </div>
        <a
          className="underline text-sm text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
          href={window.location.origin}
        >
          {window.location.origin}
        </a>
        <span className="text-gray-500 text-sm ml-1">
          {t(LabelConstants.ACKNOWLEDGEMENT_TEXT)}
        </span>
        <div className="flex items-center gap-2 pt-10">
          <FormCheckBox
            control={control}
            name="Agreement"
            disabled={
              listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                VehicleListingWorkflowNumber.Saved &&
              listingData?.testDriveDates?.TestDriveAvailabilityId
                ? true
                : false
            }
          />
          <div className="flex items-center gap-2">
            <label htmlFor="Agreement" className="!pb-0">{`${t(
              LabelConstants.I_AGREE
            )}`}</label>
            <span>
              <Link href="/info/terms-and-conditions">
                <a
                  className="text-primary underline font-bold text-sm"
                  target="_blank"
                >{`${t(LabelConstants.TERMS_CONDITIONS)}`}</a>
              </Link>
              &nbsp; *
            </span>
          </div>
        </div>
        {errors.Agreement && errors.Agreement?.message && (
          <p className="error">{t(errors.Agreement?.message)}</p>
        )}
        <div className="flex pt-8 mb-32 items-center sm:w-[25rem] w-full gap-4">
          <p className="font-bold text-xl">{t(LabelConstants.NAME)}*</p>
          <FormInput
            control={control}
            label=""
            name="Signature"
            disabled={
              listingData?.data?.Overview.VehicleListingWorkflowNumber! >
                VehicleListingWorkflowNumber.Saved &&
              listingData?.testDriveDates?.TestDriveAvailabilityId
                ? true
                : false
            }
          />
        </div>
        <div className="flex justify-end mt-20">
          {/* {!packageDetails?.IsSelfListedPackage ? (
            <button type="submit" className="btn btn-primary uppercase">
              {t(LabelConstants.NEXT)}
            </button>
          ) : ( */}
          <button type="submit" className="btn btn-primary uppercase">
            {t(LabelConstants.SUBMIT)}
          </button>
          {/* )} */}
        </div>
      </form>
      {/* Vehicle Added Pop Up */}
      <Modal
        show={showVehicleAddedPopUp}
        onClose={() => setShowVehicleAddedPopUp(false)}
        showClose={false}
        size={ModalSize.DEFAULT}
      >
        <>
          <ModalBody>
            <div className="mt-4">
              <div className="title my-4">
                <div className="flex flex-col gap-3 text-lg text-dark-gray1 font-bold items-center justify-center">
                  <div className="flex flex-col gap-4 items-center">
                    <CircleSuccessIcon className="h-12 w-12" />
                    <span className="text-lg text-dark-gray1 font-bold text-center">{`${t(
                      LabelConstants.LBL_THANK_YOU
                    )}`}</span>
                    <div>
                      <div className="text-lg text-dark-gray1 sm:w-[40rem] font-bold text-center">
                        {t(LabelConstants.CONFIRM_DETAILS_MSG1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex justify-center">
              <button
                onClick={() => {
                  setShowVehicleAddedPopUp(false);
                  router.push('/dashboard');
                }}
                className="btn btn-primary btn-modal uppercase"
              >
                {t(LabelConstants.OK)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
    </div>
  );
};
