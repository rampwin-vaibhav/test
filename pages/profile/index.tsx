import { useForm, SubmitHandler } from 'react-hook-form';
import { FormPhoneInputV1 } from '../../components/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '../../components/common/Form/FormInput';
import FormRadio from '../../components/common/Form/FormRadio';
import FormCheckBox from '../../components/common/Form/FormCheckBox';
import FormDropdown, {
  FormDropdownService,
} from '../../components/common/Form/FormDropdown';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  ConfigurationKey,
  GenderId,
  Locales,
  UserProfileStatus,
} from '../../types/enums';
import FormDatePicker from '../../components/common/Form/FormDatePicker';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GlobalService,
  OtpService,
  ProfileService,
} from '../../helpers/services';
import {
  ProfileData,
  UpdateProfilePayload,
  UserTitleResponse,
  CountryResponse,
  CountryStateCItyResponse,
  StatesResponse,
  CityResponse,
} from '../../types/models';
import { useRouter } from 'next/router';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '../../components/common/Modal';
import {
  CircleSuccessIcon,
  FemaleIcon,
  MaleIcon,
  SelectedFemaleIcon,
  SelectedMaleIcon,
  ValidatedIcon,
} from '../../components/icons';
import Link from 'next/link';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { toast } from 'react-toastify';
import ConfigurationService from '../../helpers/services/configuration.service';
import MessageBox, { MessageBoxType } from '../../components/common/MessageBox';
import { DateObject } from 'react-multi-date-picker';
import SignInModal from '../../components/common/SignInModal';
import Spinner from '../../components/common/Spinner/spinner';
import moment from 'moment';
import { apiDateFormat } from '../../types/constants';
import { useAppContext } from '../../provider/AppProvider';
import VerifyEmailModal from '../../components/verify-email-modal';

interface IFormInput {
  title: UserTitleResponse;
  firstName: string;
  middleName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  dateOfBirth: string;
  country: CountryResponse;
  state: StatesResponse;
  city: CityResponse;
  zip: string;
  email: string;
  mobile: string;
  profession: string;
  preferredCommunication: {
    isPreferredWhatsapp: boolean;
    isPreferredSms: boolean;
    isPreferredEmail: boolean;
  };
  gender: string;
  preferredLanguage: string;
}

interface ChangeEmailIFormInput {
  oldEmail: string;
  newEmail: string;
}

const schema = yup
  .object({
    title: yup.object().required(LabelConstants.PLEASE_SELECT_TITLE),
    firstName: yup
      .string()
      .nullable()
      .required(LabelConstants.PLEASE_ENTER_FIRST_NAME)
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    middleName: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, {
        message: LabelConstants.LETTERS_ALLOWED,
        excludeEmptyString: true,
      }),
    lastName: yup
      .string()
      .nullable()
      .required(LabelConstants.PLEASE_ENTER_LAST_NAME)
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    addressLine1: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.FRM_ERR_MSG_MAX250_LETTER,
        (number) => String(number).length <= 250
      ),
    addressLine2: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.FRM_ERR_MSG_MAX250_LETTER,
        (number) => String(number).length <= 250
      ),
    zip: yup
      .string()
      .nullable()
      .test(
        'maxDigit',
        LabelConstants.FRM_ERR_MSG_ZIP_NUMBER,
        (number) =>
          String(number).trim().length === 5 ||
          !number ||
          String(number).trim().length === 0
      )
      .test(
        'notAllZeros',
        LabelConstants.ZIP_NOT_ALL_ZERO,
        (number) => String(number).trim() !== '00000'
      ),
    preferredLanguage: yup.string().nullable(),
    email: yup
      .string()
      .nullable()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
    preferredCommunication: yup.object({
      isPreferredWhatsapp: yup.boolean(),
      isPreferredSms: yup.boolean(),
      isPreferredEmail: yup.boolean(),
    }),
    profession: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.MAX_50_CHARCTERS_ALLOWED,
        (data) =>
          String(data).trim().length <= 50 ||
          !data ||
          String(data).trim().length === 0
      ),
  })
  .required();

