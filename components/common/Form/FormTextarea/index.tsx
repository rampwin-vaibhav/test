import { useTranslation } from 'next-i18next';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type FormTextareaProps<T extends FieldValues> = {
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
   * It is use to make checkbox disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;
  /**
   * The rows attribute specifies the visible height of a text area, in lines
   * - Required: No
   * - Default value is - "3"
   */
  rows?: number;
};

/**
 * It is wrapper of form textarea HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormTextarea = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  placeholder,
  disabled = false,
  rows = 3,
}: FormTextareaProps<T>) => {
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
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
              {...field}
              value={field.value || ''}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              aria-invalid={
                showError &&
                (isDirty || isSubmitted) &&
                !isValid &&
                (error?.message ? true : false)
              }
              aria-describedby={`err-${name}`}
              className="!h-auto"
              cols={5}
            />
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

export default FormTextarea;
