import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FocusEventHandler, useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { IMask, IMaskInput } from 'react-imask';
import { CommonUtils } from '../../../../helpers/utilities';
import { ValidatedIcon } from '../../../icons';

export const IsPhoneNumberValid = (userInput?: string | null) => {
  if (userInput) {
    const countryCodes = CommonUtils.getCountryCodes();
    const country = countryCodes.find((x) =>
      (userInput || '').startsWith(x.value)
    );
    if (country) {
      const mask = IMask.createMask({
        mask: `${country.value} ${country.inputMask}`,
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
      (userInput || '').startsWith(x.value)
    );
    if (country) {
      const mask = IMask.createMask({
        mask: `${country.value} ${country.inputMask}`,
        definitions: {
          '#': /[1-9]/,
        },
      });
      mask.resolve(userInput);
      return mask.isComplete || country.value === userInput || false;
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

  /* This proptery is use to excute some functionality on focus out */
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

/**
 * This component is use to accept user phone number details, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormPhoneInputV2 = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  disabled = false,
  onCountryChange,
  validated = false,
  onBlur = () => {},
}: FormPhoneInputProps<T>) => {
  const { t } = useTranslation();
  const [, setForceRender] = useState<any>();
  const countryCodes = CommonUtils.getCountryCodes();
  const ref = useRef<any>(null);
  const router = useRouter();

  const getInputNumber = (fieldValue: string) => {
    const selectedCountry = getSelectedCountry(fieldValue);
    return (fieldValue || '').replace(selectedCountry.value, '');
  };

  const getSelectedCountry = (fieldValue: string) => {
    let selectedCountry = countryCodes[0];
    if (fieldValue) {
      const country = countryCodes.find((x) =>
        (fieldValue || '').startsWith(x.value)
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
            <div className="flex flex-col rounded-[4px]">
              {label && (
                <label
                  htmlFor={name}
                  className="text-black !text-[12px] font-medium pb-[4px]"
                >
                  {label}
                </label>
              )}
              <div
                className={`flex items-center rounded-[8px] border border-[#484E50] border-opacity-[30%] focus-within:border-opacity-100 transition-opacity min-h-[48px] p-[1px] gap-6 ${
                  disabled && 'bg-[#E0E0E0]'
                }`}
              >
                <div className="flex border-none items-center w-[70px] md:w-[50px]">
                  <div className="flex items-center  justify-center ml-[14px] rtl:mr-[14px] rtl:ml-0">
                    <picture>
                      <source
                        srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Flags/${selectedCountry.code}.svg`}
                        type="image/svg"
                      />
                      <img
                        src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Flags/${selectedCountry.code}.svg`}
                        alt="gogo motor"
                        className="!h-[18px] !max-w-none"
                      />
                    </picture>
                  </div>
                  <div className="mr-[11px] rtl:mr-0 rtl:ml-[11px]">
                    <select
                      className="w-[50px] md:w-[50px] 2xl:w-[50px] !text-black !rounded-l-none !px-0 border-none !text-opacity-[0.7] text-[15px] ml-[6px] rtl:ml-0 rtl:mr-[6px]"
                      value={selectedCountry.code}
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
                <hr className="w-[1px] bg-black opacity-[0.12] h-[32px] bg-transparent" />
                <div className="relative w-full border-none">
                  <IMaskInput
                    className="border-none"
                    mask={selectedCountry.inputMask || ''}
                    value={fieldValue}
                    unmask={true}
                    onAccept={(value) => {
                      field.onChange(`${selectedCountry.value}${value || ''}`);
                    }}
                    ref={ref}
                    onBlur={onBlur}
                    definitions={{
                      '#': /[1-9]/,
                    }}
                    disabled={disabled}
                  />
                  {validated && (
                    <div className="absolute top-0 bottom-0 flex items-center right-5 rtl:right-[18rem]">
                      <ValidatedIcon fill="#4c0055" />
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

export default FormPhoneInputV2;
