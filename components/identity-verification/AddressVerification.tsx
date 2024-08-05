import React, { useEffect, useState, FC, useTransition } from 'react';
import { LabelConstants } from '../../types/i18n.labels';
import { City } from '../../types/models';
import { FormDatePicker, FormDropdown, FormInput } from '../common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { ProfileService, VehicleService } from '../../helpers/services';
import { useRouter } from 'next/router';
import { CommonUtils } from '../../helpers/utilities';
import { ELMChoice, YakeenMessageCode } from '../../types/enums';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import { DateObject } from 'react-multi-date-picker';
import moment from 'moment';
import { apiDateFormat } from '../../types/constants';
import { useAppContext } from '../../provider/AppProvider';

type AddressProps = {
  userChoice: string;
  userId: string | null;
  dob: string;
};

interface IFormInput {
  customerId: string;
  dateOfBirth: string;
  additionalNumber: string;
  buildingNumber: string;
  city: City;
  district: string;
  streetNumber: string;
  unitNumber: string;
  postCode: string;
}

const AddressVerification: FC<AddressProps> = ({ userChoice, userId, dob }) => {
  const { t } = useTranslation();
  const { dateFormat } = useAppContext();

  const router = useRouter();
  const schema = yup
    .object({
      customerId: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD)
        .test(
          'maxDigit',
          userChoice === ELMChoice.Iqama
            ? LabelConstants.INVALID_IQAMA_NUMBER
            : LabelConstants.INVALID_NATIONAL_ID,
          (data) => data?.trim().length === 10
        ),
      dateOfBirth: yup
        .string()
        .nullable()
        .required(LabelConstants.INVALID_DATA),
      additionalNumber: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      buildingNumber: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
      district: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
      streetNumber: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      unitNumber: yup
        .string()
        .nullable()
        .required(LabelConstants.REQUIRED_FIELD),
      postCode: yup
        .string()
        .nullable()
        .matches(/^[0-9]*$/, LabelConstants.ENTER_NUMBERS_ONLY)
        .test(
          'maxDigit',
          LabelConstants.MAX_5_DIGITS_ALLOWED_NUMBERS_ONLY,
          (number) => String(number).length === 5
        )
        .required(LabelConstants.REQUIRED_FIELD),
    })
    .required();
  const { control, handleSubmit, setValue, watch } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [cityList, setCityList] = useState<City[]>([]);
  const { dateOfBirth } = watch();

  useEffect(() => {
    const initialLoad = async () => {
      const cityList = await VehicleService.fetchAllCities(router.locale);
      setCityList(cityList);
      setValue('dateOfBirth', moment(dob, apiDateFormat).format(dateFormat));
      if (userId) {
        setValue('customerId', userId);
      }
    };
    initialLoad();
  }, [dateFormat, dob, router.locale, setValue, userId]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload = {
      CustomerId: data.customerId,
      DateOfBirth: data.dateOfBirth
        ? moment(data.dateOfBirth, dateFormat).format(apiDateFormat)
        : '',
      IsNIN: userChoice === ELMChoice.Iqama ? false : true,
      AdditionalNumber: data.additionalNumber,
      BuildingNumber: data.buildingNumber,
      City: data.city.CityKey,
      District: data.district,
      PostCode: data.postCode,
      StreetName: data.streetNumber,
      UnitNumber: data.unitNumber,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
    };
    const yakeenRes = await ProfileService.verifyYakeenInformation(payload);
    let yakeenMessage = '';
    if (yakeenRes.IsSuccess === true) {
      yakeenMessage = LabelConstants.YAKEEN_SUCCESS_MESSAGE;
      const result = await MessageBox.open({
        content: `${t(yakeenMessage)}`,
        type: MessageBoxType.Message,
      });

      if (result === MessageBoxResult.OK) {
        const url: string = String(router?.query?.redirectUrl || '/profile');
        router.replace(url);
      }
    } else {
      yakeenMessage = LabelConstants.YAKEEN_FAILED_MESSAGE;
      await MessageBox.open({
        content: `${t(yakeenMessage)}`,
      });
    }
  };

  return (
    <div>
      <form className="form-div mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <FormInput
              control={control}
              name="customerId"
              label={
                userChoice === ELMChoice.Iqama
                  ? t(LabelConstants.IQAMA_NUMBER)
                  : t(LabelConstants.NIN)
              }
              pattern={/[^0-9]+/}
              maxLength={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <FormDatePicker
              control={control}
              name="dateOfBirth"
              label={t(LabelConstants.DATE_OF_BIRTH)}
              placeholder={dateFormat}
              maxDate={new DateObject()}
              editable={false}
              value={dateOfBirth}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="label-text text-xl">
              {userChoice === ELMChoice.Iqama
                ? t(LabelConstants.ADDRESS_OF_IQAMA)
                : t(LabelConstants.ADDRESS_OF_NIN)}
            </label>
            <div className="flex flex-row gap-2">
              <FormInput
                control={control}
                name="additionalNumber"
                label={`${t(LabelConstants.ADDITIONAL_NUMBER)}*`}
              />
              <FormInput
                control={control}
                name="buildingNumber"
                label={`${t(LabelConstants.BUILDING_NUMBER)}*`}
              />
            </div>
            <div className="flex gap-2">
              <FormDropdown
                options={cityList}
                labelAccessor="City"
                valueAccessor="CityId"
                labelText={`${t(LabelConstants.SELECT_CITY)}*`}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                control={control}
                name="city"
              />
              <FormInput
                control={control}
                name="district"
                label={`${t(LabelConstants.DISTRICT)}*`}
              />
            </div>
            <div className="flex gap-2">
              <FormInput
                control={control}
                name="streetNumber"
                label={`${t(LabelConstants.STREET_NUMBER)}*`}
              />
              <FormInput
                control={control}
                name="unitNumber"
                label={`${t(LabelConstants.UNIT_NUMBER)}*`}
              />
            </div>
            <div className="w-full">
              <FormInput
                control={control}
                name="postCode"
                label={`${t(LabelConstants.POST_CODE)}*`}
              />
            </div>
          </div>
          <button className="btn  btn-primary w-full uppercase" type="submit">
            {t(LabelConstants.SUBMIT)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressVerification;
