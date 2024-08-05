import {
  FilterType,
  ListingStatus,
  MultipleSortByFilter,
  ProductReferenceType,
  SocialMediaPlatform,
  SortByFilter,
  SortDirection,
  TestDriveKeys,
  VehicleAgeType,
  VehicleEvent,
} from '../enums';

export * from './auth';

export type City = {
  CityId: number;
  CityKey: string;
  City: string;
  ImageUrl: string;
  ImageUrlPath: string;
};

export type ImportedBy = {
  ImporterId: number;
  Name: string;
};

export type SuppliedBy = {
  Id: number;
  IsCaptive: boolean;
  Name: string;
  Type: string;
};

export type FulFilledBy = {
  FulfilledId: number;
  Name: string;
};

export type Brand = {
  ImageUrl: string;
  ImageUrlPath: string;
  SequenceNumber: number;
  VehicleMake: string;
  VehicleMakeCode: number;
  VehicleMakeKey: string;
};

export type Budget = {
  BudgetTypeId: number;
  DisplayText: string;
  MaxBudget: number;
  MinBudget: number;
};

export type TrendingSearch = {
  ImageUrl: string;
  ImageUrlPath: string;
  TrendingSearchId: number;
  VehicleMake: string;
  VehicleMakeKey: string;
  VehicleMakeCode: number;
  VehicleModel: string;
  VehicleModelKey: string;
  VehicleModelCode: number;
};

export type HeaderMenu = {
  IsNavigateExternal: boolean;
  IsNewTab: boolean;
  Menu: string;
  MenuId: number;
  URL: string;
};

export type FilterParams = {
  locale?: string;
  page: number;
  size: number;
  sortBy: SortByFilter;
  sortDir: SortDirection;
  searchKey?: string;
  priceRange?: { min: number; max: number };
  mileageRange?: { min: number; max: number };
  yearRange?: { min: number; max: number };
  emiRange?: { min: number; max: number };
  cities?: Array<string>;
  ownership?: Array<string>;
  transmission?: Array<string>;
  bodyTypes?: Array<string>;
  years?: Array<number>;
  exteriorColor?: Array<string>;
  interiorColor?: Array<string>;
  fuelTypes?: Array<string>;
  makes?: Array<string>;
  models?: Array<string>;
  specs?: Array<string>;
  features?: Array<string>;
  status?: Array<string>;
  type: VehicleAgeType;
  importedBy?: Array<string>;
  suppliedBy?: Array<string>;
  dealers?: Array<string>;
  fulfilledBy?: Array<string>;
  multipleSortBy: Array<MultipleSortByFilter>;
  vehicleType?: Array<string>;
};

export type FilterMasterData = {
  vehicleMetaData: VehicleMetaData;
  cities: Array<City>;
  makes: Array<Make>;
  models: Array<Model>;
  specs: Array<Spec>;
  bodyTypes: Array<BodyType>;
  fuelTypes: Array<FuelType>;
  status: Array<VehicleListingStatusItem>;
  importedBy: Array<ImportedByDataResponse>;
  fulfilledBy: Array<FulFilledByDataResponse>;
  suppliedBy: Array<SuppliedByDataResponse>;
};

export type UsedCarFilterMasterData = {
  vehicleMetaData: VehicleMetaData;
  cities: Array<City>;
  makes: Array<Make>;
  models: Array<Model>;
  specs: Array<Spec>;
  bodyTypes: Array<BodyType>;
  fuelTypes: Array<FuelType>;
  status: Array<VehicleListingStatusItem>;
};

export type SearchRequestPayload = {
  LanguageID: number;
  IndexName: string;
  Size: number;
  Page: number;
  Filter: {
    wildcard: string;
    term: Array<string>;
    range: Array<string>;
    csv: Array<string>;
  };
  OrderBy: Array<string>;
  SelectField: Array<string>;
  SearchField: Array<string>;
};

export type VehicleMetaData = {
  ExteriorColors: Array<Color>;
  InteriorColors: Array<Color>;
  MaxVehicleMileage: number;
  MaxVehiclePrice: number;
  MinVehicleMileage: number;
  MinVehiclePrice: number;
  Features: Array<Feature>;
  Ownerships: Array<Ownership>;
  Transmissions: Array<Transmission>;
  VehicleConditions: Array<VehicleCondition>;
  Years: Array<number>;
  MaxMonthlyEMI: number;
  MinMonthlyEMI: number;
};

export type Color = {
  ColorId: number;
  Color: string;
  ColorHex: string;
  ColorKey: string;
};

export type Feature = {
  FeatureCategoryId: number;
  FeatureList: Array<FeatureItem>;
  Featurecategory: string;
  FeatureCategoryKey: string;
};

export type FeatureItem = {
  FeatureId: number;
  Feature: string;
  FeatureKey: string;
};

export type Ownership = {
  OwnershipId: number;
  Ownership: string | null;
  OwnershipKey: string;
};

export type Transmission = {
  TransmissionId: number;
  TransmissionKey: string;
  Transmission: string;
  ImageUrl: string;
  ImageUrlPath: string;
};

export type VehicleCondition = {
  VehicleConditionId: number;
  VehicleConditionKey: string;
  VehicleCondition: string;
  Description: string;
};

export type BodyType = {
  BodyType: string;
  BodyTypeId: number;
  BodyTypeKey: string;
  ImageUrl: string;
  ImageUrlPath: string;
  IsSearchable: boolean;
};

export type FuelType = {
  FuelType: string;
  FuelTypeCode: number;
  FuelTypeId: number;
  FuelTypeKey: string;
  ImageUrl: string;
  ImageUrlPath: string;
};

export type ModelYear = {
  ModelYear: string;
  ModelYearCode: number;
};

export type Make = {
  Make: string;
  MakeCode: number;
  MakeId: number;
  MakeKey: string;
};

export type MakeType = {
  Make: string;
  MakeCode: number;
  ModelYearCode: number;
};

export type Model = {
  MakeCode: number;
  Model: string;
  ModelCode: number;
  ModelId: number;
  ModelKey: string;
  AskingPrice: number | null;
  EMICalculationDate: number | null;
  MonthlyEMI: number | null;
  ProfileImageUrl: string | null;
  BodyTypeId: number;
  BodyTypeKey: string;
  BodyType: string;
  DisplayText: string | null;
};

export type ModelType = {
  MakeCode: number;
  Model: string;
  ModelCode: number;
  ModelYearCode: number;
};

export type Spec = {
  MakeCode: number;
  ModelCode: number;
  Trim: string;
  TrimCode: number;
  TrimKey: string;
};

export type SpecType = {
  MakeCode: number;
  ModelCode: number;
  ModelYearCode: number;
  Spec: string;
  SpecCode: number;
};

export type Range = {
  min: number;
  max: number;
};

export type SearchResultItem = {
  VehicleListingId: string;
  ListedDate: string;
  AskingPrice: number;
  ListingSummary: string;
  VehicleMake: string;
  VehicleModel: string;
  Mileage: number;
  UnitOfMeasureValue: string;
  DefaultWebImageUrl: string;
  FuelType: string;
  ManufactureYear: string;
  Ownership: string;
  CityId: string;
  FuelTypeId: string;
  OwnershipId: string;
  BodyTypeId: string;
  VehicleMakeId: string;
  VehicleModelId: string;
  ExteriorColorId: string;
  InteriorColorId: string;
  SpecRegionId: string;
  TransmissionId: string;
  Transmission: string;
  SpecId: string;
  VehicleFeatureCsv: Array<string>;
  CurrencySymbol: string;
  SellerId: string;
  DealerLogoUrl: null | string;
  DealerId: null | string;
  IsBaseUrlRequired: null | 'True' | 'False';
  IsFeatured: null | 'True' | 'False';
  DefaultWebImageUrlPath: string;
  DefaultWebImageThumbnailUrl: string;
  DefaultWebImageThumbnailUrlPath: string;
  IsNew: string;
  MonthlyEMI: number;
  IsGGMInspected: null | 'True' | 'False';
  Spec: string;
  VehicleListingStatusKey: string;
  IsSelfListedVehicle: 'True' | 'False';
  IsOutlet: 'True' | 'False';
  ImportedBy: string | null;
  SuppliedBy: string | null;
  FulfilledBy: string | null;
  IsGGMDigitalDealerVehicle: 'True' | 'False';
  VehicleProfileId: number | null;
  MfgWarranty: number | null;
  EMICalculationDate: string | null;
  OEMWebImageThumbnailUrl: string | null;
  FulFilledById: number | null;
  ImporterId: number | null;
  DistributorId: number | null;
  IsFinanceApplicable: 'True' | 'False';
  Is360DegreeApplicable: 'True' | 'False';
  IsMojazFacilityApplicable: 'True' | 'False';
  IsAssistedSellingApplicable: 'True' | 'False';
  IsExtendedWarrantyApplicable: 'True' | 'False';
};

export type ListingResponse = {
  DataCount: number;
  DataList: Array<SearchResultItem>;
};

export type State = {
  State: string;
  StateId: number;
};

export type Cities = {
  City: string;
  CityId: number;
  StateId: number;
};

export type StateCities = {
  States?: Array<State>;
  Cities?: Array<Cities>;
};

export type FAQResponse = {
  FAQCategoryKey: string;
  FAQCategory: string;
  FAQCategoryId: number;
  LanguageId: number;
  FAQList: Array<FAQItem>;
};

export type FAQItem = {
  FAQId: number;
  Question: string;
  Answer: string;
  LanguageId: number;
  IsHTML: boolean;
  expand: boolean;
};

export type PrivacyResponse = {
  LanguageId: number;
  PrivacyPolicies: Array<string>;
};

export type AboutUsResponse = {
  LanguageId: number;
  AboutUsData: Array<string>;
};

export type TermsAndConditions = {
  LanguageId: number;
  TermConditions: Array<string>;
};

export type CitiesResponse = {
  cities: Array<Cities>;
};

