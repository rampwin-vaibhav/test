import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VasService from '../../../helpers/services/vas.service';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

import moment from 'moment';
import { useEffect } from 'react';
import { CommonUtils, SessionUtils } from '../../../helpers/utilities';
import {
  setLoader,
  updateWarrantyFlow,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import {
  LabelConstants,
  WarrantyConstants,
  WarrantyTypeConstants,
} from '../../../types/i18n.labels';
import { translationsLang } from '../../../utilities/constants';
import { FadeUp } from '../../common/Animations';
import { FormCheckBox, FormInputV1 } from '../../common/Form';
import { ArrowLeftIcon, ArrowRightIcon, KmsIcon } from '../../icons';
type IFormInput = {
  kms_driven: number;
  cubic_capacity: number;
  consent: boolean;
  pre_warranty_check_date: string;
};

const EnterKmDriven = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const warrantySelector = useAppSelector(({ warranty }) => warranty);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const schema = yup.object({
    kms_driven: yup
      .number()
      .typeError(LabelConstants.NUMBER_ERR_MSG)
      .min(
        1,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.KILOMETERS),
          length: 1,
        })
      )
      .required(LabelConstants.REQUIRED_FIELD),
    cubic_capacity: yup
      .number()
      .typeError(LabelConstants.NUMBER_ERR_MSG)
      .min(
        400,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: 'CC',
          length: 400,
        })
      )
      .required(LabelConstants.REQUIRED_FIELD),
    pre_warranty_check_date: yup.string().nullable(),
    consent: yup.boolean().required(LabelConstants.REQUIRED_FIELD),
  });

  const dispatch = useAppDispatch();

  const { control, handleSubmit, watch, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      consent: false,
      kms_driven: warrantySelector.data.kms_driven,
      cubic_capacity: warrantySelector.data.cubic_capacity,
      pre_warranty_check_date: warrantySelector.data?.pre_warranty_check_date,
    },
  });

  const { consent, pre_warranty_check_date } = watch();
  useEffect(() => {
    if (warrantySelector.type !== WarrantyTypeConstants.PreOwnedCar) {
      setValue('pre_warranty_check_date', '');
      dispatch(
        updateWarrantyFlow({
          pre_warranty_check_date: null,
        })
      );
    }
  }, [setValue, warrantySelector.type, dispatch]);
  const handleGetPackages = async ({
    kms_driven,
    cubic_capacity,
    pre_warranty_check_date: preWarrantyCheck,
  }: IFormInput) => {
    const isAuthenticated = SessionUtils.isValidSession();
    if (!isAuthenticated) {
      dispatch(updateWarrantyStep(WarrantyConstants.Authentication));
      return;
    }

    dispatch(setLoader(true));

    dispatch(
      updateWarrantyFlow({
        kms_driven,
        cubic_capacity: cubic_capacity,
        pre_warranty_check_date: preWarrantyCheck,
      })
    );
    const payload = {
      VINNumber: warrantySelector.data.chassisNumber,
      modelYear: `${warrantySelector.data.model.modelYear}`,
      mileage: kms_driven,
      cylinder: `${warrantySelector.data.cylinders}`,
      cubicCapacity: cubic_capacity,
      vehicleSpecification: warrantySelector.data.vehicle_specifications.value,
      vehicleListingId: null,
      vehicleValue: 1,
      make: warrantySelector.data.brand.brandName,
      model: warrantySelector.data.model.modelName,
      trim: warrantySelector?.data?.variant?.variantId || null,
      vehicleType: warrantySelector.type,
      preWarrantyCheckDate:
        warrantySelector.type === WarrantyTypeConstants.PreOwnedCar
          ? moment().subtract(1, 'day').format('YYYY-MM-DD')
          : null,
      warrantyPackageSnapshotId: null,
    };

    const snapshotId = await VasService.saveWarrantySnapshot(payload);
    dispatch(setLoader(true));
    router.push(
      `/vas/warranty/packages?p=${CommonUtils.encode({
        ...warrantySelector,
        snapshotId,
        data: {
          ...warrantySelector.data,
          kms_driven,
          cubic_capacity,
          pre_warranty_check_date: preWarrantyCheck,
        },
      })}`
    );
  };

  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('Enter Km Driven');
    }
  }, [cleverTap]);

  return (
    <form>
      <div className="pl-[26px] pr-[22px] flex flex-col gap-6">
        <FadeUp duration={0.2 * 1.5}>
          <FormInputV1
            control={control}
            name="kms_driven"
            placeholder="42000"
            label={`${t(WarrantyConstants.EnterKmDriven)}*`}
            startIcon={<KmsIcon className="!text-primary h-10 w-10 mr-2" />}
          />
        </FadeUp>
        {/* {warrantySelector.type === WarrantyTypeConstants.PreOwnedCar && (
          <FadeUp duration={0.2 * 1.7} className="flex items-center gap-2">
            <FormDatePickerV1
              value={pre_warranty_check_date}
              control={control}
              name="pre_warranty_check_date"
              label={`${t(WarrantyConstants.PreWarrantyCheck)}*`}
              placeholder="YYYY/MM/DD"
              helperText={t('PreWarrantyHelperText')}
            />
          </FadeUp>
        )} */}
        <FadeUp duration={0.2 * 1.7}>
          <FormInputV1
            control={control}
            name="cubic_capacity"
            label={`${t(WarrantyConstants.EnterCubicCapacity)}*`}
            placeholder="400"
          />
        </FadeUp>

        {/* <FadeUp duration={0.2 * 2.1}>
          <FormDropdownV1
            control={control}
            name="vehicle_specifications"
            labelText={t(WarrantyConstants.EnterVehicleSpecType)}
            options={vehicleSpec}
            labelAccessor="label"
            valueAccessor="value"
          />
        </FadeUp>
       */}

        <FadeUp duration={0.2 * 2.1}>
          <FormCheckBox
            control={control}
            name="consent"
            label={t(WarrantyConstants.Consent)}
          />
        </FadeUp>
        <FadeUp duration={0.2 * 2.1}>
          <button
            onClick={handleSubmit(handleGetPackages)}
            disabled={!consent}
            className={`${
              !consent && 'opacity-[30%]'
            } bg-black text-white px-[44px] py-[16px] rounded-[40px] flex items-center text-[13px]`}
          >
            {t('GetPackages')}
            {router.locale === translationsLang.Arabic ? (
              <ArrowLeftIcon className="!text-white  h-[5px] mx-[12.5px]" />
            ) : (
              <ArrowRightIcon className="!text-white  h-[5px] mx-[12.5px]" />
            )}
          </button>
        </FadeUp>
      </div>
    </form>
  );
};

export default EnterKmDriven;
