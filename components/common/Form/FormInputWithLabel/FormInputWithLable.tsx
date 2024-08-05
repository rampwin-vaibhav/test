import { useTranslation } from 'next-i18next';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
type FormInputWithLabelProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;
  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;
  /**
   * This Property is use to hide/show validation error message for input field.
   */
  showError?: boolean;
  /**
   * This Property is use to set label to input field.
   */
  label?: string;
  /**
   * This Property is use to set placeholder text to input field.
   */
  placeholder?: string;
  /**
   * It is use to make FormInput disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;
  /**
   * this prop is use to set custom style class to input box.
   */
  className?: string;

  /**
   * This props is use to display unit box along with text area.
   */
  showUnit?: boolean;

  /**
   * * This props is use to set value for unit box.
   */
  unitText?: string;

  /**
   *This is used to show text inside input box
   */
  labelPlaceHolder?: string;

  /**This will set the position of default label */
  isStartLabel?: boolean;

  /**This will invoke on blur */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**This will invoke on focus */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
/**
 * It is wrapper of form text input HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormInputWithLabel = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  placeholder,
  disabled = false,
  className = '',
  showUnit,
  unitText,
  labelPlaceHolder,
  isStartLabel = false,
  onBlur = () => {},
  onFocus = () => {},
}: FormInputWithLabelProps<T>) => {
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
            className={`w-full ${
              showError && (isDirty || isSubmitted) && !isValid
                ? 'border-red-500'
                : ''
            }`}
          >
            {label && <label htmlFor={name}>{label}</label>}

            <div className="flex items-center w-auto">
              <div
                className={`flex items-center px-3 gap-3 border border-light-gray rounded-[0.25rem] w-full ${
                  disabled ? 'bg-light-gray' : ''
                }`}
              >
                {isStartLabel && (
                  <div className={`font-bold pr-0 ${className}`}>
                    {labelPlaceHolder}
                  </div>
                )}
                <input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`font-bold !px-0 border-none ${className}`}
                  aria-describedby={`err-${name}`}
                  onBlur={(e) => onBlur(e)}
                  onFocus={(e) => onFocus(e)}
                />
                {!isStartLabel && (
                  <div className={`font-bold px-3 pl-0 ${className}`}>
                    {labelPlaceHolder}
                  </div>
                )}
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
export default FormInputWithLabel;
