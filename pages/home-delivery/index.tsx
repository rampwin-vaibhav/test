import React, { useEffect, useState } from 'react';
import {
  FormDropdown,
  FormInput,
  FormPhoneInputV1,
  IsPhoneNumberValid,
} from '../../components/common/Form';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AddToCartPayload,
  Cities,
  DeliveryServiceResponse,
  District,
} from '../../types/models';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales, ProductReferenceType } from '../../types/enums';
import { formatNumber } from '../../helpers/utilities';
import { BackIcon, SuccessIcon } from '../../components/icons';
import {
  GlobalService,
  ListingService,
  PackageSubscription,
} from '../../helpers/services';
import { useRouter } from 'next/router';
import { Modal } from '../../components/common/Modal';
import { ModalSize } from '../../components/common/SideModal';
import MessageBox, { MessageBoxType } from '../../components/common/MessageBox';
import Head from 'next/head';

interface IFormInput {
  city: Cities | null;
  district: District | null;
  street: string;
  mobile: string;
}
const schema = yup.object({
  city: yup.object().nullable().required(LabelConstants.CITY_IS_REQUIRED),
  district: yup
    .object()
    .nullable()
    .required(LabelConstants.DISTRICT_REQUIRED_MESSAGE),
  street: yup
    .string()
    .nullable()
    .required(LabelConstants.STREET_REQUIRED_MESSAGE),
  mobile: yup
    .string()
    .typeError(LabelConstants.INVALID_MOBILE_NUMBER)
    .required(LabelConstants.MOBILE_NUMBER_REQUIRED)
    .nullable()
    .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
      IsPhoneNumberValid(number)
    ),
});