export type ProfileData = {
  Address1: string;
  Address2: string;
  AlternateEmail: string;
  AlternateMobile: string;
  BirthDate: string;
  CityId: number;
  CountryId: number;
  EmailAddress: string;
  FirstName: string;
  GenderId: number;
  IsAbsherVerificationRequired: boolean;
  IsAbsherVerified: boolean;
  IsActive: boolean;
  IsAddressVerificationRequired: boolean;
  IsFirstLogin: boolean;
  IsPreferredEmail: boolean;
  IsPreferredSMS: boolean;
  IsPreferredWhatsapp: boolean;
  IsVehicleOwnershipVerificationRequired: boolean;
  IsVehicleVerificationRequired: boolean;
  IsYakeenVerified: boolean;
  LastName: string;
  MiddleName: string;
  MobileNumber: string;
  PreferredLanguageId: number;
  Profession: string;
  Role: string;
  StateId: number;
  UserNationalAddresses: Array<string>;
  UserProfileStatus: string;
  UserProfileStatusKey: string;
  UserStatusId: number;
  Zipcode: string;
  UserTitleId: number | undefined;
  Locations: Array<Locations>;
};

export type ConfigurationResponse = {
  ConfigurationId: number;
  ConfigurationKeyDisplayValue: string;
  ConfigurationValue: string;
};

export type DirectLineToken = {
  conversationId: string;
  expires_in: number;
  token: string;
};

export type SocialMediaResponse = {
  Languages: Array<Language>;
  SocialMedia: Array<SocialMediaType>;
};

export type Language = {
  Language: string;
  LanguageId: number;
};

export type SocialMediaType = {
  Application: string;
  ApplicationId: number;
  ContactNumber: null;
  MediaEmail: null;
  MediaUrl: string;
  SocialMediaType: string;
};
export type ListingImageArtifact = {
  ArtifactThumbnailUrl: string;
  ArtifactType: string;
  ArtifactTypeId: number;
  ArtifactTypeKey: string;
  ArtifactUrl: string | null;
  ArtifactUrlPath: string | null;
  IsProfileImage: boolean;
  IsQCApproved: boolean | null;
  IsVisibleOnPortal: boolean;
  QCComments: string | null;
  VehicleListingArtifactId: number;
  VehicleListingId: number;
  DisplaySequence: number | null;
  IsMandatoryForSelfInspection: boolean;
  BeforeImageReferenceId: number | null;
  Description: string | null;
  ArtifactCategory: string;
  ArtifactSubCategoryKey: string;
  ArtifactSubCategory: string;
  BodyTypeArtifactURL: string | null;
  SubCategoryDisplaySequence: number | null;
  MimeType: string;
};

export type AllVehicleImageType = {
  categoryKey: string;
  category: string;
  SubCategoryDisplaySequence: number | null;
  artifacts: Array<ListingImageArtifact>;
};

export type Features = {
  FeatureCategory: string;
  FeatureCategoryId: number;
  FeatureList: Array<FeatureList>;
};
export type Overview = {
  AdditionalFeatures: string;
  Agreement: boolean;
  AskingPrice: number;
  BodyType: string;
  BodyTypeCode: number;
  City: string;
  CityId: number;
  IsNew: boolean;
  IsFinanceable: boolean;
  Color: string;
  CurrencySymbol: string;
  DealerId: number;
  Description: string;
  ELMOwnerId: number;
  ELMPlate1: null;
  ELMPlate2: null;
  ELMPlate3: null;
  ELMPlateNumber: null;
  ELMSequenceNumber: null;
  ExteriorColor: string;
  ExteriorColorHex: string;
  ExteriorColorId: number;
  FuelType: string;
  FuelTypeCode: number;
  IndicativePrice: number;
  InteriorColor: string;
  InteriorColorHex: string;
  InteriorColorId: number;
  IsFeatured: number;
  ListedDate: string;
  ListingSummary: string;
  Make: string;
  MakeCode: number;
  Model: string;
  ModelCode: number;
  ModelYear: string;
  ModelYearCode: number;
  MojazDocumentUrl: number;
  Notes: null;
  OdometerReading: number;
  OutstandingFinance: boolean;
  Ownership: string;
  OwnershipId: number;
  SellerFirstName: string;
  SellerId: number;
  SellerLastName: string;
  Signature: string;
  SoldToId: number;
  Spec: string;
  SpecCode: number;
  SpecRegionId: number;
  SpecRegionKey: string;
  Transmission: string;
  TransmissionCode: number;
  UnitOfMeasureValue: string;
  VehicleCondition: string;
  VehicleConditionId: number;
  VehicleListingId: number;
  OrderItemId: number;
  PackageReferenceId: number;
  VehicleListingStatusID: number;
  VehicleListingStatusKey: number;
  VehicleListingWorkflowNumber: number;
  Vin: string;
  IsELMMojazVerified: boolean;
  IsELMYakeenVerified: boolean;
  MojazDocumentFetchDate: string;
  LicensePlateNumber: string;
  ResidualValue: number | string | null;
  VehicleListingStatus: string;
  IsAvailableForInspection: boolean;
  InspectionServiceId: number;
  IsOutlet: boolean;
  DealerName: string;
  MojazliteMileage: number;
  MojazliteWarrantyStatus: string;
  MojazliteOwnership: string;
  IsVinDecoded: boolean;
  IsSelfListedVehicle: boolean;
  IsEligibleForUpgrade: boolean;
  VehicleJourney: string;
  IsOutletAcknowledged: boolean;
  VerifiedVin: string;
  MonthlyEMI: number;
  ModelSummary: string | null;
  MfgWarranty: number | null;
  IsGGMDigitalDealerVehicle: boolean;
  VehicleProfileId: number | null;
  ColorVariantId: number | null;
  ColorVariantHexCode: string | null;
  ColorVariantName: string | null;
  EMICalculationDate: string;
  Importer: string | null;
  FulFilledBy: string | null;
  Distributor: string | null;
};
export type Specification = {
  Doors: string;
  DoorsCode: number;
  EngineSize: string;
  EngineSizeCode: number;
  FinalDrive: string;
  FinalDriveCode: number;
  Horsepower: string;
  HorsepowerCode: number;
  Mileage: number;
  NoOfCycles: string;
  NoOfCyclesCode: number;
  Seats: string;
  SeatsCode: number;
};

export type FeatureList = {
  Feature: string;
  FeatureId: number;
  IsAvailable: boolean;
};

export type VehicleListingData = {
  BookmarkCount: number;
  Features: Array<Features>;
  Overview: Overview;
  Specification: Specification;
  Location: Locations;
  MojazLiteReportUrl: string;
  Specifications: SpecificationItem[];
};
export type SpecificationItem = {
  SpecificationId: number;
  SpecificationKey: string;
  Specification: string;
  SpecificationCategoryId: number;
  SpecificationCategoryKey: string;
  SpecificationCategory: string;
  Id: number;
  IsKeySpec: boolean;
  IsActive: boolean;
  Values?: Array<{ LanguageId: number; SpecificationValue: string }>;
  UnitOfMeasure: Array<{ LanguageId: number; Value: string }> | null;
  Rank: number;
};

export type InspectionReportData = {
  BookingId: number;
  InspectedById: number;
  InspectedDateTime: number;
  InspectionComment: string;
  InspectionId: number;
  InspectionStatus: boolean;
  ReportUrl: string;
};

export type PostFeedbackPayload = {
  MobileNumber: string;
  EmailAddress: string;
  Name: string;
  CityId: number;
  FeedbackText: string;
  RecaptchaToken?: string;
  Language?: number;
  B2COrderItemId?: number;
};

export type PostFeedbackResponse = {
  IsSuccess: boolean;
  Message: string;
};

export type UpdateProfilePayload = {
  TitleId: number | undefined;
  Address1: string | null;
  Address2: string | null;
  AddressTypeID: number;
  BirthDate: string | null;
  CityID: number;
  CountryID: number;
  EmailAddress: string;
  FirstName: string;
  GenderId: string | null;
  IsPreferredEmail: boolean;
  IsPreferredSMS: boolean;
  IsPreferredWhatsapp: boolean;
  LastName: string;
  MiddleName: string | null;
  MobileNumber: string;
  PreferredLanguageId: string;
  Profession: string | null;
  StateID: number;
  UserID: string;
  ZipCode: string | null;
};

export type UpdateProfileResponse = {
  IsSendVerificationEmail: boolean;
  IsSuccess: boolean;
  MessageCode: string;
};

export type ChangeEmailPayload = {
  EmailAddress: string | null;
};

export type ChangeEmailResponse = {
  IsSent: boolean;
  MessageCode: string;
};

export type UserProfileStatus = {
  IsVerified: boolean;
  MessageCode: string;
};

export type VehicleOverview = {
  VehicleMake: string;
  VehicleModel: string;
  SellerName: string;
  OdometerReading: number;
  Ownership: string;
  FuelType: string;
  Transmission: string;
  BodyType: string;
  City: string;
  Color: string;
  SpecRegionKey: string;
  AskingPrice: number;
  ArtifactUrl: string;
  ArtifactThumbnailUrl: string;
  ArtifactUrlPath: string;
  CurrencySymbol: string;
  UnitOfMeasureValue: string;
};

export type VehicleSpecification = {
  Mileage: number;
  EngineSize: string;
  Horsepower: string;
  Seats: string;
  FinalDrive: string;
  Doors: string;
};

export type FeatureCompare = {
  FeatureId: number;
  Feature: string;
  IsAvailable: boolean;
};

export type FeatureCategory = {
  FeatureCategoryId: number;
  FeatureCategory: string;
  FeatureList: Array<FeatureCompare>;
};

export type Vehicle = {
  EmptyObj: boolean;
  VehicleListingId: number;
  Overview: VehicleOverview | null;
  Specification: VehicleSpecification | null;
  Features: Array<FeatureCategory> | [];
};

