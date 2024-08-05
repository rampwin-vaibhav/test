import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { VehicleService } from '../../helpers/services';
import {
  BodyType,
  City,
  FeatureItem,
  UsedCarFilterMasterData,
  FilterParams,
  Make,
  Model,
  Spec,
  UserSavedSearch,
} from '../../types/models';
import BodyTypeFilter from './BodyTypeFilter';
import MoreFilter from './MoreFilter';
import FeaturesFilter from './FeaturesFilter';
import MakeFilter from './MakeFilter';
import ModelFilter from './ModelFilter';
import RangeFilter from './RangeFilter';
import SpecFilter from './SpecFilter';
import {
  BadgeItem,
  FilterChangeEvent,
  MoreFilterChange,
} from '../../types/events';
import { CloseIcon, SearchIcon } from '../icons';
import { FormInput } from '../common/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FilterType } from '../../types/enums';
import { FilterUtils } from '../../helpers/utilities';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import SavedSearchDropdown from './SavedSearchDropdown';
import CityFilter from './CityFilter';

interface IFormInput {
  searchKey: string;
}

type UsedCarsPageProps = {
  appliedFilter: FilterParams;
  masterData: UsedCarFilterMasterData;
  setAppliedFilter: (value: SetStateAction<FilterParams>) => void;
  setFilteredModels: (value: SetStateAction<Model[]>) => void;
  setFilteredSpecs: (value: SetStateAction<Spec[]>) => void;
  filteredSpecs: Spec[];
  filteredModels: Model[];
  badges: Array<BadgeItem>;
  showNotifyMe: boolean;
  showSaveSearch?: boolean;
  showSaveSearchLink: boolean;
  showSearchArea?: boolean;
  savedSearch?: Array<UserSavedSearch>;
  handleNotifyMe?: () => void;
  handleApplySavedSearch?: (event: UserSavedSearch) => void;
  handleDeleteSavedSearch?: (event: UserSavedSearch) => void;
  handleSaveSearch?: () => void;
  showEMIRange?: boolean;
  showSelfListedCheckBox: boolean;
};

