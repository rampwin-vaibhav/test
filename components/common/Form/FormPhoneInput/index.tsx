import { useTranslation } from 'next-i18next';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { SaudiFlagIcon } from '../../../icons';

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
   * It is use to make FormPhoneInput disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;
};

/**
 * It is wrapper of `react-phone-input-2` element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormPhoneInput = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  disabled = false,
}: FormPhoneInputProps<T>) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { isDirty, error },
        formState: { isSubmitted, isValid },
      }) => {
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
            {label && <label htmlFor={name}>{label}</label>}
            <div className="flex rounded-[4px] phone-direction">
              <div className="flex items-center rounded-l-[4px] bg-saudi-flag justify-center px-2">
                <div>
                  <SaudiFlagIcon />
                </div>
              </div>
              <div className="w-full">
                <PhoneInput
                  country={'sa'}
                  onlyCountries={['sa']}
                  countryCodeEditable={false}
                  inputProps={{
                    required: true,
                    autoFocus: true,
                    maxLength: 16,
                  }}
                  disableDropdown
                  value={field.value}
                  specialLabel=""
                  onChange={(e) => field.onChange('+' + e)}
                  disabled={disabled}
                />
              </div>
            </div>
            <p className="error" id={`err-${name}`}>
              {showError &&
              (isDirty || isSubmitted) &&
              !isValid &&
              error?.message
                ? t(error?.message)
                : ''}
            </p>
          </div>
        );
      }}
    />
  );
};

export default FormPhoneInput;
