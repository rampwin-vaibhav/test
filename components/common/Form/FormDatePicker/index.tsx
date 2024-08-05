import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import moment from 'moment';
import DatePicker, {
  DateObject,
  CalendarProps,
  DatePickerProps,
} from 'react-multi-date-picker';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppContext } from '../../../../provider/AppProvider';

type FormDatePickerProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;

  /**
   * This Property is use to hide/show validation error message for date-picker field.
   */
  showError?: boolean;

  /**
   * This Property is use to set label to date-picker field.
   */
  label?: string;

  /**
   * This Property is use to set min date for date-picker control.
   */
  minDate?: string;
} & CalendarProps &
  DatePickerProps;

/**
 * It is wrapper of `react-phone-input-2` element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  minDate,
  placeholder,
  ...props
}: FormDatePickerProps<T>) => {
  const { dateFormat } = useAppContext();

  const datePickerRef = useRef<React.MutableRefObject<any>>();
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const defaultMinDate = '01/01/1753';
  const { t } = useTranslation();
  moment.locale('en');

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        dateContainerRef.current &&
        !dateContainerRef.current.contains(e.target as any) &&
        datePickerRef.current
      ) {
        (datePickerRef.current as any).closeCalendar();
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

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
            ref={dateContainerRef}
            aria-invalid={
              showError &&
              (isDirty || isSubmitted) &&
              !isValid &&
              (error?.message ? true : false)
            }
            aria-describedby={`err-${name}`}
          >
            {label && <label htmlFor={name}>{label}</label>}
            <DatePicker
              ref={datePickerRef}
              name={name}
              value={
                field.value
                  ? moment(field.value).format(dateFormat)
                  : field.value
              }
              onChange={(e: DateObject | null) => {
                let date = null;
                if (e) {
                  date = new DateObject(
                    `${e.year}-${e.month.number}-${e.day}`
                  ).format(dateFormat);
                }
                field.onChange(date);
              }}
              minDate={minDate || defaultMinDate}
              multiple={false}
              placeholder={placeholder}
              className="gogo-date-picker"
              format={dateFormat}
              {...props}
            />
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

export default FormDatePicker;
