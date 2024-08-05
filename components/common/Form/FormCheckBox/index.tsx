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
const FormCheckBox = <T extends FieldValues>({
  name,
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
              onChange={(e) => {
                field.onChange(e);
                reValidate && reValidate();
              }}
              checked={field.value || false}
              disabled={disabled}
            />
            <label
              htmlFor={name}
              className="text-[15px] !pb-0 font-normal text-dark-gray1 mx-[14px]"
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
};

export default FormCheckBox;
