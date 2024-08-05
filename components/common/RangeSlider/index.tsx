import { useRouter } from 'next/router';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import { Locales } from '../../../types/enums';
import { Range } from '../../../types/models';

type RangeSliderProps = {
  min: number;
  max: number;
  value?: Range;
  onChange: (range: Range) => void;
  onAfterChange: (range: Range) => void;
  formatLabel?: (value: number) => string;
  step?: number;
  labelClassName?: string;
};

/**
 * This is wrapper component of Slider (`rc-slider`) component.
 * It is use to provide user to select value with in provided range.
 * @returns JSX.Element
 */
const RangeSlider = ({
  min,
  max,
  value,
  labelClassName,
  onChange,
  onAfterChange,
  formatLabel,
  step = 1,
}: RangeSliderProps) => {
  const [distance, setDistance] = useState<Array<number> | number>([min, max]);
  const router = useRouter();
  useEffect(() => {
    if (value) {
      setDistance([value.min, value.max]);
    } else {
      setDistance([min, max]);
    }
  }, [max, min, value]);

  /**
   * This handler method is use to set min and max value and pass it to callback method.
   * @param {number|Array<number>} e - event value od Slider Component.
   */
  const handleOnAfterChange = (e: number | Array<number>) => {
    if (Array.isArray(e)) {
      if (e[1] !== e[0]) onAfterChange({ min: e[0], max: e[1] });
    } else onAfterChange({ min: e, max: e });
  };

  const handleOnChange = (e: number | Array<number>) => {
    if (Array.isArray(e)) {
      if (e[1] !== e[0]) onChange({ min: e[0], max: e[1] });
    } else onChange({ min: e, max: e });
  };

  return (
    <div className="flex flex-col gap-3">
      <Slider
        allowCross={true}
        value={distance}
        min={min}
        max={max}
        draggableTrack={true}
        range={true}
        onChange={handleOnChange}
        onAfterChange={handleOnAfterChange}
        step={step}
        reverse={router.locale == Locales.AR ? true : false}
      />
      <div className="flex flex-row justify-between items-center">
        <label
          className={`text-xs uppercase flex gap-1 !p-0 ${
            labelClassName ? labelClassName : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: formatLabel ? formatLabel(min) : String(min),
          }}
        ></label>
        <label
          className={`text-xs uppercase flex gap-1 !p-0 ${
            labelClassName ? labelClassName : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: formatLabel ? formatLabel(max) : String(max),
          }}
        ></label>
      </div>
    </div>
  );
};

export default RangeSlider;
