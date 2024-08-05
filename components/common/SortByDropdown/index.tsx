import { useTranslation } from 'next-i18next';
import { useRef, useEffect, useState, ReactElement } from 'react';
import { SortBy } from '../../../types/constants';
import { SortByFilter, SortDirection } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import { SortIcon } from '../../icons';

type SortByDropdownProps = {
  /**
   * This method is callback method to get selected item in dropdown.
   */
  onChange: (
    items: {
      key: string;
      value: SortByFilter;
    },
    direction: SortDirection
  ) => void;
  selectedValue: { sortBy: SortByFilter; direction: SortDirection };
  showEMISort: boolean;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const SortByDropdown = ({
  onChange,
  selectedValue,
  showEMISort,
}: SortByDropdownProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [direction, setDirection] = useState<SortDirection>(SortDirection.Desc);
  const [selectedFilter, setSelectedFilter] = useState<{
    key: string;
    value: SortByFilter;
  }>();

  useEffect(() => {
    if (selectedValue.direction !== direction) {
      setDirection(selectedValue.direction);
    }
  }, [selectedValue.direction, direction]);

  useEffect(() => {
    if (selectedValue.sortBy !== selectedFilter?.value) {
      setSelectedFilter(
        (!showEMISort
          ? SortBy.filter((res) => res.key !== 'MONTHLY_EMI')
          : SortBy
        ).find((x) => x.value === selectedValue.sortBy) || SortBy[0]
      );
    }
  }, [selectedValue.sortBy, selectedFilter?.value, showEMISort]);

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

  if (!selectedFilter) {
    return <></>;
  }

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
                onChange(selectedFilter, updatedDirection);
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
                <span
                  className={`label selected-label font-bold uppercase text-dark-gray2`}
                >
                  {`${t(selectedFilter.key)}`}
                </span>
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
            {direction === SortDirection.Desc && (
              <span className="whitespace-nowrap uppercase">
                {t(LabelConstants.HIGH_TO_LOW)}
              </span>
            )}
            {direction === SortDirection.Asc && (
              <span className="whitespace-nowrap uppercase">
                {t(LabelConstants.LOW_TO_HIGH)}
              </span>
            )}
          </div>

          {isDropdownOpen && (
            <div
              className={`absolute flex flex-col min-w-50 mt-1 shadow-xl bg-white z-10 border border-gray-50 ltr:right-0 rtl:left-0 w-44`}
            >
              <div className="relative p-2">
                <ul className="flex flex-col gap-2">
                  {(!showEMISort
                    ? SortBy.filter((res) => res.key !== 'MONTHLY_EMI')
                    : SortBy
                  ).map((x) => (
                    <li
                      key={x.key}
                      className={`hover:text-primary hover:font-bold cursor-pointer ${
                        x.key === selectedFilter.key
                          ? 'font-bold text-primary'
                          : ''
                      }`}
                      onClick={() => {
                        onChange(x, direction);
                        setSelectedFilter(x);
                      }}
                    >
                      {t(x.key)}
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

export default SortByDropdown;