const HomeDelivery: NextPage<{}> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation();
  const {
    control,
    reset,
    watch,
    setValue,
    trigger,
    handleSubmit,
    getFieldState,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [petrominData, setPetrominData] = useState<Array<District>>([]);
  const [homeAddressData, setHomeAddressData] =
    useState<DeliveryServiceResponse | null>(null);
  const [editPetrominData, setEditPetrominData] = useState<Array<District>>([]);
  const [editHomeAddressData, setEditHomeAddressData] =
    useState<DeliveryServiceResponse | null>(null);
  const [cities, setCities] = useState<Array<Cities>>([]);
  const [openDeliveryAddressModal, setOpenDeliveryAddressModal] =
    useState<boolean>(false);
  const router = useRouter();
  const { city, district } = watch();

  useEffect(() => {
    if (router.query.cityId) {
      const loadLocationData = async () => {
        const homeAddressData =
          await PackageSubscription.getHomeDeliveryServices(
            router.query.shoppingCartId!,
            router.query.vehicleListingId!,
            router.locale!,
            router.query.cityId as unknown as number
          );
        setEditHomeAddressData(homeAddressData);
        const data: Array<District> = await GlobalService.getDistricts(
          router.locale,
          router.query.cityId as unknown as number
        );
        setEditPetrominData(data);
      };
      loadLocationData();
    }
  }, [router]);

  useEffect(() => {
    const initialLoad = async () => {
      const citiesData = await GlobalService.fetchInspectionCities(
        router.locale
      );
      setCities(citiesData.cities);
    };
    initialLoad();
  }, [router]);

  useEffect(() => {
    if (editHomeAddressData && editPetrominData.length > 0) {
      reset({
        city: {
          CityId: editHomeAddressData?.ToCityId,
          City: cities?.find((x) => x.CityId === editHomeAddressData?.ToCityId)
            ?.City,
        },
        street: editHomeAddressData?.StreatAddress!,
        mobile: editHomeAddressData?.MobileNumber || '',
        district: {
          DistrictId: editHomeAddressData?.DistrictId,
          District: editPetrominData?.find(
            (x) => x.DistrictId === editHomeAddressData?.DistrictId
          )?.District,
        },
      });
    }
  }, [editHomeAddressData, editPetrominData, cities, reset]);

  useEffect(() => {
    if (city === undefined) {
      setValue('district', undefined as any);
      setPetrominData([]);
    }
  }, [city, setValue]);

  useEffect(() => {
    const field = getFieldState('district');
    if (district && field.isDirty) {
      trigger('district');
    }
  }, [district, getFieldState, trigger]);

  useEffect(() => {
    const field = getFieldState('city');
    if (city && city.CityId) {
      if (field.isDirty) {
        setValue('district', undefined as any);
        trigger('district');
      }
    } else {
      setValue('district', undefined as any);
      setPetrominData([]);
    }
  }, [city, getFieldState, setValue, trigger]);

  useEffect(() => {
    // To fetch location dropdown data
    if (city && city.CityId) {
      const loadLocationData = async () => {
        const homeAddressData =
          await PackageSubscription.getHomeDeliveryServices(
            router.query.shoppingCartId!,
            router.query.vehicleListingId!,
            router.locale!,
            city?.CityId
          );

        setHomeAddressData(homeAddressData);

        const data: Array<District> = await GlobalService.getDistricts(
          router.locale,
          city?.CityId!
        );
        setPetrominData(data);
      };
      loadLocationData();
    }
  }, [city, router]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload = {
      DistrictId: data?.district?.DistrictId!,
      StreatAddress: data?.street,
      Latitude: null,
      Longitute: null,
      ShoppingCartId: router.query.shoppingCartId!,
      VehicleListingId: router.query.vehicleListingId!,
      ToCityId: city?.CityId!,
      MobileNumber: data?.mobile,
    };

    const res = await PackageSubscription.saveHomeDeliveryAddress(payload);
    if (res.IsSuccess) {
      if (router.query.cityId) {
        setOpenDeliveryAddressModal(true);
      } else {
        const payload: AddToCartPayload = {
          ProductReferenceType: ProductReferenceType.B2CService,
          ProductReferenceId: router.query.serviceId! as unknown as
            | number
            | null,
          MarkedForFinance: false,
          ParentId: router.query.shoppingCartItemId! as unknown as
            | number
            | null,
          VehicleListingId: router.query.vehicleListingId! as unknown as
            | number
            | null,
        };
        const addToCartRes = await ListingService.addToCart(payload);
        if (addToCartRes.IsSuccess) {
          setOpenDeliveryAddressModal(true);
        }
      }
    } else {
      const result = await MessageBox.open({
        content: (
          <span className="text-large leading-8">
            {t(LabelConstants.VAS_SERVICE_ERROR_MESSAGE)}
          </span>
        ),
        type: MessageBoxType.Message,
      });
    }
  };

  return (
    <div className="container my-10">
      <Head>
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/delivery-service.webp`}
          as="image"
        />
      </Head>
      <div className="flex gap-4 items-center">
        <div
          onClick={() => router.back()}
          className="inline-flex cursor-pointer"
        >
          <BackIcon className="h-8 w-8 rtl:rotate-180" />
        </div>
        <span className="uppercase text-xl font-bold text-primary">
          {t(LabelConstants.BACK_TO_SHOPPING_CART_LABEL)}
        </span>
      </div>
      <div className="mt-10">
        <strong className="text-2xl">
          {t(LabelConstants.HOME_DELIVERY_LABEL)}
        </strong>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-20 flex flex-row">
            <div className=" w-1/2 flex flex-col space-y-10">
              <div className="flex flex-wrap gap-5">
                <div className="flex-1">
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
                <div className="flex-1">
                  <FormDropdown
                    options={petrominData}
                    labelAccessor="District"
                    valueAccessor="DistrictId"
                    labelText={`${t(LabelConstants.DISTRICT)}*`}
                    placeHolderText={t(LabelConstants.SELECT_DISTRICT)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="district"
                  />
                </div>
              </div>
              <div className="w-full">
                <FormInput
                  name="street"
                  label={`${t(LabelConstants.STREET)}*`}
                  control={control}
                  placeholder={t(LabelConstants.ENTER_STREET)}
                  maxLength={250}
                />
              </div>
              <div className="">
                <FormPhoneInputV1
                  name="mobile"
                  label={`${t(LabelConstants.PHONE_NUMBER)}*`}
                  control={control}
                  showError={true}
                />
              </div>
              {city?.CityId && homeAddressData && (
                <div className="border border-dark-gray1 p-4 flex items-center justify-between rounded">
                  <span className="text-lg font-bold text-dark-gray1">
                    {t(LabelConstants.TOTAL_AMOUNT)}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-primary">{`${t(
                      LabelConstants.SAR
                    )} ${formatNumber(
                      homeAddressData?.DisplayPrice,
                      2
                    )}`}</span>
                    <span className="text-sm text-dark-gray2">
                      {t(LabelConstants.INCLUSIVE_VAT)}
                    </span>
                  </div>
                </div>
              )}
              <div className="w-1/2 items-center">
                <button
                  type="submit"
                  className="btn btn-primary !text-base uppercase"
                >
                  {t(LabelConstants.CONFIRM_AND_PROCEED)}
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </form>
      </div>

      <Modal
        show={openDeliveryAddressModal}
        size={ModalSize.MEDIUM}
        onClose={() => {
          setOpenDeliveryAddressModal(false);
          router.push('/cart');
        }}
      >
        <>
          <div className="flex w-full h-full">
            <div className="w-1/3">
              <picture className="h-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/delivery-service.webp`}
                  alt="img"
                  className="h-full"
                />
              </picture>
            </div>
            <div className="flex h-full py-16 px-8 flex-col gap-4 items-center justify-center w-2/3">
              <SuccessIcon className="w-10 h-10 text-green-600" />
              <h1 className="text-dark-gray1 font-bold text-2xl">
                {t(LabelConstants.LBL_THANK_YOU)}
              </h1>
              <span className="text-lg text-center text-dark-gray1">
                {t(LabelConstants.LOGISTIC_TEXT)}
              </span>
              <div className="flex justify-center gap-1 sm:gap-5">
                <div
                  className="bg-primary cursor-pointer text-white rounded py-3 px-8"
                  onClick={() => router.push('/cart')}
                >
                  {t(LabelConstants.OK)}
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default HomeDelivery;

export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
