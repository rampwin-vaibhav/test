import { useRef, useEffect, useState } from 'react';

type DropdownWithCustomOptionProps<T> = {
  /**
   * This Property is use to override placeholder text in dropdown.
   * - Required: No
   * - Default value is - "Select"
   */
  placeHolderText?: string;

  /**
   * This Property is use to set label to dropdown
   */
  labelText?: string | undefined;

  /**
   * JSX Element/HTML content for custom options container. It is display whenever user clicked on dropdown button.
   */
  children: (obj: { close: () => void }) => JSX.Element;

  optionClassName?: string;

  buttonClassName?: string;

  disabled?: boolean;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const DropdownWithCustomOption = <T extends unknown>({
  placeHolderText = 'Select',
  labelText,
  children,
  optionClassName,
  buttonClassName,
  disabled = false,
}: DropdownWithCustomOptionProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  /**
   * This method is use to close the dropdown menu.
   */
  const close = (): void => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="go-dropdown-custom-option mobile-scroll w-full">
      {labelText && <label className="label pl-3">{labelText}</label>}
      <div className="relative min-w-40" ref={dropdownRef}>
        <button
          className={`flex items-center justify-between h-10 pl-3 pr-2 focus:outline-none w-full disabled:text-dark-gray2 text-primary border border-primary rounded-[5px] ${
            buttonClassName ? buttonClassName : ''
          }`}
          onClick={() => setIsDropdownOpen((state) => !state)}
          disabled={disabled}
          title={placeHolderText.toUpperCase()}
        >
          <span className="text-base font-bold uppercase whitespace-nowrap overflow-hidden text-ellipsis">{`${placeHolderText}`}</span>

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
            className={`dropdown-option ${
              optionClassName ? optionClassName : 'ltr:right-0 rtl:left-0'
            }`}
          >
            <div className="relative">{children({ close })}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownWithCustomOption;