const emailSchema = yup
  .object({
    newEmail: yup
      .string()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
  })
  .required();

const Profile = (): InferGetServerSidePropsType<typeof getServerSideProps> => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    trigger,
    register,
    watch,
    reset,
    setValue,
    getFieldState,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const {
    control: controlEmail,
    handleSubmit: handleEmailSubmit,
    setValue: setEmailValue,
  } = useForm<ChangeEmailIFormInput>({
    resolver: yupResolver(emailSchema),
  });

  const { dateFormat } = useAppContext();
  const [cities, setCities] = useState<Array<CityResponse>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openChangeEmailModal, setOpenChangeEmailModal] =
    useState<boolean>(false);
  const [profileData, setProfileData] = useState<
    ProfileData & {
      profileCountry?: CountryResponse;
      profileState?: StatesResponse;
      profileCity?: CityResponse;
    }
  >();
  const [globalLevelAbsherVerification, setGlobalLevelAbsherVerification] =
    useState<boolean>();
  const [globalLevelAddressVerification, setGlobalLevelAddressVerification] =
    useState<boolean>();
  // const [deactivateProfile, setDeactivateProfile] = useState<boolean>(true);
  const [userDataReload, setUserDataReload] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [userTitle, setUserTitle] = useState<Array<UserTitleResponse>>([]);
  const { country, state, city, dateOfBirth } = watch();
  const [countries, setCountries] = useState<Array<CountryResponse>>([]);
  const [states, setStates] = useState<Array<StatesResponse>>([]);
  const [loader, setLoader] = useState<boolean>();
  const refTitle = useRef<FormDropdownService>(null);
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);

  useEffect(() => {
    if (refTitle && refTitle.current && refTitle.current?.setFocus) {
      const isTitleError: any =
        Object.keys(errors).reduce((field: any, a: any) => {
          return !!(errors as any)[field] ? field : a;
        }, null) === 'title';

      if (isTitleError) {
        refTitle.current?.setFocus();
      }
    }
  }, [errors]);

  const fetchStateCitiesData = useCallback(
    async (countryId: number, stateId: number) => {
      const data: CountryStateCItyResponse =
        await GlobalService.getCountryStateCity(
          router.locale,
          countryId,
          stateId
        );
      if (data.Countries && data.Countries.length > 0) {
        setCountries(data.Countries);
      }
      if (data && data?.States) {
        setStates(data?.States);
      }
      if (data && data?.Cities) {
        setCities(data?.Cities);
      }
      return data;
    },
    [router]
  );

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setOpenSignInModal(true);
        } else {
          setOpenSignInModal(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      let allCountryStatesCities: CountryStateCItyResponse | undefined;
      let selectedProfileCountry: CountryResponse | undefined;
      let selectedProfileStates: StatesResponse | undefined;
      let selectedProfileCities: CityResponse | undefined;

      const [
        profile,
        globalLevelAbsherVerificationData,
        globalLevelAddressVerificationData,
      ] = await Promise.all([
        ProfileService.fetchUserData(router.locale),
        ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.IsAbsherVerificationRequired,
          router.locale
        ),
        ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.IsUserAddressVerificationRequired,
          router.locale
        ),
      ]);

      if (profile && (profile.CountryId as number) > 0) {
        allCountryStatesCities = await fetchStateCitiesData(0, 0);
        selectedProfileCountry = allCountryStatesCities.Countries?.find(
          (country) => country.CountryId === profile.CountryId
        );
      }
      if (profile && (profile.CountryId as number) > 0 && profile.StateId > 0) {
        allCountryStatesCities = await fetchStateCitiesData(
          Number(profile.CountryId),
          0
        );
        selectedProfileStates = allCountryStatesCities.States?.find(
          (state) => state.StateId === profile.StateId
        );
      }

      if (
        profile &&
        (profile.CountryId as number) > 0 &&
        profile.StateId > 0 &&
        profile.CityId > 0
      ) {
        allCountryStatesCities = await fetchStateCitiesData(
          Number(profile.CountryId),
          profile.StateId
        );
        selectedProfileCities = allCountryStatesCities?.Cities?.find(
          (city) => city.CityId === profile.CityId
        );
      }

      setProfileData({
        ...profile,
        profileCity: selectedProfileCities,
        profileState: selectedProfileStates,
        profileCountry: selectedProfileCountry,
      });

      setGlobalLevelAbsherVerification(
        globalLevelAbsherVerificationData.ConfigurationValue === 'true'
      );

      setGlobalLevelAddressVerification(
        globalLevelAddressVerificationData.ConfigurationValue === 'true'
      );
    };
    initialLoad();
  }, [router, fetchStateCitiesData, userDataReload]);

  useEffect(() => {
    if (profileData) {
      /* Set Profile Data */
      reset({
        title: userTitle.find((x) => x.UserTitleId === profileData.UserTitleId),
        firstName: profileData?.FirstName,
        middleName: profileData?.MiddleName,
        lastName: profileData?.LastName,
        addressLine1: profileData?.Address1,
        addressLine2: profileData?.Address2,
        dateOfBirth: profileData?.BirthDate
          ? moment(profileData?.BirthDate, apiDateFormat).format(dateFormat)
          : '',
        country: profileData.profileCountry,
        state: profileData?.profileState,
        city: profileData?.profileCity,
        zip: profileData?.Zipcode,
        email: profileData?.EmailAddress,
        mobile: profileData?.MobileNumber,
        profession: profileData?.Profession,
        preferredCommunication: {
          isPreferredWhatsapp: profileData?.IsPreferredWhatsapp,
          isPreferredSms: profileData?.IsPreferredSMS,
          isPreferredEmail: profileData?.IsPreferredEmail,
        },
        gender: profileData?.GenderId.toString(),
        preferredLanguage: profileData?.PreferredLanguageId.toString(),
      });
      /**
       * This is used to set profile status as activate or deactivate
       */
      // setDeactivateProfile(profileData.IsActive ? true : false);
    }
  }, [profileData, reset]);

  useEffect(() => {
    if (country === undefined) {
      setValue('state', undefined as any);
      setValue('city', undefined as any);
      setStates([]);
    }
  }, [country, setValue]);

  useEffect(() => {
    const field = getFieldState('city');
    if (city && field.isDirty) {
      trigger('city');
    }
  }, [city, getFieldState, trigger]);

  useEffect(() => {
    const field = getFieldState('state');
    if (state && field.isDirty) {
      trigger('state');
    }
  }, [state, getFieldState, trigger]);

  useEffect(() => {
    const field = getFieldState('state');
    if (state && state.StateId) {
      if (field.isDirty) {
        setValue('city', undefined as any);
        trigger('city');
      }
    } else {
      setValue('city', undefined as any);
      setCities([]);
    }
  }, [state, setValue, isDirty, trigger, getFieldState, country]);

  useEffect(() => {
    const field = getFieldState('country');
    if (country && country.CountryId) {
      if (field.isDirty) {
        setValue('state', undefined as any);
        setValue('city', undefined as any);
        trigger('state');
        trigger('city');
      }
      fetchStateCitiesData(country.CountryId, 0);
    }
  }, [
    fetchStateCitiesData,
    setValue,
    isDirty,
    trigger,
    getFieldState,
    country,
  ]);

  useEffect(() => {
    if (profileData && profileData.EmailAddress) {
      setEmailValue('oldEmail', profileData.EmailAddress);
    }
  });

  const handleChangeMobile = async () => {
    setLoader(true);
    const response = await ProfileService.changeMobile();

    if (response && response.IsSuccess) {
      setLoader(false);
      const trackingData = btoa(String(response.ChangePhoneNumberTrackingId));
      router.push(`/account/change-mobile/${trackingData}`);
    } else {
      setLoader(false);
    }
  };

  const handleSendVerificationLinkOnClick: SubmitHandler<
    ChangeEmailIFormInput
  > = async (data: ChangeEmailIFormInput) => {
    const payload = {
      EmailAddress: data.newEmail,
    };
    if (data.newEmail) {
      const response = await ProfileService.changeEmail(payload);
      if (response.IsSent) {
        toast.success(t(LabelConstants.WE_HAVE_SENT_VERIFICATION_LINK));
        setOpenChangeEmailModal(false);
      } else {
        toast.error(t(LabelConstants.EMAIL_EXISTS));
      }
    }
  };

  const handleDeleteAccountClick = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteAccount = async () => {
    setOpenDeleteModal(false);

    const deleteProfile = await ProfileService.deleteAccount();
    try {
      if (deleteProfile) {
        toast.success(t(LabelConstants.ACCOUNT_DELETE_SUCCESS));

        SessionUtils.clearSession();
        router.replace('/');
      } else {
        toast.error(t(LabelConstants.ACCOUNT_DELETE_FAILURE));
      }
    } catch (err) {
      toast.error(t(LabelConstants.ACCOUNT_DELETE_FAILURE));
      throw err;
    }
  };

  /**
   * This function is used to deactivate users account.
   */
  // const handleDeactivateAccount = async () => {
  //   setOpenDeactivateModal(false);

  //   const deactivateProfileData = await ProfileService.deactivateUserProfile();
  //   try {
  //     if (deactivateProfileData.IsSuccess) {
  //       toast.success(t(LabelConstants.ACCT_DEACTIVATION_SUCCESS));
  //       setDeactivateProfile(false);
  //     } else {
  //       if (
  //         deactivateProfileData.MessageCode ===
  //         LabelConstants.ACCT_DEACTIVATION_FAILURE
  //       )
  //         toast.error(t(LabelConstants.ACCT_DEACTIVATION_FAILURE));
  //       if (
  //         deactivateProfileData.MessageCode ===
  //         LabelConstants.ACCT_ALREADY_DEACTIVATED
  //       )
  //         toast.error(t(LabelConstants.ACCT_ALREADY_DEACTIVATED));
  //     }
  //   } catch (err) {
  //     toast.error(t(LabelConstants.ACCT_DEACTIVATION_FAILURE));
  //     throw err;
  //   }
  // };

  /**
   * This function is used to reactivate users account.
   */
  // const handleActivateAccounctClick = async () => {
  //   try {
  //     const activateProfileData = await ProfileService.activateUserProfile();
  //     if (activateProfileData.IsSuccess) {
  //       toast.success(t(LabelConstants.ACCT_ACTIVATION_SUCCESS));
  //       setDeactivateProfile(true);
  //     } else {
  //       if (
  //         activateProfileData.MessageCode ===
  //         LabelConstants.ACCT_ACTIVATION_FAILURE
  //       )
  //         toast.error(t(LabelConstants.ACCT_ACTIVATION_FAILURE));
  //       if (
  //         activateProfileData.MessageCode === LabelConstants.ACCT_ALREADY_ACTIVE
  //       )
  //         toast.error(t(LabelConstants.ACCT_ALREADY_ACTIVE));
  //     }
  //   } catch (err) {
  //     toast.error(t(LabelConstants.ACCT_ACTIVATION_FAILURE));
  //     throw err;
  //   }
  // };

  const sendVerificationEmail = async () => {
    const sendVerificationLink = await ProfileService.changeEmail({
      EmailAddress: null,
    });
    try {
      if (sendVerificationLink.IsSent) {
        toast.success(t(LabelConstants.VERIFICATION_LINK_SENT));
      } else {
        toast.error(t(LabelConstants.VERIFICATION_LINK_SENT_FAILURE));
      }
    } catch (err) {
      toast.error(t(LabelConstants.ACCT_ALREADY_DEACTIVATED));
      throw err;
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      const titleResponse: Array<UserTitleResponse> =
        await OtpService.getUserTitle(router.locale);
      setUserTitle(titleResponse);

      if (country && country.CountryId) {
        if (state && state.StateId) {
          await fetchStateCitiesData(country.CountryId, state.StateId);
        } else {
          fetchStateCitiesData(country.CountryId, 0);
        }
      } else {
        await fetchStateCitiesData(0, 0);
      }
    };

    initialLoad();
  }, [country, fetchStateCitiesData, router, state]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const user = SessionUtils.getUserDetails();

    const saveProfilePayload: UpdateProfilePayload = {
      TitleId: data?.title?.UserTitleId,
      Address1: CommonUtils.getFieldValue(data.addressLine1),
      Address2: CommonUtils.getFieldValue(data.addressLine2),
      AddressTypeID: 1,
      BirthDate: data?.dateOfBirth
        ? moment(data?.dateOfBirth, dateFormat).format(apiDateFormat)
        : null,
      CityID: data?.city?.CityId,
      CountryID: data?.country?.CountryId,
      EmailAddress: data?.email,
      FirstName: String(CommonUtils.getFieldValue(data.firstName)),
      GenderId: ['1', '2'].includes(data?.gender) ? data?.gender : null,
      IsPreferredEmail: data?.preferredCommunication?.isPreferredEmail,
      IsPreferredSMS: data?.preferredCommunication?.isPreferredSms,
      IsPreferredWhatsapp: data?.preferredCommunication?.isPreferredWhatsapp,
      LastName: String(CommonUtils.getFieldValue(data.lastName)),
      MiddleName: CommonUtils.getFieldValue(data.middleName),
      MobileNumber: data?.mobile,
      PreferredLanguageId: data?.preferredLanguage,
      Profession: CommonUtils.getFieldValue(data.profession),
      StateID: data?.state?.StateId,
      UserID: user?.UserId || '',
      ZipCode: CommonUtils.getFieldValue(data.zip),
    };

    const updateData = await ProfileService.updateProfileData(
      saveProfilePayload
    );
    if (updateData && updateData.IsSuccess) {
      const updatedUser = {
        ...user,
        FirstName: String(CommonUtils.getFieldValue(data.firstName)),
      };
      SessionUtils.setUserDetails(updatedUser as any);
      setShowModal(true);
      if (profileData?.UserProfileStatusKey === UserProfileStatus.YetToCreate) {
        setMessage(LabelConstants.PROFILE_SAVED);
      } else {
        setMessage(LabelConstants.PROFILE_UPDATED);
      }
    } else {
      if (updateData.MessageCode === LabelConstants.EMAIL_ALREADY_EXISTS) {
        await MessageBox.open({
          content: `${t(LabelConstants.EMAIL_ALREADY_EXISTS)}`,
          type: MessageBoxType.Alert,
        });
      } else {
        await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_ADD_UPDATE_FAILURE)}`,
          type: MessageBoxType.Alert,
        });
      }
    }
  };

  if (loader) {
    return (
      <div className="account-container flex flex-col sm:items-center sm:justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container my-8">
      <div className="flex items-center flex-wrap justify-between mt-5 mb-8">
        <div className="flex lg:flex-row flex-col flex-1 lg:items-center gap-3">
          <h1 className="text-3xl font-bold whitespace-nowrap">
            {profileData?.UserStatusId === 1
              ? t(LabelConstants.PROFILE)
              : t(LabelConstants.UPDATE_PROFILE)}
          </h1>

          {profileData?.UserProfileStatusKey ===
            UserProfileStatus.Validated && (
            <div className="flex lg:flex-row flex-col justify-end sm:justify-start w-full">
              {(globalLevelAbsherVerification === false ||
                profileData?.IsAbsherVerificationRequired === false) &&
              (globalLevelAddressVerification === false ||
                profileData?.IsAddressVerificationRequired === false) ? (
                ''
              ) : (!(
                  globalLevelAbsherVerification === false ||
                  profileData?.IsAbsherVerificationRequired === false
                ) &&
                  !profileData?.IsAbsherVerified) ||
                (!(
                  globalLevelAddressVerification === false ||
                  profileData?.IsAddressVerificationRequired === false
                ) &&
                  !profileData?.IsYakeenVerified &&
                  profileData?.UserProfileStatusKey ===
                    UserProfileStatus.Validated) ? (
                <>
                  <div className="label-text font-bold p-[0.5rem]">
                    {t(LabelConstants.IDENTITY_VERIFICATION_MESSAGE)}
                  </div>
                  <Link href="/identity-verification">
                    <div>
                      <button className="btn btn-primary btn-auto btn-link">
                        {t(LabelConstants.IDENTITY_VERIFICATION_LINK)}
                      </button>
                    </div>
                  </Link>
                </>
              ) : (
                <div className="profile-heading1 mr-4 text-base text-green-500 font-bold">
                  {t(LabelConstants.IDENTITY_VERIFICATION_SUCCESSFUL)}
                </div>
              )}
            </div>
          )}
          {profileData?.UserProfileStatusKey ===
            UserProfileStatus.YetToCreate && (
            <p className="ml-5 text-lg text-color">
              {t(LabelConstants.MOBILE_NUMBER)}:
              {profileData?.MobileNumber
                ? profileData?.MobileNumber
                : '+966 xxxxxxxxx'}
            </p>
          )}
        </div>
        <div className="flex items-center">
          {profileData?.UserProfileStatusKey === UserProfileStatus.Validated &&
            profileData?.IsActive && (
              <button
                className="btn btn-primary btn-auto"
                onClick={handleDeleteAccountClick}
              >
                {t(LabelConstants.DELETE_ACCOUNT)}
              </button>
            )}
        </div>
      </div>
      <div className="gogo-profile-page">
        <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1.875rem] mb-[1.875rem] w-full">
            <FormDropdown
              ref={refTitle}
              options={userTitle}
              labelAccessor="UserTitle"
              valueAccessor="UserTitleId"
              labelText={`${t(LabelConstants.TITLE)}*`}
              control={control}
              name={'title'}
              isSearchable={false}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.875rem] w-full">
            <FormInput
              control={control}
              name="firstName"
              label={`${t(LabelConstants.ENTER_FIRST_NAME)}*`}
            />
            <FormInput
              control={control}
              name="middleName"
              label={t(LabelConstants.ENTER_MIDDLE_NAME)}
            />
            <FormInput
              control={control}
              name="lastName"
              label={`${t(LabelConstants.ENTER_LAST_NAME)}*`}
            />
            <FormInput
              control={control}
              name="addressLine1"
              label={`${t(LabelConstants.ENTER_ADDRESS_LINE_1)}`}
            />
            <FormInput
              control={control}
              name="addressLine2"
              label={t(LabelConstants.ENTER_ADDRESS_LINE_2)}
            />
            <FormDatePicker
              control={control}
              name="dateOfBirth"
              label={t(LabelConstants.DATE_OF_BIRTH)}
              placeholder={dateFormat}
              maxDate={new DateObject()}
              value={dateOfBirth}
              editable={false}
            />

            <FormDropdown
              options={countries}
              labelAccessor="Country"
              valueAccessor="CountryId"
              labelText={`${t(LabelConstants.COUNTRY)}`}
              placeHolderText={t(LabelConstants.SELECT_COUNTRY)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="country"
            />

            <FormDropdown
              options={states}
              labelAccessor="State"
              valueAccessor="StateId"
              labelText={`${t(LabelConstants.REGION)}`}
              placeHolderText={t(LabelConstants.SELECT_REGION)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="state"
            />
            <FormDropdown
              options={cities}
              labelAccessor="City"
              valueAccessor="CityId"
              labelText={`${t(LabelConstants.CITY)}`}
              placeHolderText={t(LabelConstants.SELECT_CITY)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="city"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <label htmlFor="zip">{`${t(LabelConstants.ENTER_ZIP)}`}</label>
                <label className="!text-dark-gray2">
                  {t(LabelConstants.SAUDI_ARABIA)}
                </label>
              </div>
              <FormInput
                control={control}
                name="zip"
                maxLength={5}
                pattern={/[^0-9]+/}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="email">{`${t(
                  LabelConstants.ENTER_EMAIL
                )}*`}</label>
                <div onClick={() => setOpenEmailModal(true)}>
                  <label className="underline cursor-pointer">
                    {profileData?.EmailAddress
                      ? t(LabelConstants.EDIT)
                      : t(LabelConstants.ADD)}
                  </label>
                </div>
              </div>

              <div className="relative">
                <FormInput
                  control={control}
                  name="email"
                  disabled={
                    profileData?.UserProfileStatusKey !==
                    UserProfileStatus.YetToCreate
                      ? true
                      : false
                  }
                />
                {profileData?.EmailAddress && (
                  <div className="absolute bottom-0 top-0 ltr:right-5 rtl:left-5 flex items-center">
                    <ValidatedIcon />
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 ltr:right-0 rtl:left-0 z-10">
                <label
                  className="underline cursor-pointer"
                  onClick={() => handleChangeMobile()}
                >
                  {t(LabelConstants.CHANGE)}
                </label>
              </div>
              {profileData && profileData.MobileNumber && getValues('mobile') && (
                <div className="relative">
                  <FormPhoneInputV1
                    name="mobile"
                    label={`${t(LabelConstants.PHONE_NUMBER)}*`}
                    control={control}
                    disabled={true}
                    validated={true}
                  />
                </div>
              )}
            </div>
            <FormInput
              control={control}
              name="profession"
              label={t(LabelConstants.PROFESSION)}
            />
            <div className="flex flex-col">
              <label>
                {`${t(LabelConstants.PREFERRED_MODE_OF_COMMUNICATION)}`}
              </label>
              <div className="flex gap-3">
                <FormCheckBox
                  control={control}
                  name="preferredCommunication.isPreferredWhatsapp"
                  label={t(LabelConstants.WHATSAPP)}
                  reValidate={() => {
                    trigger('preferredCommunication');
                  }}
                />
                <FormCheckBox
                  control={control}
                  name="preferredCommunication.isPreferredEmail"
                  label={t(LabelConstants.EMAIL)}
                  reValidate={() => {
                    trigger('preferredCommunication');
                  }}
                />
                <FormCheckBox
                  control={control}
                  name="preferredCommunication.isPreferredSms"
                  label={t(LabelConstants.SMS)}
                  reValidate={() => {
                    trigger('preferredCommunication');
                  }}
                />
              </div>
              {errors.preferredCommunication &&
                errors.preferredCommunication?.message && (
                  <p className="error">
                    {t(errors.preferredCommunication?.message)}
                  </p>
                )}
            </div>

            <div className="flex flex-col">
              <label>{`${t(LabelConstants.SELECT_PREFERRED_LANGUAGE)}`}</label>
              <div className="flex gap-3">
                <FormRadio
                  control={control}
                  name="preferredLanguage"
                  value="1"
                  label={t(LabelConstants.ENGLISH)}
                />
                <FormRadio
                  control={control}
                  name="preferredLanguage"
                  value="2"
                  label={t(LabelConstants.ARABIC)}
                />
              </div>
              {errors.preferredLanguage &&
                errors.preferredLanguage?.message && (
                  <p className="error">
                    {t(errors.preferredLanguage?.message)}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-10">
            <label className="text-xl">{`${t(LabelConstants.GENDER)}`}</label>
            <div className="flex gap-6">
              <div className="flex items-center gap-x-[0.625rem]">
                <label>
                  <input
                    type="radio"
                    value={GenderId.MALE}
                    {...register('gender')}
                    hidden
                  />
                  {getValues('gender') === '1' ? (
                    <SelectedMaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  ) : (
                    <MaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  )}
                </label>
              </div>
              <div className="flex items-center gap-x-[0.625rem]">
                <label>
                  <input
                    type="radio"
                    value={GenderId.FEMALE}
                    {...register('gender')}
                    hidden
                  />
                  {getValues('gender') === '2' ? (
                    <SelectedFemaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  ) : (
                    <FemaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  )}
                </label>
              </div>
            </div>
            {errors.gender && errors.gender?.message && (
              <p className="error">{t(errors.gender?.message)}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full mt-10 gap-4">
            {profileData?.UserProfileStatusKey === UserProfileStatus.Draft ? (
              <button
                className="underline flex justify-end sm:justify-start w-full"
                type="button"
                onClick={() => sendVerificationEmail()}
              >
                {t(LabelConstants.RESEND_LINK_FOR_EMAIL_VERIFICATION)}
              </button>
            ) : (
              <div></div>
            )}

            {profileData?.UserProfileStatusKey ===
            UserProfileStatus.YetToCreate ? (
              <button className="btn btn-primary" type="submit">
                {t(LabelConstants.SAVE)}
              </button>
            ) : (
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-5 w-full sm:w-auto">
                <button
                  className="btn btn-secondary sm:w-full uppercase"
                  type="button"
                  onClick={() => router.replace('/')}
                >
                  {t(LabelConstants.CANCEL)}
                </button>
                <button
                  className="btn btn-primary sm:w-full uppercase"
                  type="submit"
                  disabled={!isDirty}
                >
                  {t(LabelConstants.SAVE_CHANGES)}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Profile Update Success Modal */}
      <Modal
        show={showModal}
        size={ModalSize.SMALL}
        onClose={() => {
          setShowModal(false);
          setUserDataReload(!userDataReload);
        }}
      >
        <>
          <ModalBody>
            <div className="justify-center" dir="ltr">
              <CircleSuccessIcon className="h-10 mx-auto" />
              <h1 className="mt-4 text-center text-base">{t(message)}</h1>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="text-center">
              <Link href="/">
                <button className="btn btn-primary btn-modal px-5 text-center">
                  {t(LabelConstants.OK)}
                </button>
              </Link>
            </div>
          </ModalFooter>
        </>
      </Modal>
      {/* Change Email Modal */}
      <Modal
        show={openChangeEmailModal}
        size={ModalSize.SMALL}
        onClose={() => setOpenChangeEmailModal(false)}
      >
        <form
          id="email-form"
          onSubmit={handleEmailSubmit(handleSendVerificationLinkOnClick)}
        >
          <ModalHeader>
            <label className="text-xl">
              {t(LabelConstants.CHANGE_EMAIL_ID)}
            </label>
          </ModalHeader>
          <ModalBody>
            <div>
              <div>
                <FormInput
                  control={controlEmail}
                  name="oldEmail"
                  label={t(LabelConstants.OLD_EMAIL_ID)}
                  disabled
                />
              </div>

              <div className="mt-8">
                <div className="">
                  <FormInput
                    control={controlEmail}
                    name="newEmail"
                    label={t(LabelConstants.NEW_EMAIL_ID)}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-center gap-2 sm:gap-5">
              <Link href="/">
                <button
                  className="btn btn-secondary btn-modal uppercase lg:!text-lg md:!text-base sm:!text-sm !text-xs"
                  type="button"
                  onClick={() => setOpenChangeEmailModal(false)}
                >
                  {t(LabelConstants.CANCEL)}
                </button>
              </Link>
              <button
                className="btn btn-primary btn-modal uppercase lg:!text-lg md:!text-base sm:!text-sm !text-xs"
                type="submit"
                name="emailSubmit"
              >
                {t(LabelConstants.SEND_VERIFICATION_LINK)}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      {/*Delete Account Modal */}
      <Modal
        show={openDeleteModal}
        size={ModalSize.SMALL}
        onClose={() => setOpenDeleteModal(false)}
      >
        <>
          <ModalBody>
            <div className="justify-center">
              <h1 className="mt-4 text-center text-base">
                {t(LabelConstants.DELETION_CONFIRMATION)}
              </h1>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-center gap-1 sm:gap-5">
              <button
                className="btn btn-primary btn-modal px-5 text-center"
                onClick={() => handleDeleteAccount()}
              >
                {t(LabelConstants.YES)}
              </button>

              <button
                className="btn btn-secondary btn-modal px-5 text-center"
                onClick={() => setOpenDeleteModal(false)}
              >
                {t(LabelConstants.NO)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>

      {/*verify Email Modal */}
      <VerifyEmailModal
        setOpenEmailModal={setOpenEmailModal}
        openEmailModal={openEmailModal}
        setUserDataReload={setUserDataReload}
      />

      {/* Sign In Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => {
          setOpenSignInModal(false);
          router.push('/');
        }}
      />
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  res,
  req,
}: GetServerSidePropsContext) => {
  if (!SessionUtils.isValidServerSession(req, res)) {
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in',
      },
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
