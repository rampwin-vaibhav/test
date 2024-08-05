import React, { useEffect, useState } from 'react';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { FormCheckBoxV1, FormInputV2 } from '../common/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import ConfigurationService from '../../helpers/services/configuration.service';
import { ConfigurationKey } from '../../types/enums';
import { useRouter } from 'next/router';
import { ProfileService, VehicleService } from '../../helpers/services';
import { toast } from 'react-toastify';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';

type IFormInput = {
  phone_call: boolean;
  whatsapp: boolean;
  email: string;
  communication: boolean;
};

const CarListingReady = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);

  const schema = yup.object({
    email: yup.string().email(t(LabelConstants.INVALID_EMAIL)).optional(),
  });

  const { control, handleSubmit, setValue, watch } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { ...selfListingSelector.contact_options },
  });

  const { phone_call, whatsapp } = watch();

  const [globalIsAbsherVerified, setGlobalIsAbsherVerified] = useState<
    boolean | null
  >(null);
  const [globalIsAddressVerified, setGlobalIsAddressVerified] = useState<
    boolean | null
  >(null);
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

  const router = useRouter();

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
      if (cleverTap) {
        cleverTap.event?.push('sl_car_listing_ready_page');
      }
    };
    initialLoad();
  }, [router, cleverTap]);

  const handleContinueAndPublish = async ({
    communication,
    email,
    phone_call,
    whatsapp,
  }: IFormInput) => {
    dispatch(
      updateSelfListingFlow({
        contact_options: {
          phone_call,
          whatsapp,
          email,
          communication,
        },
      })
    );

    if (phone_call) {
      if (cleverTap) {
        cleverTap.event?.push('sl_phone_call_reach_selected');
      }
    }
    if (whatsapp) {
      if (cleverTap) {
        cleverTap.event?.push('sl_whatsapp_reach_selected');
      }
    }
    if (email.trim().length > 0) {
      if (cleverTap) {
        cleverTap.event?.push('sl_email_reach_selected');
      }
    }

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
      toast.error(LabelConstants.PLEASE_COMPLETE_IDENTITY_VERIFICATION);
      return;
    }

    const confirmDetailsPayload = {
      Agreement: true,
      CurrencySymbol: 'SAR',
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      Signature: SessionUtils.getUserDetails()?.FirstName || '',
      VehicleListingId: selfListingSelector.data.vehicle_listing_id,
      IsInspectionNeeded: false,
    };

    try {
      dispatch(setLoader(true));
      const res = await VehicleService.addConfirmDetails(confirmDetailsPayload);
      if (res) {
        dispatch(
          updateSelfListingStep(
            SelfListingConstants.SelfListingCarSuccessfullyListed
          )
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="px-[24px] h-full overflow-y-auto bg-[#F8F8F8] pb-[140px] sm:pb-[90px]">
      <form>
        {/* Vehicle info */}
        <div className="bg-white -mx-[24px] px-[24px] rounded-b-[6px] ">
          {/* Image */}
          <div className="relative w-full aspect-video">
            <Image
              alt=""
              src={
                selfListingSelector.data.vehicleImages.find(
                  (itm) => itm.ArtifactUrlPath !== null
                )?.ArtifactUrlPath || ''
              }
              layout="fill"
              className="rounded-[6px]"
            />
          </div>
          {/* Vehicle details */}
          <div className="py-[16px] w-full flex flex-col gap-[12px] ">
            <div className="w-full flex flex-col gap-[10px]">
              <p className="text-[15px] text-[#272828] font-medium ">
                {`${selfListingSelector.data.manufacture_year.year} ${selfListingSelector.data.brand.brandName} ${selfListingSelector.data.model.modelName}`}
              </p>
              <p className="text-[12px] font-normal text-[#838AA3] flex gap-[6px] items-center">
                <span>Automatic</span>
                <svg
                  width="3"
                  height="3"
                  viewBox="0 0 3 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#8F90A6" />
                </svg>
                <span>{`${selfListingSelector.data.kms_driven.toLocaleString()} ${t(
                  LabelConstants.KM
                )}`}</span>
                <svg
                  width="3"
                  height="3"
                  viewBox="0 0 3 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#8F90A6" />
                </svg>
                <span>Diesel</span>
              </p>
            </div>
            <p className="flex items-center gap-[4px] text-[11px] text-[#848080] ">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.00098 11.5C6.00098 11.5 10.001 8.5 10.001 5.5C10.001 4.43913 9.57955 3.42172 8.8294 2.67157C8.07926 1.92143 7.06184 1.5 6.00098 1.5C4.94011 1.5 3.92269 1.92143 3.17255 2.67157C2.4224 3.42172 2.00098 4.43913 2.00098 5.5C2.00098 8.5 6.00098 11.5 6.00098 11.5ZM7.50098 5.49805C7.50098 6.32647 6.8294 6.99805 6.00098 6.99805C5.17255 6.99805 4.50098 6.32647 4.50098 5.49805C4.50098 4.66962 5.17255 3.99805 6.00098 3.99805C6.8294 3.99805 7.50098 4.66962 7.50098 5.49805Z"
                  fill="#848080"
                />
              </svg>
              <span>{selfListingSelector.data.city.cityName}</span>
            </p>
          </div>
          {/* Price */}
          <div className="py-[14px] border-t border-[#F0F0F0] ">
            <p className="text-[15px] font-medium text-[#212121] ">
              {`${t(
                LabelConstants.SAR
              )} ${selfListingSelector.data.expected_price.toLocaleString()}`}
            </p>
          </div>
        </div>
        {/* Communication */}
        <div className="">
          <p className="text-[13px] mt-[4px] font-medium text-black/[54%] ">
            {t(LabelConstants.ALLOW_BUYERS_TO_REACH_OUT_TO_YOU_VIA)}
          </p>
          <div className="bg-white shadow-[0px_4px_20px_0px_#0000001F] px-[22px] rounded-[16px] mt-[14px]">
            {/* Phone Call */}
            <div className="flex w-full items-center gap-[14px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3334 14.0999V16.5999C18.3344 16.832 18.2868 17.0617 18.1939 17.2744C18.1009 17.487 17.9645 17.6779 17.7935 17.8348C17.6225 17.9917 17.4206 18.1112 17.2007 18.1855C16.9809 18.2599 16.7479 18.2875 16.5168 18.2666C13.9525 17.988 11.4893 17.1117 9.32511 15.7083C7.31163 14.4288 5.60455 12.7217 4.32511 10.7083C2.91676 8.53426 2.04031 6.05908 1.76677 3.48325C1.74595 3.25281 1.77334 3.02055 1.84719 2.80127C1.92105 2.58199 2.03975 2.38049 2.19575 2.2096C2.35174 2.03871 2.54161 1.90218 2.75327 1.80869C2.96492 1.7152 3.19372 1.6668 3.42511 1.66658H5.92511C6.32953 1.6626 6.7216 1.80582 7.02824 2.06953C7.33488 2.33324 7.53517 2.69946 7.59177 3.09992C7.69729 3.89997 7.89298 4.68552 8.17511 5.44158C8.28723 5.73985 8.31149 6.06401 8.24503 6.37565C8.17857 6.68729 8.02416 6.97334 7.80011 7.19992L6.74177 8.25825C7.92807 10.3445 9.65549 12.072 11.7418 13.2583L12.8001 12.1999C13.0267 11.9759 13.3127 11.8215 13.6244 11.755C13.936 11.6885 14.2602 11.7128 14.5584 11.8249C15.3145 12.107 16.1001 12.3027 16.9001 12.4083C17.3049 12.4654 17.6746 12.6693 17.9389 12.9812C18.2032 13.2931 18.3436 13.6912 18.3334 14.0999Z"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="w-full flex border-b border-black/[12%] py-[19px] items-center justify-between">
                <label
                  onClick={() => setValue('phone_call', !phone_call)}
                  className="text-[15px] font-medium text-[#212121]"
                >
                  {t(LabelConstants.PHONE_CALL)}
                </label>
                <FormCheckBoxV1 control={control} name="phone_call" />
              </div>
            </div>
            {/* Whatsapp */}
            <div className="flex w-full items-center py-[19px] gap-[14px]">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.48263 0H15.5177C17.9852 0 20 2.01923 20 4.48267V15.6319C20 18.1 17.9852 20.1191 15.5177 20.1191H4.48263C2.01471 20.1191 0 18.1 0 15.6319V4.48267C0 2.01925 2.01471 0 4.48263 0Z"
                  fill="#33CC33"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1192 15.3894C8.9929 15.3894 7.94865 15.0505 7.06941 14.4782L4.94506 15.1513L5.63192 13.1046C4.96801 12.2072 4.57413 11.0808 4.57413 9.87656C4.57413 9.69798 4.58781 9.52858 4.61076 9.35C4.88094 6.5615 7.25281 4.38204 10.1192 4.38204C13.0312 4.38204 15.4259 6.62106 15.6501 9.45075C15.6593 9.59725 15.6593 9.74376 15.6593 9.87658C15.6593 12.9123 13.1734 15.3895 10.1192 15.3895V15.3894ZM16.7031 9.72086C16.6162 6.18142 13.7042 3.34717 10.1192 3.34717C6.57492 3.34717 3.68582 6.11277 3.53941 9.59723C3.53016 9.68881 3.53017 9.78954 3.53017 9.87653C3.53017 11.1174 3.87815 12.2712 4.47348 13.2649L3.28296 16.7722L6.9369 15.6138C7.88021 16.1311 8.96964 16.4197 10.1192 16.4197C13.7591 16.4197 16.7172 13.4984 16.7172 9.87653C16.7172 9.82158 16.7031 9.77581 16.7031 9.72086Z"
                  fill="#FEFEFE"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0424 10.6227C11.8818 10.5815 11.7813 10.5448 11.6668 10.7143C11.5018 10.9753 11.1539 11.5476 10.8152 11.3782C10.6458 11.3004 10.1285 11.1309 9.51031 10.5815C9.02944 10.1511 8.69994 9.63368 8.61263 9.47803C8.47091 9.21246 8.91933 8.93313 9.08429 8.59891C9.13914 8.48899 9.11631 8.39743 9.07068 8.3196C9.03866 8.24176 8.71353 7.44507 8.57619 7.12913C8.44325 6.80401 8.30592 6.85898 8.21904 6.85898C7.32134 6.85898 6.90015 7.49543 6.90015 8.38826C6.90015 8.56684 6.93699 8.75919 6.99185 8.92859C7.15199 9.50095 7.50914 9.96339 7.56442 10.0412C7.64208 10.1511 8.67711 11.8178 10.3207 12.4589C11.9735 13.0998 11.9735 12.8847 12.2666 12.8617C12.5553 12.8389 13.2191 12.4817 13.3564 12.0971C13.4894 11.7262 13.4894 11.4011 13.4433 11.3324C13.3884 11.2363 12.0424 10.6273 12.0424 10.6227V10.6227Z"
                  fill="#FEFEFE"
                />
              </svg>
              <div className="w-full flex items-center justify-between">
                <label
                  onClick={() => setValue('whatsapp', !whatsapp)}
                  className="text-[15px] font-medium text-[#212121]"
                >
                  {t(LabelConstants.WHATSAPP)}
                </label>
                <FormCheckBoxV1 control={control} name="whatsapp" />
              </div>
            </div>
            {/* Email */}
            <div className="flex w-full items-center pb-[16px] gap-[14px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 3.3335H3.33341C2.41294 3.3335 1.66675 4.07969 1.66675 5.00016V15.0002C1.66675 15.9206 2.41294 16.6668 3.33341 16.6668H16.6667C17.5872 16.6668 18.3334 15.9206 18.3334 15.0002V5.00016C18.3334 4.07969 17.5872 3.3335 16.6667 3.3335Z"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3334 5.8335L10.8584 10.5835C10.6011 10.7447 10.3037 10.8302 10.0001 10.8302C9.69648 10.8302 9.39902 10.7447 9.14175 10.5835L1.66675 5.8335"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="w-full flex items-center justify-between">
                <FormInputV2
                  control={control}
                  name="email"
                  className="bg-[#F0F0F0] "
                  placeholder={t(LabelConstants.ENTER_YOUR_EMAIL)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-[14px] mx-auto">
          <FormCheckBoxV1
            control={control}
            name="communication"
            label={t(
              LabelConstants.ALLOW_GOGOMOTOR_TO_SEND_EMAILS_AND_COMMUNICATION
            )}
            labelClassName="!text-[11px] !font-normal !text-[#757575] "
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="bg-white shadow-[0px_0px_15px_0px_#0000001A]">
            <div className="flex flex-col gap-[13px] px-[24px] py-[15px] items-center w-full sm:mx-auto">
              <button
                onClick={handleSubmit(handleContinueAndPublish)}
                className="bg-black disabled:opacity-40 text-white rounded-[40px] w-full h-[48px] text-[13px] font-semibold flex items-center gap-2 justify-center"
              >
                {t(LabelConstants.CONFIRM_AND_PUBLISH)}
              </button>
              <p className="text-[11px] font-normal text-[#757575]">
                {t(LabelConstants.BY_CONTINUING_I_AGREE_TO_GOGOMOTORS)}{' '}
                <Link href={'/info/terms-and-conditions'} className="underline">
                  {t(LabelConstants.TERMS_CONDITIONS)}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarListingReady;