export type CompareVehicle = {
  Vehicles: Array<Vehicle>;
  CommonFields: Array<string>;
  CommonFeatureIds: Array<number>;
};

export type CompareVehiclePayload = {
  LanguageId: number;
  VehicleListingIds: Array<number | string>;
};

export type BodyTypeByVehicleTypePayload = {
  LanguageId: number;
  VehicleTypeIds: Array<number>;
};

export type ConciergeList = {
  ConciergeRequestId: number;
  EmailSentCount: number;
  VehicleJson: string;
  Name: string;
};

export type DeactivateProfileResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type ActivateProfileResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type SocialMediaPlatformItem = {
  BaseUrl: string;
  SharingTemplate: string;
  SocialMediaPlatform: string;
  SocialMediaPlatformId: number;
  SocialMediaPlatformKey: SocialMediaPlatform;
  Subject: string;
};

export type VehicleTracking = {
  EventType: VehicleEvent;
  SharedPlatformId: number;
  UserId: string;
  VehicleListingIds: Array<string>;
};

export type BookmarkPayload = {
  VehicleListingID?: string;
  ProductCatalogueId?: string;
};

export type VehicleSeller = {
  UserId: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  MobileNumber: string;
  EmailAddress: string;
  DealerId: number;
  DealerName: string;
  IsSellerContact: boolean;
};

export type BuyerTestDriveDatesResponse = {
  IsChoiceByBuyer: boolean;
  PreferredDate: string;
  BuyerTestDriveAvailabilityId: number;
};

export type SellerTestDriveDatesResponse = {
  Description: string;
  ToDate: string;
  FromDate: string;
};

export type ServicePayload = {
  MobileNumber: string;
  EmailAddress: string;
  CityId: string;
  QueryText: string;
  RecaptchaToken: string | null | undefined;
};

export type ServicePayloadResponse = {
  IsSuccess: boolean;
  MessageCode: string;
  Message: string;
};

export type GenerateAbsherCodePayload = {
  CustomerId: string;
  LanguageId: number;
};

export type GenerateAbsherCodeResponse = {
  Error: null;
  IsSuccess: boolean;
  MessageCode: string;
};

export type VerifyAbsherCodePayload = {
  VerificationCode: string | null;
};

export type VerifyAbsherCodeResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type VerifyYakeenPayload = {
  CustomerId: string;
  DateOfBirth: string;
  IsNIN: boolean;
  AdditionalNumber: string;
  BuildingNumber: string;
  City: string;
  District: string;
  PostCode: string;
  StreetName: string;
  UnitNumber: string;
  LanguageId: number;
};

export type VerifyYakeenResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type VehicleType = {
  ImageUrl: string;
  ImageUrlPath: string;
  VehicleType: string;
  VehicleTypeId: number;
};

export type ConciergeParams = {
  vehicleType: Array<VehicleType>;
  bodyType: Array<BodyType>;
  budget: Range;
  fuelType: Array<FuelType>;
  transmission: Array<Transmission>;
};

export type BuyerTestDriveDatesRequest = {
  vehicleListingId: string | number;
  IsChoiceByBuyer: boolean;
  PreferredDates: Array<string>;
};

export type FeedbackQuestions = {
  FeedbackQuestionId: number;
  FeedbackQuestion: string;
};

export type FeedbackArtifactTypes = {
  ArtifactTypeId: number;
  ArtifactTypeKey: string;
  ArtifactType: any;
  ContainerKey: string;
  ArtifactCategoryObj: any;
};

export type FetchEmailFeedbackResponse = {
  FeedbackQuestions: Array<FeedbackQuestions>;
  FeedbackArtifactTypes: Array<FeedbackArtifactTypes>;
};

export type PostEmailFeedbackPayload = {
  FeedbackId: string;
  FeedbackResponseList: Array<FeedbackResponse>;
  FeedbackText: string;
};

export type UploadFeedbackArtifactPayload = {
  FeedbackId: string;
  ArtifactTypeId: number | null;
  FileName: string;
  FileData: string | ArrayBuffer | null;
};

export type PostEmailFeedbackResponse = {
  IsSuccess: boolean;
  Message: string;
};

export type FeedbackResponse = { FeedbackQuestionId: number; Rating: number };
export type TestDriveData = {
  Description: string;
  TestDriveAvailability: string;
  TestDriveAvailabilityId: number;
  TestDriveAvailabilityKey: TestDriveKeys;
};

export type TestDriveAvailableDates = {
  Description: string;
  FromDate: string;
  ToDate: string;
};

export type TestDriveAvailableDetails = {
  Description: string;
  ListedDate: Date;
  TestDriveAvailability: string;
  TestDriveAvailabilityId: number;
  TestDriveAvailabilityKey: TestDriveKeys;
  TestDriveAvailableDates: Array<TestDriveAvailableDates>;
};

export type PetrominLocationData = {
  Address2: string;
  AddressType: string;
  AddressTypeId: number;
  Address1: string;
  City: string;
  CityId: number;
  Country: string;
  CountryId: number;
  LocationId: number;
  LocationName: string;
  State: string;
  StateId: number;
  ZipCode: number;
  MapUrl: string;
  EmbedMapHtml: string | null;
};

export type InspectionSlotsData = {
  FormattedTime: string;
  TimeValue: string;
};

export type ModelYearData = {
  ModelYear: string;
  ModelYearCode: number;
  ModelYearId: number;
};

export type VinNumberData = {
  AdmeId: number;
  BodyType: string;
  BodyTypeCode: number;
  EngineSize: string;
  EngineSizeCode: number;
  Make: string;
  MakeCode: number;
  Model: string;
  ModelCode: number;
  ModelYear: string;
  ModelYearCode: number;
  Spec: string;
  SpecCode: number;
  Transmission: string;
  TransmissionCode: number;
  IsVinDecoded: boolean;
};

export type FeaturesData = {
  FeatureId: number;
  IsAvailable: boolean;
};

export type VehicleDescriptionData = {
  AdmeId: number;
  BodyType: string;
  BodyTypeCode: number;
  Description: string;
  Doors: string;
  DoorsCode: number;
  EngineSize: string;
  EngineSizeCode: number;
  FinalDrive: string;
  FinalDriveCode: 2;
  FuelType: string;
  FuelTypeCode: number;
  Horsepower: string;
  HorsepowerCode: number;
  NoOfCycles: string;
  NoOfCyclesCode: number;
  Seats: string;
  SeatsCode: number;
  Spec: string;
  SpecCode: number;
  Transmission: string;
  TransmissionCode: number;
  VehicleCategory: string;
  VehicleCategoryCode: number;
};

export type VehicleDetailsResponse = {
  IsSuccess: boolean;
  Message: string;
  MessageCode: string;
  VehicleListingId: number;
};

export type FeaturesPayload = {
  Features: Array<FeaturesData>;
  VehicleListingId: number;
};

export type OutstandingFinance = {
  label: string;
  value: boolean;
};

export type UploadImagePayload = {
  VehicleListingId: number | null;
  ArtifactTypeId: number;
  FileName: any;
  FileData: string | ArrayBuffer | null;
  LanguageId: number;
  IsDocumentAvailable?: boolean;
  VehicleListingArtifactId?: number;
};

export type DeleteImagePayload = {
  ArtifactTypeId: number;
  LanguageId: number;
  VehicleListingArtifactId: number;
  VehicleListingId: number | null;
};

export type SupportQueryType = {
  SupportQueryTypeId: number;
  SupportQueryType: string;
};

export type SupportQueryTypeResponse = {
  SupportQueryTypes: Array<SupportQueryType>;
  SupportArtifactType: {
    ArtifactTypeId: number;
    ArtifactTypeKey: string;
    ArtifactType: any;
    ContainerKey: string;
    ArtifactCategoryObj: any;
  };
};

export type PostSupportQueryPayload = {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  MobileNumber: string;
  SupportQueryTypeId: number;
  VehicleListingId: string;
  Question: string;
  FileName1?: string;
  FileData1?: string | ArrayBuffer | null;
  FileName2?: string;
  FileData2?: string | ArrayBuffer | null;
  ArtifactTypeId: number;
  RecaptchaToken?: string;
  Language: number;
};

export type PostSupportQueryResponse = {
  SupportQueryId: number;
  IsSuccess: boolean;
  Message: string;
};

export type ConfirmDetailsPayload = {
  Agreement: boolean;
  CurrencySymbol: string;
  LanguageId: number;
  Signature: string;
  VehicleListingId: number | null;
  IsInspectionNeeded: boolean;
};

export type DateObject = {
  FromDate: string;
  ToDate: string;
};

export type TestDriveDatePayload = {
  Dates?: Array<DateObject>;
  LanguageId: number;
  TestDriveAvailabilityId?: number;
  VehicleListingId: number | null;
};

export type AddAppointmentResponseData = {
  Message: string;
  MessageCode: string;
};

export type AddUserLocationResponseData = {
  IsSuccess: boolean;
  MessageCode: string;
  UserLocationId: number;
};

export type AddAppointmentPayload = {
  AppointmentDate?: string;
  AppointmentTime?: string;
  LanguageId: number;
  LocationId?: number;
  VehicleListingId: number | null;
  InspectionType?: PackageInspectionType | null;
  IsRestrictStatusChange?: boolean;
};

export type AddUserLocationPayload = {
  StreetName: string | null;
  BuildingNumber: string | null;
  CountryId: number | null;
  ProviceId: number | null;
  CityId: number | null;
  Zipcode: string | null;
  AddressTypeKey: string | null;
  VehicleListingId: number | null;
};

export type ConfigurationPayload = {
  configurationKey: string;
  languageId: number;
};

export type ConciergeResponse = {
  ConciergeRequestId: number;
  IsSuccess: boolean;
  MessageCode: string;
};

export type FindVehiclePayload = {
  ManufactureYear: number;
  Spec: string;
  UserID: string;
  VehicleMake: string;
  VehicleModel: string;
};

