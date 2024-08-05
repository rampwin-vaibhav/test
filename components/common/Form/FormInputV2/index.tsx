import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
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
   * This props is use to set value for unit box.
   */
  unitText?: string;

  /**
   * This props is use to max length for input box
   */
  maxLength?: number;

  /**
   * Restrict user to enter data with specific pattern
   */
  pattern?: RegExp | undefined;

  /**This will set the position of default label */
  isStartLabel?: boolean;

  /**This will set the ref */
  userRef?: any;
  autoComplete?: any;
  /** This will add icon at the end of text box  */
  startIcon?: ReactNode | null;
  endIcon?: ReactNode | null;
  helperText?: React.ReactNode | string;
};

/**
 * It is wrapper of form text input HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormInputV2 = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  placeholder,
  disabled = false,
  className = '',
  showUnit,
  unitText,
  maxLength,
  pattern,
  isStartLabel = false,
  userRef,
  autoComplete = 'on',
  startIcon = null,
  endIcon = null,
  helperText,
}: FormInputProps<T>) => {
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
          <div className="w-full flex flex-col">
            {label && (
              <label
                htmlFor={name}
                className="text-[12px] font-medium pb-[4px]"
              >
                {label}
              </label>
            )}
            {showUnit && unitText ? (
              <div className="flex items-center h-[3rem]">
                {isStartLabel && (
                  <div
                    className={`unit-container  rounded-l-[0.25rem] min-w-[2rem] text-base text-white p-2 h-full flex items-center`}
                  >
                    {unitText}
                  </div>
                )}
                <input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={
                    isStartLabel
                      ? `rounded-l-none ${className}`
                      : `rtl:rounded-l-none ltr:rounded-r-none ${className}`
                  }
                  aria-invalid={
                    showError &&
                    (isDirty || isSubmitted) &&
                    !isValid &&
                    (error?.message ? true : false)
                  }
                  aria-describedby={`err-${name}`}
                  maxLength={maxLength}
                  onChange={(event) => {
                    if (pattern) {
                      const userInput = event.target.value || '';
                      let result = '';
                      userInput
                        .split('')
                        .forEach(
                          (character: any) =>
                            (result = result + character.replace(pattern, ''))
                        );
                      field.onChange(result);
                    } else {
                      field.onChange(event.target.value);
                    }
                  }}
                  ref={userRef}
                  autoComplete={autoComplete}
                />
                {!isStartLabel && (
                  <div
                    className={`unit-container ltr:rounded-r-[0.25rem] rtl:rounded-l-[0.25rem] min-w-[2rem] text-base text-white p-2 h-full flex items-center`}
                  >
                    {unitText}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[8px] border bg-[#F0F0F0] transition-opacity flex items-center justify-between px-[16px]">
                {startIcon && startIcon}
                <input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="h-[48px] p-0 border-none bg-[#F0F0F0] rounded-[8px]"
                  aria-invalid={
                    showError &&
                    (isDirty || isSubmitted) &&
                    !isValid &&
                    (error?.message ? true : false)
                  }
                  aria-describedby={`err-${name}`}
                  maxLength={maxLength}
                  onChange={(event) => {
                    if (pattern) {
                      const userInput = event.target.value || '';
                      let result = '';
                      userInput
                        .split('')
                        .forEach(
                          (character: any) =>
                            (result = result + character.replace(pattern, ''))
                        );
                      field.onChange(result);
                    } else {
                      field.onChange(event.target.value);
                    }
                  }}
                  autoComplete={autoComplete}
                />
                {endIcon && endIcon}
              </div>
            )}
            <p className="text-[12px] mt-[4px]">{helperText && helperText}</p>
            <p className="error" id={`err-${name}`}>
              {showError && (isDirty || isSubmitted) && error?.message
                ? t(error?.message)
                : ''}
            </p>
          </div>
        );
      }}
    />
  );
};
export default FormInputV2;
