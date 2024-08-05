import { useCallback, useEffect, useState } from 'react';
import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import {
  FormPhoneInputV1,
  FormDropdown,
  FormInput,
  IsPhoneNumberValid,
  IsPhoneNumberValidNotRequired,
} from '../components/common/Form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../types/i18n.labels';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import {
  Cities,
  DealerApplicationPayload,
  DealerApplicationResponse,
  District,
  Make,
  Province,
  ProvinceCities,
  State,
  StateCities,
} from '../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DMSService, GlobalService, VehicleService } from '../helpers/services';
import { CommonUtils, SessionUtils } from '../helpers/utilities';

import {
  ApplicationSource,
  DealerApplicationErrorCodes,
} from '../types/constants';
import MessageBox from '../components/common/MessageBox';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

type DealerApplicationFormPageProps = {};

interface IFormInput {
  dealerName: string;
  ownerName: string;
  registrationId: string;
  registeredName: string;
  dealerVATNumber: number;
  primaryContactFirstName: string;
  primaryContactLastName: string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  primaryEmailId: string;
  secondaryEmailId: string;
  province: Province;
  city: Cities;
  pincode: string;
  make: Make;
  captcha: string | null;
  street: string;
  buildingNumber: string;
  additionalNumber: string;
  district: District;
  dealerNameAR: string;
}

const schema = yup
  .object({
    dealerName: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.DEALER_NAME_REQUIRED)
      .max(250, LabelConstants.FRM_ERR_MSG_MAX250_LETTER)
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    dealerNameAR: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.DEALER_NAME_REQUIRED)
      .max(250, LabelConstants.FRM_ERR_MSG_MAX250_LETTER)
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    ownerName: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.OWNER_NAME_REQUIRED)
      .matches(
        /^[\u0621-\u064Aa-zA-Z][\u0621-\u064A a-zA-Z]*$/,
        LabelConstants.LETTERS_ALLOWED
      )
      .max(250, LabelConstants.FRM_ERR_MSG_MAX250_LETTER),
    registrationId: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.REGISTRATION_ID_REQUIRED)
      .max(50, LabelConstants.FRM_ERR_MSG_MAX50_CHARACTER),
    registeredName: yup
      .string()
      .nullable()
      .trim()
      .notRequired()
      .matches(
        /^[\u0621-\u064Aa-zA-Z][\u0621-\u064A a-zA-Z]*$/,
        LabelConstants.LETTERS_ALLOWED
      )
      .max(250, LabelConstants.FRM_ERR_MSG_MAX250_LETTER),
    dealerVATNumber: yup
      .string()
      .nullable()
      .trim()
      .notRequired()
      .max(50, LabelConstants.FRM_ERR_MSG_MAX50_CHARACTER),
    primaryContactFirstName: yup
      .string()
      .nullable()
      .trim()
      .matches(/^[a-zA-Z\u0621-\u064A]/, LabelConstants.LETTERS_ALLOWED)
      .required(LabelConstants.PRIMARY_FIRST_NAME_REQUIRED)
      .max(250, LabelConstants.FRM_ERR_MSG_MAX250_LETTER)
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    primaryContactLastName: yup
      .string()
      .nullable()
      .trim()
      .matches(/^[a-zA-Z\u0621-\u064A]/, LabelConstants.LETTERS_ALLOWED)
      .required(LabelConstants.PRIMARY_LAST_NAME_REQUIRED)
      .max(250, LabelConstants.FRM_ERR_MSG_MAX250_LETTER)
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    primaryContactNumber: yup
      .string()
      .nullable()
      .required(LabelConstants.PRIMARY_PHONE_NUMBER_REQUIRED)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
    secondaryContactNumber: yup
      .string()
      .nullable()
      .notRequired()
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValidNotRequired(number)
      ),
    primaryEmailId: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .max(100, LabelConstants.ALLOWED_MAX_100_CHAR),
    secondaryEmailId: yup
      .string()
      .nullable()
      .trim()
      .notRequired()
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .max(100, LabelConstants.ALLOWED_MAX_100_CHAR),
    province: yup
      .object()
      .nullable()
      .required(LabelConstants.PROVINCE_REQUIRED),
    city: yup.object().nullable().required(LabelConstants.FRM_ERR_MSG_CITY_REG),
    pincode: yup
      .string()
      .nullable()
      .required(LabelConstants.PIN_CODE_REQUIRED)
      .test(
        'maxDigit',
        LabelConstants.FRM_ERR_MSG_ZIP_NUMBER,
        (number) => String(number).length === 5
      ),
    captcha: yup
      .string()
      .nullable()
      .test('captchaRequired', LabelConstants.CAPTCHA_REQUIRED, (value) =>
        !SessionUtils.isValidSession() && !value ? false : true
      ),
    street: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.STREET_REQUIRED),
    buildingNumber: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.BUILDING_NUMBER),
    additionalNumber: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.ADDITIONAL_NUMBER_REQUIRED),
    district: yup
      .object()
      .nullable()
      .required(LabelConstants.DISTRICT_REQUIRED),
  })
  .required();

