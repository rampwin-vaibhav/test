import { FilterType } from '../enums';
import {
  Ownership,
  Color,
  Transmission,
  FuelType,
  Make,
  Spec,
  Model,
  BodyType,
  Range,
  FeatureItem,
  City,
  ImportedByDataResponse,
  FulFilledByDataResponse,
  SuppliedByDataResponse,
} from '../models';

export type FilterChangeEvent<T> = {
  item?: T;
  list: Array<T>;
  isSelected: boolean;
};

export type MoreFilterChange = {
  Ownership?: FilterChangeEvent<Ownership>;
  ExteriorColor?: FilterChangeEvent<Color>;
  InteriorColor?: FilterChangeEvent<Color>;
  Transmission?: FilterChangeEvent<Transmission>;
  FuelType?: FilterChangeEvent<FuelType>;
};

export type FilterQueryStringAndParams = {
  value: string;
  query: string;
  isMultiSelected: boolean;
  badges: Array<BadgeItem>;
  searchParam: Array<string | number>;
};

export type FilterOutletQueryStringAndParams = {
  value: string;
  query: string;
  isSelected: boolean;
  badges: Array<BadgeItem>;
  searchParam: Array<string | number>;
};

export type BadgeItem = {
  type: FilterType;
  displayValue: string;
  value:
    | string
    | Make
    | Model
    | Spec
    | BodyType
    | FuelType
    | Range
    | FeatureItem
    | Color
    | Ownership
    | City
    | Transmission
    | ImportedByDataResponse
    | FulFilledByDataResponse
    | SuppliedByDataResponse;
};
