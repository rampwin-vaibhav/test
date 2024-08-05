import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { LabelConstants } from '../../../../types/i18n.labels';
import { IMaskInput, IMask } from 'react-imask';
import { CommonUtils } from '../../../../helpers/utilities';
import { useRouter } from 'next/router';
import { Locales } from '../../../../types/enums';
import { ValidatedIcon } from '../../../icons';

export const IsPhoneNumberValid = (userInput?: string | null) => {
  if (userInput) {
    const countryCodes = CommonUtils.getCountryCodes();
    const country = countryCodes.find((x) =>
      (userInput || '').startsWith(x?.value)
    );
    if (country) {
      const mask = IMask.createMask({
        mask: `${country?.value} ${country.inputMask}`,
        definitions: {
          '#': /[1-9]/,
        },
      });
      mask.resolve(userInput);
      return mask.isComplete || false;
    }
  }
  return false;
};

export const IsPhoneNumberValidNotRequired = (userInput?: string | null) => {
  if (userInput) {
    const countryCodes = CommonUtils.getCountryCodes();
    const country = countryCodes.find((x) =>
      (userInput || '').startsWith(x?.value)
    );
    if (country) {
      const mask = IMask.createMask({
        mask: `${country?.value} ${country.inputMask}`,
        definitions: {
          '#': /[1-9]/,
        },
      });
      mask.resolve(userInput);
      return mask.isComplete || country?.value === userInput || false;
    }
  }
  return true;
};

type FormPhoneInputProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;

  /**
   * This Property is use to hide/show validation error message for phone input field.
   */
  showError?: boolean;

  /**
   * This Property is use to set label to phone input field.
   */
  label?: string;

  /**
   * It is use to make FormPhoneInputV1 disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;

  /**
   * This Property is use to get country code.
   */
  onCountryChange?: (countryCode: string, phoneCode: string) => void;

  /**
   * This Property is use to show tick icon along with text input to indicate the data is validated.
   */
  validated?: boolean;
};

/**
 * This component is use to accept user phone number details, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormPhoneInputV1 = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  disabled = false,
  onCountryChange,
  validated = false,
}: FormPhoneInputProps<T>) => {
  const { t } = useTranslation();
  const [, setForceRender] = useState<any>();
  const countryCodes = CommonUtils.getCountryCodes();
  const ref = useRef<any>(null);
  const router = useRouter();

  const getInputNumber = (fieldValue: string) => {
    const selectedCountry = getSelectedCountry(fieldValue);
    return (fieldValue || '').replace(selectedCountry?.value, '');
  };

  const getSelectedCountry = (fieldValue: string) => {
    let selectedCountry = countryCodes[0];
    if (fieldValue) {
      const country = countryCodes.find((x) =>
        (fieldValue || '').startsWith(x?.value)
      );
      if (country) {
        selectedCountry = country;
      }
    }
    onCountryChange &&
      onCountryChange(selectedCountry?.code, selectedCountry?.value);

    return selectedCountry;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { isDirty, error },
        formState: { isSubmitted, isValid },
      }) => {
        const selectedCountry = getSelectedCountry(field.value);
        const fieldValue = getInputNumber(field.value);
        return (
          <div
            className="w-full flex flex-col"
            aria-invalid={
              showError &&
              (isDirty || isSubmitted) &&
              !isValid &&
              (error?.message ? true : false)
            }
            aria-describedby={`err-${name}`}
          >
            <div className="flex rounded-[4px] phone-direction gap-x-4">
              <div className="flex flex-col">
                {label && (
                  <label className="rtl:text-right">
                    {t(LabelConstants.COUNTRY_CODE_LABEL)}
                  </label>
                )}
                <div className="flex">
                  <div className="flex items-center  justify-center h-[3rem]">
                    <div className="h-[3rem]">
                      <picture>
                        <source
                          srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Flags/${selectedCountry?.code}.svg`}
                          type="image/svg"
                        />
                        <img
                          src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Flags/${selectedCountry?.code}.svg`}
                          alt="gogo motor"
                          className="!h-full !max-w-none rounded-l-[4px]"
                        />
                      </picture>
                    </div>
                  </div>
                  <div>
                    <select
                      className="w-[70px] md:w-[70px] 2xl:w-[80px] !text-black !rounded-l-none !px-0"
                      value={selectedCountry?.code}
                      onChange={(e) => {
                        const country = countryCodes.find(
                          (x) => x.code === e.target.value
                        );
                        const masked = ref.current.maskRef;
                        masked.value = '';
                        field.onChange(country ? country.value : '+966');
                        if (country) {
                          onCountryChange &&
                            onCountryChange(country.code, country.value);
                        }
                        setForceRender(null);
                      }}
                      disabled={disabled}
                    >
                      {countryCodes.map((item) => (
                        <option value={item.code} key={item.code} dir="ltr">
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                {label && (
                  <label
                    htmlFor={name}
                    className="rtl:text-right"
                    dir={router.locale === Locales.EN ? 'ltr' : 'rtl'}
                  >
                    {label}
                  </label>
                )}
                <div className="relative phone-input-v1 w-full">
                  <IMaskInput
                    mask={selectedCountry?.inputMask || ''}
                    value={fieldValue}
                    unmask={true}
                    onAccept={(value) => {
                      field.onChange(`${selectedCountry?.value}${value || ''}`);
                    }}
                    ref={ref}
                    definitions={{
                      '#': /[1-9]/,
                    }}
                    disabled={disabled}
                  />
                  {validated && (
                    <div className="absolute top-0 bottom-0 flex items-center right-5">
                      <ValidatedIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="error" id={`err-${name}`}>
              {showError && error?.message ? t(error?.message) : ''}
            </p>
          </div>
        );
      }}
    />
  );
};

export default FormPhoneInputV1;
