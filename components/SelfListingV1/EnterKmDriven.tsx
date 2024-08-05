import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
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
import { FormInputV1 } from '../common/Form';
import { ArrowRightIcon, KmsIcon } from '../icons';
import { VehicleService } from '../../helpers/services';
import { toast } from 'react-toastify';
import { VehicleListingSource } from '../../types/enums';
type IFormInput = {
  kms_driven: number;
};

const schema = yup.object({
  kms_driven: yup.number().min(1).required(LabelConstants.REQUIRED_FIELD),
});

const EnterKmDriven = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      kms_driven: selfListingSelector.data.kms_driven,
    },
  });

  const handleContinue = async ({ kms_driven }: IFormInput) => {
    const isAuthenticated = SessionUtils.isValidSession();
    if (!isAuthenticated) {
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingAuthentication)
      );
      return;
    }

    dispatch(
      updateSelfListingFlow({
        kms_driven,
      })
    );
    if (cleverTap) {
      cleverTap.event?.push('sl_kms_driven_entered');
    }
    dispatch(setLoader(true));

    const data = {
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      Vin: null,
      ModelYearCode: selfListingSelector.data.manufacture_year.yearCode,
      ModelYear: selfListingSelector.data.manufacture_year.year!.toString(),
      MakeCode: selfListingSelector.data.brand.brandId,
      Make: selfListingSelector.data.brand.brandName,
      MakeAr: null,
      ModelCode: selfListingSelector.data.model.modelId,
      Model: selfListingSelector.data.model.modelName,
      ModelAr: null,
      SpecCode: selfListingSelector.data.variant.variantId,
      Spec: selfListingSelector.data.variant.variantName,
      SpecAr: null,
      SpecRegionId: 1,
      VehicleListingSourceType: VehicleListingSource.SellItForMe,
      VehicleListingId: selfListingSelector.data.vehicle_listing_id || 0,
      IgnoreWarning: false,
      ELMOwnerId: selfListingSelector.user_details.userId || 0,
      ELMSequenceNumber: selfListingSelector.user_details.sequenceNo || 0,
      ELMPlate1: selfListingSelector.data.plate_data.plate1 || 0,
      ELMPlate2: selfListingSelector.data.plate_data.plate2 || 0,
      ELMPlate3: selfListingSelector.data.plate_data.plate3 || 0,
      ELMPlateNumber:
        selfListingSelector.data.plate_data.plate_number ||
        Math.floor(1000 + Math.random() * 9000),
    };
    try {
      let vehicleDetailsResponseData = await VehicleService.addVehicleDetails(
        data
      );
      if (vehicleDetailsResponseData.IsSuccess) {
        dispatch(
          updateSelfListingFlow({
            vehicle_listing_id: vehicleDetailsResponseData.VehicleListingId,
          })
        );
      } else {
        toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
          position: 'bottom-right',
        });
        return;
      }
    } catch (error) {
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
        position: 'bottom-right',
      });
      return;
    }
    dispatch(setLoader(false));
    dispatch(
      updateSelfListingStep(SelfListingConstants.SelfListingUploadCarImages)
    );
  };

  const { kms_driven } = watch();

  return (
    <form>
      <div className="pl-[26px] pr-[22px] flex flex-col gap-6">
        <FadeUp duration={0.2 * 1.5}>
          <FormInputV1
            control={control}
            name="kms_driven"
            pattern={/^[^0-9]/}
            className="tracking-[5px] "
            placeholder="For eg. 42000"
            startIcon={<KmsIcon className="!text-primary h-10 w-10 mr-2" />}
          />
        </FadeUp>
        <FadeUp duration={0.2 * 2.1}>
          <button
            onClick={handleSubmit(handleContinue)}
            disabled={!kms_driven}
            className={`${
              !kms_driven && 'opacity-[30%]'
            } bg-black text-white px-[24px] font-semibold gap-1 py-[16px] rounded-[40px] flex items-center text-[13px]`}
          >
            {t(LabelConstants.CONTINUE)}
            <ArrowRightIcon className="!text-white  h-[5px] ml-[12.5px] rtl:-rotate-90" />
          </button>
        </FadeUp>
      </div>
    </form>
  );
};

export default EnterKmDriven;
