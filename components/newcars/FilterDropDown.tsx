import { useTranslation } from 'next-i18next';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { LabelConstants } from '../../types/i18n.labels';

type FilterDropDownProps<T> = {
  onChange: (items: T | null) => void;
  selectedValue: T | null | undefined;
  optionValues: Array<T>;
  label: keyof T;
  value: keyof T | string;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const FilterDropDown = <T extends unknown>({
  onChange,
  selectedValue,
  optionValues,
  label,
  value,
}: FilterDropDownProps<T>): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  const isSelected = (obj: T): boolean => {
    let result = false;
    if (selectedValue && value) {
      const keys = String(value).split(',');
      for (let i = 0; i < keys.length; i++) {
        result = obj[keys[i] as keyof T] === selectedValue[keys[i] as keyof T];
        if (!result) {
          break;
        }
      }
    }
    return result;
  };

  return (
    <>
      <div className="go-dropdown-label mobile-scroll w-full">
        <div className="relative min-w-40 rounded-full" ref={ref}>
          <div className="flex justify-between leading-4">
            <button
              type="button"
              className="flex items-center focus:outline-none w-full leading-4 gap-2"
              onClick={() => setIsDropdownOpen((state) => !state)}
            >
              <span className="flex gap-2 w-[90%]">
                <span
                  className={`label selected-label text-[14px] text-dark-gray2  overflow-hidden overflow-ellipsis whitespace-nowrap`}
                >
                  {selectedValue
                    ? String(selectedValue[label as keyof T])
                    : t(LabelConstants.ALL)}
                </span>
              </span>
              <svg
                viewBox="0 0 18 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 ${
                  isDropdownOpen ? 'rotate-180 transform-cpu' : ''
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.07749 0.264295L2.19614 0.366727L8.99996 7.17019L15.7917 0.378852C16.2512 -0.0806884 16.9696 -0.122001 17.4764 0.254001L17.4903 0.264295L17.6089 0.366731L17.621 0.378852C18.0806 0.838394 18.1219 1.55683 17.7459 2.06359L17.7356 2.07746L17.6332 2.19612L9.91466 9.91463C9.45512 10.3742 8.73668 10.4155 8.22992 10.0395L8.21605 10.0292L8.09739 9.92675L0.378879 2.20824C-0.126293 1.70307 -0.126293 0.884024 0.378879 0.378852C0.838419 -0.0806884 1.55686 -0.122001 2.06361 0.254001L2.07749 0.264295Z"
                  fill="#43474D"
                />
              </svg>
            </button>
          </div>

          {isDropdownOpen && (
            <div
              className={`absolute flex flex-col overflow-y-auto max-h-[200px] min-w-full mt-1 shadow-xl bg-white z-10 border border-gray-50 ltr:left-0 rtl:right-0 w-44`}
            >
              <div className="relative p-2">
                <ul className="flex flex-col text-[1rem] gap-2">
                  <li
                    onClick={() => {
                      onChange(null);
                      setIsDropdownOpen(false);
                    }}
                    className={`hover:text-primary hover:font-bold cursor-pointer ${
                      selectedValue ? '' : 'font-bold text-primary'
                    }`}
                  >
                    {t(LabelConstants.ALL)}
                  </li>
                  {optionValues.map((x, i) => (
                    <li
                      key={i}
                      className={`hover:text-primary hover:font-bold cursor-pointer ${
                        isSelected(x) ? 'font-bold text-primary' : ''
                      }`}
                      onClick={() => {
                        onChange(x);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {String(x[label as keyof T])}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterDropDown;
