import { Controller, Control, FieldValues, Path } from 'react-hook-form';

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
   * This is the value property for form data.
   */
  value: string;

  /**
   * Label test for radio button.
   */
  label: string;

  /**
   * It is use to make radio button disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;
};

/**
 * It is wrapper of form radio button HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormRadio = <T extends FieldValues>({
  name,
  control,
  value,
  label,
  disabled = false,
}: FormRadioProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex items-center mb-4 gap-2">
            <div className="flex items-center">
              <input
                {...field}
                id={value}
                type="radio"
                value={value}
                checked={field.value === value}
                disabled={disabled}
              />
            </div>
            <label
              htmlFor={value}
              className="text-base !pb-0 font-normal text-dark-gray1"
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
};

export default FormRadio;
