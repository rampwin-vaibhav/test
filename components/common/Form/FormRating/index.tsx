import { useTranslation } from 'next-i18next';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type FormRatingProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;

  /**
   * Label test for radio button.
   */
  label: string;

  /**
   * This Property is use to hide/show validation error message.
   */
  showError?: boolean;
};

/**
 * It is custom control for rating from 1 to 5, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormRating = <T extends FieldValues>({
  name,
  control,
  label,
  showError = true,
}: FormRatingProps<T>) => {
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
            <div className="flex">
              {Array(5)
                .fill('')
                .map((x, index) => {
                  return (
                    <div
                      className={`w-12 h-8 flex justify-center items-center border cursor-pointer text-sm ${
                        field.value === 1 && index + 1 === field.value
                          ? 'bg-error'
                          : field.value <= 3 && index + 1 <= field.value
                          ? 'bg-warning'
                          : field.value > 3 && index + 1 <= field.value
                          ? 'bg-success'
                          : 'bg-light-gray'
                      }`}
                      key={index}
                      onClick={() => {
                        field.onChange(index + 1);
                      }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
            </div>
            <p className="error">
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

export default FormRating;
