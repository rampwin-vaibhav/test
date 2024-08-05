import DropdownWithCustomOption from '../../common/DropdownWithCustomOption';
import { LabelConstants } from '../../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { UserSavedSearch } from '../../../types/models';
import { CloseIcon } from '../../icons';

type SavedSearchDropdownProps = {
  savedSearch: Array<UserSavedSearch>;
  handleSelectSearch: (event: UserSavedSearch) => void;
  handleDeleteSearch: (event: UserSavedSearch) => void;
};

/**
 * This component render dropdown for user saved searches.
 * @returns JSX.Element
 */
const SavedSearchDropdown = ({
  savedSearch = [],
  handleSelectSearch,
  handleDeleteSearch,
}: SavedSearchDropdownProps) => {
  const { t } = useTranslation();

  return (
    <DropdownWithCustomOption
      placeHolderText={t(LabelConstants.SAVED_SEARCH)}
      optionClassName="rtl:left-0 ltr:right-0 md:!mt-2"
      buttonClassName="!border-0 whitespace-nowrap"
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[13rem] flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.SAVED_SEARCH)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {savedSearch.length > 0 ? (
                savedSearch.map((x) => (
                  <li
                    key={x.UserVehicleSearchID}
                    className="text-lg flex items-center justify-between h-8 cursor-pointer px-2 m-0 font-bold"
                  >
                    <span
                      className="w-full text-ellipsis overflow-hidden whitespace-nowrap"
                      onClick={() => {
                        handleSelectSearch(x);
                        close();
                      }}
                      title={x.SearchName}
                    >
                      {x.SearchName}
                    </span>
                    <button
                      className="btn btn-primary btn-sm btn-auto btn-link !text-sm"
                      onClick={() => {
                        handleDeleteSearch(x);
                        close();
                      }}
                    >
                      {t(LabelConstants.DELETE)}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-lg flex items-center justify-between h-8 cursor-pointer px-2 m-0 font-bold">
                  <span className="w-full text-ellipsis overflow-hidden">
                    {t(LabelConstants.NO_RECORDS)}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </DropdownWithCustomOption>
  );
};

export default SavedSearchDropdown;