type ConciergeBaseRequest = {
  LanguageId: number;
  VehicleJson: string;
  IsSMS: boolean;
  IsWhatsApp: boolean;
  IsEmailId: boolean;
  EmailId: string | null;
  SMSNumber: string | null;
  WhatsAppNumber: string | null;
  ConciergeCommunicationFrequency: string;
};

export type ConciergeSubmitPayload = ConciergeBaseRequest & {
  ConciergeRequestId: number;
};

export type ConciergeRequest = {
  ConceirgeCreationDate: string;
  ConciergeCommunicationFrequency: string;
  ConciergeCommunicationFrequencyId: number;
  ConciergeCommunicationFrequencyKey: string;
  ConciergeRequestId: number;
  EmailId: string;
  IsEmail: boolean;
  IsNotifyMeRequest: boolean;
  IsSMS: boolean;
  IsWhatsApp: boolean;
  LatestRunDate: string;
  NextRunDate: string;
  SMSNumber: string | null;
  UserId: number;
  VehicleJson: string;
  WhatsAppNumber: string | null;
  Name: string;
};

export type EditConciergePayload = {
  ConciergeRequest: ConciergeRequest;
  User: {
    EmailAddress: string;
    FirstName: string;
    LastName: string;
    MobileNumber: string;
  };
};

export type DealerApplicationPayload = {
  Name: string;
  NameAr: string;
  OwnerName: string;
  RegistrationId: string;
  PrimaryContactFirstName: string;
  PrimaryContactLastName: string;
  PrimaryPhoneCountryCode: string;
  PrimaryPhoneNumber: string;
  PrimaryEmailId: string;
  SecondaryPhoneCountryCode: string | null;
  SecondaryPhoneNumber: string | null;
  SecondaryEmailId: string | null;
  CityId: number;
  ProvinceId: number;
  Pincode: string;
  ApplicationBy: string | null;
  ApplicationSource: string;
  PreferedMakeCode?: number;
  PreferedMakeName?: string;
  PreferedMakeAr: string | null;
  LanguageId: number;
  RecaptchaToken: string | null;
  Street: string;
  BuildingNumber: string;
  AdditionalNumber: string;
  DistrictId: number;
  RegisteredName: string;
  VATNumber: number;
};

export type DealerApplicationResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type EMI = {
  Emi: number;
};

export type EMICalculator = {
  Price: number;
  ProfitRate: number;
  Duration: number;
  DownPayment: number;
  IsNew: boolean;
};

export type LoanTerm = {
  LoanTermId: number;
  LoanTerm: string;
  LoanTermValue: number;
};

export type CreditRating = {
  CreditRatingId: number;
  CreditRating: string;
  Description: string;
};

export type EMITerm = {
  ActualLoanTerm: number;
  DefaultInterestRate: string;
  MinimumDownPaymentPercentage: string;
  DefaultMinimumDownpayment: number;
  LoanTerm: LoanTerm[];
  CreditRating: CreditRating[];
};

export type EMITermPayload = {
  LanguageID: number;
  VehiclePrice: number;
};

export type ConciergeLabels = {
  id: string | number;
  label: string;
};

export type VehicleDisplayStatus = {
  StatusName: string;
  Color: 'green' | 'grey';
  Display: 'true' | 'false';
  Sign: 'Y' | 'X';
};

export type MyVehicle = {
  VehicleId: number;
  VehicleListingStatusId: number;
  VehicleListingStatusKey: string;
  VehicleListingStatus: string;
  WorkFlowSequenceNumber: number;
  ListedDays: number;
  VehicleAge: number;
  TotalViews: number;
  Offers: number;
  Impression: number;
  ClickRatio: number;
  Mileage: number;
  VehicleListingStatusIdscsv: string;
  Statuses: Array<VehicleDisplayStatus>;
  AnalystName: string | null;
  AnalystUserId: number;
  QualityAnalysisStatusCode: string | null;
  QualityAnalysisStatusId: number;
  DealerId: number;
  DealerLogoUrl: string | null;
  DealerUserId: number;
  DMSSalesPersonFirstName: string | null;
  DMSSalesPersonLastName: string | null;
  LeadCount: number;
  DealerName: string | null;
  IsBaseUrlRequired: boolean;
  PackageSubscriptionId: number;
  IsFeatured: boolean;
  VehicleListingId: number;
  VehicleMakeCode: number;
  VehicleModelCode: number;
  VehicleMake: string;
  VehicleModel: string;
  OdometerReading: number;
  FuelType: string;
  Transmission: string;
  ListingSummary: string;
  ListedDate: string | null;
  ManufactureYear: string;
  Ownership: string;
  City: string | null;
  AskingPrice: number;
  ArtifactUrl: string;
  ArtifactThumbnailUrl: string;
  CurrencySymbol: string;
  UnitOfMeasureValue: string;
  ArtifactUrlPath: string;
  UpdatedDate: string;
  ArtifactThumbnailUrlPath: string;
  IsAvailableForInspection: boolean;
  IsAvailableForBookInspection: boolean;
  IsSelfListedVehicle: boolean;
  Spec: string;
  IsMojazReportAvailable: boolean;
  IsEligibleForUpgrade: boolean;
  ListingStatusCategoryWorkFlowSequenceNumber: string;
  VehicleListingStatusCategory: string;
  VehicleListingStatusCategoryId: number;
  VehicleListingStatusCategoryKey: string;
  IsSubmitted: boolean;
  IsUpgradedFromSelfListedPackage: boolean;
};

export type MyVehicleResponse = {
  DataCount: number;
  DataList: Array<MyVehicle>;
  UserVehicleCount: number;
  InspectionServiceId: number;
};

export type MyVehicleSearchRequestPayload = {
  LanguageId: number;
  PageSize: number;
  PageNumber: number;
  Filter: {
    Term: Array<string>;
    Range: Array<string>;
    CSV: Array<string>;
  };
  OrderBy: Array<string>;
};

export type DeletionReason = {
  DeletionReasonId: number;
  DeletionReason: string;
};

export type MyCarValueResponse = {
  PricePercentage: number;
  PriceStatus: string;
  MarketValueIndicator: string;
  RelativePricePercentage: number;
  IsSuccess: boolean;
  MessageCode: string;
};

export type MyCarValuePayload = {
  ModelYearCode: number | undefined;
  MakeCode: number | undefined;
  ModelCode: number | undefined;
  SpecCode: number | undefined;
  VehicleConditionId: number | undefined;
  VehicleCondition: string | undefined;
  OdometerReading: number;
  AskingPrice: number | undefined;
};

export type GetAppointmentDetailsPayload = {
  AppointmentDate: string;
  AppointmentTime: string;
  City: string;
  CityId: number;
  LocationId: number;
  LocationName: string;
};
export type SellerDocumentArtifactType = {
  ArtifactTypeId: number;
  ArtifactTypeKey: string;
  ArtifactType: string;
  ContainerKey: string;
  ArtifactCategory: {
    ArtifactCategory: string;
    ArtifactCategoryId: number;
  };
  VehicleListingArtifactId: number;
};

export type Buyer = {
  UserId: number;
  FirstName: string;
  MiddleName: string | null;
  LastName: string;
  MobileNumber: string;
  EmailAddress: string;
  DealerId: number;
  DealerName: string | null;
};

export type UserSearchResponse = {
  IsSucess: boolean;
  Buyer: Buyer | null;
  MessageCode: string;
  Message: string;
};

export type SaveMarkAsSold = {
  BuyerId: number | null;
  SoldPrice: number | null;
  VehicleListingId: number | string;
};

export type NotificationData = {
  AlertNotificationId: number;
  AlertText: string;
  CreatedDate: string;
};

export type UserNotificationResponse = {
  DataCount: number;
  DataList: Array<NotificationData>;
};

export type VehicleListingStatusItem = {
  VehicleListingStatusId: number;
  VehicleListingStatusKey: ListingStatus;
  VehicleListingStatus: string;
  WorkFlowSequenceNumber: number;
};

export type ConciergeFilterPayload = {
  CityId?: Array<number>;
  OwnershipId?: Array<number>;
  ManufactureYearId?: Array<number>;
  VehicleMakeId?: Array<number>;
  VehicleModelId?: Array<number>;
  SpecId?: Array<number>;
  InteriorColorId?: Array<number>;
  ExteriorColorId?: Array<number>;
  VehicleFeatureCSV?: Array<number>;
  VehicleTypeId: Array<number>;
  BodyTypeId: Array<number>;
  AskingPriceRange: {
    MaxBudget: number;
    MinBudget: number;
  };
  MileageRange?: {
    MinValue: number;
    MaxValue: number;
  };
  EMIRange?: {
    MinValue: number;
    MaxValue: number;
  };
  TransmissionId: Array<number>;
  FuelTypeId: Array<number>;
};

export type UserSearch = {
  BodyTypeId: Array<number | string>;
  CityId: Array<number | string>;
  TransmissionId: Array<number | string>;
  FuelTypeId: Array<number | string>;
  OwnershipId: Array<number | string>;
  ManufactureYearId: Array<number | string>;
  VehicleMakeId: Array<number | string>;
  VehicleModelId: Array<number | string>;
  SpecId: Array<number | string>;
  InteriorColorId: Array<number | string>;
  ExteriorColorId: Array<number | string>;
  VehicleFeatureCSV: Array<number | string>;
  AskingPriceRange: {
    MinBudget: number | null;
    MaxBudget: number | null;
  };
  MileageRange: {
    MinValue: number | null;
    MaxValue: number | null;
  };
  EMIRange: {
    MinEMI: number | null;
    MaxEMI: number | null;
  };
  ImporterId: Array<number | string>;
  DistributorId: Array<number | string>;
  FulFilledById: Array<number | string>;
  DealerId: Array<number | string>;
};

