import { useTranslation } from 'next-i18next';
import { useRef, useEffect, useState, ReactElement } from 'react';
import { LabelConstants } from '../../../types/i18n.labels';

type ValueOf<T> = T[keyof T];

type DropdownWithLabelProps<T> = {
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
   * This property is use to hide/show search textbox in dropdown box.
   * - Required: No
   * - Default value is - true
   */
  isSearchable?: boolean;

  /**
   * This Property is use to override placeholder text in dropdown.
   * - Required: No
   * - Default value is - "Select"
   */
  placeHolderText?: string;

  /**
   * This Property is use to override placeholder text in search textbox in dropdown box.
   * - Required: No
   * - Default value is - "Search..."
   */
  searchPlaceHolderText?: string;

  /**
   * This Property is use to override text which will use, if search/query result not found in given array.
   * - Required: No
   * - Default value is - "No Result Found"
   */
  queryResultNotFoundText?: string;

  /**
   * This Property is use to override text for clear selected item link.
   * - Required: No
   * - Default value is - "Clear"
   */
  clearText?: string;

  /**
   * This Property is use to control visibility for clear link.
   * - Required: No
   * - Default value is - "true"
   */
  showClearButton?: boolean;

  /**
   * This method is callback method to get selected item in dropdown.
   */
  onChange?: (items?: T) => void;

  /**
   * This Property is use to set label to dropdown
   */
  labelText?: string | undefined;

  /**
   * This Property is use to set selected items.
   */
  selected?: ValueOf<T>;
  optionClass?: string;
  selectedClassName?: string;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const DropdownWithLabel = <T extends unknown>({
  options = [],
  value,
  label,
  isSearchable = true,
  placeHolderText = LabelConstants.SELECT_DROPDOWN_LITERAL,
  searchPlaceHolderText = LabelConstants.SEARCH,
  queryResultNotFoundText = LabelConstants.RESULT_NOT_FOUND,
  clearText = LabelConstants.CLEAR,
  showClearButton = true,
  onChange,
  labelText,
  selected,
  optionClass,
  selectedClassName,
}: DropdownWithLabelProps<T>): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const { t } = useTranslation();

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
  const handleItemChange = (item?: T) => {
    onChange && onChange(item);
    setIsDropdownOpen(false);
  };

  /**
   * This method is use to get selected item's label. If no item is selected then it will return default placeholder text.
   * @returns {string} Selected item's label.
   */
  const getSelectedItemLabel = () => {
    const selectedItem = (options || []).find(
      (x) => String(x[value]).toLowerCase() === String(selected).toLowerCase()
    );
    return selectedItem ? selectedItem[label] : placeHolderText;
  };

  /**
   * This method return list of rendered item for dropdown list after applying a query filter.
   * @returns `@type Array<JSX.Elements> | JSX.Elements`
   */
  const loadOptions = () => {
    const queryResult = (options || []).filter((item: T) => {
      return (
        !query ||
        String(item[label]).toLowerCase().includes(query.toLowerCase())
      );
    });

    if (queryResult && queryResult.length > 0) {
      return queryResult.map((item: T, index: number) => {
        return (
          <span
            key={index}
            className={`dropdown-item ${
              String(item[value]).toLowerCase() ===
              String(selected).toLowerCase()
                ? 'active'
                : ''
            }`}
            onClick={() => handleItemChange(item)}
          >
            {`${item[label]}`}
          </span>
        );
      });
    }

    return (
      <span className="flex items-center h-8 px-2 my-1 mx-1 text-sm rounded-md text-gray-300">
        {t(queryResultNotFoundText)}
      </span>
    );
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
            className="flex items-center justify-between p-2 focus:outline-none w-full leading-4"
            onClick={() => setIsDropdownOpen((state) => !state)}
          >
            <span className="flex items-center gap-2">
              {labelText && (
                <label className="label uppercase text-dark-gray1">
                  {labelText}
                </label>
              )}
              {selected ? (
                <span
                  className={`label selected-label uppercase ${
                    selectedClassName ? selectedClassName : ''
                  }`}
                >{`${getSelectedItemLabel()}`}</span>
              ) : (
                <span className="label placeholder">{`${t(
                  placeHolderText
                )}`}</span>
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
              className={`absolute flex flex-col min-w-50 mt-1 shadow-xl bg-white z-10 border border-gray-50 w-full ltr:right-0 rtl:left-0 ${
                isSearchable ? 'p-2' : ''
              } ${optionClass ? optionClass : ''}`}
            >
              <div className="relative">
                {isSearchable && (
                  <input
                    className="flex items-center h-8 px-3 text-sm border-none bg-gray-100 hover:bg-gray-200 focus:outline-none w-full"
                    type="search"
                    placeholder={t(searchPlaceHolderText)}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                )}

                {selected && showClearButton && (
                  <div className="flex justify-end">
                    <span
                      className="text-xs text-blue-600 underline text-right cursor-pointer m-1"
                      onClick={() => handleItemChange()}
                    >
                      {t(clearText)}
                    </span>
                  </div>
                )}

                <div
                  className={`relative max-h-[180px] overflow-auto ${
                    selected && showClearButton ? 'mt-2' : ''
                  }`}
                >
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

export default DropdownWithLabel;
