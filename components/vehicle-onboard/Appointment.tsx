import { useTranslation } from 'next-i18next';
import { FormDropdown } from '../common/Form';
import FormDatePicker from '../common/Form/FormDatePicker';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FC, SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  Cities,
  GetAppointmentDetailsPayload,
  InspectionSlotsData,
  PackageResponse,
  PetrominLocationData,
  VehicleListingData,
} from '../../types/models';
import { useRouter } from 'next/router';
import {
  GlobalService,
  InspectionService,
  ProfileService,
  VehicleService,
} from '../../helpers/services';
import { LabelConstants } from '../../types/i18n.labels';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { CircleSuccessIcon } from '../icons';
import ConfigurationService from '../../helpers/services/configuration.service';
import {
  ConfigurationKey,
  Locales,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import Link from 'next/link';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { DateObject } from 'react-multi-date-picker';
import moment from 'moment';
import { apiDateFormat, AddressType } from '../../types/constants';
import { useAppContext } from '../../provider/AppProvider';
import parse from 'html-react-parser';

interface IFormInput {
  date: string | null;
  city: Cities | null;
  location: PetrominLocationData | null;
  // time: InspectionSlotsData | null;
}

type AppointmentProps = {
  listingId: number | null;
  inspectionDetails: GetAppointmentDetailsPayload | null;
  listingData: VehicleListingData | null;
  packageName: string | undefined;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
};

const schema = yup
  .object({
    date: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
    city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    location: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    // time: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

export const Appointment: FC<AppointmentProps> = ({
  listingId,
  inspectionDetails,
  listingData,
  packageName,
  setOpenSignInModal,
  packageDetails,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getFieldState,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const router = useRouter();
  const { dateFormat } = useAppContext();

  const { city, location, date } = watch();
  const [cities, setCities] = useState<Array<Cities>>([]);
  const [inspectionAmount, setInspectionAmount] = useState<string>('');
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

  const [mapUrl, setMapUrl] = useState<string>('');
  const [petrominData, setPetrominData] = useState<Array<PetrominLocationData>>(
    []
  );
  const [globalIsAbsherVerified, setGlobalIsAbsherVerified] = useState<
    boolean | null
  >(null);
  const [globalIsAddressVerified, setGlobalIsAddressVerified] = useState<
    boolean | null
  >(null);
  const [inspectionSlots, setInspectionSlots] = useState<
    Array<InspectionSlotsData>
  >([]);
  const [embedMapHtml, setEmbedMapHtml] = useState<string>('');

  const handlePopup = async (key: string | null = null) => {
    if (key === 'identity') {
      const result = await MessageBox.open({
        content: `${t(LabelConstants.PLEASE_COMPLETE_IDENTITY_VERIFICATION)}`,
        type: MessageBoxType.Confirmation,
      });
      if (result === MessageBoxResult.Yes) {
        router.push(`/identity-verification?redirectUrl=${router.asPath}`);
      }
    } else {
      setShowVehicleAddedPopUp(true);
    }
  };

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Inspection Appointment Initiated
    PushDataToGTMWithSubEvents(
      GTMEvents.ListMyCar,
      GTMSubEvents.InspectionAppointment,
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
      const citiesData = await GlobalService.fetchInspectionCities(
        router.locale
      );
      setCities(citiesData.cities);
      const inspectionFees = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.InspectionFees,
        router.locale
      );
      setInspectionAmount(inspectionFees.ConfigurationValue);
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

  useEffect(() => {
    // To fetch location dropdown data
    if (city && city.CityId) {
      const loadLocationData = async () => {
        const allPetrominLocation = await VehicleService.fetchPetrominLocation(
          city.CityId,
          AddressType.PETROMIN_LOCATION,
          router.locale
        );
        setPetrominData(allPetrominLocation);
      };
      loadLocationData();
    }

    // To fetch time slots data
    if (location && location.LocationId && date) {
      const loadInspectionSlots = async () => {
        const inspectionSlotsData =
          await InspectionService.fetchInspectionSlots(
            moment(date, dateFormat).format(apiDateFormat),
            location.LocationId
          );
        if (inspectionSlotsData.length === 0) {
          return MessageBox.open({
            content: t(
              LabelConstants.SELECTED_LOCATION_DOES_NOT_HAVE_TIME_SLOT
            ),
            type: MessageBoxType.Message,
          });
        }
        const newInspData = inspectionSlotsData.map((x) => {
          x.FormattedTime = x.FormattedTime.replace('AM', t(LabelConstants.AM));
          x.FormattedTime = x.FormattedTime.replace('PM', t(LabelConstants.PM));
          return x;
        });
        setInspectionSlots(newInspData);
      };
      loadInspectionSlots();
    }
  }, [city, router, location, date, t, inspectionDetails]);

  // This useEffect handle the edit case
  useEffect(() => {
    if (inspectionDetails) {
      reset({
        city: inspectionDetails.City
          ? {
              City: inspectionDetails.City,
              CityId: inspectionDetails.CityId,
            }
          : null,
        location: inspectionDetails.LocationName
          ? {
              LocationName: inspectionDetails.LocationName,
              LocationId: inspectionDetails.LocationId,
            }
          : null,
        date: inspectionDetails.AppointmentDate
          ? moment(inspectionDetails.AppointmentDate, apiDateFormat).format(
              dateFormat
            )
          : null,
        /* AMC-8 Removed inspection appointment time dropdown and sending 12:00 PM default value to axle api */

        // time:
        //   inspectionDetails.AppointmentTime !== '00:00:00'
        //     ? {
        //         TimeValue: inspectionDetails.AppointmentTime.slice(0, 5),
        //       }
        //     : null,
      });
    }
  }, [inspectionDetails, reset]);

  useEffect(() => {
    if (location && location.LocationId) {
      const url: PetrominLocationData | undefined = petrominData?.find(
        (x) => x.LocationId === location.LocationId
      );
      setMapUrl(url?.MapUrl!);
      setEmbedMapHtml(url?.EmbedMapHtml!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const field = getFieldState('city');
    if (city && field.isDirty) {
      setMapUrl('');
      setEmbedMapHtml('');
      setValue('location', undefined as any);
    }
  }, [city, getFieldState]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      const user = SessionUtils.getUserDetails();

      if (
        (globalIsAbsherVerified === false ||
          isAbsherVerificationRequired === false) &&
        (globalIsAddressVerified === false ||
          isAddressVerificationRequired === false)
      ) {
        const formData = {
          AppointmentDate: moment(date, dateFormat).format(apiDateFormat)!,
          AppointmentTime: '12:00',
          LanguageId: CommonUtils.getLanguageId(router.locale!),
          LocationId: data.location?.LocationId!,
          VehicleListingId: listingId,
        };
        try {
          const res = await InspectionService.addAppointment(formData);
          if (
            res.MessageCode === 'INSPECTION_APPOINTMENT_CREATED' ||
            res.MessageCode === 'ERROR_VEHICLE_LISTING_STATUS_NOT_SAVED'
          ) {
            //Added GTM event for List My Car Completed
            PushDataToGTMWithSubEvents(
              GTMEvents.ListMyCar,
              GTMSubEvents.ProcessCompleted,
              {
                userId: user?.UserId
                  ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
                  : null,
              }
            );
            handlePopup();
          } else if (res.MessageCode === 'USER_IDENTITY_VERIFICATION_PENDING') {
            handlePopup('identity');
          } else {
            toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
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
          handlePopup('identity');
        } else {
          const formData = {
            AppointmentDate: moment(date, dateFormat).format(apiDateFormat)!,
            AppointmentTime: '12:00',
            LanguageId: CommonUtils.getLanguageId(router.locale!),
            LocationId: data.location?.LocationId!,
            VehicleListingId: listingId,
          };
          try {
            const res = await InspectionService.addAppointment(formData);
            if (
              res.MessageCode === 'INSPECTION_APPOINTMENT_CREATED' ||
              res.MessageCode === 'ERROR_VEHICLE_LISTING_STATUS_NOT_SAVED'
            ) {
              //Added GTM event for List My Car Completed
              PushDataToGTMWithSubEvents(
                GTMEvents.ListMyCar,
                GTMSubEvents.ProcessCompleted,
                {
                  userId: user?.UserId
                    ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
                    : null,
                }
              );
              if (
                listingData?.Overview.VehicleListingWorkflowNumber !==
                VehicleListingWorkflowNumber.Saved
              ) {
                await MessageBox.open({
                  content: (
                    <div className="flex flex-col gap-3 items-center">
                      <CircleSuccessIcon className="h-12 w-12" />
                      <span className="text-lg text-dark-gray1 font-bold">{`${t(
                        LabelConstants.VEHICLE_UPDATED
                      )}`}</span>
                    </div>
                  ),
                  showClose: false,
                });
                router.push('/dashboard');
              } else {
                handlePopup();
              }
            } else if (
              res.MessageCode === 'USER_IDENTITY_VERIFICATION_PENDING'
            ) {
              handlePopup('identity');
            } else {
              toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
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
        }
      }
    }
  };

  const mapDays = ({
    date,
  }: {
    date: DateObject;
    selectedDate: DateObject | DateObject[];
    currentMonth: object;
    isSameDate(arg1: DateObject, arg2: DateObject): boolean;
  }) => {
    moment.locale('en');
    const currenDate = moment().format(apiDateFormat);
    const toDate = moment().add(59, 'days').format(apiDateFormat);
    const dateStr = date.format(apiDateFormat);
    const isInRange = toDate >= dateStr && currenDate <= dateStr;
    return isInRange
      ? { className: 'rmdp-days rmdp-selected-seller text-sm' }
      : { disabled: true };
  };

  return (
    <div className="container lg:!px-52">
      {/* {packageDetails?.DisplayName && (
        <div className="text-gradient text-2xl font-bold">
          {router.locale === Locales.EN
            ? `${packageDetails?.DisplayName} ${t(LabelConstants.PACKAGE)}`
            : `${t(LabelConstants.PACKAGE)} ${packageDetails?.DisplayName}`}
        </div>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="grid  grid-cols-1 gap-y-[1.875rem] gap-x-28 w-full mt-16">
            <div className="flex sm:flex-row flex-col gap-y-[1.875rem] gap-x-28">
              <div className="w-full">
                <div className="w-full">
                  <FormDropdown
                    options={cities}
                    labelAccessor="City"
                    valueAccessor="CityId"
                    labelText={`${t(LabelConstants.CITY)}*`}
                    placeHolderText={t(LabelConstants.SELECT_CITY)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="city"
                    disabled={inspectionDetails?.AppointmentDate ? true : false}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <FormDropdown
                    options={petrominData}
                    labelAccessor="LocationName"
                    valueAccessor="LocationId"
                    labelText={`${t(LabelConstants.LOCATION)}*`}
                    placeHolderText={t(LabelConstants.SELECT_DROPDOWN_LITERAL)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="location"
                    disabled={inspectionDetails?.AppointmentDate ? true : false}
                  />
                </div>
                {mapUrl && (
                  <div className="mt-2 flex gap-2">
                    <div>{`${t(
                      LabelConstants.PLEASE_CLICK_TO_FIND_LOCATION
                    )} -`}</div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={mapUrl}
                      className="underline text-primary"
                    >
                      {mapUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {embedMapHtml && <div className="flex">{parse(embedMapHtml)}</div>}
            <div className="flex sm:flex-row flex-col gap-y-[1.875rem] gap-x-28">
              <div className="w-full">
                <div className="w-full">
                  <FormDatePicker
                    control={control}
                    name="date"
                    label={`${t(LabelConstants.DATE)}*`}
                    disabled={inspectionDetails?.AppointmentDate ? true : false}
                    mapDays={(e) => mapDays(e)}
                    value={date}
                    editable={false}
                  />
                  {inspectionDetails?.AppointmentDate && (
                    <div className="flex justify-end">
                      <p className="pt-7 tracking-wide text-sm">
                        {t(LabelConstants.CHANGE_INSPECTION_BOOKING)}
                        <Link href="/info/contact-us">
                          <span className="hover:underline text-primary cursor-pointer text-sm">{` ${t(
                            LabelConstants.CUSTOMER_CARE
                          )}`}</span>
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full">
                <div className="w-full">
                  {/* AMC-8 Removed inspection appointment time dropdown and sending 12:00 PM default value to axle api */}
                  {/* <FormDropdown
                  options={inspectionSlots}
                  labelAccessor="FormattedTime"
                  valueAccessor="TimeValue"
                  labelText={`${t(LabelConstants.TIME)}*`}
                  placeHolderText={t(LabelConstants.SELECT_DROPDOWN_LITERAL)}
                  searchPlaceHolderText={t(LabelConstants.SEARCH)}
                  control={control}
                  name="time"
                  disabled={inspectionDetails?.AppointmentDate ? true : false}
                /> */}
                </div>
              </div>
            </div>
          </div>
          {location && location?.Address1 && (
            <div className="mt-3 text-base">
              <span className="font-bold">{`${t(
                LabelConstants.PE_LOCATION_ADDRESS
              )}: `}</span>
              <span>{location?.Address1 || ''}</span>
            </div>
          )}
          {((globalIsAbsherVerified !== null &&
            globalIsAbsherVerified === false) ||
            (isAbsherVerificationRequired !== null &&
              isAbsherVerificationRequired === false)) &&
          ((globalIsAddressVerified !== null &&
            globalIsAddressVerified === false) ||
            (isAddressVerificationRequired !== null &&
              isAddressVerificationRequired === false)) ? (
            ''
          ) : (!(
              (globalIsAbsherVerified !== null &&
                globalIsAbsherVerified === false) ||
              (isAbsherVerificationRequired !== null &&
                isAbsherVerificationRequired === false)
            ) &&
              isAbsherVerified !== null &&
              !isAbsherVerified) ||
            (!(
              (globalIsAddressVerified !== null &&
                globalIsAddressVerified === false) ||
              (isAddressVerificationRequired !== null &&
                isAddressVerificationRequired === false)
            ) &&
              isYakeenVerified !== null &&
              !isYakeenVerified) ? (
            <div className="text-color font-bold mt-10 text-xl">
              <span>{`${t(LabelConstants.PLEASE_COMPLETE)} `}</span>
              <Link
                href={`/identity-verification?redirectUrl=${router.asPath}`}
                className="px-1"
              >
                <a className="hover:underline text-primary cursor-pointer">
                  {t(LabelConstants.IDENTIFICATION_URL)}
                </a>
              </Link>
              <span className="px-1">{t(LabelConstants.ABLE_TO_LIST)}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex justify-end mt-20">
          <button type="submit" className="btn btn-primary uppercase">
            {t(LabelConstants.FINISH)}
          </button>
        </div>
      </form>

      {/* Vehicle Added Pop Up */}
      <Modal
        show={showVehicleAddedPopUp}
        onClose={() => setShowVehicleAddedPopUp(false)}
        showClose={false}
      >
        <>
          <ModalBody>
            <div className="mt-4">
              <div className="title my-4">
                <div className="flex flex-col gap-3 text-lg text-dark-gray1 font-bold items-center justify-center">
                  <CircleSuccessIcon className="h-12 w-12" />
                  <h1>{t(LabelConstants.INSPECTION_BOOKING_RECEIVED)}</h1>
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