export type UsedCarUserSearch = {
  BodyTypeId: Array<number | string>;
  CityId: Array<number | string>;
  TransmissionId: Array<number | string>;
  FuelTypeId: Array<number | string>;
  OwnershipId: Array<number | string>;
  ManufactureYearId: Array<number | string>;
  VehicleMakeId: Array<number | string>;
  VehicleModelId: Array<number | string>;
  SpecId: Array<number | string>;
  InteriorColorId: Array<number | string>;
  ExteriorColorId: Array<number | string>;
  VehicleFeatureCSV: Array<number | string>;
  AskingPriceRange: {
    MinBudget: number | null;
    MaxBudget: number | null;
  };
  MileageRange: {
    MinValue: number | null;
    MaxValue: number | null;
  };
  EMIRange: {
    MinEMI: number | null;
    MaxEMI: number | null;
  };
};

export type NotifyMePayload = ConciergeBaseRequest & {
  IsNotifyMeRequest: boolean;
};

export type NotifyMeResponse = {
  ConciergeRequestId: number;
  IsSuccess: boolean;
  MessageCode: string;
};

export type UserSearchParam = {
  type: FilterType | string;
  label: string;
  value: number | string;
};

export type UserSavedSearch = {
  UserVehicleSearchID: number | string;
  SearchName: string;
  SearchParam: string;
};

export type SaveUserSearchPayload = {
  UserVehicleSearchID?: number | string;
  SearchName: string;
  SearchParam: string;
  UserID: number | string;
};

export type SaveUserSearchResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type BuyerDocumentResponse = {
  VehicleListingArtifactId: number;
  VehicleListingId: number;
  ArtifactTypeId: number;
  ArtifactTypeKey: string;
  ArtifactType: string;
  ArtifactUrl: string;
  ArtifactThumbnailUrl: string;
  ArtifactUrlPath: string;
  IsVisibleOnPortal: string;
  IsProfileImage: boolean;
  MimeType: string;
};

export type CountryResponse = {
  Country: string;
  CountryId: number;
};

export type StatesResponse = {
  CountryId: number;
  State: string;
  StateId: number;
};

export type CityResponse = {
  City: string;
  CityId: number;
  StateId: number;
};

export type CitiesResponses = {
  CityId: number;
  StateId: number;
  ProvinceId: number | null;
  City: string;
};

export type CountryStateCItyResponse = {
  Countries: Array<CountryResponse> | null;
  States: Array<StatesResponse> | null;
  Cities: Array<CitiesResponses> | null;
};

export type CountryProvinceCityResponse = {
  Countries: Array<CountryResponse>;
  Provinces: Array<Province>;
  Cities: Array<CitiesResponses>;
};

export type VerifyEmailPayload = {
  EmailAddress: string;
  Language: string;
  CampaignKey?: string;
};

export type VerifyEmailResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type ValidateEmailResponse = {
  IsVerified: boolean;
  MessageCode: string;
  UserId: number;
};

export type ValidateEmailPayload = {
  IdentifierKey: string;
  RegistrationId: number;
};

export type GenerateOTPResponse = {
  CustomKey: number;
  Identifier: number;
  IsSuccess: true;
  MessageCode: string;
  RegistrationId: number;
  SecretKey: string;
  Type: string | number;
};

export type GenerateOTPPayload = {
  RegistrationId: number | undefined;
  Language: string;
  Identifier: string;
  Type: string;
};

export type ValidateOTPPayload = {
  RegistrationId: number;
  Identifier: string;
  Type: string;
  SecretKey: string;
  CustomKey: string;
  OTP: number | undefined;
};

export type UserTitleResponse = {
  UserTitleId: number;
  UserTitleKey: string;
  UserTitle: string;
};

export type GetUserDetailsResponse = {
  AppRegistrationId: number;
  ApplicationId: number;
  EmailAddress: string;
  IsAccountCreated: boolean;
  IsEmailVerified: boolean;
  IsPhoneVerified: boolean;
  PhoneNumber: number;
};

export type ValidateOTPResponse = { IsSuccess: boolean; MessageCode: string };

export type CreateUserAccountPayload = {
  EmailId: string | undefined;
  PhoneNumber: string | number | undefined;
  TitleId: number | string;
  FirstName: string | null;
  LastName: string | null;
  MiddleName: string | null;
  DOB: string | null;
  Profession: string | null;
  AddressLine1: string | null;
  AddressLine2: string | null;
  CountryId: number | string | null;
  RegionId: number | string | null;
  CityId: number | string | null;
  PostalCode: number | string | null;
  IsWhatsAppPreferred: boolean;
  IsEmailPreferred: boolean;
  IsSMSPreferred: boolean;
  PreferredLanguage: number | string | null;
  GenderId: number | string | null;
  Password: string | null;
  IsTermsAccepted: boolean;
  RegistrationId: number | undefined;
};

export type CreateUserAccountResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type ChangeMobileResponse = {
  ChangePhoneNumberTrackingId: number;
  IsSuccess: boolean;
};

export type GetUserTrackingPayload = {
  changePhoneNumberTrackingId: number;
};

export type GetUserTrackingResponse = {
  ChangePhoneNumberTrackingId: number;
  UserId: number;
  OldPhoneNumber: string;
  NewPhoneNumber: string | null;
  OldPhoneNumberVerified: boolean;
  NewPhoneNumberVerified: boolean;
  IsCompleted: boolean;
  IsSuccess: boolean;
  MessageCode: string | null;
};

export type VerifyOTPPayload = {
  ChangePhoneNumberTrackingId: number;
  SecretKey: string | null | undefined;
  CustomKey: string | null | undefined;
  OTP: number;
};

export type VerifyOTPResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type CartItem = {
  ShoppingCartId: number;
  ShoppingCartItemId: number;
  ProductReferenceId: number;
  Name: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  CartItemType: string;
  Price: number;
  IsAvailable: boolean;
  IsPromoCode: boolean;
  CurrencySymbol: string;
  DisplayPrice: number;
  FuelType: string;
  IconURL: string;
  ListedDate: string;
  Make: string;
  Model: string;
  ModelYear: string;
  MarkedForFinance: boolean;
  Mileage: number;
  Ownership: string;
  Transmission: string;
  UnitOfMeasureValue: string;
  VehicleListingId: number;
  Services: Array<CartItemServices>;
  BodyType: string;
  Spec: string;
};

export type CartData = {
  ShoppingCartId: number;
  UserId: number;
  CartStatusId: number;
  ShoppingCartStatusKey: string;
  ShoppingCartStatus: string;
  SubmitDate: string;
  CancelledDate: null;
  TotalAmount: number;
  BasicTotalAmount: number;
  VATTaxPercentage: number;
  VATTaxAmount: number;
  CartItems: Array<CartItem>;
  PromoAmount: number;
  BookingAmount: number;
  CartExpiryDate: string;
};

export type cartResponse = {
  IsSuccess: true;
  MessageCode: null;
  Data: CartData;
};
export type RemoveCartPayload = {
  ShoppingCartId: number;
  ShoppingCartItemId: number;
  LanguageId: number;
};

export type RemoveCartResponse = {
  IsSuccess: true;
  MessageCode: string;
  ShoppingCart: CartData;
};

export type PackageSubscriptionPayload = {
  ShoppingCartId: number;
};

export type PackageSubscriptionResponse = {
  IsSuccess: boolean;
  B2CSubscriptionIds: number;
  MessageCode: string;
};

export type FinanceOrderPayload = {
  ShoppingCartId: number;
};

export type FinanceOrderResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type GenerateInvoicePayload = {
  UserId: number;
  ShoppingCartId: number;
  PayFullAmount?: boolean;
};

export type GenerateInvoiceResponse = {
  IsSuccess: boolean;
  SubscriptionInvoiceId: number;
  MessageCode: string;
};

export type PaymentTokenPayload = {
  Key: number;
};
export type InvoiceItems = {
  InvoiceItemId: number;
  SubscriptionInvoiceId: number;
  SubscriptionReferenceId: number;
  PackageSubscriptionId: number;
  ChargeAmount: number;
  SalesPrice: number;
  PackageConfigurationDescription: string;
  PackageConfigurationDescriptionAr: string;
  PackageDisplayName: string;
  PackageDisplayNameAr: string;
  PackageId: number;
  PackageConfigurationId: number;
  Quantity: number;
  PackageName: string;
  DisplayName: string;
  Description: string;
  SubscriptionReferenceType: string;
  InvoiceItemType: string;
  PackageReferenceId: string;
  VehicleListingId: number;
  IsUpgraded: boolean;
  IsUpgradedFromSelfListedPackage: boolean;
  IsVehicleSubmitted: boolean;
  IsSelfListedPackage: boolean;
};

export type PaymentStatusResponse = {
  Invoice: {
    SubscriptionInvoiceId: number;
    DealerId: number;
    DealerName: string;
    DealerAddress1: string;
    DealerAddress2: string;
    DealerCity: string;
    DealerZip: string;
    DealerRegion: string;
    InvoiceStatusId: number;
    InvoiceStatusKey: string;
    InvoiceStatus: string;
    LastChangeAttemptDate: string;
    CurrencySymbol: string;
    CurrencySymbolAr: null;
    TotalAmount: number;
    InvoiceDocumentDate: string;
    IsRefundInvoice: boolean;
    OriginalInvoiceId: null;
    RefundDescription: null;
    CurrentAmount: null;
    PaymentRef: null;
    DealerEmail: string;
    InvoiceDocumentFromEnglish: string | null;
    InvoiceDocumentFromArabic: string | null;
    GoGoMotorAddressLine1English: string | null;
    GoGoMotorAddressLine1Arabic: string | null;
    GoGoMotorAddressLine2English: string | null;
    GoGoMotorAddressLine2Arabic: string | null;
    VATGroupRegistrationNumber: number | null;
    VATPercentage: number;
    DealerRegistrationId: number | null;
    BaseAmount: number;
    TaxCalculatedAmount: number;
    DealerVATNumber: number | null;
    IsDocumentAvailable: boolean;
    PromoCode: string;
    PromoCodeAmount: number;
    VATAmount: number;
    InvoiceId: number;
    CardNumber: number;
    InvoiceNumber: number;
    PaymentMethod: string;
    PurchasedDate: string;
    IsFinance: boolean;
    IsInitialPayment: boolean;
  };
  Items: Array<InvoiceItems>;
  RefundInvoices: any;
};

