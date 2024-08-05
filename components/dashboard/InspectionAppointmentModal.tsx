import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { ConfigurationKey } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import {
  Cities,
  InspectionSlotsData,
  MyVehicle,
  PetrominLocationData,
  SocialMediaPlatformItem,
} from '../../types/models';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import ShareModal from '../used-cars/ShareModal';
import DeleteVehicleModal from './DeleteVehicleModal';
import MarkAsSoldVehicleModal from './MarkAsSoldVehicleModal';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/Modal';
import { FormDatePicker, FormDropdown } from '../common/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  GlobalService,
  InspectionService,
  ProfileService,
  VehicleService,
} from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateObject } from 'react-multi-date-picker';
import moment from 'moment';
import { CircleSuccessIcon } from '../icons';
import { apiDateFormat, AddressType } from '../../types/constants';
import { useAppContext } from '../../provider/AppProvider';

interface IFormInput {
  date: string | null;
  city: Cities | null;
  location: PetrominLocationData | null;
}

type VehicleCardProps = {
  vehicleListingId: number;
  showBuyInspectionPopUp: boolean;
  setShowBuyInspectionPopUp: (value: boolean) => void;
  onClose?: () => void;
};

const schema = yup
  .object({
    date: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
    city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    location: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    // time: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

const InspectionAppointmentModal = ({
  vehicleListingId,
  showBuyInspectionPopUp,
  setShowBuyInspectionPopUp,
  onClose,
}: VehicleCardProps) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getFieldState,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { dateFormat } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

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
  const [cities, setCities] = useState<Array<Cities>>([]);
  const [globalIsAbsherVerified, setGlobalIsAbsherVerified] = useState<
    boolean | null
  >(null);
  const [globalIsAddressVerified, setGlobalIsAddressVerified] = useState<
    boolean | null
  >(null);
  const [inspectionSlots, setInspectionSlots] = useState<
    Array<InspectionSlotsData>
  >([]);
  const [petrominData, setPetrominData] = useState<Array<PetrominLocationData>>(
    []
  );

  const [showVehicleAddedPopUp, setShowVehicleAddedPopUp] =
    useState<boolean>(false);

  const { city, location, date } = watch();

  useEffect(() => {
    const initialLoad = async () => {
      const citiesData = await GlobalService.fetchCities(router.locale);
      setCities(citiesData.cities);
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
  }, [router]);

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
  }, [city, router, location, date, t]);

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
      onClose && onClose();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (!SessionUtils.isValidSession()) {
      // setOpenSignInModal(true);
    } else {
      const user = SessionUtils.getUserDetails();

      if (
        (globalIsAbsherVerified === false ||
          isAbsherVerificationRequired === false) &&
        (globalIsAddressVerified === false ||
          isAddressVerificationRequired === false)
      ) {
        const formData = {
          AppointmentDate: moment(data.date, dateFormat).format(apiDateFormat)!,
          AppointmentTime: '12:00',
          LanguageId: CommonUtils.getLanguageId(router.locale!),
          LocationId: data.location?.LocationId!,
          VehicleListingId: vehicleListingId,
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
            toast.error(t(LabelConstants.FAILED_OPERATION));
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
            AppointmentDate: moment(data.date, dateFormat).format(
              apiDateFormat
            )!,
            AppointmentTime: '12:00',
            LanguageId: CommonUtils.getLanguageId(router.locale!),
            LocationId: data.location?.LocationId!,
            VehicleListingId: vehicleListingId,
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
            } else if (
              res.MessageCode === 'USER_IDENTITY_VERIFICATION_PENDING'
            ) {
              handlePopup('identity');
            } else {
              toast.error(t(LabelConstants.FAILED_OPERATION));
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

  const closeModel = () => {
    setShowBuyInspectionPopUp(false);
  };

  return (
    <>
      <div>
        <Modal
          backdrop="static"
          show={showBuyInspectionPopUp}
          onClose={() => closeModel()}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <div className="justify-start border-b-2 pb-4">
                <h1 className="text-2xl text-gray-700 font-bold">
                  {t(LabelConstants.SURVEY_DETAILS)}
                </h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <>
                <div>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-[1.875rem] gap-x-28 w-full mt-8 mb-40">
                    <div className="w-full">
                      <div className="w-full">
                        <FormDatePicker
                          control={control}
                          name="date"
                          label={`${t(LabelConstants.DATE)}*`}
                          mapDays={(e) => mapDays(e)}
                          value={date}
                          editable={false}
                        />
                      </div>
                    </div>
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
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full">
                        <FormDropdown
                          options={petrominData}
                          labelAccessor="LocationName"
                          valueAccessor="LocationId"
                          labelText={`${t(
                            LabelConstants.PE_STATION_LOCATION
                          )}*`}
                          placeHolderText={t(
                            LabelConstants.SELECT_DROPDOWN_LITERAL
                          )}
                          searchPlaceHolderText={t(LabelConstants.SEARCH)}
                          control={control}
                          name="location"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full">
                        {/* <FormDropdown
                          options={inspectionSlots}
                          labelAccessor="FormattedTime"
                          valueAccessor="TimeValue"
                          labelText={`${t(LabelConstants.TIME)}*`}
                          placeHolderText={t(
                            LabelConstants.SELECT_DROPDOWN_LITERAL
                          )}
                          searchPlaceHolderText={t(LabelConstants.SEARCH)}
                          control={control}
                          name="time"
                        /> */}
                        <div className="flex justify-end">
                          <p className="pt-7 tracking-wide text-sm">
                            {t(LabelConstants.CHANGE_INSPECTION_BOOKING)}
                            <span className="hover:underline text-primary cursor-pointer text-sm">
                              {` ${t(LabelConstants.CUSTOMER_CARE)}`}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <span className="px-1">
                        {t(LabelConstants.ABLE_TO_LIST)}
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <hr />
              </>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-modal !text-lg uppercase !min-h-min !min-w-min !px-4 !py-3"
                  onClick={() => closeModel()}
                >
                  {t(LabelConstants.CANCEL)}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-modal !text-lg uppercase !min-h-min !min-w-min !px-4 !py-3"
                >
                  {t('Done')}
                </button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
        <Modal
          show={showVehicleAddedPopUp}
          onClose={() => {
            setShowVehicleAddedPopUp(false);
            closeModel();
          }}
        >
          <>
            <ModalBody>
              <div className="mt-4">
                <div className="title my-4">
                  <div className="flex flex-col gap-3 text-lg text-dark-gray1 font-bold items-center justify-center">
                    <CircleSuccessIcon className="h-12 w-12" />
                    <hr />
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
                    closeModel();
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
    </>
  );
};

export default InspectionAppointmentModal;
