import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react';
import { ExpandFilledArrowIcon } from '../../icons';

export type HeaderDropdownMenuService = {
  /**
   * This Property is use to set label to dropdown
   */
  closeDropdown: () => void;
};

type HeaderDropdownMenuProps = {
  /**
   * This Property is use to set label to dropdown
   */
  label?: string | undefined;

  /**
   * JSX Element/HTML content for custom options container. It is display whenever user clicked on dropdown button.
   */
  children: (obj: { close: () => void }) => JSX.Element;

  setLabelButton?: () => JSX.Element;
  className?: string;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
const HeaderDropdownMenu = forwardRef<
  HeaderDropdownMenuService,
  HeaderDropdownMenuProps
>(
  (
    { label, children, setLabelButton, className }: HeaderDropdownMenuProps,
    ref: ForwardedRef<HeaderDropdownMenuService>
  ) => {
    useImperativeHandle(ref, () => ({
      closeDropdown: () => {
        setIsDropdownOpen(false);
      },
    }));

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
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
      <>
        <div className="header-dropdown mobile-scroll w-full">
          <div className="relative min-w-40" ref={dropdownRef}>
            <button
              className={`flex items-center justify-between h-8 gap-[0.3125rem] w-full border-none ${
                className ? className : ''
              }`}
              onClick={() => setIsDropdownOpen((state) => !state)}
            >
              {setLabelButton ? (
                <>{setLabelButton()}</>
              ) : (
                <>
                  {label && (
                    <span className="uppercase rtl:pt-[0.25rem]">{`${label}`}</span>
                  )}
                  <ExpandFilledArrowIcon className="w-3 text-white" />
                </>
              )}
            </button>

            {isDropdownOpen && (
              <div className="menu absolute flex flex-col min-w-150 mt-3 shadow-xl rounded bg-white z-10 w-auto ltr:right-0 rtl:left-0">
                <div className="relative my-2">{children({ close })}</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

HeaderDropdownMenu.displayName = 'HeaderDropdownMenu';

export default HeaderDropdownMenu;