export type Services = {
  ServiceSequenceNumber: number;
  ServiceId: number;
  ServiceKey: string;
  ServiceName: string;
  ServiceDescription: string | null;
  IsActive: boolean;
  ServiceAttribute: Array<ServiceAttribute>;
  ReferenceCode: string;
  DisplayName: string;
  IsVAS: boolean;
};

export type UpgradePackage = {
  B2CPackageId: number;
  Price: number;
  DisplayPrice: number;
};

export type B2CPackages = {
  B2CPackageId: number;
  B2CPackageKey: string;
  B2CPackageName: string;
  DisplayName: string;
  B2CPackageDescription: string;
  IsActive: boolean;
  B2CPackageConfigurationId: number;
  PackageConfigurationStartDate: string;
  PackageConfigurationEndDate: string;
  Price: string;
  DisplayPrice: string;
  IsRecommended: boolean;
  CanShowOnPortal: boolean;
  CurrencySymbol: string;
  IsConfigurationActive: boolean;
  ValidityKey: string;
  ValidityDays: number;
  Validity: string;
  StatusKey: string;
  Status: string;
  Country: string;
  City: string;
  Region: string;
  SequenceNumber: number;
  Service: Array<Services>;
  PackageColor: string;
  UpgradePackage: Array<UpgradePackage>;
};

export type AddToCartPayload = {
  ProductReferenceType: ProductReferenceType;
  ProductReferenceId: number | null;
  ParentId?: number | null;
  VehicleListingId?: number | null;
  MarkedForFinance?: boolean;
  ReferenceId?: string | null;
};

export type AddToCartResponse = {
  IsSuccess: boolean;
  ShoppingCartId: number;
  MessageCode: string;
};

export type AttributeDisplayText = {
  ServiceAttributeDisplayText: string;
  LanguageId: number;
};

export type ServiceAttribute = {
  ServiceAttributeId: number;
  ServiceAttributeName: string;
  ServiceAttributeDisplayTextKey: string;
  AttributeValue: string;
  AttributeMappingIsActive: true;
  AttributeDisplayTextDescriptions: Array<AttributeDisplayText>;
  ServiceAttributeDisplayText: string;
};

export type OrderItems = {
  PackageSubscriptionId: string;
  PackageReferenceId: string;
  Amount: string;
  Description: string;
  DisplayName: string;
  ItemId: string;
  OrderItemId: string;
  VehicleListingId: number;
  Quantity: string;
  ReferenceType: string;
  TaxCalculatedAmount: string;
  VehicleListingStatus: string;
  IconURL: string;
  VehicleProfileImageUrl: string;
  ProductReferenceId: number;
  OrderItemVehicleListingId: number;
  VehicleListingStatusKey: string;
  IsBookingCompleted: boolean;
  IsInspectionService: boolean;
  IsSelfListedPackage: boolean;
  IsSelfListedVehicle: boolean;
  VehicleServices: Array<VehicleServices>;
  StatusKey: string;
  IsEligibleForUpgrade: boolean;
  IsUpgraded: boolean;
  RefundStatusKey: string;
  IsUpgradedFromSelfListedPackage: boolean;
  IsVehicleSubmitted: boolean;
  IsAvailableForInspection: boolean;
  SubscriptionReferenceType: string;
  IsEligibleForRefund: boolean;
  CurrentAmount: number;
  VehicleBookingId: number | null;
  BookingPeriod: number | null;
  IsFinance: boolean;
};

export type VehicleServices = {
  ItemId: number;
  Amount: number;
  TaxCalculatedAmount: number;
  DisplayName: string;
  Description: string;
  ReferenceType: string;
  PackageSubscriptionId: number;
  PackageReferenceId: number;
  OrderItemId: number;
  VehicleListingId: number;
  VehicleListingStatusID: number;
  VehicleListingStatusKey: number;
  VehicleListingStatus: string;
  IconURL: string;
  VehicleProfileImageUrl: string;
  VehicleServices: string;
};

export type DocumentItems = {
  DocumentId: number;
  DocumentType: string;
  DocumentUrl: string;
};

export type MyOrdersData = {
  BalanceAmount: number;
  MinimumPaymentAmount: number;
  OrderStatusChangeReason: string | null;
  IsDocumentAvailable: boolean;
  CardNumber: string;
  CurrencySymbol: string;
  Items: Array<OrderItems>;
  OrderDate: string;
  OrderId: number;
  OrderNumber: number;
  PaymentMethod: string;
  TotalAmount: number;
  ShowDownloadInvoice: boolean;
  Documents: Array<DocumentItems>;
};

export type MyOrders = {
  Data: Array<MyOrdersData>;
  IsSuccess: boolean;
  MessageCode: string;
};

export type SendOTPPayload = {
  ChangePhoneNumberTrackingId: number;
  PhoneNumber: string;
};

export type SendOTPResponse = {
  IsSuccess: boolean;
  MessageCode: string;
  CustomKey: string | null;
  SecretKey: string | null;
  ChangePhoneNumberTrackingId: number;
};

export type oldMobileOTPPayload = {
  ChangePhoneNumberTrackingId: number;
};

export type SaveQuotationPayload = {
  VehicleListingId: string | number;
  SellerId: string | number;
};
export type SaveQuotationResponse = {
  IsSuccess: boolean;
  QuotationId: number;
  MessageCode: string;
};

export type FinanceRequestPayload = {
  VehicleListingId: string | number;
};

export type FinanceRequestResponse = {
  IsSuccess: boolean;
  QuotationId: number;
  MessageCode: string;
};

export type PackageSubscriptionDetailsResponse = {
  PackageSubscriptionId: number;
  SubscriptionInvoiceId: number;
  SubscriptionAmount: string;
  CurrencyCode: string;
  PackageDisplayName: string;
  PackageDescription: string;
};

export type promoResponse = {
  IsSuccess: boolean;
  MessageCode: string;
  PromoCodeErrorMessage: string;
};
export type InspectionType = {
  IsSuccess: boolean;
  MessageCode: string;
  PromoCodeErrorMessage: string;
};

export type PackageResponse = {
  B2CPackageSnapshotId: number;
  CRMReferenceId: number;
  CityReferenceId: number;
  CountryReferenceId: number;
  CurrencyId: number;
  Description: string;
  DisplayName: string;
  DisplayPrice: number;
  IsStandalone: boolean;
  LanguageId: number;
  PackageEndDate: string;
  PackageName: string;
  PackageReferenceId: number;
  PackageStartDate: string;
  Price: number;
  RegionReferenceId: number;
  IsInspectionNeeded: boolean;
  IsSelfListedPackage: boolean;
  InspectionType: PackageInspectionType;
  AddressTypeKey: string;
};

export type PackageInspectionType = {
  IsInspectionAtHome: false;
  IsInspectionAtPEPAC: false;
  IsInspectionByPickup: false;
};

export type CMSConfigurationResponse = {
  PageKey: string;
  ConfigurationKey: string;
  ArtifactURL: string;
  ArtifactWidth: string;
  ArtifactHeight: string;
  IsText: boolean;
  ConfigurationValue: string;
  Platform: string;
};

export type VehicleDetails = {
  Make: string;
  Model: string;
  VehicleListingId: number;
  Transmission: string;
  ListedDate: string;
  Mileage: string;
  FuelType: string;
  ModelYear: string;
  OwnerShip: string;
  DefaultWebImageThumbnailUrlPath: string;
  DefaultWebImageUrlPath: string;
  IsNew: boolean;
  DisplayPrice: number;
  Spec: string;
};

export type ServicesData = {
  CurrencyId: number;
  Description: number;
  DisplayName: string;
  DisplayPrice: number;
  Price: number;
  ServiceId: number;
};

export type QuotationResultItem = {
  QuotationAmount: string;
  SellerId: string;
  IsVASPurchaseAvailable: boolean;
  QuotationStatus: string;
  QuotationNumber: string;
  QuotationStatusForUserId: number;
  QuotationStatusForUserKey: string;
  QuotationStatusForUser: string;
  QuotationDate: string;
  VehicleDetails: VehicleDetails;
  Services: Array<ServicesData>;
};

export type QuotationResponse = {
  TotalRecords: number;
  Records: Array<QuotationResultItem>;
};

export type District = {
  District: string;
  DistrictId: number;
  CityId: number;
};

export type Province = {
  ProvinceId: number;
  Province: string;
  CountryId: number;
};

export type ProvinceCities = {
  Provinces?: Array<Province>;
  Cities?: Array<Cities>;
};

export type Locations = {
  StreetName: string;
  BuildingNumber: string;
  CountryCode: string;
  City: string;
  CityId: number;
  StateId: number;
  ZipCode: string;
  CountryId: number;
  ProvinceId: number;
  AddressTypeKey: string;
};

export type UpdateVehicleListingPayload = {
  VehicleListingId: number | null;
  UserLocationId: number | null;
};

export type UpdateVehicleListingResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type faqList = {
  key: number;
  value: string;
};

export type ServiceResponse = {
  ServiceId: number;
  ServiceName: string;
  SequenceNumber: number;
  Price: number;
  DisplayPrice: number;
  CRMReferenceId: number;
  ReferenceCode: string;
  StatusId: number;
  StatusKey: string;
  Status: string;
  CurrencyId: number;
  CurrencySymbol: string;
  ServiceTypeId: number;
  ServiceType: string;
  IsVAS: boolean;
  IsMandateForFinance: boolean;
  IsDefaultVariant: boolean;
  ServiceDescription: Array<{
    LanguageId: number;
    DisplayName: string;
    Description: string;
  }>;
};

