import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type FormRadioProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;

  /**
   * Label test for checkbox.
   */
  label?: string;

  /**
   * className for checkbox label.
   */
  labelClassName?: string;

  /**
   * It is use to make checkbox disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;

  /**
   * Triggered this callback method to revalidate object schema (programmatically) for checkboxes.
   * This method is useful if we have multiple checkboxes with in form.
   */
  reValidate?: () => void;
};

/**
 * It is wrapper of form checkbox HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormCheckBoxV1 = <T extends FieldValues>({
  name,
  labelClassName = '',
  control,
  label = '',
  disabled = false,
  reValidate,
}: FormRadioProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex items-start">
            <input
              id={name}
              type="checkbox"
              className="!accent-black"
              onChange={(e) => {
                field.onChange(e);
                reValidate && reValidate();
              }}
              checked={field.value || false}
              disabled={disabled}
            />
            <label
              htmlFor={name}
              className={`text-[15px] !pb-0 font-medium text-black ml-[14px] mr-0 rtl:mr-[14px] rtl:ml-0 ${labelClassName}`}
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
};

export default FormCheckBoxV1;
