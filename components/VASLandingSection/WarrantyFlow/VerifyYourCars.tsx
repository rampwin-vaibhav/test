import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import VasService from '../../../helpers/services/vas.service';
import { SessionUtils } from '../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  setWarrantyFlowType,
  updateUserDetails,
  updateWarrantyFlow,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import {
  LabelConstants,
  WarrantyConstants,
  WarrantyTypeConstants,
} from '../../../types/i18n.labels';
import { translationsLang } from '../../../utilities/constants';
import autoTranslate from '../../../utilities/translations/autoTranslate';
import { FormInputV1, FormRadio } from '../../common/Form';
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';

import Image from 'next/image';
import { useEffect } from 'react';
import vehicleRegistrationar from '../../../assets/vehicle-registration-ar.png';
import vehicleRegistrationen from '../../../assets/vehicle-registration-en.png';

type IFormInput = {
  userId: string;
  sequenceNo: string;
  carType: string;
};

const VerifyYourCars = () => {
  const { t } = useTranslation();
  const cleverTap = useAppSelector(({ global }) => global?.clevertap);

  const schema = yup.object({
    userId: yup
      .string()
      .min(
        9,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.OWNER_ID),
          length: 9,
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
    carType: yup.string().required(LabelConstants.REQUIRED_FIELD),
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const warrantSelector = useAppSelector(({ warranty }) => warranty);
  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      sequenceNo: warrantSelector.user_details?.sequenceNo || '',
      userId: warrantSelector.user_details?.userId || '',
      carType: warrantSelector.type || WarrantyTypeConstants.PreOwnedCar,
    },
  });
  const getTranslatedText = async (text: string) => {
    const res = await autoTranslate(
      text,
      translationsLang.Arabic,
      router.locale === translationsLang.Arabic
        ? translationsLang.Arabic
        : translationsLang.English
    );
    return res[0]?.translations[0]?.text;
  };
  const handleGetDetails = async (data: IFormInput) => {
    let carDetails = null;
    try {
      dispatch(setLoader(true));

      const carDetailsData = await VasService.verifyCarDetails(data);

      if (![200, 201].includes(carDetailsData.status_code)) {
        const translatedError = carDetailsData?.result?.errorDetail
          ?.errorMessage
          ? await getTranslatedText(
              carDetailsData?.result?.errorDetail?.errorMessage
            )
          : t(LabelConstants.SOMETHING_WENT_WRONG_ERROR);

        toast.error(translatedError, {
          position: 'bottom-right',
        });

        dispatch(setLoader(false));
        return;
      }
      carDetails = carDetailsData.result.vehicleInfo;
    } catch (err) {
      console.log(err);
      dispatch(setLoader(false));
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
        position: 'bottom-right',
      });
      return;
    }

    dispatch(
      updateWarrantyFlow({
        brand: {
          brandId: carDetails.makeCode,
          brandName: await getTranslatedText(carDetails.make),
        },
        model: {
          modelId: carDetails.modelCode,
          modelName: await getTranslatedText(carDetails.model),
          modelYear: carDetails.modelYear,
        },
        cylinders: carDetails.cylinder,
        chassisNumber: carDetails.vehicleIDNumber,
      })
    );
    dispatch(setWarrantyFlowType(data.carType));
    dispatch(
      updateUserDetails({
        ...data,
      })
    );
    dispatch(setLoader(false));
    const isAuthenticated = SessionUtils.isValidSession();
    if (!isAuthenticated) {
      dispatch(updateWarrantyStep(WarrantyConstants.Authentication));
      return;
    }
    dispatch(updateWarrantyStep(WarrantyConstants.EnterKmDriven));
  };

  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('Verify your car.');
    }
  }, [cleverTap]);

  return (
    <>
      <picture>
        <Image
          src={
            router.locale! === 'ar'
              ? vehicleRegistrationar
              : vehicleRegistrationen
          }
          alt="owner-dummy-vehicle-registration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </picture>
      <div className="mx-[25px] mt-[15px]">
        <form className="space-y-[30px]">
          <FormInputV1
            control={control}
            name="userId"
            label={t(WarrantyConstants.UserId)}
          />
          <FormInputV1
            control={control}
            name="sequenceNo"
            label={t(WarrantyConstants.SequenceNo)}
          />
          <div>
            <div className="flex space-x-4 rtl:flex-row-reverse rtl:justify-end">
              <FormRadio
                control={control}
                name="carType"
                label={t('NEW')}
                value={WarrantyTypeConstants.NewCar}
              />
              <FormRadio
                control={control}
                name="carType"
                label={t('PRE_OWNED')}
                value={WarrantyTypeConstants.PreOwnedCar}
              />
            </div>
          </div>
          <button
            className="bg-black text-white px-[44px] py-[16px] rounded-[40px] flex items-center text-[13px]"
            onClick={handleSubmit(handleGetDetails)}
          >
            {t('GetDetail')}{' '}
            {router.locale === translationsLang.Arabic ? (
              <ArrowLeftIcon className="!text-white  h-[5px] mx-[12.5px]" />
            ) : (
              <ArrowRightIcon className="!text-white  h-[5px] mx-[12.5px]" />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyYourCars;