export type CartItemServices = {
  Description: String;
  DisplayPrice: number;
  EndDate: String;
  ServiceId: number;
  Name: String;
  Price: number;
  ShoppingCartItemId: number;
  StartDate: string;
  IsMandatory: boolean;
  PricingMethod: string;
};

export type UploadMojazPayload = {
  VehicleListingId: number | null;
  FileName: any;
  FileData: string | ArrayBuffer | null;
};

export type UploadMojazResponse = {
  IsSuccess: boolean;
  MessageCode: string | null;
};

export type SaveUserAcknowledgementResponse = {
  IsSuccess: boolean;
  MessageCode: string | null;
};

export type SaveUserAcknowledgementPayload = {
  UserID: string | undefined;
  VehicleListingID: number;
  IsAccepted: boolean;
};

export type UpdateRefundStatus = {
  B2COrderItemId: number;
  RefundStatus: string;
};

export type UpdateRefundResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type MojazLiteResponse = {
  HasValidWarranty: boolean;
  LastOdometerReading: number;
  MojazBuyFullReportUrl: string;
  TotalOwners: number;
};

export type VehicleBrand = {
  MakeDisplayName: string;
  MakeId: number;
  MakeKey: string;
  LogoURL: string;
  BlackAndWhiteLogo: string;
  BannerImageURL: string;
  UseOriginalLogo: boolean;
  IsIIR: boolean;
  DoNotUseBrand: boolean;
  BannerImages: Array<BannerImage> | null;
  SubTitle: string | null;
  Title: string | null;
  IsAssociatedWithGGMDealer: boolean;
  SequenceNumber: number;
};

export type BannerImage = {
  MakeArtifactId: number;
  Platform: 'Web' | 'Mobile';
  URL: string | undefined;
};

export type FeatureData = {
  Id: number;
  FeatureCategoryId: number;
  FeatureCategoryKey: string;
  FeatureCategory: string;
  FeatureId: number;
  FeatureKey: string;
  Feature: string;
  IsAvailable: boolean;
};

export type ProfileArtifact = {
  SpecArtifactId: number | null;
  ArtifactTypeId: number;
  ArtifactTypeKey: string;
  ArtifactType: string;
  ArtifactUrl: string | null;
  ArtifactUrlPath: string | null;
  ArtifactThumbnailUrl: string;
  IsProfileImage: boolean;
  IsBaseUrlRequired: boolean;
  DisplaySequence: number;
  MimeType: string | null;
};

export type SpecificationData = {
  Type: number;
  Id: number;
  Specifications: Array<SpecificationItem>;
};

export type ColorVariantType = {
  VehicleListingId: number;
  ModelYear: number;
  Make: string;
  Model: string;
  Spec: string;
  ColorVariantId: number;
  ColorVariant: string;
  HexCode: string;
};

export type VasResponse = {
  ServiceId: number;
  ServiceName: string;
  DisplayName: string;
  Description: string;
  SequenceNumber: number;
  LanguageId: number;
  Price: number;
  DisplayPrice: number;
  ReferenceCode: string;
  CurrencySymbol: string;
  IsVAS: boolean;
  IsDefaultVariant: boolean;
  PurchaseMethod: string;
  IsMandatory: boolean;
  IsHide: boolean;
  PricingMethod: string;
  Disclaimer: string | null;
};
export type SuppliedByDataResponse = {
  Id: number;
  IsCaptive: boolean;
  Name: string;
  Type: 'Dealer' | 'Distributor';
};

export type ImportedByDataResponse = {
  ImporterId: number;
  Name: string;
};

export type FulFilledByDataResponse = {
  FulfilledId: number;
  Name: string;
};

export type TintingResponse = {
  ProductCatlogueId: number;
  Price: number;
  DisplayPrice: number;
  ShoppingCartItemId: number;
  CartReferenceId: number;
  VehicleListingId: number;
  SupplierId: number;
  SupplierName: string;
  SupplierLogo: string;
  SupplierType: string;
  EntityId: number;
  EntityType: string;
  IsTintingPriceIncludedInVehiclePrice: boolean;
  DealerId: number;
  DealerName: string;
};

export type ExtendedWarrantyArray = {
  ReferenceNumber: string;
  CoverageType: string;
  ExtensionName: string;
  Price: number;
  Duration: number;
  IsSelected: boolean;
  DisplayPrice: number;
};

export type ExtendedWarrantyResponse = {
  ErrorCode: string | null;
  IsSuccess: boolean;
  ResponseData: Array<ExtendedWarrantyArray>;
  StatusMessage: string;
};

export type DeliveryServiceResponse = {
  ProductCatalogueId: number;
  Price: number;
  DisplayPrice: number;
  FromCityId: number;
  ToCityId: number;
  DistrictId: number;
  StreatAddress: string | null;
  Latitude: string | null;
  Longitute: string | null;
  CartReferenceId: number;
  VehicleListingId: number;
  ShoppingCartItemId: number;
  SupplierId: number;
  SupplierName: string;
  SupplierLogo: string;
  SupplierType: string;
  EntityId: number;
  EntityType: string;
  DealerId: number;
  DealerName: string;
  MobileNumber: string;
  DistrictName: string | null;
  ToCityName: string | null;
  FromCityName: string | null;
};
export type HomeDeliveryAddressPayload = {
  DistrictId: number;
  StreatAddress: string;
  Latitude: string | null;
  Longitute: string | null;
  ShoppingCartId: string | string[];
  VehicleListingId: string | string[];
  ToCityId: number;
  MobileNumber: string;
};
export type RequestRefundPayload = {
  OriginalInvoiceId: number;
  Amount: number;
  RefundDescription: string;
  ItemId: string;
  SubscriptionReferenceType: string;
  IsCancelOrder: boolean;
};

export type RequestRefundResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type CheckEligibilityForFullRefundResponse = {
  IsEligibleForFullRefund: boolean;
  CurrentAmount: number;
};

export interface SearchAllResponse {
  DataCount: number;
  DataList: SearchAllResultItem[];
}

export interface SearchAllResultItem {
  Type: ProductType;
  VehicleListingId: null | string;
  ProductCatalogueId: null | string;
  ListedDate: string;
  AskingPrice: number;
  ManufactureYearId: string;
  ManufactureYear: string;
  VehicleMakeId: string;
  VehicleMake: string;
  VehicleMakeKey: string;
  VehicleModelId: string;
  VehicleModel: string;
  VehicleModelKey: string;
  SpecId: string;
  Spec: string;
  SpecKey: string;
  FuelTypeId: null | string;
  BodyTypeId: null | string;
  ExteriorColorId: null | string;
  InteriorColorId: null | string;
  TransmissionId: null | string;
  Transmission: null | string;
  FuelType: null | string;
  OwnershipId: null | string;
  Mileage: string;
  CityId: string;
  MonthlyEMI: number;
  IsSelfListedVehicle: SearchBoolean;
  ImporterId: null | string;
  DistributorId: null | string;
  FulFilledById: null | string;
  Importer: null | string;
  Distributor: null | string;
  FulfilledBy: null | string;
  VehicleProfileId: null | string;
  MfgWarranty: null | string;
  EMICalculationDate: string;
  IsNew: SearchBoolean;
  IsBaseUrlRequired: SearchBoolean;
  SellerId: null | string;
  IsOutlet: SearchBoolean;
  DealerId: null | string;
  Ownership: null | string;
  ThumbnailUrl: null | string;
  IsSold: SearchBoolean;
  IsGGMInspected: SearchBoolean;
  IsFinanceApplicable: SearchBoolean;
  Is360DegreeApplicable: SearchBoolean;
  IsMojazFacilityApplicable: SearchBoolean;
  IsAssistedSellingApplicable: SearchBoolean;
  IsExtendedWarrantyApplicable: SearchBoolean;
  VehicleFeatureCsv: string[];
  IsActive: string;
  ETag: string;
  VehicleListingStatusKey: string | null;
  Dealer: string;
}

export enum SearchBoolean {
  False = 'False',
  True = 'True',
}

export enum ProductType {
  ProductCatalogue = 'ProductCatalogue',
  VehicleListing = 'VehicleListing',
}
export type ProductCatalogueData = {
  CityId: number;
  CityName: string | null;
  ColorVariantHexCode: string;
  ColorVariantId: number;
  ColorVariantName: string;
  DisplayPrice: number;
  EMIUpdatedDate: string;
  Emi: number;
  FulFilledById: number;
  FulfilledBy: null;
  ImportedBy: string;
  ImportedById: number;
  ProductCatalogueData: string;
  Make: string;
  MakeKey: string;
  MakeCode: string;
  MakeId: 1;
  Model: string;
  ModelKey: string;
  ModelCode: string;
  ModelId: number;
  ModelYearCode: string;
  ModelYearId: number;
  Price: number;
  ProductCatalogueId: number;
  Summary: null;
  SuppliedBy: null;
  SuppliedById: number;
  Trim: string;
  TrimKey: string;
  TrimCode: string;
  TrimId: number;
  VATPercent: number;
  VehicleProfileId: number;
  Transmission: string;
  FuelType: string;
  Year: number;
  BodyType: string;
};

export type StockAvailability = {
  ProductCatalogueId: number;
  VehicleProfileId: number;
  VehicleListingId: number;
  VehicleId: number;
  ListedDate: string;
};

export type GetVariantResponse = {
  TrimId: number;
  Trim: string;
  TrimCode: string;
  FuelType: string;
  Transmission: string;
  ProductCatalogueId: number;
  VehicleProfileId: number;
  Price: number;
  DisplayPrice: number;
  EMI: number;
  EMIUpdatedDate: string;
};

export type GetColorVariantResponse = {
  ProductCatalogueId: number;
  ColorVariantId: number;
  VehicleProfileId: number;
  ColorVariant: string;
  HexCode: string;
};

