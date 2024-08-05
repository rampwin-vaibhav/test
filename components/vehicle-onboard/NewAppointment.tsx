import { useTranslation } from 'next-i18next';
import {
  FormCheckBox,
  FormDatePicker,
  FormDropdown,
  FormInput,
} from '../common/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  Cities,
  CitiesResponses,
  CountryProvinceCityResponse,
  CountryResponse,
  GetAppointmentDetailsPayload,
  InspectionSlotsData,
  Locations,
  PackageResponse,
  Province,
  VehicleListingData,
} from '../../types/models';
import { useRouter } from 'next/router';
import {
  GlobalService,
  InspectionService,
  ProfileService,
} from '../../helpers/services';
import { LabelConstants } from '../../types/i18n.labels';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { CircleSuccessIcon } from '../icons';
import ConfigurationService from '../../helpers/services/configuration.service';
import { ConfigurationKey, Locales } from '../../types/enums';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import Link from 'next/link';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { AddressTypeKey, apiDateFormat } from '../../types/constants';
import { DateObject } from 'react-multi-date-picker';
import moment from 'moment';
import { useAppContext } from '../../provider/AppProvider';

interface IFormInput {
  city: CitiesResponses | null;
  country: CountryResponse | null;
  province: Province | null;
  isSameProfileAddress?: boolean;
  streetName: string | null;
  buildingNumber: string | null;
  postCode: string | null;
  date: string | null;
  time: InspectionSlotsData | null;
}

type AppointmentProps = {
  listingId: number | null;
  listingData: VehicleListingData | null;
  packageName: string | undefined;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
  inspectionDetails: GetAppointmentDetailsPayload | null;
};

