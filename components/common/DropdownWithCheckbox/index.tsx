import { useTranslation } from 'next-i18next';
import { useRef, useEffect, useState, ReactElement } from 'react';
import { LabelConstants } from '../../../types/i18n.labels';

type ValueOf<T> = T[keyof T];

type DropdownWithCheckboxProps<T> = {
  /**
   * Array of items for dropdown options.
   */
  options: Array<T>;

  /**
   * object accessor of array item to identify unique item in array.
   * Example - You can use any Id property which is use to identify item in array.
   */
  value: keyof T;

  /**
   * object accessor of array item to display item label in dropdown list.
   */
  label: keyof T;

  /**
   * This Property is use to override placeholder text in dropdown.
   * - Required: No
   * - Default value is - "Select"
   */
  placeHolderText?: string;

  /**
   * This method is callback method to get selected item in dropdown.
   */
  onChange?: (items?: Array<T>) => void;

  /**
   * This Property is use to set label to dropdown
   */
  labelText?: string | undefined;

  /**
   * This Property is use to set selected items.
   */
  selected?: Array<ValueOf<T>>;

  /**
   * This Property is use apply style on option class
   */
  optionClass?: string;

  hasAll?: boolean;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const DropdownWithCheckbox = <T extends unknown>({
  options = [],
  value,
  label,
  placeHolderText = '',
  onChange,
  labelText,
  selected,
  optionClass,
  hasAll = false,
}: DropdownWithCheckboxProps<T>): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    isDropdownOpen && setQuery('');
  }, [isDropdownOpen]);

  /**
   * This method will execute whenever user click on any item in the dropdown list, and will manage component state.
   */
  const handleItemChange = (item: T) => {
    const currentSelected = options.filter((x) => selected?.includes(x[value]));

    if (selected && selected.some((x) => x === item[value])) {
      onChange &&
        onChange(currentSelected.filter((x) => x[value] !== item[value]));
    } else {
      currentSelected.push(item);
      onChange && onChange(currentSelected);
    }
  };

  /**
   * This method will execute whenever user click on any item in the dropdown list, and will manage component state.
   */
  const handleAllItemChange = () => {
    if (selected && selected.length === options.length) {
      onChange && onChange([]);
    } else {
      onChange && onChange(options);
    }
  };

  /**
   * This method return list of rendered item for dropdown list after applying a query filter.
   * @returns `@type Array<JSX.Elements> | JSX.Elements`
   */
  const loadOptions = () => {
    return (options || []).map((item: T, index: number) => {
      const isChecked = selected?.some((x) => x === item[value]);
      return (
        <div key={index} className="flex items-center gap-2 ">
          <div className="w-[25px] flex items-center justify-center">
            <input
              id={`gogo_checkbox_${index}`}
              type="checkbox"
              onChange={() => handleItemChange(item)}
              checked={isChecked || false}
              className="cursor-pointer !w-4 !h-4"
            />
          </div>
          <label
            className="w-full cursor-pointer"
            htmlFor={`gogo_checkbox_${index}`}
          >{`${item[label]}`}</label>
        </div>
      );
    });
  };

  return (
    <>
      <div className="go-dropdown-label mobile-scroll w-full">
        <div
          className="relative min-w-40 border border-light-gray rounded-full bg-white"
          ref={ref}
        >
          <button
            type="button"
            className={`flex items-center justify-between p-2 focus:outline-none w-full`}
            onClick={() => setIsDropdownOpen((state) => !state)}
          >
            <span className="flex items-center gap-2">
              {labelText && (
                <label className="label uppercase">{labelText}</label>
              )}
              {placeHolderText && (
                <span className="label placeholder">{`${placeHolderText}`}</span>
              )}
            </span>

            <svg
              className={`w-4 h-4 mt-px ltr:ml-2 rtl:mr-2 ${
                isDropdownOpen ? 'rotate-180 transform-cpu' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute flex flex-col w-52 mt-1 shadow-xl bg-white z-10 border border-gray-50 ltr:left-0 rtl:right-0 p-2 ${
                optionClass ? optionClass : ''
              }`}
            >
              <div className="relative">
                <div
                  className={`relative max-h-[180px] overflow-auto flex flex-col gap-3`}
                >
                  {hasAll && (
                    <div className="flex items-center gap-2">
                      <div className="w-[25px] flex items-center justify-center">
                        <input
                          id={`gogo_checkbox_all`}
                          type="checkbox"
                          onChange={() => handleAllItemChange()}
                          checked={selected?.length === options.length || false}
                          className="cursor-pointer !w-4 !h-4"
                        />
                      </div>
                      <label className="w-full" htmlFor={`gogo_checkbox_all`}>
                        {t(LabelConstants.ALL)}
                      </label>
                    </div>
                  )}
                  {loadOptions()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropdownWithCheckbox;