const DealerApplicationFormPage: NextPage<DealerApplicationFormPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    getFieldState,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { province, city, district } = watch();

  const [cities, setCities] = useState<Array<Cities>>([]);
  const [primaryCountryCode, setPrimaryCountryCode] = useState<string>();
  const [secondaryCountryCode, setSecondaryCountryCode] = useState<string>();
  const [provinces, setProvinces] = useState<Array<Province>>([]);
  const [makes, setMakes] = useState<Array<Make>>([]);
  const [districts, setDistricts] = useState<Array<District>>([]);
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
  const onChange = (recaptchaValue: string | null) => {
    setValue('captcha', recaptchaValue);
    trigger('captcha');
  };

  const fetchProvinceCitiesData = useCallback(
    async (provinceId: number) => {
      const data: ProvinceCities = await GlobalService.fetchProvinceCities(
        provinceId,
        router.locale
      );
      if (data && data?.Provinces) {
        setProvinces(data?.Provinces);
      }
      if (data && data?.Cities) {
        setCities(data?.Cities);
      }
      return data;
    },
    [router]
  );

  const fetchDistrictsData = useCallback(
    async (cityId: number) => {
      const data: Array<District> = await GlobalService.getDistricts(
        router.locale,
        cityId
      );
      setDistricts(data);
      return data;
    },
    [router]
  );

  useEffect(() => {
    const initialLoad = async () => {
      await fetchProvinceCitiesData(0);
      const fetchedMakes: Array<Make> = await VehicleService.fetchAllMake(
        router.locale
      );
      if (fetchedMakes) {
        setMakes(fetchedMakes);
      }
    };
    initialLoad();
  }, [fetchProvinceCitiesData, router.locale]);

  useEffect(() => {
    if (window && (window as any).grecaptcha) {
      (window as any).grecaptcha.reset();
    }
    recaptchaRef?.current?.reset();

    setValue('captcha', null);
  }, [router.locale]);

  useEffect(() => {
    if (province && province.ProvinceId) {
      const provinceField = getFieldState('province');
      const cityField = getFieldState('city');
      const districtField = getFieldState('district');
      if (provinceField.isDirty) {
        setValue('city', undefined as any);
        setValue('district', undefined as any);
        setDistricts([]);
        if (cityField.isDirty) {
          trigger('city');
        }
        if (districtField.isDirty) {
          trigger('district');
        }
      }
      fetchProvinceCitiesData(province.ProvinceId);
    }
  }, [province, fetchProvinceCitiesData, setValue, getFieldState, trigger]);

  useEffect(() => {
    const cityField = getFieldState('city');
    if (cityField.isDirty) {
      trigger('city');
    }
  }, [city, getFieldState, trigger]);

  useEffect(() => {
    if (city && city.CityId) {
      const cityField = getFieldState('city');
      const districtField = getFieldState('district');
      if (cityField.isDirty) {
        setValue('district', undefined as any);
        if (districtField.isDirty) {
          trigger('district');
        }
      }
      fetchDistrictsData(city.CityId);
    }
  }, [city, fetchDistrictsData, setValue, getFieldState, trigger]);

  useEffect(() => {
    const districtField = getFieldState('district');
    if (districtField.isDirty) {
      trigger('district');
    }
  }, [district, getFieldState, trigger]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload: DealerApplicationPayload = {
      Name: data.dealerName.trim(),
      NameAr: data.dealerNameAR.trim(),
      OwnerName: data.ownerName.trim(),
      RegistrationId: data.registrationId.trim(),
      PrimaryContactFirstName: data.primaryContactFirstName.trim(),
      PrimaryContactLastName: data.primaryContactLastName.trim(),
      PrimaryPhoneCountryCode: primaryCountryCode!,
      PrimaryPhoneNumber: data.primaryContactNumber.replace(
        primaryCountryCode!,
        ''
      ),
      PrimaryEmailId: data.primaryEmailId,
      SecondaryPhoneCountryCode: data.secondaryContactNumber
        ? secondaryCountryCode!
        : null,
      SecondaryPhoneNumber: data.secondaryContactNumber
        ? data.secondaryContactNumber.replace(secondaryCountryCode!, '')
        : null,
      SecondaryEmailId: data.secondaryEmailId ? data.secondaryEmailId : null,
      CityId: data.city.CityId,
      ProvinceId: data.province.ProvinceId,
      Pincode: data.pincode,
      ApplicationBy: null,
      ApplicationSource: ApplicationSource,
      PreferedMakeCode: data.make && data.make.MakeCode,
      PreferedMakeName: data.make && data.make.Make,
      PreferedMakeAr: null,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      RecaptchaToken: data?.captcha,
      Street: data.street,
      BuildingNumber: data.buildingNumber,
      AdditionalNumber: data.additionalNumber,
      DistrictId: data.district.DistrictId,
      RegisteredName: data.registeredName,
      VATNumber: data.dealerVATNumber,
    };
    const response: DealerApplicationResponse =
      await DMSService.saveDealerApplication(payload);
    if (!response.IsSuccess) {
      const errorCodes = [
        DealerApplicationErrorCodes.ERROR_DEALER_REGISTRATION_ID_EXIST,
        DealerApplicationErrorCodes.ERROR_DEALER_PRIMARY_EMAIL_EXIST,
        DealerApplicationErrorCodes.ERROR_DEALER_SECONDARY_EMAIL_EXIST,
        DealerApplicationErrorCodes.ERROR_DEALER_PRIMARY_PHONE_EXIST,
        DealerApplicationErrorCodes.ERROR_DEALER_SECONDARY_PHONE_EXIST,
        DealerApplicationErrorCodes.ERROR_DEALER_SAVE,
        LabelConstants.CAPTCHAINVALID_MSG,
      ];
      if (errorCodes.includes(response.MessageCode)) {
        (window as any).grecaptcha.reset();
        setValue('captcha', '');
        await MessageBox.open({ content: t(response.MessageCode) });
      }
    } else {
      await MessageBox.open({
        content: t(LabelConstants.FRM_DEALER_REGISTRATION_SUCCESS),
      });
      reset();
      router.replace('/');
    }
  };

  return (
    <PrivatePageLayout title={t(LabelConstants.DEALER_REGISTRATION)}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.875rem] w-full">
            <FormInput
              control={control}
              name="dealerName"
              label={`${t(LabelConstants.DEALER_NAME)}*`}
              className="!text-left"
            />
            <FormInput
              control={control}
              name="dealerNameAR"
              label={`${t(LabelConstants.DEALER_NAME_AR)}*`}
              className="!text-right"
            />
            <FormInput
              control={control}
              name="ownerName"
              label={`${t(LabelConstants.OWNER_NAME)}*`}
            />
            <FormInput
              control={control}
              name="registrationId"
              label={`${t(LabelConstants.REGISTRATION_ID)}*`}
              pattern={/[^a-zA-Z0-9 ]/}
            />
            <FormInput
              control={control}
              name="registeredName"
              label={`${t(LabelConstants.REGISTERED_NAME)}`}
            />
            <FormInput
              control={control}
              name="dealerVATNumber"
              label={`${t(LabelConstants.DEALER_VAT_NUMBER)}`}
              pattern={/[^a-zA-Z0-9 ]/}
            />
            <FormInput
              control={control}
              name="primaryContactFirstName"
              label={`${t(LabelConstants.PRIMARY_CONTACT_FIRSTNAME)}*`}
            />
            <FormInput
              control={control}
              name="primaryContactLastName"
              label={`${t(LabelConstants.PRIMARY_CONTACT_LASTNAME)}*`}
            />
            <FormPhoneInputV1
              control={control}
              name="primaryContactNumber"
              label={`${t(LabelConstants.PRIMARY_CONTACT_NUMBER)}*`}
              onCountryChange={(countryCode, phoneCode) =>
                setPrimaryCountryCode(phoneCode)
              }
            />
            <FormPhoneInputV1
              control={control}
              name="secondaryContactNumber"
              label={`${t(LabelConstants.SECONDARY_CONTACT_NUMBER)}`}
              onCountryChange={(countryCode, phoneCode) =>
                setSecondaryCountryCode(phoneCode)
              }
            />
            <FormInput
              control={control}
              name="primaryEmailId"
              label={`${t(LabelConstants.PRIMARY_EMAIL_ID)}*`}
            />
            <FormInput
              control={control}
              name="secondaryEmailId"
              label={`${t(LabelConstants.SECONDARY_EMAIL_ID)}`}
            />
            <FormInput
              control={control}
              name="buildingNumber"
              label={`${t(LabelConstants.BUILDING_NUMBER)}*`}
            />
            <FormInput
              control={control}
              name="street"
              label={`${t(LabelConstants.STREET)}*`}
            />
            <FormInput
              control={control}
              name="additionalNumber"
              label={`${t(LabelConstants.ADDITIONAL_NUMBER)}*`}
            />
            <div className="hidden md:flex"></div>
            <FormDropdown
              options={provinces}
              labelAccessor="Province"
              valueAccessor="ProvinceId"
              labelText={`${t(LabelConstants.PROVINCE)}*`}
              placeHolderText={t(LabelConstants.SELECT_PROVINCE)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="province"
            />
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
            <FormDropdown
              options={districts}
              labelAccessor="District"
              valueAccessor="DistrictId"
              labelText={`${t(LabelConstants.DISTRICT)}*`}
              placeHolderText={t(LabelConstants.SELECT_DISTRICT)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="district"
            />
            <FormInput
              control={control}
              name="pincode"
              maxLength={5}
              label={`${t(LabelConstants.PIN_CODE)}*`}
              pattern={/[^0-9]+/}
            />
            <FormDropdown
              options={makes}
              labelAccessor="Make"
              valueAccessor="MakeCode"
              labelText={t(LabelConstants.PREFERRED_MAKE)}
              placeHolderText={t(LabelConstants.SELECT_MAKE)}
              searchPlaceHolderText={t(LabelConstants.SEARCH)}
              control={control}
              name="make"
            />
            <div>
              <div className={router.locale === Locales.EN ? '' : 'hidden'}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={CAPTCHA_SITE_KEY || ''}
                  onChange={(e) => onChange(e)}
                  hl="en"
                />
              </div>
              <div className={router.locale === Locales.AR ? '' : 'hidden'}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={CAPTCHA_SITE_KEY || ''}
                  onChange={(e) => onChange(e)}
                  hl="ar"
                />
              </div>
              {errors.captcha && errors.captcha.message && (
                <p className="error">{t(errors.captcha.message)}</p>
              )}
            </div>
          </div>
          <div className="flex sm:justify-start justify-center w-full mt-10">
            <button type="submit" className="btn btn-primary uppercase">
              {t(LabelConstants.SUBMIT)}
            </button>
          </div>
        </form>
      </div>
    </PrivatePageLayout>
  );
};
export default DealerApplicationFormPage;

export const getStaticProps: GetStaticProps<
  DealerApplicationFormPageProps
> = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
