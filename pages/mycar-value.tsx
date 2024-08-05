import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { VehicleService } from '../helpers/services';
import { LabelConstants } from '../types/i18n.labels';
import {
  MakeType,
  ModelType,
  ModelYear,
  MyCarValueResponse,
  SpecType,
  VehicleCondition,
} from '../types/models';
import { FormDropdown, FormRadio } from '../components/common/Form';
import { useRouter } from 'next/router';
import { FormInput } from '../components/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import { Modal, ModalBody, ModalFooter } from '../components/common/Modal';
import Link from 'next/link';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { formatNumber, SessionUtils } from '../helpers/utilities';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import SignInModal from '../components/common/SignInModal';
import { PushDataToGTMWithSubEvents } from '../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../types/gtm';
import {
  AutoDataMarketValueIndicators,
  SignInRedirectType,
} from '../types/constants';
import MetaDataComponent from '../components/PagesMetaData/MetaDataComponent';

interface IFormInput {
  year: ModelYear;
  make: MakeType;
  model: ModelType;
  spec: SpecType;
  askingPrice: string;
  mileage: string;
  vehicleCondition: string;
}

const schema = yup
  .object({
    year: yup.object().required(LabelConstants.REQUIRED_FIELD),
    make: yup.object().required(LabelConstants.REQUIRED_FIELD),
    model: yup.object().required(LabelConstants.REQUIRED_FIELD),
    spec: yup.object().required(LabelConstants.REQUIRED_FIELD),
    askingPrice: yup.string().required(LabelConstants.REQUIRED_FIELD),
    mileage: yup.string().required(LabelConstants.REQUIRED_FIELD),
    vehicleCondition: yup.string().required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

const MyCarValue: NextPage<{
  yearData: Array<ModelYear>;
  vehicleCondition: Array<VehicleCondition>;
  title: string;
  description: string;
}> = ({
  yearData,
  vehicleCondition,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { year, make, model } = watch();
  const values = getValues();
  const evaluateRef = useRef<HTMLButtonElement>(null);

  const [makeData, setMakeData] = useState<Array<MakeType>>([]);
  const [modelData, setModelData] = useState<Array<ModelType>>([]);
  const [spec, setSpec] = useState<Array<SpecType>>([]);
  const [myCarValue, setMyCarValue] = useState<MyCarValueResponse>();
  const [askingPrice, setAskingPrice] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [localStorageData, setLocalStorageData] = useState<any>();

  useEffect(() => {
    const isAuthenticate = SessionUtils.isValidSession();
    setIsAuthenticated(isAuthenticate);
  }, []);

  useEffect(() => {
    if (year && year.ModelYearCode) {
      // To fetch make dropdown data
      const loadMakeData = async () => {
        const makeData = await VehicleService.fetchMakebyModelYearCode(
          year.ModelYearCode,
          router.locale
        );
        setMakeData(makeData);
      };
      loadMakeData();
    }

    if (make && make.MakeCode && make.ModelYearCode) {
      // To fetch model dropdown data
      const loadModelData = async () => {
        const modelData =
          await VehicleService.fetchModelByModelYearCodeMakeCode(
            make.ModelYearCode,
            make.MakeCode,
            router.locale
          );
        setModelData(modelData);
      };
      loadModelData();
    }

    if (model && model.ModelYearCode && model.MakeCode && model.ModelCode) {
      // To fetch spec dropdown data
      const loadSpecData = async () => {
        const specData = await VehicleService.fetchSpecByYearMakeAndModelCode(
          model.ModelYearCode,
          model.MakeCode,
          model.ModelCode
        );
        setSpec(specData);
      };
      loadSpecData();
    }
  }, [year, make, model, router]);

  useEffect(() => {
    const user = SessionUtils.getUserDetails();
    //Added GTM event for My Car Value Initiated
    PushDataToGTMWithSubEvents(
      GTMEvents.MyCarValueRequest,
      GTMSubEvents.Initiated,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  }, [router.locale]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    setAskingPrice(data?.askingPrice);
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Submit My Car Value Click
    PushDataToGTMWithSubEvents(
      GTMEvents.MyCarValueRequest,
      GTMSubEvents.Submitted,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
    const bodyObj = {
      ModelYearCode: data?.year?.ModelYearCode,
      MakeCode: data?.make?.MakeCode,
      ModelCode: data?.model?.ModelCode,
      SpecCode: data?.spec?.SpecCode,
      VehicleConditionId:
        vehicleCondition &&
        vehicleCondition.filter(
          (x) => x.VehicleConditionId === parseInt(data.vehicleCondition)
        )[0]?.VehicleConditionId,
      VehicleCondition:
        vehicleCondition &&
        vehicleCondition.filter(
          (x) => x.VehicleConditionId === parseInt(data.vehicleCondition)
        )[0]?.VehicleConditionKey,
      OdometerReading: parseInt(data?.mileage),
      AskingPrice: parseInt(data?.askingPrice),
    };
    const result = await VehicleService.getMyCarValue(bodyObj);
    if (result) {
      setModalOpen(true);
      setMyCarValue(result);
    }
    localStorage.removeItem('SignInRedirectOperation');
  };

  useEffect(() => {
    const redirectType = localStorage.getItem('SignInRedirectOperation');
    const redirectJSON = JSON.parse(redirectType!);
    const details = redirectJSON?.OperationDetails;
    setLocalStorageData(details);
  }, [isAuthenticated]);

  useEffect(() => {
    if (localStorageData) {
      reset({
        year: localStorageData?.year!
          ? {
              ModelYearCode: localStorageData.year.ModelYearCode,
              ModelYear: localStorageData.year.ModelYear,
            }
          : undefined,
        make: localStorageData?.make
          ? {
              Make: localStorageData.make.Make,
              MakeCode: localStorageData.make.MakeCode,
              ModelYearCode: localStorageData.make.ModelYearCode,
            }
          : undefined,
        model: localStorageData?.model
          ? {
              Model: localStorageData.model.Model,
              ModelCode: localStorageData.model.ModelCode,
              MakeCode: localStorageData.model.MakeCode,
              ModelYearCode: localStorageData.model.ModelYearCode,
            }
          : undefined,
        spec: localStorageData?.spec
          ? {
              Spec: localStorageData.spec.Spec,
              SpecCode: localStorageData.spec.SpecCode,
            }
          : undefined,
        vehicleCondition: localStorageData?.vehicleCondition
          ? localStorageData?.vehicleCondition
          : '',
        askingPrice: localStorageData?.askingPrice
          ? localStorageData?.askingPrice
          : '',
        mileage: localStorageData?.mileage ? localStorageData?.mileage : '',
      });
      const redirectType = localStorage.getItem('SignInRedirectOperation');
      const redirectJSON = JSON.parse(redirectType!);
      if (
        redirectJSON?.RedirectOperationType === SignInRedirectType.MyCarValue &&
        isAuthenticated
      ) {
        if (evaluateRef && evaluateRef?.current && evaluateRef.current?.click) {
          if (vehicleCondition && vehicleCondition.length > 0) {
            evaluateRef?.current?.click();
          }
        }
      }
    }
  }, [localStorageData, reset, isAuthenticated, vehicleCondition]);

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
      <MetaDataComponent title={title} description={description} />
      <PrivatePageLayout title={t(LabelConstants.MY_CAR_VALUE)}>
        <div>
          <div className="text-base -mt-4">
            {t(LabelConstants.MY_CAR_VALUE_DESCRIPTION)}
          </div>
          <div className="">
            <div className="md:grid md:grid-cols-2 flex flex-col gap-4 sm:gap-4  place-content-between w-full justify-between mt-4 ">
              <div className="flex justify-end items-start md:order-1">
                <button
                  type="button"
                  className="btn btn-primary btn-auto btn-link"
                  onClick={() => {
                    if (isAuthenticated) {
                      router.push('/vehicle-not-found');
                    } else {
                      setOpenSignInModal(true);
                    }
                  }}
                >
                  {t(LabelConstants.CANNOT_FIND_MY_VEHICLE)}
                </button>
              </div>
              <form id="details-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 w-full sm:w-72 lg:w-2/3">
                    <FormDropdown
                      options={yearData}
                      labelAccessor="ModelYear"
                      valueAccessor="ModelYearCode"
                      labelText={`${t(LabelConstants.YEAR)}*`}
                      placeHolderText={t(LabelConstants.SELECT_YEAR)}
                      control={control}
                      name="year"
                      isSearchable={false}
                    />
                    <FormDropdown
                      options={makeData}
                      labelAccessor="Make"
                      valueAccessor="MakeCode"
                      labelText={`${t(LabelConstants.MAKE)}*`}
                      placeHolderText={t(LabelConstants.SELECT_MAKE)}
                      searchPlaceHolderText={t(LabelConstants.SEARCH)}
                      control={control}
                      name="make"
                    />
                    <FormDropdown
                      options={modelData}
                      labelAccessor="Model"
                      valueAccessor="ModelCode"
                      labelText={`${t(LabelConstants.MODEL)}*`}
                      placeHolderText={t(LabelConstants.SELECT_MODEL)}
                      searchPlaceHolderText={t(LabelConstants.SEARCH)}
                      control={control}
                      name="model"
                    />
                    <FormDropdown
                      options={spec}
                      labelAccessor="Spec"
                      valueAccessor="SpecCode"
                      labelText={`${t(LabelConstants.TRIM)}*`}
                      placeHolderText={t(LabelConstants.SELECT_STYLE)}
                      searchPlaceHolderText={t(LabelConstants.SEARCH)}
                      control={control}
                      name="spec"
                    />
                    <FormInput
                      control={control}
                      name="askingPrice"
                      label={`${t(LabelConstants.ASKING_PRICE)}*`}
                      pattern={/[^0-9]+/}
                    />
                    <FormInput
                      control={control}
                      name="mileage"
                      label={`${t(LabelConstants.MILEAGE)}*`}
                      pattern={/[^0-9]+/}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>{`${t(LabelConstants.VEHICLE_CONDITION)}*`}</label>
                    {vehicleCondition.length &&
                      vehicleCondition.map((item, id) => {
                        return (
                          <div key={id} className="-mb-2">
                            <FormRadio
                              control={control}
                              name="vehicleCondition"
                              value={item?.VehicleConditionId.toString()}
                              label={`${item.VehicleCondition} (${item.Description})`}
                            />
                          </div>
                        );
                      })}

                    {errors.vehicleCondition &&
                      errors.vehicleCondition?.message && (
                        <p className="text-red-500 text-sm font-light">
                          {t(errors.vehicleCondition?.message)}
                        </p>
                      )}
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-16">
              <Link href="/info/privacy-policy">
                <button className="btn btn-primary btn-auto btn-link">
                  {t(LabelConstants.PRIVACY_POLICY)}
                </button>
              </Link>
            </div>
            {isAuthenticated ? (
              <div className="flex justify-center sm:justify-start mt-4">
                <button
                  type="submit"
                  className="btn btn-primary uppercase"
                  form="details-form"
                  ref={evaluateRef}
                >
                  {t(LabelConstants.EVALUATE)}
                </button>
              </div>
            ) : (
              <div className="flex justify-center sm:justify-start mt-4">
                <button
                  type="button"
                  className="btn btn-primary uppercase"
                  onClick={() => {
                    setOpenSignInModal(true);
                    const SignInRedirectOperationObj = {
                      RedirectOperationType: SignInRedirectType.MyCarValue,
                      OperationDetails: values,
                    };
                    localStorage.setItem(
                      'SignInRedirectOperation',
                      JSON.stringify(SignInRedirectOperationObj)
                    );
                  }}
                >
                  {t(LabelConstants.EVALUATE)}
                </button>
              </div>
            )}
          </div>
        </div>
      </PrivatePageLayout>
      {/* SignIn/SignUp Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => {
          setOpenSignInModal(false);
          localStorage.removeItem('SignInRedirectOperation');
        }}
      />
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <ModalBody>
            <div className="title flex md:flex-row flex-col justify-around gap-8 gap-x-8 mt-10 ">
              <div className="justify-center flex flex-col gap-6">
                <div className=" flex flex-row ">
                  <div className="color-light-gray1 text-3xl font-bold">
                    {`${t(LabelConstants.YOUR_ASKING_PRICE)} : 
                    ${formatNumber(askingPrice || 0)}`}
                  </div>
                </div>
                <div className="flex justify-between gap-4 items-center">
                  <div className="text-lg font-bold w-full max-w-xl">
                    {getMessage()}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-2 justify-center flex-wrap">
              <button className="btn btn-primary btn-modal uppercase">
                <Link href="/sell-it-for-me">
                  {t(LabelConstants.LIST_MY_CAR)}
                </Link>
              </button>
              <button className="btn btn-secondary btn-modal uppercase">
                <Link href="/">{t(LabelConstants.HOME)}</Link>
              </button>
              <button
                className="btn btn-primary btn-modal uppercase"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                {t(LabelConstants.OK)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
    </>
  );
};

export default MyCarValue;

export const getStaticProps: GetStaticProps<{
  yearData: Array<ModelYear>;
  vehicleCondition: Array<VehicleCondition>;
  title: string;
  description: string;
}> = async ({ locale }: GetStaticPropsContext) => {
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  const title =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_TITLE_MY_CARS_VALUE;
  const description =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_DESCRIPTION_MY_CARS_VALUE;
  const modelYearData = await VehicleService.fetchModelYear();
  const filterMetadata = await VehicleService.fetchFilterMetadata(locale);
  return {
    props: {
      ...translations,
      title,
      description,
      yearData: modelYearData,
      vehicleCondition: filterMetadata?.VehicleConditions,
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
