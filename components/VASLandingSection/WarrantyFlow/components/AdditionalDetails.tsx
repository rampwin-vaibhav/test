import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Dispatch, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import VasService from '../../../../helpers/services/vas.service';
import { CommonUtils, SessionUtils } from '../../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { setShowAdditionalInfoModal } from '../../../../lib/vas/warranty-flow/warranty.slice';
import {
  LabelConstants,
  WarrantyConstants,
} from '../../../../types/i18n.labels';
import cities from '../../../../utilities/constants/cities';
import { FadeIn } from '../../../common/Animations';
import {
  FormInputV1,
  FormRadio,
  IsPhoneNumberValid,
} from '../../../common/Form';
import FormDatePickerV1 from '../../../common/Form/FormDatePickerV1';
import FormDropdownV1 from '../../../common/Form/FormDropdownV1';
import FormPhoneInputV2 from '../../../common/Form/FormPhoneInputV2';
import Spinner from '../../../common/Spinner/spinner';
import { CloseBlackIcon } from '../../../icons';
type IFormInput = {
  customerNationalId: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  poBoxNo: number;
  cityCode: {
    CIT_CODE: number;
    CIT_NAME_EN: string;
    CIT_NAME_AR: string;
  };
  finance: string;
  gender: string;
};

const AdditionalDetails = ({
  setAlreadyWarrantyPurchased,
}: {
  setAlreadyWarrantyPurchased: Dispatch<any>;
}) => {
  const { t } = useTranslation('common');
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('Additional Details');
    }
  }, [cleverTap]);
  const schema = yup.object({
    customerNationalId: yup
      .string()
      .min(
        10,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.CustomerNationalID),
          length: 10,
        })
      )
      .max(
        10,
        t(LabelConstants.MAX_NUMBER_ERR_MSG, {
          name: t(LabelConstants.CustomerNationalID),
          length: 10,
        })
      )
      .typeError(LabelConstants.NUMBER_ERR_MSG)
      .required(LabelConstants.REQUIRED_FIELD),
    dateOfBirth: yup
      .string()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD),
    firstName: yup.string().required(LabelConstants.REQUIRED_FIELD),
    lastName: yup.string().required(LabelConstants.REQUIRED_FIELD),
    mobileNumber: yup
      .string()
      .typeError(LabelConstants.INVALID_MOBILE_NUMBER)
      .required(LabelConstants.MOBILE_NUMBER_REQUIRED)
      .nullable()
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
    email: yup
      .string()
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .nullable()
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
    poBoxNo: yup
      .string()
      .min(
        5,
        t(LabelConstants.MIN_NUMBER_ERR_MSG, {
          name: t(LabelConstants.PoBoxNo),
          length: 5,
        })
      )
      .max(
        5,
        t(LabelConstants.MAX_NUMBER_ERR_MSG, {
          name: t(LabelConstants.PoBoxNo),
          length: 5,
        })
      )
      .required(LabelConstants.REQUIRED_FIELD),
    cityCode: yup.object().required(LabelConstants.REQUIRED_FIELD),
    gender: yup.string().required(LabelConstants.REQUIRED_FIELD),
    finance: yup.string().required(LabelConstants.REQUIRED_FIELD),
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loader, setLoader] = useState(false);

  const warrantySelector = useAppSelector(({ warranty }) => warranty);
  const currLoggedIn = SessionUtils.getUserDetails();

  const { control, handleSubmit, watch, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      customerNationalId: warrantySelector.user_details.customerNationalId,
      dateOfBirth: warrantySelector.user_details.dateOfBirth,
      firstName:
        currLoggedIn?.FirstName || warrantySelector.user_details.firstName,
      lastName:
        currLoggedIn?.LastName || warrantySelector.user_details.lastName,
      mobileNumber:
        currLoggedIn?.MobileNumber ||
        warrantySelector.user_details.mobileNumber,
      email: currLoggedIn?.EmailAddress || warrantySelector.user_details.email,
      poBoxNo: warrantySelector.user_details.poBoxNo || 0,
      cityCode: warrantySelector?.user_details?.cityCode || cities[0],
      finance: warrantySelector?.user_details?.finance || 'yes',
      gender: warrantySelector?.user_details?.gender || '1',
    },
  });

  const { dateOfBirth } = watch();
  const handleAdditionalDetails = async (data: IFormInput) => {
    setLoader(true);

    const res = await VasService.storeVASWarrantyPurchaseProcess({
      WarrantyPackageSnapshotId: warrantySelector?.snapshotId,
      WarrantyPackageId: warrantySelector.package_data?.WarrantyPackageId,
      CurrencyId: warrantySelector.package_data?.CurrencyId,
      IsFinance: data.finance === 'yes' ? true : false,
      MarkedForFinance: data.finance === 'yes' ? true : false,
      PackagePrice:
        warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]
          ?.Premium,
      UserId: process.env.NODE_ENV === 'development' ? '316' : '2305',
      ThirdPartyQuoteNumber:
        warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]
          ?.ReferenceNo,
      CoverageType:
        warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]
          ?.CoverageType,
      ExtensionName:
        warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]
          ?.ExtensionName,
      Duration:
        warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]
          ?.Duration,
      UserDetails: {
        CustomerNationalId: CommonUtils.encode(`${data.customerNationalId}`),
        CustomerDOB: moment(data.dateOfBirth, 'DD/MM/YYYY').format(
          'YYYY-MM-DD'
        ), //YYYY-MM-DD
        GenderId: data.gender, //1=male and 2=male
        FirstName: data.firstName,
        LastName: data.lastName,
        MobileNumber: data.mobileNumber,
        EmailId: data.email,
        POBoxNumber: `${data.poBoxNo}`,
        CityCode: `${data.cityCode.CIT_CODE}`,
      },
    });
    if (!res.IsSuccess) {
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
        position: 'bottom-right',
      });
      setLoader(false);
      return;
    }
    if (res.InvoiceId === 0) {
      if (
        res.MessageCode ===
        WarrantyConstants.THIRD_PARTY_INSPECTION_QUALTIY_STATUS_UPDATE_SUCCESS
      ) {
        setAlreadyWarrantyPurchased(true);
        return;
      }
      toast.info(res.MessageCode, {
        position: 'bottom-right',
      });
      setLoader(false);
      return;
    }

    router.push(
      `/vas/warranty/confirm-warranty-details?p=${CommonUtils.encode({
        ...warrantySelector,
        invoiceId: res.InvoiceId,
        showAdditionalInfoModal: false,
        user_details: { ...data },
      })}`
    );
  };

  const handleCloseAdditionalDetailsPopup = () => {
    dispatch(setShowAdditionalInfoModal(false));
  };

  // const [cities, setCities] = useState([]);
  useEffect(() => {
    setValue('cityCode', cities[0] as any);
  }, [setValue]);
  return (
    <div className="bg-black bg-opacity-10  top-0 left-0 backdrop-blur-[2px] z-10 h-screen w-screen fixed  flex justify-center  mx-auto">
      <AnimatePresence>
        {loader && (
          <FadeIn className="h-full w-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 backdrop-blur-[2px] z-10">
            <Spinner className="!w-8 !h-8" />
          </FadeIn>
        )}
      </AnimatePresence>
      <div className="w-full max-w-3xl mx-auto rounded-lg bg-white px-[26px] h-full md:min-h-[700px] md:mt-[126px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] my-[30px]">
            {t('GetYourAdditionalDetails')}
          </h2>
          <button onClick={handleCloseAdditionalDetailsPopup}>
            <CloseBlackIcon className="h-5 w-5 !text-black" />
          </button>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <FormInputV1
                control={control}
                name="customerNationalId"
                label={t(LabelConstants.CustomerNationalID)}
              />
            </div>
            <div>
              <FormDatePickerV1
                control={control}
                name="dateOfBirth"
                value={dateOfBirth}
                label={t(LabelConstants.DATE_OF_BIRTH)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <FormInputV1
                control={control}
                name="firstName"
                label={t(LabelConstants.ENTER_FIRST_NAME)}
              />
            </div>
            <div>
              <FormInputV1
                control={control}
                name="lastName"
                label={t(LabelConstants.ENTER_LAST_NAME)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <FormPhoneInputV2
                control={control}
                name="mobileNumber"
                label={t(LabelConstants.ENTER_MOBILE_NUMBER)}
              />
            </div>
            <div>
              <FormInputV1
                control={control}
                name="email"
                label={t(LabelConstants.EMAIL)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <FormInputV1
                control={control}
                name="poBoxNo"
                label={t(LabelConstants.PoBoxNo)}
              />
            </div>
            <div>
              <FormDropdownV1
                control={control}
                name="cityCode"
                labelText={t(LabelConstants.CityCode)}
                options={cities}
                placeHolderText={
                  CommonUtils.getLanguageId(router.locale!) == 1
                    ? cities[0].CIT_NAME_EN
                    : cities[0].CIT_NAME_AR || cities[0].CIT_NAME_EN
                }
                labelAccessor={
                  CommonUtils.getLanguageId(router.locale!) === 1
                    ? 'CIT_NAME_EN'
                    : 'CIT_NAME_AR'
                }
                valueAccessor="CIT_CODE"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t(LabelConstants.FINANCE)}
              </label>
              <div className="flex space-x-4">
                <FormRadio
                  control={control}
                  name="finance"
                  label={t(LabelConstants.YES)}
                  value="yes"
                />
                <FormRadio
                  control={control}
                  name="finance"
                  label={t(LabelConstants.NO)}
                  value="no"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t(LabelConstants.GENDER)}
              </label>
              <div className="flex space-x-4">
                <FormRadio
                  control={control}
                  name="gender"
                  label={t(LabelConstants.MALE)}
                  value="1"
                />
                <FormRadio
                  control={control}
                  name="gender"
                  label={t(LabelConstants.FEMALE)}
                  value="2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end rtl:justify-start space-x-4 min-h-[48px]">
            <button
              onClick={handleSubmit(handleAdditionalDetails)}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {t('ConfirmAndProceed')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdditionalDetails;
