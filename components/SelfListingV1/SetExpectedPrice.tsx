import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';

import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { FadeUp } from '../common/Animations';
import { FormCheckBoxV1, FormInputV1 } from '../common/Form';
import { ArrowRightIcon } from '../icons';
import { useRouter } from 'next/router';
import { VehicleService } from '../../helpers/services';
import { toast } from 'react-toastify';
type IFormInput = {
  expected_price: number;
  isPriceNegotiable: boolean;
};

const schema = yup.object({
  expected_price: yup.number().min(1).required(LabelConstants.REQUIRED_FIELD),
});

const SetExpectedPrice = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      expected_price: selfListingSelector.data.expected_price,
      isPriceNegotiable: selfListingSelector.data.isPriceNegotiable,
    },
  });

  const handleContinue = async ({
    expected_price,
    isPriceNegotiable,
  }: IFormInput) => {
    const isAuthenticated = SessionUtils.isValidSession();
    if (!isAuthenticated) {
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingAuthentication)
      );
      return;
    }

    dispatch(
      updateSelfListingFlow({
        expected_price,
        isPriceNegotiable,
      })
    );

    if (cleverTap) {
      cleverTap.event?.push('sl_expected_price_entered');
    }

    const data = {
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      VehicleListingId: selfListingSelector.data.vehicle_listing_id,
      CityId: selfListingSelector.data.city.cityId,
      OwnershipId: 1,
      ModelYearCode: selfListingSelector.data.manufacture_year.yearCode,
      MakeCode: selfListingSelector.data.brand.brandId,
      ModelCode: selfListingSelector.data.model.modelId,
      SpecCode: selfListingSelector.data.variant.variantId,
      VehicleConditionId: 1,
      VehicleCondition: 'Very good',
      OdometerReading: selfListingSelector.data.kms_driven,
      AskingPrice: expected_price,
      IsPriceNegotiable: isPriceNegotiable,
      ExteriorColorId: 1,
      InteriorColorId: 1,
      ListingSummary: `${selfListingSelector.data.manufacture_year.year} ${selfListingSelector.data.brand.brandName} ${selfListingSelector.data.model.modelName}`,
      OutstandingFinance: false,
      UnitOfMeasureId: 1,
    };

    try {
      dispatch(setLoader(true));
      const res = await VehicleService.addAdditionalInformation(data);
      if (res) {
        dispatch(
          updateSelfListingStep(SelfListingConstants.SelfListingCarListingReady)
        );
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const { expected_price } = watch();

  return (
    <form>
      <div className="pl-[26px] pr-[22px] flex flex-col gap-6">
        <FadeUp duration={0.2 * 1.5}>
          <FormInputV1
            control={control}
            name="expected_price"
            pattern={/^[^0-9]/}
            className="tracking-[5px] "
            placeholder={t(LabelConstants.SAR)}
          />
        </FadeUp>
        <FadeUp duration={0.2 * 2.1}>
          <FormCheckBoxV1
            control={control}
            name="isPriceNegotiable"
            labelClassName="text-[15px] text-[#212121] "
            label={t(LabelConstants.PRICE_IS_NEGOTIABLE)}
          />
        </FadeUp>
        <FadeUp duration={0.2 * 2.7}>
          <button
            onClick={handleSubmit(handleContinue)}
            disabled={!expected_price}
            className={`${
              !expected_price && 'opacity-[30%]'
            } bg-black text-white px-[22px] font-semibold py-[14px] rounded-[40px] flex gap-1 items-center text-[13px]`}
          >
            {t(LabelConstants.ADD_PRICE_TO_CONTINUE)}
            <ArrowRightIcon className="!text-white  h-[5px] ml-[12.5px] rtl:-rotate-90" />
          </button>
        </FadeUp>
      </div>
    </form>
  );
};

export default SetExpectedPrice;
