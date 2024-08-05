import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { OtherColorHexCode } from '../../../../types/constants';
import { Color } from '../../../../types/models';
import { OtherColorIcon, RightTickIcon } from '../../../icons';

type FormColorPickerProps<TControl extends FieldValues> = {
  /**
   * Array of items for color options.
   */
  options: Array<Color>;
  /**
   * This is the name property for form data.
   */
  name: Path<TControl>;
  /**
   * It is use to make color picker disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;
  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<TControl, any>;
  /**
   * This Property is use to hide/show validation error message for input field.
   */
  showError?: boolean;
};
/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */

const FormColorPicker = <TControl extends FieldValues>({
  options = [],
  name,
  control,
  disabled = false,
  showError,
}: FormColorPickerProps<TControl>): ReactElement => {
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap  gap-4">
              {options.map((item: Color) => (
                <div
                  key={item.ColorId}
                  title={item.Color}
                  className={`h-2 w-2 p-4 rounded-full border-2 ga-refresh-vehicles flex items-center justify-center ${
                    field.value === item.ColorId
                      ? 'shadow-lg shadow-dark-gray2'
                      : ''
                  }`}
                  style={{
                    backgroundColor: item.ColorHex,
                  }}
                  onClick={() => !disabled && field.onChange(item.ColorId)}
                >
                  {field.value === item.ColorId ? (
                    <>
                      {item.ColorHex.trim() === OtherColorHexCode ? (
                        <div className="relative w-auto h-auto">
                          <OtherColorIcon className="h-8 w-8" />
                          <div className="absolute h-full w-full top-0 left-0">
                            <div className="relative flex items-center justify-center h-full">
                              <RightTickIcon className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <RightTickIcon className="h-4 w-4" />
                        </div>
                      )}
                    </>
                  ) : item.ColorHex.trim() === OtherColorHexCode ? (
                    <div className="relative w-auto h-auto">
                      <OtherColorIcon className="h-8 w-8" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="text-red-500 text-sm font-light">
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
export default FormColorPicker;