export type BreadcrumbUrlObj = {
  makeKey?: string;
  make?: string;
  modelKey?: string;
  model?: string;
};

export type Breadcrumb = { label: string; route: string; sequence: number };

export type BookmarkResponse = {
  UserId: number;
  VehicleListingIds: Array<number>;
  ProductCatalogueIds: Array<number>;
};

export type ViewBreakUp = {
  BalanceAmount: number;
  BookingAmount: number;
  PriceExclTax: number;
  PriceInclTax: number;
  ProductReferenceType: string;
  Name: string;
  DisplayName: string;
  BookingPeriod: number;
  IsFinance: boolean;
};

export type ValidateFileType = {
  checkFileSize?: boolean;
  checkFileType?: boolean;
  fileSize: number;
  fileType: Array<string>;
};

export type WishListPayload = {
  VehicleListingID?: string;
  ProductCatalogueId?: string;
};

export type WishListResponse = {
  UserId: number;
  VehicleListingIds: Array<number>;
  ProductCatalogueIds: Array<number>;
};

export type UpdateDealStatusPayload = {
  VehicleDealId: number;
  VehicleDealStatusKey: string;
  Comment: string | null;
  VehicleDealArtifacts: Array<{
    FileName: string;
    Content: string | ArrayBuffer | null;
  }>;
};

export type UpdateDealStatusResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type VehicleDetailsType = {
  MakeCode: number;
  Make: string;
  MakeAr: string;
  ModelCode: number;
  Model: string;
  ModelAr: string;
  SpecCode: number;
  Spec: string;
  SpecAr: string;
  ModelYearCode: number;
  ModelYear: string;
  Title: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: string;
  CityId: number;
  City: string;
  RegionId: string;
  Region: string;
  CountryId: number;
  Country: string;
  AddressLine1: string;
  AddressLine2: string;
  VINNumber: string;
  DealCreationDate: string;
  BookingPeriod: number | null;
  SellerId: number;
  SellerFirstName: string;
  SellerLastName: string;
  SellerPhoneNumber: string;
  SellerEmailAddress: string;
  SellerAddressLine1: string | null;
  SellerAddressLine2: string | null;
  SellerCityId: number;
  SellerCity: string | null;
  SellerStateId: number;
  SellerState: string | null;
  SellerCountryId: number;
  SellerCountry: string | null;
  DealerId: number;
  DealerName: string;
  BuyerOrderNumber: string;
  ShoppingCartId: number;
  IsFinance: boolean;
  DealNumber: string;
  StatusId: number;
  VehicleDealStatusKey: string;
  VehicleDealStatus: string;
  IsNew: boolean;
  DefaultWebImageUrl: string | null;
  DefaultWebImageUrlPath: string | null;
  DefaultWebImageThumbnailUrlPath: string | null;
  DefaultWebImageThumbnailUrl: string | null;
  OEMWebImageThumbnailUrl: string;
  OEMWebImageThumbnailUrlPath: string;
  IsBaseUrlRequired: boolean;
  ListedDate: string;
  OwnerShipId: number;
  OwnerShipKey: string | null;
  OwnerShip: string | null;
  UnitOfMeasureId: number;
  UnitOfMeasureType: string;
  UnitOfMeasureValue: string;
  FuelTypeId: number;
  FuelTypeKey: string | null;
  FuelType: string | null;
  TransmissionId: number;
  TransmissionKey: string | null;
  Transmission: string | null;
  BodyTypeId: number;
  BodyTypeKey: string | null;
  BodyType: string | null;
  Mileage: number;
  AskingPrice: number;
  IsGGMDigitalDealerVehicle: boolean;
  VehicleProfileId: number;
  DisplayAmount: number;
  DepositAmount: number;
  ShowGenerateBalancePayment: boolean;
  BalanceAmount: number;
};

export type DealsResponse = {
  UserId: number;
  VehicleDealId: number;
  VehicleDealStatusWorkFlow: Array<{
    VehicleDealStatusWorkflowId: number;
    VehicleDealStatusId: number;
    StatusChangeByUserId: number;
    VehicleDealStatusKey: string;
    VehicleDealStatus: string;
    DealCreationDate: string;
    StatusChangeDate: string;
    Comments: string;
    CreatedById: string;
    CreatedBy: string;
    Artifacts: [];
  }>;
  VehicleDetails: VehicleDetailsType;
  VehicleListingId: number;
};

export type UserInterestPayload = {
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  CountryId: number;
  ZipCode: string;
  BuyerUserId: number;
  CityId: number;
  RegionId: number;
  ProductCatalogueId: number;
  VehicleListingId: number;
  IsFinance: boolean;
  IsLookingForOld: boolean;
  PurchasePlanDurationKey: string;
};

export type VerifyInterestOtpPayload = {
  Identifier: string;
  OTP: number;
  SecretKey: string;
  VehicleLeadId: number;
};

export type VerifyInterestOtpResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type PurchaseDurationResponse = {
  LanguageId: number;
  PurchasePlanDuration: string;
  PurchasePlanDurationId: number;
  PurchasePlanDurationKey: string;
};

export type SendVerificationCodePayload = {
  EmailAddress: string;
};

export type SendVerificationCodeResponse = {
  SecretKey: string;
};

export type VerifyEmailOTPPayload = {
  Email: string;
  SecretKey: string;
  VerificationCode: number;
};

export type VerifyEmailOTPResponse = {
  IsSuccess: boolean;
  MessageCode: string;
};

export type EMIConfigurationData = {
  AdminFeesPercentage: number;
  AdminMaxFeesAmount: number;
  BalloonPaymentPercentage: number;
  BirthYear: null | string | number;
  CountryId: null | number;
  DepreciatedPercentage: number;
  DownPaymentPercentage: number;
  Duration: number;
  EMIConfigurationID: number;
  GenderId: null | number;
  InsurancePercentage: number;
  NetIncomePerMonth: null | number | string;
  NewCarDepreciatedPercentage: number;
  ProfitRate: number;
  WorkingSectorId: null | number;
};

export type AllConfigurationResponse = {
  Configurations: any;
  EMIConfiguration: EMIConfigurationData;
  EMIConfigurationUsedCar: EMIConfigurationData;
  TopBrands: any;
  TopCities: any;
};

export type MediaPageSectionDetailsData = {
  MediaPageSectionId: number;
  MediaPageSectionKey: string;
  Title: string;
  SubTitle: string;
};

export type MediaPageArtifactDetailsData = {
  MediaPageSectionId: number;
  MediaPageSectionKey: string;
  MediaPageArtifactId: number;
  URL: string;
  MediaPageArtifactType: string;
};

export type MediaPageCTADetailsData = {
  MediaPageSectionKey: string;
  MediaPageCTAId: number;
  CTAText: string;
  CTAUrl: string;
};

export type MediaPageRibbonDetailsData = {
  MediaPageSectionKey: string;
  MediaPageRibbonId: number;
  RibbonHeader: string;
  Description: string;
};

export type MediaPageListingPointsData = {
  MediaPageSectionKey: string;
  MediaPageListingPointId: number;
  Description: string;
};

export type MediaPageProcessToBuyDetailsData = {
  MediaPageSectionKey: string;
  MediaPageProcessToBuyId: number;
  Header: string;
  Description: string;
  ImageUrl: string;
  Platform: string;
};

export type VASPageDetailsResponse = {
  MediaPageSectionDetails: Array<MediaPageSectionDetailsData>;
  MediaPageArtifactDetails: Array<MediaPageArtifactDetailsData>;
  MediaPageCTADetails: Array<MediaPageCTADetailsData>;
  MediaPageRibbonDetails: Array<MediaPageRibbonDetailsData>;
  MediaPageListingPoints: Array<MediaPageListingPointsData>;
  MediaPageProcessToBuyDetails: Array<MediaPageProcessToBuyDetailsData>;
};

export type TestimonialsDataResponse = {
  Title: string;
  SubTitle: string;
  MediaPageTestimonials: Array<{
    EmailAddress: string;
    AutherImagePath: string;
    Rating: number;
    From: string;
    Description: string;
    Platform: string;
    CreatedDate: string;
    UpdatedDate: string;
  }>;
};

export type MediaConfigurationDataResponse = {
  MediaPageConfigurationId: number;
  MediaPageId: number;
  MediaPageConfigurationKey: string;
  MediaPageConfigurationValue: string;
  CreatedDate: string;
  CreatedBy: string;
  UpdatedDate: string;
  UpdatedBy: string;
};

export type Trim = {
  TrimId: number;
  TrimCode: number;
  TrimKey: string;
  ModelId: number;
  CreatedDate: string;
  CreatedBy: string | null;
  UpdatedDate: string | null;
  UpdatedBy: string | null;
  IsActive: boolean;
  BodyTypeId: number | null;
  FuelTypeId: number;
  TransmissionTypeId: number;
  CommunicationColorId: number | null;
  VehicleSubSegmentId: number | null;
  StartDate: string | null;
  EndDate: string | null;
  TrimIdentifier: any;
  Trim: string;
  Transmission: string;
  FuelType: string;
};
export type VehicleTrimsResponse = {
  status: number;
  data: {
    trims: Array<Trim>;
  };
};

export type VehicleImageVerificationResponse = {
  status: number;
  data: {
    isVehicle?: boolean;
    is_vehicle?: boolean;
    type?: string;
    subType?: string;
    description?: string;
  };
};

export type CityV1 = {
  region_id: number;
  city_id: number;
  city_name_ar: string;
  city_name_en: string;
  city_is_popular: 0 | 1 | null;
  city_img_path: string;
  region_name_en: string;
  region_name_ar: string;
  region_is_popular: 0 | 1 | null;
  region_img_path: string;
};

export type CitiesResponseV1 = {
  status: number;
  data: {
    popular_cities: Array<CityV1>;
    cities: Array<CityV1>;
  };
};
