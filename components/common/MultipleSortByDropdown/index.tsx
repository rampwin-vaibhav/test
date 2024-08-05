import { useTranslation } from 'next-i18next';
import { useRef, useEffect, useState, ReactElement } from 'react';
import { MultipleSortBy } from '../../../types/constants';
import { MultipleSortByFilter, SortDirection } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import { SortIcon } from '../../icons';

type SortByDropdownProps = {
  /**
   * This method is callback method to get selected item in dropdown.
   */
  onChange: (
    items: Array<{
      key: string;
      value: MultipleSortByFilter;
    }>,
    direction: SortDirection
  ) => void;
  selectedValue: {
    multipleSortBy: Array<MultipleSortByFilter>;
    direction: SortDirection;
  };
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const MultipleSortByDropdown = ({
  onChange,
  selectedValue,
}: SortByDropdownProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [direction, setDirection] = useState<SortDirection>(SortDirection.Asc);
  const [selectedFilter, setSelectedFilter] = useState<
    | Array<{
        key: string;
        value: MultipleSortByFilter;
      }>
    | []
  >([]);

  useEffect(() => {
    if (selectedValue.direction !== direction) {
      setDirection(selectedValue.direction);
    }
  }, [selectedValue.direction, direction]);

  useEffect(() => {
    if (selectedValue.multipleSortBy.length > 0) {
      setSelectedFilter(
        MultipleSortBy.filter(
          (e) => selectedValue.multipleSortBy.indexOf(e.value) !== -1
        )
      );
    }
  }, [selectedValue.multipleSortBy]);

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

  const handleDropDownChange = (x: {
    key: string;
    value: MultipleSortByFilter;
  }) => {
    if (selectedFilter?.find((y) => y.key === x.key)) {
      const filteredItem = selectedFilter.filter((y) => y.key !== x.key);
      onChange(filteredItem, direction);
      setSelectedFilter(filteredItem);
    } else {
      onChange([...selectedFilter!, x], direction);
      setSelectedFilter([...selectedFilter!, x]);
    }
  };
  return (
    <>
      <div className="go-dropdown-label mobile-scroll w-full">
        <div
          className="relative min-w-40 border border-light-gray rounded-full bg-white"
          ref={ref}
        >
          <div className="flex items-center justify-between p-2 gap-2 leading-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                const updatedDirection =
                  direction === SortDirection.Desc
                    ? SortDirection.Asc
                    : SortDirection.Desc;
                onChange(selectedFilter!, updatedDirection);
                setDirection(updatedDirection);
              }}
            >
              <SortIcon />
            </div>
            <button
              type="button"
              className="flex items-center justify-between focus:outline-none w-full leading-4 gap-2"
              onClick={() => setIsDropdownOpen((state) => !state)}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`label selected-label uppercase text-dark-gray1`}
                >
                  {t(LabelConstants.SORT_BY)}
                </span>
                {selectedFilter && selectedFilter.length > 0 && (
                  <span
                    className={`label selected-label font-bold uppercase text-dark-gray2`}
                  >
                    {`${t(selectedFilter[0].key)}`}
                  </span>
                )}
              </span>
              <svg
                className={`w-4 h-4 mt-px ${
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
          </div>

          {isDropdownOpen && (
            <div
              className={`absolute flex flex-col min-w-50 mt-1 shadow-xl bg-white z-10 border border-gray-50 ltr:right-0 rtl:left-0 w-44`}
            >
              <div className="relative p-2">
                <ul className="flex flex-col gap-2">
                  {MultipleSortBy.map((x) => (
                    <li
                      key={x.key}
                      className={`hover:text-primary flex gap-2 hover:font-bold cursor-pointer ${
                        selectedFilter?.find((y) => y.key === x.key)
                          ? 'font-bold text-primary'
                          : ''
                      }`}
                      onClick={() => {
                        handleDropDownChange(x);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="!h-3.5 !w-3.5 cursor-pointer"
                        checked={
                          selectedFilter?.filter((y) => y.key === x.key)
                            .length! > 0
                        }
                        onChange={() => {
                          handleDropDownChange(x);
                        }}
                      />
                      <span>{t(x.key)}</span>
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

export default MultipleSortByDropdown;
