import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { DateObject, CalendarProps, Calendar } from 'react-multi-date-picker';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { apiDateFormat } from '../../../../types/constants';

type FormCalendarProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;

  /**
   * This Property is use to hide/show validation error message for calendar field.
   */
  showError?: boolean;

  /**
   * This Property is use to set label to calendar field.
   */
  label?: string;

  /**
   * This Property is use to set min date for calendar control.
   */
  minDate?: string;
} & CalendarProps;

/**
 * It is wrapper of `react-phone-input-2` element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormCalendar = <T extends FieldValues>({
  name,
  control,
  showError = true,
  label,
  minDate,
  ...props
}: FormCalendarProps<T>) => {
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const [noOfMonths, setNoOfMonths] = useState<number>(3);
  const { t } = useTranslation();

  const handleResponsivenessForCalendar = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth >= 901) {
      setNoOfMonths(3);
    }
    if (currentWidth < 901) {
      setNoOfMonths(1);
    }
  };

  useEffect(() => {
    handleResponsivenessForCalendar();
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
            className="w-full flex flex-col gap-[2.5px]"
            ref={dateContainerRef}
          >
            {label && <label htmlFor={name}>{label}</label>}
            <Calendar
              multiple={true}
              numberOfMonths={noOfMonths}
              onChange={(e: Array<DateObject>) => {
                if (e && e.length > 0) {
                  const dates = e.map((x) => {
                    let date = null;
                    if (x) {
                      date = new DateObject(
                        `${x.year}-${x.month.number}-${x.day}`
                      ).format(apiDateFormat);
                    }
                    return date;
                  });
                  field.onChange(dates);
                } else {
                  field.onChange([]);
                }
              }}
              readOnly={false}
              value={field.value}
              className="gogo-date-picker purple"
              {...props}
            />
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

export default FormCalendar;
