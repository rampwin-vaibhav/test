import {
  BadgeItem,
  FilterChangeEvent,
  FilterQueryStringAndParams,
} from '../../types/events';
import {
  BodyType,
  City,
  Color,
  FeatureItem,
  UsedCarFilterMasterData,
  FilterParams,
  FuelType,
  Make,
  Model,
  MyVehicleSearchRequestPayload,
  Ownership,
  Range,
  SearchRequestPayload,
  Spec,
  Transmission,
  UsedCarUserSearch,
  UserSavedSearch,
  VehicleListingStatusItem,
} from '../../types/models';
import { ListingService, VehicleService } from '../services';
import { CommonUtils } from './common.utils';
import { PageSizes, UserPreference } from '../../types/constants';
import {
  FilterType,
  Locales,
  SortByFilter,
  SortDirection,
  VehicleAgeType,
} from '../../types/enums';
import formatNumber from './numberFormat.utils';

export class FilterUtils {
  /**
   * This utility method is preparing a search payload for vehicle listing.
   * @param {FilterParams} data - This param contains filter criteria, which will used to create search request payload.
   * @param {UsedCarFilterMasterData} filteredData - This param has filter master data which will use to map Item's Key to its value/id.
   * @returns - It returns Object of search request payload and query string for that filter.
   */
  static getSearchParams = async (
    data: FilterParams,
    filteredData?: UsedCarFilterMasterData,
    useSlug: boolean = true,
    compareVehicleIds: Array<string> = []
  ): Promise<{
    searchPayload: SearchRequestPayload;
    queryString: string;
    badges: Array<BadgeItem>;
    searchObj: UsedCarUserSearch;
    filteredData: UsedCarFilterMasterData;
  }> => {
    const searchObj: UsedCarUserSearch = {
      BodyTypeId: [],
      CityId: [],
      TransmissionId: [],
      FuelTypeId: [],
      OwnershipId: [],
      ManufactureYearId: [],
      VehicleMakeId: [],
      VehicleModelId: [],
      SpecId: [],
      InteriorColorId: [],
      ExteriorColorId: [],
      VehicleFeatureCSV: [],
      AskingPriceRange: {
        MinBudget: null,
        MaxBudget: null,
      },
      MileageRange: {
        MinValue: null,
        MaxValue: null,
      },
      EMIRange: {
        MinEMI: null,
        MaxEMI: null,
      },
    };
    const term: Array<string> = [];
    const range: Array<string> = [];
    const csv: Array<string> = [];
    let queryString: Array<string> = [];
    let wildcard: string = '';
    let isMultiSelected = false;
    let filterQueryString: FilterParams = CommonUtils.omit<FilterParams>(data, [
      'locale',
      'page',
      'size',
      'searchKey',
      'sortBy',
      'sortDir',
    ]);
    let slugURI = '';
    const badges: Array<BadgeItem> = [];

    // load master data for filter
    if (!filteredData) {
      filteredData = await this.loadFilterMasterData(
        data.locale!,
        data.makes,
        data.models
      );
    }

    /**
     * Prepare Search Terms for makes, models and specs. And create URI Params (slug params) like -> `/{_make_}-{_model_}/{_spec_}`.
     */
    // prepare make filter
    if (filteredData.makes && data.makes && data.makes.length > 0) {
      const makeObjs = filteredData.makes.filter((x) => {
        const result = data.makes?.some(
          (y) => y.toLowerCase() === x.Make.toLowerCase()
        );
        if (result)
          badges.push({
            type: FilterType.Make,
            value: x,
            displayValue: x.Make,
          });
        return result;
      });
      if (makeObjs && makeObjs.length > 0) {
        isMultiSelected = isMultiSelected || makeObjs.length > 1;
        term.push(`VehicleMakeId=${makeObjs.map((x) => x.MakeCode).join(',')}`);
        searchObj.VehicleMakeId = makeObjs.map((x) => x.MakeCode);
        if (useSlug) slugURI = `/${makeObjs[0].MakeKey.toLocaleLowerCase()}`;
        else
          queryString.push(
            `make=${encodeURIComponent(
              makeObjs[0].MakeKey.toLocaleLowerCase()
            )}`
          );
      }

      // prepare model filter
      if (filteredData.models && data.models && data.models.length > 0) {
        const modelObjs = filteredData.models.filter((x) => {
          const result = data.models?.some(
            (y) => y.toLowerCase() === x.Model.toLowerCase()
          );
          result &&
            badges.push({
              type: FilterType.Model,
              value: x,
              displayValue: x.Model,
            });
          return result;
        });
        if (modelObjs && modelObjs.length > 0) {
          isMultiSelected = isMultiSelected || modelObjs.length > 1;
          term.push(
            `VehicleModelId=${modelObjs.map((x) => x.ModelCode).join(',')}`
          );
          searchObj.VehicleModelId = modelObjs.map((x) => x.ModelCode);
          if (useSlug)
            slugURI = `${slugURI}-${modelObjs[0].ModelKey.toLocaleLowerCase()}`;
          else
            queryString.push(
              `model=${encodeURIComponent(
                modelObjs[0].ModelKey.toLocaleLowerCase()
              )}`
            );
        }

        // prepare spec filter
        if (filteredData.specs && data.specs && data.specs.length > 0) {
          const specObjs = filteredData.specs.filter((x) => {
            const result = data.specs?.some(
              (y) => y.toLowerCase() === x.Trim.toLowerCase()
            );
            result &&
              badges.push({
                type: FilterType.Spec,
                value: x,
                displayValue: x.Trim,
              });
            return result;
          });

          if (specObjs && specObjs.length > 0) {
            isMultiSelected = isMultiSelected || specObjs.length > 1;
            term.push(`SpecId=${specObjs.map((x) => x.TrimCode).join(',')}`);
            searchObj.SpecId = specObjs.map((x) => x.TrimCode);
            if (useSlug)
              slugURI = `${slugURI}/${specObjs[0].TrimKey.toLocaleLowerCase()}`;
            else
              queryString.push(
                `spec=${encodeURIComponent(
                  specObjs[0].TrimKey.toLocaleLowerCase()
                )}`
              );
          }
        }
      }
      //prepare slug url
      if (isMultiSelected || !useSlug) {
        slugURI = '';
      } else {
        filterQueryString = {
          ...filterQueryString,
          models: [],
          makes: [],
          specs: [],
        };
      }
    }

    /**
     * Prepare Search Filter for other multi-selectable fields.
     */
    const [
      cityFilter,
      typeFilter,
      fuelTypeFilter,
      ownershipFilter,
      transmissionFilter,
      exteriorColorFilter,
      interiorColorFilter,
      featuresFilter,
    ] = await Promise.all([
      this.getFilterPayloadData<City, string>(
        filteredData.cities,
        data.cities,
        'CityKey',
        'CityId',
        FilterType.City,
        'City'
      ),
      this.getFilterPayloadData<BodyType, string>(
        filteredData.bodyTypes,
        data.bodyTypes,
        'BodyTypeKey',
        'BodyTypeId',
        FilterType.BodyType,
        'BodyType'
      ),
      this.getFilterPayloadData<FuelType, string>(
        filteredData.fuelTypes,
        data.fuelTypes,
        'FuelTypeKey',
        'FuelTypeId',
        FilterType.FuelType,
        'FuelType'
      ),
      this.getFilterPayloadData<Ownership, string>(
        filteredData.vehicleMetaData.Ownerships,
        data.ownership,
        'OwnershipKey',
        'OwnershipId',
        FilterType.Ownership,
        'Ownership'
      ),
      this.getFilterPayloadData<Transmission, string>(
        filteredData.vehicleMetaData.Transmissions,
        data.transmission,
        'TransmissionKey',
        'TransmissionId',
        FilterType.Transmission,
        'Transmission'
      ),
      this.getFilterPayloadData<Color, string>(
        filteredData.vehicleMetaData.ExteriorColors,
        data.exteriorColor,
        'ColorKey',
        'ColorId',
        FilterType.ExteriorColor,
        'Color'
      ),
      this.getFilterPayloadData<Color, string>(
        filteredData.vehicleMetaData.InteriorColors,
        data.interiorColor,
        'ColorKey',
        'ColorId',
        FilterType.InteriorColor,
        'Color'
      ),
      this.getFilterPayloadData<FeatureItem, string>(
        filteredData.vehicleMetaData.Features.flatMap(
          (x) => x.FeatureList || []
        ),
        data.features,
        'FeatureKey',
        'FeatureId',
        FilterType.Feature,
        'Feature'
      ),
    ]);

    if (cityFilter) {
      isMultiSelected = isMultiSelected || cityFilter.isMultiSelected;
      term.push(`CityId=${cityFilter.value}`);
      searchObj.CityId = cityFilter.searchParam;
      cityFilter.query && queryString.push(`city=${cityFilter.query}`);
      badges.push(...cityFilter.badges);
    }
    if (typeFilter) {
      isMultiSelected = isMultiSelected || typeFilter.isMultiSelected;
      term.push(`BodyTypeId=${typeFilter.value}`);
      searchObj.BodyTypeId = typeFilter.searchParam;
      typeFilter.query && queryString.push(`bodytype=${typeFilter.query}`);
      badges.push(...typeFilter.badges);
    }
    if (fuelTypeFilter) {
      isMultiSelected = isMultiSelected || fuelTypeFilter.isMultiSelected;
      term.push(`FuelTypeId=${fuelTypeFilter.value}`);
      searchObj.FuelTypeId = fuelTypeFilter.searchParam;
      fuelTypeFilter.query &&
        queryString.push(`fueltype=${fuelTypeFilter.query}`);
      badges.push(...fuelTypeFilter.badges);
    }
    if (ownershipFilter) {
      isMultiSelected = isMultiSelected || ownershipFilter.isMultiSelected;
      term.push(`OwnershipId=${ownershipFilter.value}`);
      searchObj.OwnershipId = ownershipFilter.searchParam;
      ownershipFilter.query &&
        queryString.push(`ownership=${ownershipFilter.query}`);
      badges.push(...ownershipFilter.badges);
    }
    if (transmissionFilter) {
      isMultiSelected = isMultiSelected || transmissionFilter.isMultiSelected;
      term.push(`TransmissionId=${transmissionFilter.value}`);
      searchObj.TransmissionId = transmissionFilter.searchParam;
      transmissionFilter.query &&
        queryString.push(`transmission=${transmissionFilter.query}`);
      badges.push(...transmissionFilter.badges);
    }
    if (exteriorColorFilter) {
      isMultiSelected = isMultiSelected || exteriorColorFilter.isMultiSelected;
      term.push(`ExteriorColorId=${exteriorColorFilter.value}`);
      searchObj.ExteriorColorId = exteriorColorFilter.searchParam;
      exteriorColorFilter.query &&
        queryString.push(`color=${exteriorColorFilter.query}`);
      badges.push(...exteriorColorFilter.badges);
    }
    if (interiorColorFilter) {
      isMultiSelected = isMultiSelected || interiorColorFilter.isMultiSelected;
      term.push(`InteriorColorId=${interiorColorFilter.value}`);
      searchObj.InteriorColorId = interiorColorFilter.searchParam;
      interiorColorFilter.query &&
        queryString.push(`interiorColor=${interiorColorFilter.query}`);
      badges.push(...interiorColorFilter.badges);
    }
    if (featuresFilter) {
      isMultiSelected = isMultiSelected || featuresFilter.isMultiSelected;
      csv.push(`VehicleFeatureCsv=${featuresFilter.value}`);
      searchObj.VehicleFeatureCSV = featuresFilter.searchParam;
      featuresFilter.query &&
        queryString.push(`feature=${featuresFilter.query}`);
      badges.push(...featuresFilter.badges);
    }

    /**
     * prepare range filter
     */
    // prepare mileage filter
    if (filteredData.vehicleMetaData && data.mileageRange) {
      if (
        data.mileageRange.min !==
          filteredData.vehicleMetaData.MinVehicleMileage ||
        data.mileageRange.max !== filteredData.vehicleMetaData.MaxVehicleMileage
      ) {
        range.push(`Mileage=${data.mileageRange.min},${data.mileageRange.max}`);
        queryString.push(
          `mileage=${encodeURIComponent(
            `${encodeURIComponent(data.mileageRange.min)},${encodeURIComponent(
              data.mileageRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.Mileage,
          value: data.mileageRange,
          displayValue: `${formatNumber(
            data.mileageRange.min
          )} - ${formatNumber(data.mileageRange.max)}`,
        });
        searchObj.MileageRange = {
          MinValue: data.mileageRange.min,
          MaxValue: data.mileageRange.max,
        };
      }
    }

    // prepare price filter
    if (filteredData.vehicleMetaData && data.priceRange) {
      if (
        data.priceRange.min !== filteredData.vehicleMetaData.MinVehiclePrice ||
        data.priceRange.max !== filteredData.vehicleMetaData.MaxVehiclePrice
      ) {
        range.push(`AskingPrice=${data.priceRange.min},${data.priceRange.max}`);
        queryString.push(
          `price=${encodeURIComponent(
            `${encodeURIComponent(data.priceRange.min)},${encodeURIComponent(
              data.priceRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.Price,
          value: data.priceRange,
          displayValue: `${formatNumber(data.priceRange.min)} - ${formatNumber(
            data.priceRange.max
          )}`,
        });
        searchObj.AskingPriceRange = {
          MinBudget: data.priceRange.min,
          MaxBudget: data.priceRange.max,
        };
      }
    }

    // prepare year filter.
    if (filteredData.vehicleMetaData && data.yearRange) {
      if (
        data.yearRange.min !==
          filteredData.vehicleMetaData.Years[
            filteredData.vehicleMetaData.Years.length - 1
          ] ||
        data.yearRange.max !== filteredData.vehicleMetaData.Years[0]
      ) {
        const years = Array.from(
          { length: data.yearRange.max - data.yearRange.min + 1 },
          (_, i) => i + (data.yearRange?.min || 0)
        );
        term.push(`ManufactureYear=${years.join(',')}`);
        queryString.push(
          `year=${encodeURIComponent(
            `${encodeURIComponent(data.yearRange.min)},${encodeURIComponent(
              data.yearRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.Year,
          value: data.yearRange,
          displayValue: `${data.yearRange.min} - ${data.yearRange.max}`,
        });
        searchObj.ManufactureYearId = Array(
          data.yearRange.max - data.yearRange.max + 1
        )
          .fill('')
          .map((_, i) => (data?.yearRange?.min || 0) + i);
      }
    }

    // prepare EMI filter.
    if (filteredData.vehicleMetaData && data.emiRange) {
      if (
        data.emiRange.min !== filteredData.vehicleMetaData.MinMonthlyEMI ||
        data.emiRange.max !== filteredData.vehicleMetaData.MaxMonthlyEMI
      ) {
        range.push(`MonthlyEMI=${data.emiRange.min},${data.emiRange.max}`);
        queryString.push(
          `emi=${encodeURIComponent(
            `${encodeURIComponent(data.emiRange.min)},${encodeURIComponent(
              data.emiRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.EMI,
          value: data.emiRange,
          displayValue: `${formatNumber(data.emiRange.min)} - ${formatNumber(
            data.emiRange.max
          )}`,
        });
        searchObj.EMIRange = {
          MinEMI: data.emiRange.min,
          MaxEMI: data.emiRange.max,
        };
      }
    }

    /**
     * Prepare QueryString. If multiple filters are applied then create encoded filter string and apply filter.
     */
    const encodedData = CommonUtils.encode(filterQueryString);
    if (isMultiSelected && encodedData) {
      queryString = [`filters=${encodedData}`];
    }

    // prepare search key filter
    if (data.searchKey) {
      wildcard = data.searchKey;
      queryString.push(`searchKey=${encodeURIComponent(data.searchKey)}`);
      badges.push({
        displayValue: data.searchKey,
        value: data.searchKey,
        type: FilterType.SearchKey,
      });
    }

    // prepare page filter
    if (data.page !== 1) {
      queryString.push(`page=${encodeURIComponent(data.page)}`);
    }

    // prepare page size filter
    if (data.size !== PageSizes[0]) {
      queryString.push(`size=${encodeURIComponent(data.size)}`);
    }

    if (data.sortBy !== SortByFilter.ListedDate) {
      queryString.push(`sort=${encodeURIComponent(data.sortBy)}`);
    }

    if (data.sortDir === SortDirection.Asc) {
      queryString.push(`dir=${encodeURIComponent(data.sortDir)}`);
    }

    if (data.type !== VehicleAgeType.All) {
      queryString.push(`carType=${data.type}`);

      switch (data.type) {
        case VehicleAgeType.New:
          term.push('IsNew=True');
          term.push('IsOutlet=False');
          break;
        case VehicleAgeType.Old:
          term.push('IsNew=False');
          term.push('IsOutlet=False');
          break;
        case VehicleAgeType.Outlet:
          term.push('IsNew=True');
          term.push('IsOutlet=True');
          break;
        default:
          break;
      }
    }

    if (compareVehicleIds && compareVehicleIds.length > 0) {
      queryString.push(
        `compare=${encodeURIComponent(compareVehicleIds.join(','))}`
      );
    }
    return {
      searchPayload: {
        LanguageID: CommonUtils.getLanguageId(data.locale!),
        IndexName: '',
        Size: data.size,
        Page: data.page,
        Filter: {
          wildcard,
          term,
          range,
          csv,
        },
        OrderBy: [`${data.sortBy} ${data.sortDir}`],
        SelectField: [
          'VehicleListingId',
          'DefaultWebImageThumbnailUrl',
          'VehicleProfileId',
          'AskingPrice',
          'ListedDate',
          'ManufactureYearId',
          'ManufactureYear',
          'VehicleMakeId',
          'VehicleMake',
          'VehicleModelId',
          'VehicleModel',
          'SpecId',
          'Spec',
          'FuelTypeId',
          'FuelType',
          'BodyTypeId',
          'ExteriorColorId',
          'InteriorColorId',
          'TransmissionId',
          'Transmission',
          'OwnershipId',
          'Ownership',
          'Mileage',
          'CityId',
          'MonthlyEMI',
          'IsSelfListedVehicle',
          'ImporterId',
          'DistributorId',
          'FulFilledById',
          'MfgWarranty',
          'EMICalculationDate',
          'SellerId',
          'DealerId',
          'IsNew',
          'IsOutlet',
          'IsSold',
          'IsGGMInspected',
          'IsActive',
          'IsFinanceApplicable',
          'Is360DegreeApplicable',
          'IsMojazFacilityApplicable',
          'IsAssistedSellingApplicable',
          'IsExtendedWarrantyApplicable',
          'VehicleFeatureCsv',
          'ETag',
          'VehicleListingStatusKey',
          'SpecRegionId',
          'DefaultWebImageUrl',
          'CurrencySymbol',
          'UnitOfMeasureValue',
          'ListingSummary',
          'DealerLogoUrl',
          'VehicleListingStatusKey',
        ],
        SearchField: ['VehicleMake', 'VehicleModel'],
      },
      queryString:
        queryString.length > 0
          ? `${slugURI}?${queryString.join('&')}`
          : `${slugURI}`,
      badges,
      searchObj,
      filteredData,
    };
  };

  static getSearchParamsBySavedSearch = async (
    currentLocale: string = Locales.EN,
    userSavedSearch: UserSavedSearch
  ) => {
    const search: Array<BadgeItem> = JSON.parse(userSavedSearch.SearchParam);
    const makes = search
      .filter((x) => x.type === FilterType.Make)
      .map((y) => (y.value as Make).Make);
    const models = search
      .filter((x) => x.type === FilterType.Model)
      .map((y) => (y.value as Model).Model);
    const specs = search
      .filter((x) => x.type === FilterType.Spec)
      .map((y) => (y.value as Spec).Trim);

    const filteredData = await this.loadFilterMasterData(
      currentLocale,
      makes,
      models
    );

    const appliedFilter: FilterParams = {
      page: 1,
      size: PageSizes[0],
      sortBy: SortByFilter.ListedDate,
      sortDir: SortDirection.Asc,
      multipleSortBy: [],
      makes,
      models,
      specs,
      searchKey: search.find((x) => x.type === FilterType.SearchKey)
        ?.value as string,
      bodyTypes: search
        .filter((x) => x.type === FilterType.BodyType)
        .map((y) => (y.value as BodyType).BodyTypeKey),
      cities:
        search.filter((x) => x.type === FilterType.City).length > 1
          ? []
          : search
              .filter((x) => x.type === FilterType.City)
              .map((y) => (y.value as City).City),
      features: search
        .filter((x) => x.type === FilterType.Feature)
        .map((y) => (y.value as FeatureItem).FeatureKey),
      fuelTypes: search
        .filter((x) => x.type === FilterType.FuelType)
        .map((y) => (y.value as FuelType).FuelTypeKey),
      exteriorColor: search
        .filter((x) => x.type === FilterType.ExteriorColor)
        .map((y) => (y.value as Color).ColorKey),
      interiorColor: search
        .filter((x) => x.type === FilterType.InteriorColor)
        .map((y) => (y.value as Color).ColorKey),
      ownership: search
        .filter((x) => x.type === FilterType.Ownership)
        .map((y) => (y.value as Ownership).OwnershipKey),
      transmission: search
        .filter((x) => x.type === FilterType.Transmission)
        .map((y) => (y.value as Transmission).TransmissionKey),
      yearRange: search.find((x) => x.type === FilterType.Year)?.value as
        | Range
        | undefined,
      mileageRange: search.find((x) => x.type === FilterType.Mileage)?.value as
        | Range
        | undefined,
      priceRange: search.find((x) => x.type === FilterType.Price)?.value as
        | Range
        | undefined,
      emiRange: search.find((x) => x.type === FilterType.EMI)?.value as
        | Range
        | undefined,
      type: VehicleAgeType.All,
    };
    return { appliedFilter, filteredData };
  };

  /**
   * This utility method is preparing a search payload for vehicle listing.
   * @param {FilterParams} data - This param contains filter criteria, which will used to create search request payload.
   * @param {UsedCarFilterMasterData} filteredData - This param has filter master data which will use to map Item's Key to its value/id.
   * @returns - It returns Object of search request payload and query string for that filter.
   */
  static getMyVehicleSearchParams = async (
    data: FilterParams,
    filteredData?: UsedCarFilterMasterData
  ): Promise<{
    searchPayload: MyVehicleSearchRequestPayload;
    queryString: string;
    badges: Array<BadgeItem>;
  }> => {
    const term: Array<string> = [];
    const range: Array<string> = [];
    const csv: Array<string> = [];
    let queryString: Array<string> = [];
    let isMultiSelected = false;
    let filterQueryString: FilterParams = CommonUtils.omit<FilterParams>(data, [
      'locale',
      'page',
      'size',
      'searchKey',
      'sortBy',
      'sortDir',
    ]);
    const badges: Array<BadgeItem> = [];

    // load master data for filter
    if (!filteredData) {
      filteredData = await this.loadFilterMasterData(
        data.locale!,
        data.makes,
        data.models
      );
    }

    /**
     * Prepare Search Terms for makes, models and specs.
     */
    // prepare make filter
    if (filteredData.makes && data.makes && data.makes.length > 0) {
      const makeFilter = await this.getFilterPayloadData<Make, string>(
        filteredData.makes,
        data.makes,
        'Make',
        'MakeCode',
        FilterType.Make
      );

      if (makeFilter) {
        isMultiSelected = isMultiSelected || makeFilter.isMultiSelected;
        term.push(`VehicleMakeId=${makeFilter.value}`);
        makeFilter.query && queryString.push(`make=${makeFilter.query}`);
        badges.push(...makeFilter.badges);
      }

      // prepare model filter
      if (filteredData.models && data.models && data.models.length > 0) {
        const modelFilter = await this.getFilterPayloadData<Model, string>(
          filteredData.models,
          data.models,
          'Model',
          'ModelCode',
          FilterType.Model
        );

        if (modelFilter) {
          isMultiSelected = isMultiSelected || modelFilter.isMultiSelected;
          term.push(`VehicleModelId=${modelFilter.value}`);
          modelFilter.query && queryString.push(`model=${modelFilter.query}`);
          badges.push(...modelFilter.badges);
        }

        // prepare spec filter
        if (filteredData.specs && data.specs && data.specs.length > 0) {
          const specFilter = await this.getFilterPayloadData<Spec, string>(
            filteredData.specs,
            data.specs,
            'Trim',
            'TrimCode',
            FilterType.Spec
          );

          if (specFilter) {
            isMultiSelected = isMultiSelected || specFilter.isMultiSelected;
            term.push(`SpecId=${specFilter.value}`);
            specFilter.query && queryString.push(`spec=${specFilter.query}`);
            badges.push(...specFilter.badges);
          }
        }
      }
    }

    /**
     * Prepare Search Filter for other multi-selectable fields.
     */
    const [
      cityFilter,
      typeFilter,
      fuelTypeFilter,
      ownershipFilter,
      transmissionFilter,
      exteriorColorFilter,
      interiorColorFilter,
      featuresFilter,
      statusFilter,
    ] = await Promise.all([
      this.getFilterPayloadData<City, string>(
        filteredData.cities,
        data.cities,
        'CityKey',
        'CityId',
        FilterType.City,
        'City'
      ),
      this.getFilterPayloadData<BodyType, string>(
        filteredData.bodyTypes,
        data.bodyTypes,
        'BodyTypeKey',
        'BodyTypeId',
        FilterType.BodyType,
        'BodyType'
      ),
      this.getFilterPayloadData<FuelType, string>(
        filteredData.fuelTypes,
        data.fuelTypes,
        'FuelTypeKey',
        'FuelTypeId',
        FilterType.FuelType,
        'FuelType'
      ),
      this.getFilterPayloadData<Ownership, string>(
        filteredData.vehicleMetaData.Ownerships,
        data.ownership,
        'OwnershipKey',
        'OwnershipId',
        FilterType.Ownership,
        'Ownership'
      ),
      this.getFilterPayloadData<Transmission, string>(
        filteredData.vehicleMetaData.Transmissions,
        data.transmission,
        'TransmissionKey',
        'TransmissionId',
        FilterType.Transmission,
        'Transmission'
      ),
      this.getFilterPayloadData<Color, string>(
        filteredData.vehicleMetaData.ExteriorColors,
        data.exteriorColor,
        'ColorKey',
        'ColorId',
        FilterType.ExteriorColor,
        'Color'
      ),
      this.getFilterPayloadData<Color, string>(
        filteredData.vehicleMetaData.InteriorColors,
        data.interiorColor,
        'ColorKey',
        'ColorId',
        FilterType.InteriorColor,
        'Color'
      ),
      this.getFilterPayloadData<FeatureItem, string>(
        filteredData.vehicleMetaData.Features.flatMap(
          (x) => x.FeatureList || []
        ),
        data.features,
        'FeatureKey',
        'FeatureId',
        FilterType.Feature,
        'Feature'
      ),
      this.getFilterPayloadData<VehicleListingStatusItem, string>(
        filteredData.status,
        data.status,
        'VehicleListingStatusKey',
        'VehicleListingStatusId'
      ),
    ]);

    if (cityFilter) {
      isMultiSelected = isMultiSelected || cityFilter.isMultiSelected;
      term.push(`CityId=${cityFilter.value}`);
      cityFilter.query && queryString.push(`city=${cityFilter.query}`);
      badges.push(...cityFilter.badges);
    }
    if (typeFilter) {
      isMultiSelected = isMultiSelected || typeFilter.isMultiSelected;
      term.push(`BodyTypeId=${typeFilter.value}`);
      typeFilter.query && queryString.push(`bodytype=${typeFilter.query}`);
      badges.push(...typeFilter.badges);
    }
    if (fuelTypeFilter) {
      isMultiSelected = isMultiSelected || fuelTypeFilter.isMultiSelected;
      term.push(`FuelTypeId=${fuelTypeFilter.value}`);
      fuelTypeFilter.query &&
        queryString.push(`fueltype=${fuelTypeFilter.query}`);
      badges.push(...fuelTypeFilter.badges);
    }
    if (ownershipFilter) {
      isMultiSelected = isMultiSelected || ownershipFilter.isMultiSelected;
      term.push(`OwnershipId=${ownershipFilter.value}`);
      ownershipFilter.query &&
        queryString.push(`ownership=${ownershipFilter.query}`);
      badges.push(...ownershipFilter.badges);
    }
    if (transmissionFilter) {
      isMultiSelected = isMultiSelected || transmissionFilter.isMultiSelected;
      term.push(`TransmissionId=${transmissionFilter.value}`);
      transmissionFilter.query &&
        queryString.push(`transmission=${transmissionFilter.query}`);
      badges.push(...transmissionFilter.badges);
    }
    if (exteriorColorFilter) {
      isMultiSelected = isMultiSelected || exteriorColorFilter.isMultiSelected;
      term.push(`ExteriorColorId=${exteriorColorFilter.value}`);
      exteriorColorFilter.query &&
        queryString.push(`color=${exteriorColorFilter.query}`);
      badges.push(...exteriorColorFilter.badges);
    }
    if (interiorColorFilter) {
      isMultiSelected = isMultiSelected || interiorColorFilter.isMultiSelected;
      term.push(`InteriorColorId=${interiorColorFilter.value}`);
      interiorColorFilter.query &&
        queryString.push(`interiorColor=${interiorColorFilter.query}`);
      badges.push(...interiorColorFilter.badges);
    }
    if (featuresFilter) {
      isMultiSelected = isMultiSelected || featuresFilter.isMultiSelected;
      csv.push(`VehicleFeatureCsv=${featuresFilter.value}`);
      featuresFilter.query &&
        queryString.push(`feature=${featuresFilter.query}`);
      badges.push(...featuresFilter.badges);
    }
    if (statusFilter) {
      isMultiSelected = isMultiSelected || statusFilter.isMultiSelected;
      term.push(`VehicleListingStatusId=${statusFilter.value}`);
      statusFilter.query && queryString.push(`status=${statusFilter.query}`);
    }

    /**
     * prepare range filter
     */
    // prepare mileage filter
    if (filteredData.vehicleMetaData && data.mileageRange) {
      if (
        data.mileageRange.min !==
          filteredData.vehicleMetaData.MinVehicleMileage ||
        data.mileageRange.max !== filteredData.vehicleMetaData.MaxVehicleMileage
      ) {
        range.push(`Mileage=${data.mileageRange.min},${data.mileageRange.max}`);
        queryString.push(
          `mileage=${encodeURIComponent(
            `${encodeURIComponent(data.mileageRange.min)},${encodeURIComponent(
              data.mileageRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.Mileage,
          value: data.mileageRange,
          displayValue: `${formatNumber(
            data.mileageRange.min
          )} - ${formatNumber(data.mileageRange.max)}`,
        });
      }
    }

    // prepare price filter
    if (filteredData.vehicleMetaData && data.priceRange) {
      if (
        data.priceRange.min !== filteredData.vehicleMetaData.MinVehiclePrice ||
        data.priceRange.max !== filteredData.vehicleMetaData.MaxVehiclePrice
      ) {
        range.push(`AskingPrice=${data.priceRange.min},${data.priceRange.max}`);
        queryString.push(
          `price=${encodeURIComponent(
            `${encodeURIComponent(data.priceRange.min)},${encodeURIComponent(
              data.priceRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.Price,
          value: data.priceRange,
          displayValue: `${formatNumber(data.priceRange.min)} - ${formatNumber(
            data.priceRange.max
          )}`,
        });
      }
    }

    // prepare year filters,
    if (filteredData.vehicleMetaData && data.yearRange) {
      if (
        data.yearRange.min !==
          filteredData.vehicleMetaData.Years[
            filteredData.vehicleMetaData.Years.length - 1
          ] ||
        data.yearRange.max !== filteredData.vehicleMetaData.Years[0]
      ) {
        const years = Array.from(
          { length: data.yearRange.max - data.yearRange.min + 1 },
          (_, i) => i + (data.yearRange?.min || 0)
        );
        term.push(`ManufactureYear=${years.join(',')}`);
        queryString.push(
          `year=${encodeURIComponent(
            `${encodeURIComponent(data.yearRange.min)},${encodeURIComponent(
              data.yearRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.Year,
          value: data.yearRange,
          displayValue: `${data.yearRange.min} - ${data.yearRange.max}`,
        });
      }
    }

    // prepare EMI filters,
    if (filteredData.vehicleMetaData && data.emiRange) {
      if (
        data.emiRange.min !== filteredData.vehicleMetaData.MinMonthlyEMI ||
        data.emiRange.max !== filteredData.vehicleMetaData.MaxMonthlyEMI
      ) {
        range.push(`MonthlyEMI=${data.emiRange.min},${data.emiRange.max}`);

        queryString.push(
          `emi=${encodeURIComponent(
            `${encodeURIComponent(data.emiRange.min)},${encodeURIComponent(
              data.emiRange.max
            )}`
          )}`
        );
        badges.push({
          type: FilterType.EMI,
          value: data.emiRange,
          displayValue: `${formatNumber(data.emiRange.min)} - ${formatNumber(
            data.emiRange.max
          )}`,
        });
      }
    }

    /**
     * Prepare QueryString. If multiple filters are applied then create encoded filter string and apply filter.
     */
    const encodedData = CommonUtils.encode(filterQueryString);
    if (isMultiSelected && encodedData) {
      queryString = [`filters=${encodedData}`];
    }

    // prepare page filter
    if (data.page !== 1) {
      queryString.push(`page=${encodeURIComponent(data.page)}`);
    }

    // prepare page size filter
    if (data.size !== PageSizes[0]) {
      queryString.push(`size=${encodeURIComponent(data.size)}`);
    }

    if (data.sortBy !== SortByFilter.ListedDate) {
      queryString.push(`sort=${encodeURIComponent(data.sortBy)}`);
    }

    if (data.sortDir === SortDirection.Asc) {
      queryString.push(`dir=${encodeURIComponent(data.sortDir)}`);
    }

    return {
      searchPayload: {
        LanguageId: CommonUtils.getLanguageId(data.locale!),
        PageSize: data.size,
        PageNumber: data.page,
        Filter: {
          Term: term,
          Range: range,
          CSV: csv,
        },
        OrderBy: [`${data.sortBy} ${data.sortDir}`],
      },
      queryString: queryString.length > 0 ? `?${queryString.join('&')}` : ``,
      badges,
    };
  };

  /**
   * This utility method is use to fetch all filter master data. it includes cities, budget, year, make, etc.
   * @param {string} locale - possible values are en | ar
   * @param {Array<string>|undefined} selectedMakes - vehicle makes to get models.
   * @param {Array<string>|undefined} selectedModels - vehicle models to get specs/trims.
   * @returns Returns master data for filter vehicles.
   */
  static loadFilterMasterData = async (
    locale: string,
    selectedMakes: Array<string> = [],
    selectedModels: Array<string> = []
  ): Promise<UsedCarFilterMasterData> => {
    const result = await FilterUtils.fetchFilterMasterData(locale);
    const { models, specs } = await FilterUtils.fetchModelAndSpecFilterData(
      locale,
      result.makes,
      selectedMakes,
      selectedModels
    );

    return {
      ...result,
      models,
      specs,
    };
  };

  /**
   * This utility method is use to fetch all filter master data. it includes cities, budget, year, make, etc.
   * @param {string} locale - possible values are en | ar
   * @returns Returns master data for filter vehicles excluding models and trims data.
   */
  static fetchFilterMasterData = async (
    locale: string
  ): Promise<UsedCarFilterMasterData> => {
    let models: Array<Model> = [];
    let specs: Array<Spec> = [];

    const [cities, vehicleMetaData, makes, bodyTypes, fuelTypes, status] =
      await Promise.all([
        VehicleService.fetchAllCities(locale!),
        VehicleService.fetchFilterMetadata(locale!),
        VehicleService.fetchAllMake(locale!),
        VehicleService.fetchBodyTypes(locale!),
        VehicleService.fetchFuelTypes(locale!),
        VehicleService.fetchVehicleListingStatus(locale!),
      ]);

    return {
      vehicleMetaData,
      cities,
      makes,
      models,
      bodyTypes,
      specs,
      fuelTypes,
      status,
    };
  };

  static fetchModelAndSpecFilterData = async (
    locale: string,
    makes: Make[],
    selectedMakes: Array<string> = [],
    selectedModels: Array<string> = []
  ) => {
    let models: Array<Model> = [];
    let specs: Array<Spec> = [];

    /**
     * fetch dependent specs/trims for selected makes.
     */
    const filteredMakeObjs = makes.filter((x) =>
      selectedMakes?.some((y) => y.toLowerCase() === x.Make.toLowerCase())
    );

    if (filteredMakeObjs && filteredMakeObjs.length > 0) {
      // find models for selected makes...
      const data = await Promise.all(
        filteredMakeObjs.map((x) =>
          VehicleService.fetchModelByMake(x.MakeCode, locale!)
        )
      );
      models = data.flat();

      /**
       * fetch dependent specs/trims for selected models.
       */
      const filteredModelObjs = models.filter((x) =>
        selectedModels?.some((y) => y.toLowerCase() === x.Model.toLowerCase())
      );

      if (filteredModelObjs && filteredModelObjs.length > 0) {
        // find specs for selected models...
        const data = await Promise.all(
          filteredModelObjs.map((x) =>
            VehicleService.fetchVehicleSpecs(x.MakeCode, x.ModelCode)
          )
        );
        specs = data.flat();
      }
    }

    return { models, specs };
  };

  /**
   * This utility method is used to create event object for filters.
   * @param {T} item selected / de-selected item
   * @param {Array<T>} list list of master data
   * @param {keyof Omit<FilterParams,'locale'|'page'|'size'|'yearRange'|'searchKey'|'priceRange'|'mileageRange'|'sortBy'|'sortDir'|'type'>} filterParam object accessor for applied filter
   * @param {keyof T} keyAccessor accessor of object for filter value/id
   * @param {FilterParams} appliedFilter object of applied filter
   * @returns {FilterChangeEvent<T>} Event object for selected filter type.
   */
  static handleChangeForMultiSelectProps = <T>(
    item: T,
    list: Array<T>,
    filterParam: keyof Omit<
      FilterParams,
      | 'locale'
      | 'page'
      | 'size'
      | 'yearRange'
      | 'searchKey'
      | 'priceRange'
      | 'mileageRange'
      | 'emiRange'
      | 'sortBy'
      | 'sortDir'
      | 'type'
      | 'multipleSortBy'
    >,
    keyAccessor: keyof T,
    appliedFilter: FilterParams
  ): FilterChangeEvent<T> => {
    let newSpecsFilter = appliedFilter[filterParam] || [];

    const index = newSpecsFilter.findIndex(
      (x) => String(item[keyAccessor]).toLowerCase() === String(x).toLowerCase()
    );

    if (index === -1) {
      newSpecsFilter.push(item[keyAccessor] as never);
    } else {
      newSpecsFilter = (newSpecsFilter as Array<any>).filter(
        (x) =>
          String(item[keyAccessor]).toLowerCase() !== String(x).toLowerCase()
      );
    }

    return {
      item,
      list: list.filter((x: T) =>
        newSpecsFilter.some(
          (y) =>
            String(y).toLowerCase() === String(x[keyAccessor]).toLowerCase()
        )
      ),
      isSelected: index === -1,
    };
  };

  /**
   * This utility method is used to checked, value is applied in selected filter.
   * @param {T} value selected / de-selected item value
   * @param {FilterParams} appliedFilter object of applied filter
   * @param {keyof Omit<FilterParams,'locale'|'page'|'size'|'yearRange'|'searchKey'|'priceRange'|'mileageRange'|'sortBy'|'sortDir'|'type'>} checkWith object accessor for applied filter
   * @returns {boolean} Returns True/False
   */
  static isActiveFilter = <T>(
    value: T,
    appliedFilter: FilterParams,
    checkWith: keyof Omit<
      FilterParams,
      | 'locale'
      | 'page'
      | 'size'
      | 'yearRange'
      | 'searchKey'
      | 'priceRange'
      | 'mileageRange'
      | 'emiRange'
      | 'sortBy'
      | 'sortDir'
      | 'type'
      | 'multipleSortBy'
    >
  ): boolean => {
    return (
      appliedFilter[checkWith]?.some(
        (x) => String(x).toLowerCase() === String(value).toLowerCase()
      ) || false
    );
  };

  /**
   * This utility method is use to prepare values for search payload and queryString data.
   * @param {Array<T>} list List of master data
   * @param {Array<M>} item list of selected values
   * @param {keyof T} keyAccessor property accessor to prepare queryString data
   * @param {keyof T} valueAccessor property accessor to prepare search payload data
   * @returns {FilterQueryStringAndParams | undefined} Returns object with selected values for queryString and search payload. If data not found, returns undefined.
   */
  private static getFilterPayloadData = async <T, M>(
    list: Array<T> = [],
    item: Array<M> = [],
    keyAccessor: keyof T,
    valueAccessor: keyof T,
    type?: FilterType,
    displayAccessor?: keyof T
  ): Promise<FilterQueryStringAndParams | undefined> => {
    const badges: Array<BadgeItem> = [];
    if (list.length > 0 && item.length > 0) {
      const filteredList = list.filter((x) => {
        const result = item?.some(
          (y) =>
            String(y).toLowerCase() === String(x[keyAccessor]).toLowerCase()
        );
        result &&
          type &&
          badges.push({
            type,
            value: x as any,
            displayValue: displayAccessor
              ? String(x[displayAccessor])
              : String(x[keyAccessor]),
          });
        return result;
      });

      if (filteredList && filteredList.length > 0) {
        const queryObject = filteredList[0];
        return {
          isMultiSelected: filteredList.length > 1,
          value: filteredList.map((x) => x[valueAccessor]).join(','),
          query:
            filteredList.length > 1
              ? ''
              : encodeURIComponent(String(queryObject[keyAccessor])),
          badges,
          searchParam: filteredList.map((x) => x[valueAccessor]) as Array<
            number | string
          >,
        };
      }
    }
  };

  static getAppliedFilterByBadgeItem = (
    event: BadgeItem,
    appliedFilter: FilterParams,
    masterData: UsedCarFilterMasterData
  ): FilterParams => {
    let result: FilterParams;

    switch (event.type) {
      case FilterType.BodyType: {
        const { list } = this.handleChangeForMultiSelectProps<BodyType>(
          event.value as BodyType,
          masterData.bodyTypes,
          'bodyTypes',
          'BodyTypeKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          bodyTypes: list.map((x) => x.BodyTypeKey),
        };
        break;
      }
      case FilterType.Feature: {
        const { list } = this.handleChangeForMultiSelectProps<FeatureItem>(
          event.value as FeatureItem,
          masterData.vehicleMetaData.Features.flatMap((x) => x.FeatureList) ||
            [],
          'features',
          'FeatureKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          features: list.map((x) => x.FeatureKey),
        };
        break;
      }
      case FilterType.Mileage: {
        result = {
          ...appliedFilter,
          mileageRange: {
            min: masterData.vehicleMetaData.MinVehicleMileage,
            max: masterData.vehicleMetaData.MaxVehicleMileage,
          },
        };
        break;
      }
      case FilterType.Price: {
        result = {
          ...appliedFilter,
          priceRange: {
            min: masterData.vehicleMetaData.MinVehiclePrice,
            max: masterData.vehicleMetaData.MaxVehiclePrice,
          },
        };
        break;
      }
      case FilterType.Year: {
        result = {
          ...appliedFilter,
          yearRange: {
            min: masterData.vehicleMetaData.Years[
              masterData.vehicleMetaData.Years.length - 1
            ],
            max: masterData.vehicleMetaData.Years[0],
          },
        };
        break;
      }
      case FilterType.EMI: {
        result = {
          ...appliedFilter,
          emiRange: {
            min: masterData.vehicleMetaData.MinMonthlyEMI,
            max: masterData.vehicleMetaData.MaxMonthlyEMI,
          },
        };
        break;
      }
      case FilterType.FuelType: {
        const { list } = this.handleChangeForMultiSelectProps<FuelType>(
          event.value as FuelType,
          masterData.fuelTypes,
          'fuelTypes',
          'FuelTypeKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          fuelTypes: list.map((x) => x.FuelTypeKey),
        };
        break;
      }
      case FilterType.ExteriorColor: {
        const { list } = this.handleChangeForMultiSelectProps<Color>(
          event.value as Color,
          masterData.vehicleMetaData.ExteriorColors,
          'exteriorColor',
          'ColorKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          exteriorColor: list.map((x) => x.ColorKey),
        };
        break;
      }
      case FilterType.InteriorColor: {
        const { list } = this.handleChangeForMultiSelectProps<Color>(
          event.value as Color,
          masterData.vehicleMetaData.ExteriorColors,
          'interiorColor',
          'ColorKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          interiorColor: list.map((x) => x.ColorKey),
        };
        break;
      }
      case FilterType.Ownership: {
        const { list } = this.handleChangeForMultiSelectProps<Ownership>(
          event.value as Ownership,
          masterData.vehicleMetaData.Ownerships,
          'ownership',
          'OwnershipKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          ownership: list.map((x) => x.OwnershipKey),
        };
        break;
      }
      case FilterType.Transmission: {
        const { list } = this.handleChangeForMultiSelectProps<Transmission>(
          event.value as Transmission,
          masterData.vehicleMetaData.Transmissions,
          'transmission',
          'TransmissionKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          transmission: list.map((x) => x.TransmissionKey),
        };
        break;
      }
      case FilterType.City: {
        const { list } = this.handleChangeForMultiSelectProps<City>(
          event.value as City,
          masterData.cities,
          'cities',
          'CityKey',
          appliedFilter
        );
        result = {
          ...appliedFilter,
          cities: list.map((x) => x.CityKey),
        };
        break;
      }
      default:
        result = { ...appliedFilter };
    }
    return { ...result, page: 1 };
  };

  static getUserPreferenceKey = (userID: string | number | null): string => {
    if (userID) {
      return `${String(userID)}${UserPreference}`;
    } else {
      return `GUEST${UserPreference}`;
    }
  };

  static setUserPreference = (
    sortBy: SortByFilter,
    sortDir: SortDirection,
    userID: string | number | null
  ) => {
    const preference = { sortBy, sortDir };

    const strPreference = CommonUtils.encode(preference);

    if (strPreference)
      localStorage.setItem(
        FilterUtils.getUserPreferenceKey(userID),

        strPreference
      );
  };

  static getUserPreference = (
    userID: string | number | null
  ):
    | {
        sortBy: SortByFilter;

        sortDir: SortDirection;
      }
    | undefined => {
    const strPreference = localStorage.getItem(
      FilterUtils.getUserPreferenceKey(userID)
    );

    if (strPreference) {
      return CommonUtils.decode<{
        sortBy: SortByFilter;

        sortDir: SortDirection;
      }>(strPreference);
    }
  };

  /**
   * This utility method is preparing a search payload for vehicle listing using concierge data
   * @param {string} locale - possible values are en | ar
   * @param {string} json - user concierge request in stringify format.
   * @returns Returns search payload.
   */
  static getSearchParamByConcierge = async (locale: string, json: string) => {
    const conciergeData = JSON.parse(json);
    const term: Array<string> = [];
    const range: Array<string> = [];
    if (conciergeData.BodyTypeId && conciergeData.BodyTypeId.length > 0) {
      term.push(`BodyTypeId=${conciergeData.BodyTypeId.toString()}`);
    }

    if (conciergeData.FuelTypeId && conciergeData.FuelTypeId.length > 0) {
      term.push(`FuelTypeId=${conciergeData.FuelTypeId.toString()}`);
    }

    if (
      conciergeData.TransmissionId &&
      conciergeData.TransmissionId.length > 0
    ) {
      term.push(`TransmissionId=${conciergeData.TransmissionId.toString()}`);
    }

    if (
      conciergeData.AskingPriceRange &&
      conciergeData.AskingPriceRange.MinBudget &&
      conciergeData.AskingPriceRange.MaxBudget
    ) {
      range.push(
        `AskingPrice=${conciergeData.AskingPriceRange.MinBudget},${conciergeData.AskingPriceRange.MaxBudget}`
      );
    }
    return {
      LanguageID: CommonUtils.getLanguageId(locale),
      IndexName: '',
      Filter: {
        term: term,
        range: range,
        wildcard: '',
        csv: [],
      },
      Page: 1,
      Size: PageSizes[0],
      OrderBy: [],
      SearchField: [],
      SelectField: ['VehicleListingId'],
    };
  };
}