const schema = yup
  .object({
    country: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    province: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    streetName: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
    buildingNumber: yup
      .string()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD),
    postCode: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
    date: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
    time: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

export const NewAppointment: FC<AppointmentProps> = ({
  listingId,
  listingData,
  setOpenSignInModal,
  packageDetails,
  inspectionDetails,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { isDirty },
    getFieldState,
    getValues,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const router = useRouter();
  const { dateFormat } = useAppContext();

  const { isSameProfileAddress, country, province, city, date } = watch();
  const [cities, setCities] = useState<Array<Cities>>([]);
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

  const [countries, setCountries] = useState<Array<CountryResponse>>([]);
  const [provinces, setProvinces] = useState<Array<Province>>([]);
  const [userData, setUserData] = useState<Array<Locations>>([]);
  const [disableAllField, setDisableAllField] = useState<boolean>(false);
  const [isAddressDetailsSubmitted, setIsAddressDetailsSubmitted] =
    useState<boolean>(false);
  const [inspectionSlots, setInspectionSlots] = useState<
    Array<InspectionSlotsData>
  >([]);

  const fetchProvinceCitiesData = useCallback(
    async (countryId: number, provinceId: number) => {
      const data: CountryProvinceCityResponse =
        await GlobalService.getCountryProvinceCity(
          router.locale,
          countryId,
          provinceId
        );
      if (data.Countries && data.Countries.length > 0) {
        await setCountries(data.Countries);
      }
      if (data.Provinces && data.Provinces.length > 0) {
        await setProvinces(data.Provinces);
      }
      if (data.Cities && data.Cities.length > 0) {
        await setCities(data.Cities);
      }
      return data;
    },
    [router]
  );

  useEffect(() => {
    if (country === undefined) {
      setValue('province', undefined as any);
      setValue('city', undefined as any);
      setProvinces([]);
    }
  }, [country, setValue]);

  useEffect(() => {
    const field = getFieldState('city.CityId');
    if (city && field.isDirty) {
      trigger('city');
    }
  }, [city, getFieldState, trigger]);

  useEffect(() => {
    const field = getFieldState('province.Province');
    if (province && field.isDirty) {
      trigger('province');
    }
  }, [province, getFieldState, trigger]);

  useEffect(() => {
    const field = getFieldState('province.ProvinceId');
    if (province && province.ProvinceId) {
      if (field.isDirty) {
        setValue('city', undefined as any);
        trigger('city');
      }
    } else {
      setValue('city', undefined as any);
      setCities([]);
    }
  }, [province, setValue, isDirty, trigger, getFieldState, country]);

  useEffect(() => {
    const field = getFieldState('country.CountryId');
    if (country && country.CountryId) {
      if (field.isDirty) {
        setValue('province', undefined as any);
        setValue('city', undefined as any);
        trigger('province');
        trigger('city');
      }
      fetchProvinceCitiesData(country.CountryId, 0);
    }
  }, [
    fetchProvinceCitiesData,
    setValue,
    isDirty,
    trigger,
    getFieldState,
    country,
  ]);

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

      const profileAddressDetails: any = profileData?.Locations?.filter(
        (x) => x.AddressTypeKey === AddressTypeKey.Home
      );
      if (profileAddressDetails && profileAddressDetails.length > 0) {
        setUserData(profileAddressDetails);
      } else {
        setUserData([]);
      }
    };
    initialLoad();
  }, [router, listingId, packageDetails.AddressTypeKey]);

  useEffect(() => {
    const initialLoad = async () => {
      if (country && country.CountryId) {
        if (province && province.ProvinceId) {
          fetchProvinceCitiesData(country.CountryId, 0);
          fetchProvinceCitiesData(country.CountryId, province.ProvinceId);
        } else {
          fetchProvinceCitiesData(country.CountryId, 0);
        }
      } else {
        fetchProvinceCitiesData(0, 0);
      }
    };
    initialLoad();
  }, [country, province, fetchProvinceCitiesData]);

  // This useEffect handle the edit case
  useEffect(() => {
    const getDataFromListingLocation = () => {
      if (listingData?.Location) {
        reset({
          country: listingData?.Location.CountryId
            ? {
                CountryId: listingData?.Location.CountryId,
              }
            : null,
          city: listingData?.Location.CityId
            ? {
                CityId: listingData?.Location.CityId,
              }
            : null,
          streetName: listingData?.Location.StreetName,
          buildingNumber: listingData?.Location.BuildingNumber,
          postCode: listingData?.Location.ZipCode,
          province: listingData?.Location.ProvinceId
            ? {
                ProvinceId: listingData?.Location.ProvinceId,
              }
            : null,
          date: inspectionDetails?.AppointmentDate
            ? moment(inspectionDetails?.AppointmentDate, apiDateFormat).format(
                dateFormat
              )
            : null,
          time:
            inspectionDetails?.AppointmentTime !== '00:00:00'
              ? {
                  TimeValue: inspectionDetails?.AppointmentTime.slice(0, 5),
                }
              : null,
        });

        setDisableAllField(true);
      }
    };

    const initialLoad = async () => {
      reset({
        country: userData[0].CountryId
          ? {
              CountryId: userData[0].CountryId,
            }
          : null,
        city: userData[0].City
          ? {
              CityId: userData[0].CityId,
            }
          : null,
        streetName: userData[0].StreetName,
        buildingNumber: userData[0].BuildingNumber,
        postCode: userData[0].ZipCode,
        province: userData[0].ProvinceId
          ? {
              ProvinceId: userData[0].ProvinceId,
            }
          : null,
        isSameProfileAddress: getValues('isSameProfileAddress'),
        date: null,
        time: null,
      });
    };

    const fieldResetToBlank = () => {
      reset({
        country: null,
        city: null,
        streetName: null,
        buildingNumber: null,
        postCode: null,
        province: null,
        isSameProfileAddress: getValues('isSameProfileAddress'),
        date: null,
        time: null,
      });
    };

    // condition for bind data from user profile or from listingVehicle API
    if (listingData?.Location) {
      getDataFromListingLocation();
    } else if (isSameProfileAddress) {
      initialLoad();
    } else if (!isSameProfileAddress) {
      fieldResetToBlank();
    }
  }, [
    isSameProfileAddress,
    getValues,
    listingData?.Location,
    reset,
    setValue,
    userData,
    inspectionDetails?.AppointmentDate,
    inspectionDetails?.AppointmentTime,
  ]);

  useEffect(() => {
    // To fetch time slots data
    if (date) {
      const loadInspectionSlots = async () => {
        const inspectionSlotsData =
          await InspectionService.fetchInspectionSlots(
            moment(date, dateFormat).format(apiDateFormat),
            0
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
  }, [city, router, date, t, inspectionDetails]);

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
        if (listingData?.Location || isAddressDetailsSubmitted) {
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
          const formData = {
            StreetName: data.streetName,
            BuildingNumber: data.buildingNumber,
            CountryId: data.country?.CountryId || null,
            ProviceId: data.province?.ProvinceId || null,
            CityId: data.city?.CityId || null,
            Zipcode: data.postCode,
            AddressTypeKey: packageDetails.AddressTypeKey,
            VehicleListingId: listingId,
          };
          try {
            const res = await InspectionService.addUserLocation(formData);
            if (
              res.MessageCode === 'INSPECTION_APPOINTMENT_CREATED' ||
              res.MessageCode === 'ERROR_VEHICLE_LISTING_STATUS_NOT_SAVED'
            ) {
              const payload = {
                UserLocationId: res.UserLocationId,
                VehicleListingId: listingId,
              };
              try {
                const res = await InspectionService.updateVehicleListing(
                  payload
                );
                if (res.MessageCode === 'UPDATE_VEHICLELISTING_SUCCESS') {
                  const formData = {
                    LanguageId: CommonUtils.getLanguageId(router.locale!),
                    VehicleListingId: listingId,
                    AppointmentDate: moment(data.date, dateFormat).format(
                      apiDateFormat
                    )!,
                    AppointmentTime: data.time?.TimeValue!,
                    InspectionType: packageDetails.InspectionType,
                  };
                  try {
                    const res = await InspectionService.addAppointment(
                      formData
                    );
                    if (res.MessageCode === 'INSPECTION_APPOINTMENT_CREATED') {
                      //Added GTM event for List My Car Completed
                      PushDataToGTMWithSubEvents(
                        GTMEvents.ListMyCar,
                        GTMSubEvents.ProcessCompleted,
                        {
                          userId: user?.UserId
                            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! +
                              user?.UserId
                            : null,
                        }
                      );
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
                          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! +
                            user?.UserId
                          : null,
                        languageId: router.locale,
                      }
                    );
                  }
                } else {
                  toast.error(t(LabelConstants.FAILED_OPERATION));
                }
              } catch (err) {
                //Added GTM event for List My Car Error
              }
              handlePopup();
              setDisableAllField(true);
              setIsAddressDetailsSubmitted(true);
            } else if (
              res.MessageCode === 'USER_IDENTITY_VERIFICATION_PENDING'
            ) {
              handlePopup('identity');
            } else {
              toast.error(t(LabelConstants.FAILED_OPERATION));
            }
          } catch (err) {
            console.log(err);
          }
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
          if (listingData?.Location || isAddressDetailsSubmitted) {
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
            const formData = {
              StreetName: data.streetName,
              BuildingNumber: data.buildingNumber,
              CountryId: data.country?.CountryId || null,
              ProviceId: data.province?.ProvinceId || null,
              CityId: data.city?.CityId || null,
              Zipcode: data.postCode,
              AddressTypeKey: packageDetails.AddressTypeKey,
              VehicleListingId: listingId,
            };
            try {
              const res = await InspectionService.addUserLocation(formData);
              if (res.MessageCode === 'SAVE_USERLOCATION_SUCCESS') {
                //API for update vehicle listing
                const payload = {
                  UserLocationId: res.UserLocationId,
                  VehicleListingId: listingId,
                };
                try {
                  const res = await InspectionService.updateVehicleListing(
                    payload
                  );
                  if (res.MessageCode === 'UPDATE_VEHICLELISTING_SUCCESS') {
                    try {
                      //API for add appointment
                      const formData = {
                        LanguageId: CommonUtils.getLanguageId(router.locale!),
                        VehicleListingId: listingId,
                        AppointmentDate: moment(data.date, dateFormat).format(
                          apiDateFormat
                        )!,
                        AppointmentTime: data.time?.TimeValue!,
                        InspectionType: packageDetails.InspectionType,
                      };

                      const res = await InspectionService.addAppointment(
                        formData
                      );
                      if (
                        res.MessageCode === 'INSPECTION_APPOINTMENT_CREATED'
                      ) {
                        //Added GTM event for List My Car Completed
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
                            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! +
                              user?.UserId
                            : null,
                          languageId: router.locale,
                        }
                      );
                    }
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
                setDisableAllField(true);
                setIsAddressDetailsSubmitted(true);
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
        <div className="mt-8">
          <div className="flex gap-4 flex-col">
            <div>
              <div className="text-dark-gray1 font-bold text-lg">
                {packageDetails?.InspectionType.IsInspectionAtHome
                  ? `${t(LabelConstants.ENTER_ADDRESS_FOR_INSPECTION)}`
                  : `${t(
                      LabelConstants.ENTER_VEHICLE_PICKUP_ADDRESS_FOR_INSPECTION
                    )}`}
              </div>
            </div>
            {/* {!disableAllField && (
              <>
                {userData.length > 0 && (
                  <div className="flex items-center ">
                    <span className="flex h-0">
                      <FormCheckBox
                        control={control}
                        name="isSameProfileAddress"
                        label={t('')}
                        reValidate={() => {
                          trigger('isSameProfileAddress');
                        }}
                      />
                    </span>
                    <span>{`${t(
                      LabelConstants.CHKBOX_SAME_AS_PROFILE_ADDRESS
                    )}`}</span>
                  </div>
                )}
              </>
            )} */}
          </div>
          <div className="">
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-y-[1.875rem] gap-x-8 w-full mt-16">
              <div className="w-full">
                <FormInput
                  control={control}
                  name="buildingNumber"
                  label={`${t(LabelConstants.LBL_BUILDING_NUMBER)}*`}
                  disabled={disableAllField}
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={control}
                  name="streetName"
                  label={`${t(LabelConstants.LBL_STREET_NAME)}*`}
                  disabled={disableAllField}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-y-[1.875rem] gap-x-8 w-full mt-16">
              <div className="w-full">
                <FormDropdown
                  options={countries}
                  labelAccessor="Country"
                  valueAccessor="CountryId"
                  labelText={`${t(LabelConstants.COUNTRY)}*`}
                  placeHolderText={t(LabelConstants.SELECT_COUNTRY)}
                  searchPlaceHolderText={t(LabelConstants.SEARCH)}
                  control={control}
                  name="country"
                  disabled={disableAllField}
                />
              </div>
              <div className="w-full">
                <FormDropdown
                  options={provinces}
                  labelAccessor="Province"
                  valueAccessor="ProvinceId"
                  labelText={`${t(LabelConstants.PROVINCE)}*`}
                  placeHolderText={t(LabelConstants.SELECT_PROVINCE)}
                  searchPlaceHolderText={t(LabelConstants.SEARCH)}
                  control={control}
                  name="province"
                  disabled={disableAllField}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-y-[1.875rem] gap-x-8 w-full mt-16">
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
                  disabled={disableAllField}
                />
              </div>
              <div className="w-full">
                <FormInput
                  control={control}
                  name="postCode"
                  maxLength={5}
                  label={`${t(LabelConstants.POST_CODE)}*`}
                  pattern={/[^0-9]+/}
                  disabled={disableAllField}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-y-[1.875rem] gap-x-8 w-full mt-16">
              <div className="w-full">
                <FormDatePicker
                  control={control}
                  name="date"
                  label={`${t(LabelConstants.DATE)}*`}
                  disabled={
                    inspectionDetails?.AppointmentDate || disableAllField
                      ? true
                      : false
                  }
                  mapDays={(e) => mapDays(e)}
                  value={date}
                  editable={false}
                />
              </div>
              <div className="w-full">
                <FormDropdown
                  options={inspectionSlots}
                  labelAccessor="FormattedTime"
                  valueAccessor="TimeValue"
                  labelText={`${t(LabelConstants.TIME)}*`}
                  placeHolderText={t(LabelConstants.SELECT_DROPDOWN_LITERAL)}
                  searchPlaceHolderText={t(LabelConstants.SEARCH)}
                  control={control}
                  name="time"
                  disabled={
                    inspectionDetails?.AppointmentDate || disableAllField
                      ? true
                      : false
                  }
                />
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
              <span className="px-1">{t(LabelConstants.ABLE_TO_LIST)}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex justify-between items-baseline">
          <div className=" mt-20">{t(LabelConstants.INSPECTION_NOTE)}</div>
          <div className=" mt-20">
            <button type="submit" className="btn btn-primary uppercase">
              {t(LabelConstants.FINISH)}
            </button>
          </div>
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
                  <div className="flex flex-col gap-4 items-center">
                    <CircleSuccessIcon className="h-12 w-12" />
                    <span className="text-lg text-dark-gray1 font-bold text-center">{`${t(
                      LabelConstants.LBL_THANK_YOU
                    )}`}</span>
                    <div>
                      <div className="text-lg text-dark-gray1 font-bold text-center">
                        {`${t(LabelConstants.INSPECTION_BOOKING_MSG1)}`}
                      </div>
                      <div className="text-lg text-dark-gray1 font-bold text-center">
                        {`${t(LabelConstants.INSPECTION_BOOKING_MSG)}`}
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

export default NewAppointment;