const Filters = ({
  appliedFilter,
  masterData,
  setAppliedFilter,
  setFilteredModels,
  setFilteredSpecs,
  filteredSpecs,
  filteredModels,
  savedSearch = [],
  badges = [],
  showNotifyMe = false,
  showSaveSearch = false,
  showSaveSearchLink,
  showSearchArea = true,
  showEMIRange,
  handleNotifyMe,
  handleApplySavedSearch,
  handleDeleteSavedSearch,
  handleSaveSearch,
  showSelfListedCheckBox,
}: UsedCarsPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<IFormInput>({
      defaultValues: { searchKey: appliedFilter.searchKey || '' },
    });
  const [showFilters, setShowFilters] = useState(false);
  const [filterTags, setFilterTags] = useState<BadgeItem[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (appliedFilter.searchKey !== getValues('searchKey')) {
      setValue('searchKey', appliedFilter.searchKey || '');
    }
  }, [appliedFilter.searchKey, getValues, setValue]);

  useEffect(() => {
    /**
     * Filtered duplicate Spec from badges
     */
    const tags = badges.reduce(function (a, c) {
      if (
        (c.type !== FilterType.Spec && c.type !== FilterType.Model) ||
        (c.type === FilterType.Spec &&
          a.findIndex(
            (x) =>
              x.type === FilterType.Spec &&
              (c.value as Spec).TrimKey === (x.value as Spec).TrimKey
          ) === -1) ||
        (c.type === FilterType.Model &&
          a.findIndex(
            (x) =>
              x.type === FilterType.Model &&
              (c.value as Model).ModelKey === (x.value as Model).ModelKey
          ) === -1)
      ) {
        a.push(c);
      }
      return a;
    }, [] as Array<BadgeItem>);
    setFilterTags(tags);
  }, [badges]);

  const handleMakeChange = async ({
    item,
    list,
    isSelected,
  }: FilterChangeEvent<Make>) => {
    const newAppliedFilters = { ...appliedFilter };
    if (item) {
      if (isSelected) {
        const models = await VehicleService.fetchModelByMake(
          item.MakeCode,
          router.locale!
        );
        newAppliedFilters.makes = list.map((x) => x.Make);

        // combine
        setFilteredModels([...filteredModels, ...models]);
      } else {
        // filter models
        const updatedModels = filteredModels.filter((x) =>
          list.some((y) => y.MakeCode === x.MakeCode)
        );
        // filter specs
        const updatedSpecs = filteredSpecs.filter((x) =>
          list.some((y) => y.MakeCode === x.MakeCode)
        );

        newAppliedFilters.makes = list.map((x) => x.Make);
        newAppliedFilters.models =
          newAppliedFilters.models?.filter((x) =>
            updatedModels.some((y) => y.Model.toLowerCase() === x.toLowerCase())
          ) || [];
        newAppliedFilters.specs =
          newAppliedFilters.specs?.filter((x) =>
            updatedSpecs.some((y) => y.Trim.toLowerCase() === x.toLowerCase())
          ) || [];
        setFilteredModels([...updatedModels]);
        setFilteredSpecs([...updatedSpecs]);
      }
    } else {
      if (list && list.length > 0) {
        // find models for selected makes...
        const data = await Promise.all(
          list.map((x) =>
            VehicleService.fetchModelByMake(x.MakeCode, router.locale)
          )
        );
        newAppliedFilters.makes = list.map((x) => x.Make);
        setFilteredModels(data.flat());
      }
    }

    setAppliedFilter({ ...newAppliedFilters, searchKey: '', page: 1 });
    reset({ searchKey: '' });
  };

  const handleModelChange = async ({
    item,
    list,
    isSelected,
  }: FilterChangeEvent<Model>) => {
    const newAppliedFilters = { ...appliedFilter };
    if (item) {
      if (isSelected) {
        // handle multiple model selection with same model like, MAZDA and MG both have same model 6.
        const data = await Promise.all(
          filteredModels
            .filter((x) => x.Model === item.Model)
            .map((x) =>
              VehicleService.fetchVehicleSpecs(x.MakeCode, x.ModelCode)
            )
        );
        const specs = data.flat();
        newAppliedFilters.models = list.map((x) => x.Model);

        // combine
        let availableSpecs = [...filteredSpecs, ...specs];
        availableSpecs = availableSpecs.filter(
          (ele, ind) =>
            ind ===
            availableSpecs.findIndex((elem) => elem.TrimCode === ele.TrimCode)
        );
        setFilteredSpecs([...availableSpecs]);
      } else {
        // filter specs
        const updatedSpecs = filteredSpecs.filter((x) =>
          list.some((y) => y.ModelCode === x.ModelCode)
        );
        newAppliedFilters.models = list.map((x) => x.Model);
        newAppliedFilters.specs =
          newAppliedFilters.specs?.filter((x) =>
            updatedSpecs.some((y) => y.Trim.toLowerCase() === x.toLowerCase())
          ) || [];
        setFilteredSpecs([...updatedSpecs]);
      }
    } else {
      if (list && list.length > 0) {
        // find specs/trims for selected models...
        const data = await Promise.all(
          list.map((x) =>
            VehicleService.fetchVehicleSpecs(x.MakeCode, x.ModelCode)
          )
        );
        newAppliedFilters.models = list.map((x) => x.Model);
        setFilteredSpecs(data.flat());
      }
    }

    setAppliedFilter({ ...newAppliedFilters, searchKey: '', page: 1 });
    reset({ searchKey: '' });
  };

  const handleSpecChange = async ({ list }: FilterChangeEvent<Spec>) => {
    setAppliedFilter({
      ...appliedFilter,
      searchKey: '',
      specs: list.map((x) => x.Trim),
      page: 1,
    });
    reset({ searchKey: '' });
  };

  const handleBodyTypeChange = ({ list }: FilterChangeEvent<BodyType>) => {
    setAppliedFilter({
      ...appliedFilter,
      bodyTypes: list.map((x) => x.BodyTypeKey),
      page: 1,
    });
  };

  const handleFeatureChange = ({ list }: FilterChangeEvent<FeatureItem>) => {
    setAppliedFilter({
      ...appliedFilter,
      features: list.map((x) => x.FeatureKey),
      page: 1,
    });
  };

  const handleCityChange = ({ list }: FilterChangeEvent<City>) => {
    setAppliedFilter({
      ...appliedFilter,
      cities: list.map((x) => x.CityKey),
      page: 1,
    });
  };

  const handleMoreFilterChange = async (event: MoreFilterChange) => {
    let filter = { ...appliedFilter, page: 1 };
    if (event.FuelType) {
      filter = {
        ...filter,
        fuelTypes: event.FuelType.list.map((x) => x.FuelTypeKey),
      };
    }
    if (event.Ownership) {
      filter = {
        ...filter,
        ownership: event.Ownership.list.map((x) => x.OwnershipKey),
      };
    }
    if (event.Transmission) {
      filter = {
        ...filter,
        transmission: event.Transmission.list.map((x) => x.TransmissionKey),
      };
    }
    if (event.ExteriorColor) {
      filter = {
        ...filter,
        exteriorColor: event.ExteriorColor.list.map((x) => x.ColorKey),
      };
    }
    if (event.InteriorColor) {
      filter = {
        ...filter,
        interiorColor: event.InteriorColor.list.map((x) => x.ColorKey),
      };
    }
    setAppliedFilter(filter);
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({
    searchKey,
  }: IFormInput) => {
    if (searchKey) {
      setAppliedFilter({
        ...appliedFilter,
        makes: [],
        models: [],
        specs: [],
        page: 1,
        searchKey,
      });
    } else {
      setAppliedFilter({
        ...appliedFilter,
        page: 1,
        searchKey,
      });
    }
  };

  const clearFilter = () => {
    const { size, sortBy, sortDir, type, multipleSortBy } = appliedFilter;
    setAppliedFilter({
      page: 1,
      size,
      sortBy,
      sortDir,
      type,
      mileageRange: {
        min: masterData.vehicleMetaData.MinVehicleMileage,
        max: masterData.vehicleMetaData.MaxVehicleMileage,
      },
      priceRange: {
        min: masterData.vehicleMetaData.MinVehiclePrice,
        max: masterData.vehicleMetaData.MaxVehiclePrice,
      },
      yearRange: {
        min: masterData.vehicleMetaData.Years[
          masterData.vehicleMetaData.Years.length - 1
        ],
        max: masterData.vehicleMetaData.Years[0],
      },
      emiRange: {
        min: masterData.vehicleMetaData.MinMonthlyEMI,
        max: masterData.vehicleMetaData.MaxMonthlyEMI,
      },
      multipleSortBy,
    });
    setFilteredModels([]);
    setFilteredSpecs([]);
  };

  const handleBadgeClear = (event: BadgeItem) => {
    if (
      [
        FilterType.Make,
        FilterType.Model,
        FilterType.Spec,
        FilterType.SearchKey,
      ].includes(event.type)
    ) {
      switch (event.type) {
        case FilterType.Make:
          handleMakeChange(
            FilterUtils.handleChangeForMultiSelectProps(
              event.value as Make,
              masterData.makes,
              'makes',
              'Make',
              appliedFilter
            )
          );
          break;
        case FilterType.Model:
          handleModelChange(
            FilterUtils.handleChangeForMultiSelectProps(
              event.value as Model,
              filteredModels,
              'models',
              'Model',
              appliedFilter
            )
          );
          break;
        case FilterType.Spec:
          handleSpecChange(
            FilterUtils.handleChangeForMultiSelectProps(
              event.value as Spec,
              filteredSpecs,
              'specs',
              'Trim',
              appliedFilter
            )
          );
          break;
        case FilterType.SearchKey:
          setAppliedFilter({ ...appliedFilter, page: 1, searchKey: undefined });
          setValue('searchKey', '');
          break;
        default:
          break;
      }
    } else {
      const newFilter = FilterUtils.getAppliedFilterByBadgeItem(
        event,
        appliedFilter,
        masterData
      );
      setAppliedFilter({ ...newFilter });
    }
  };

  const loadBadges = () => {
    return (
      <>
        {filterTags.map((x, i) => (
          <div key={i} className="badge-item">
            <label className="font-bold whitespace-nowrap overflow-ellipsis max-w-[10rem] overflow-hidden">
              {x.displayValue}
            </label>
            <div className="close-icon" onClick={() => handleBadgeClear(x)}>
              <CloseIcon className="w-full h-full" />
            </div>
          </div>
        ))}
        {filterTags.length > 0 && !showNotifyMe && showSaveSearchLink && (
          <button
            className="btn btn-primary btn-sm btn-link btn-auto"
            onClick={handleSaveSearch}
          >
            {t(LabelConstants.SAVE_SEARCH)}
          </button>
        )}
        {filterTags.length > 0 && (
          <button
            className="btn btn-primary btn-sm btn-link btn-auto"
            onClick={clearFilter}
          >
            {t(LabelConstants.CLEAR_FILTER)}
          </button>
        )}
        {showNotifyMe && handleNotifyMe && (
          <button
            className="btn btn-primary btn-sm btn-link btn-auto"
            onClick={() => handleNotifyMe()}
          >
            {t(LabelConstants.NOTIFY_ME)}
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <div className="gogo-search-filter">
        {showSearchArea && (
          // Handle badges on bookmark and listing/used-cars page.
          <>
            <div className="search-bar-container-wrapper items-center">
              <div className="w-[0.8906rem]">
                <SearchIcon className="w-full text-dark-gray2" />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-[0.5625rem]"
              >
                <FormInput
                  control={control}
                  name="searchKey"
                  placeholder={t(LabelConstants.SEARCH_BOX_PLACEHOLDER)}
                  className="border-none px-0 !text-base"
                />
              </form>
              {showSaveSearch &&
                handleApplySavedSearch &&
                handleDeleteSavedSearch && (
                  <div className="border-light-gray ltr:border-l rtl:border-r">
                    <SavedSearchDropdown
                      savedSearch={savedSearch}
                      handleSelectSearch={handleApplySavedSearch}
                      handleDeleteSearch={handleDeleteSavedSearch}
                    />
                  </div>
                )}
              {filterTags.length > 0 && (
                <div className="filter-area-wrapper">
                  <div className="flex gap-2 items-center">
                    {!showFilters &&
                      filterTags.slice(0, 3).map((x, i) => (
                        <div key={i} className="badge-item">
                          <label className="font-bold whitespace-nowrap overflow-ellipsis max-w-[10rem] overflow-hidden">
                            {x.displayValue}
                          </label>
                          <div
                            className="close-icon"
                            onClick={() => handleBadgeClear(x)}
                          >
                            <CloseIcon className="w-full h-full" />
                          </div>
                        </div>
                      ))}
                    {!showNotifyMe && !showFilters && showSaveSearchLink && (
                      <button
                        className="btn btn-primary btn-sm btn-link btn-auto"
                        onClick={handleSaveSearch}
                      >
                        {t(LabelConstants.SAVE_SEARCH)}
                      </button>
                    )}
                    {filterTags.length > 3 && !showFilters && (
                      <button
                        className="btn btn-secondary uppercase btn-sm font-bold btn-auto"
                        onClick={() => setShowFilters(true)}
                      >{`(+${filterTags.length - 3}) ${t(
                        LabelConstants.MORE
                      )}`}</button>
                    )}
                    {showFilters && (
                      <button
                        className="btn btn-secondary uppercase btn-sm font-bold btn-auto"
                        onClick={() => setShowFilters(false)}
                      >
                        {t(LabelConstants.HIDE)}
                      </button>
                    )}
                    {showNotifyMe && !showFilters && handleNotifyMe && (
                      <button
                        className="btn btn-primary uppercase btn-sm font-bold btn-auto"
                        onClick={() => handleNotifyMe()}
                      >
                        {t(LabelConstants.NOTIFY_ME)}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            {(filterTags.length > 0 || showNotifyMe) && showFilters && (
              <div className="hidden md:flex flex-wrap gap-2 items-center">
                {loadBadges()}
              </div>
            )}
            <div className="flex md:hidden flex-wrap gap-2 items-center">
              {loadBadges()}
            </div>
          </>
        )}

        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 w-full gap-3">
          <MakeFilter
            makes={masterData.makes}
            appliedFilter={appliedFilter}
            onChange={handleMakeChange}
          />

          <ModelFilter
            models={filteredModels}
            appliedFilter={appliedFilter}
            onChange={handleModelChange}
          />

          <SpecFilter
            specs={filteredSpecs}
            appliedFilter={appliedFilter}
            onChange={handleSpecChange}
          />

          <BodyTypeFilter
            bodyTypes={masterData.bodyTypes}
            onChange={handleBodyTypeChange}
            appliedFilter={appliedFilter}
          />

          <RangeFilter
            vehicleMetaData={masterData.vehicleMetaData}
            onChange={(customFilter) => {
              setAppliedFilter({
                ...appliedFilter,
                mileageRange: customFilter.mileage,
                priceRange: customFilter.price,
                yearRange: customFilter.year,
                emiRange: customFilter.emi,
                page: 1,
              });
            }}
            appliedFilter={appliedFilter}
            showEMIRange={showEMIRange}
          />

          <FeaturesFilter
            features={masterData.vehicleMetaData.Features || []}
            onChange={handleFeatureChange}
            appliedFilter={appliedFilter}
          />

          <CityFilter
            cities={masterData.cities}
            onChange={handleCityChange}
            appliedFilter={appliedFilter}
          />

          <MoreFilter
            masterData={masterData}
            onChange={(value: MoreFilterChange) =>
              handleMoreFilterChange(value)
            }
            appliedFilter={appliedFilter}
          />
        </div>

        {!showSearchArea && (
          // Handle badges on dashboard page.
          <div className="flex flex-wrap gap-2 items-center">
            {loadBadges()}
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;
