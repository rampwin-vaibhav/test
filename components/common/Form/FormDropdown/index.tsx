import { useTranslation } from 'next-i18next';
import {
  useRef,
  useEffect,
  useState,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { LabelConstants } from '../../../../types/i18n.labels';

type DropdownWithSearchProps<T, TControl extends FieldValues> = {
  /**
   * Array of items for dropdown options.
   */
  options: Array<T>;

  /**
   * object accessor of array item to identify unique item in array.
   * Example - You can use any Id property which is use to identify item in array.
   */
  valueAccessor: keyof T;

  /**
   * object accessor of array item to display item label in dropdown list.
   */
  labelAccessor: keyof T;

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
   * This Property is use to set label to dropdown.
   */
  labelText?: string | undefined;

  /**
   * This is the name property for form data.
   */
  name: Path<TControl>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<any, any>;

  /**
   * This Property is use to hide/show validation error message for input field.
   */
  showError?: boolean;

  /**
   * It is use to make color picker disabled.
   * - Required: No
   * - Default value is - "false"
   */
  disabled?: boolean;
  /**
   * This Property is use to hide/show clear button in dropdown.
   */
  asOption?: { selectOptionText: string } | boolean;
  /**
   * this prop is use to set custom style class to dropdown.
   */
  className?: string;
  ref?: React.Ref<ReactElement>;
};

export type FormDropdownService = {
  setFocus?: () => void;
};

/**
 * This component render a dropdown list and search textbox, which help user to filter items from the list and allow user to select any item from the list.
 * @returns JSX.Element
 */
// eslint-disable-next-line react/display-name
const FormDropdown = forwardRef<
  FormDropdownService,
  DropdownWithSearchProps<any, FieldValues>
>(
  <T extends any>(
    {
      options = [],
      valueAccessor,
      labelAccessor,
      isSearchable = true,
      showError = true,
      placeHolderText = LabelConstants.SELECT_DROPDOWN_LITERAL,
      searchPlaceHolderText = LabelConstants.SEARCH,
      queryResultNotFoundText = LabelConstants.RESULT_NOT_FOUND,
      clearText = LabelConstants.CLEAR,
      labelText,
      name,
      disabled = false,
      control,
      asOption,
      className,
    }: DropdownWithSearchProps<T, FieldValues>,
    ref: ForwardedRef<FormDropdownService>
  ): ReactElement => {
    useImperativeHandle(ref, () => ({
      setFocus: () => {
        setFocus();
      },
    }));

    const divRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [query, setQuery] = useState('');
    const { t } = useTranslation();

    const setFocus = () => {
      divRef.current?.focus();
      divRef.current?.scrollIntoView();
    };

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [divRef]);

    useEffect(() => {
      isDropdownOpen && setQuery('');
    }, [isDropdownOpen]);

    /**
     * This method will execute whenever user click on any item in the dropdown list, and will manage component state.
     */
    const handleItemChange = (onChange: (...event: T[]) => void, item?: T) => {
      if (onChange && item) {
        onChange(item);
      } else {
        onChange();
      }
      setIsDropdownOpen(false);
    };

    /**
     * This method is use to get selected item's label. If no item is selected then it will return default placeholder text.
     * @returns {string} Selected item's label.
     */
    const getSelectedItemLabel = (selectedValue?: T) => {
      let selectedItem;
      if (selectedValue) {
        selectedItem = (options || []).find(
          (x) => x[valueAccessor] === selectedValue[valueAccessor]
        );
      }
      return selectedItem ? selectedItem[labelAccessor] : placeHolderText;
    };

    /**
     * This method return list of rendered item for dropdown list after applying a query filter.
     * @returns `@type Array<JSX.Elements> | JSX.Elements`
     */
    const loadOptions = (onChange: (...event: T[]) => void) => {
      const queryResult = (options || []).filter((item: T) => {
        return (
          !query ||
          String(item[labelAccessor])
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });

      if (queryResult && queryResult.length > 0) {
        const selected = control._fields[name]?._f.value;
        return queryResult.map((item: T, index: number) => (
          <span
            key={index}
            className={`dropdown-item ${
              selected && item[valueAccessor] === selected[valueAccessor]
                ? 'active'
                : ''
            }`}
            onClick={() => handleItemChange(onChange, item)}
          >
            {`${item[labelAccessor]}`}
          </span>
        ));
      }

      return (
        <span className="flex items-center h-8 px-2 text-sm text-gray-300">
          {t(queryResultNotFoundText)}
        </span>
      );
    };

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
            <div className="go-form-dropdown w-full flex flex-col">
              {labelText && <label className="label">{labelText}</label>}
              <div className={`relative min-w-40`} ref={divRef}>
                <div
                  className={`select-area ${disabled ? '!bg-light-gray' : ''}`}
                  onClick={() =>
                    !disabled && setIsDropdownOpen((state) => !state)
                  }
                  aria-invalid={
                    showError &&
                    (isDirty || isSubmitted) &&
                    !isValid &&
                    (error?.message ? true : false)
                  }
                  aria-describedby={`err-${name}`}
                >
                  {field.value ? (
                    <span className={`leading-5 ${className}`}>
                      {`${getSelectedItemLabel(field.value)}`}
                    </span>
                  ) : (
                    <span
                      className={`leading-5 placeholder ${className}`}
                    >{`${t(placeHolderText)}`}</span>
                  )}

                  <svg
                    className={`w-4 h-4 mt-px ml-2 ${
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
                </div>

                {isDropdownOpen && !asOption && !disabled && (
                  <div className="absolute flex flex-col min-w-50 mt-1 p-2 shadow-xl bg-white z-[101] border border-gray-50 w-full mr-3">
                    <div className="relative">
                      {isSearchable && (
                        <input
                          className="flex items-center h-12 px-3 text-xl border-none bg-gray-100 hover:bg-gray-200 focus:outline-none w-full"
                          type="search"
                          placeholder={t(searchPlaceHolderText)}
                          onChange={(event) => setQuery(event.target.value)}
                          autoFocus
                        />
                      )}

                      {field.value && (
                        <div className="flex justify-end">
                          <span
                            className="text-xs text-blue-600 underline text-right cursor-pointer m-1"
                            onClick={() => handleItemChange(field.onChange)}
                          >
                            {t(clearText)}
                          </span>
                        </div>
                      )}

                      <div className="mt-2 relative max-h-[180px] overflow-auto">
                        {loadOptions(field.onChange)}
                      </div>
                    </div>
                  </div>
                )}
                {isDropdownOpen && asOption && (
                  <div className="absolute flex flex-col min-w-50 mt-1 p-2 shadow-xl bg-white z-10 border border-gray-50 w-full mr-3">
                    <div className="relative">
                      <div className="mt-2 relative max-h-[180px] overflow-auto">
                        {(asOption as { selectOptionText: string })
                          .selectOptionText && (
                          <span
                            className={`dropdown-item ${
                              !field.value ? 'active' : ''
                            }`}
                            onClick={() => handleItemChange(field.onChange)}
                          >
                            {`${
                              (asOption as { selectOptionText: string })
                                .selectOptionText
                            }`}
                          </span>
                        )}
                        {loadOptions(field.onChange)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="error" id={`err-${name}`}>
                {showError && (isDirty || isSubmitted) && error?.message
                  ? t(error?.message)
                  : ''}
              </p>
            </div>
          );
        }}
      />
    );
  }
);

export default FormDropdown;
