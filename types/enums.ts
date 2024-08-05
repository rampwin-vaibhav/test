/** @enum {string} */
export enum Locales {
  EN = 'en',
  AR = 'ar',
}

/** @enum {string} */
export enum Privileges {
  ShareListing = 'ShareListing',
  SaveListing = 'SaveListing',
  ViewListing = 'ViewListing',
  ViewDetails = 'ViewDetails',
  SellItForMe = 'SellItForMe',
  ListItForMe = 'ListItForMe',
  EditVehicle = 'EditVehicle',
  DeleteVehicle = 'DeleteVehicle',
  RecentlyViewedVehicles = 'RecentlyViewedVehicles',
  ViewSellerDetails = 'ViewSellerDetails',
  SaveBookmark = 'SaveBookmark',
  RemoveBookmark = 'RemoveBookmark',
  SaveListingSearch = 'SaveListingSearch',
  RemoveListingSearch = 'RemoveListingSearch',
  ViewListingSearch = 'ViewListingSearch',
  UpdateListingSearch = 'UpdateListingSearch',
  ViewBookmarks = 'ViewBookmarks',
  ViewTestDriveAvailabilities = 'ViewTestDriveAvailabilities',
  ViewListingImageArtifactTypes = 'ViewListingImageArtifactTypes',
  ViewListingDocumentArtifactTypes = 'ViewListingDocumentArtifactTypes',
  ViewPetrominLocations = 'ViewPetrominLocations',
  SearchUser = 'SearchUser',
  SoldVehicle = 'SoldVehicle',
  DownloadDocument = 'DownloadDocument',
  ViewSellerDocumentArtifactTypes = 'ViewSellerDocumentArtifactTypes',
  ViewBuyerDocumentArtifactTypes = 'ViewBuyerDocumentArtifactTypes',
  ViewSellerTestDriveAvailableDates = 'ViewSellerTestDriveAvailableDates',
  SaveBuyerTestDriveAvailableDates = 'SaveBuyerTestDriveAvailableDates',
  ViewBuyerTestDriveAvailableDates = 'ViewBuyerTestDriveAvailableDates',
  SaveConcierge = 'SaveConcierge',
  ViewConcierge = 'ViewConcierge',
  RemoveConcierge = 'RemoveConcierge',
  ViewBuyerDocuments = 'ViewBuyerDocuments',
  ViewListingDocuments = 'ViewListingDocuments',
  ViewListingImages = 'ViewListingImages',
  ViewVehicleUpdateFields = 'ViewVehicleUpdateFields',
  ViewInspectionAppointment = 'ViewInspectionAppointment',
  ViewVehicleTestDriveAvailableDetails = 'ViewVehicleTestDriveAvailableDetails',
  GetInspectionSlots = 'GetInspectionSlots',
  CreateInspectionAppointment = 'CreateInspectionAppointment',
  SaveFindCarSupport = 'SaveFindCarSupport',
}

/** @enum {string} */
export enum Roles {}

/** @enum {string} */
export enum TokenGrantType {
  GrantType = 'authorization_code',
  RefreshTokenGrantType = 'refresh_token',
}

/** @enum {string} */
export enum ConfigurationKey {
  CareersEmailId = 'CareersEmailId',
  IsAbsherVerificationRequired = 'IsAbsherVerificationRequired',
  IsUserAddressVerificationRequired = 'IsUserAddressVerificationRequired',
  InspectionFees = 'InspectionFees',
  MinAskingPrice = 'MinAskingPrice',
  LaunchOfferValidDate = 'LaunchOfferValidDate',
  IsVehicleExistenceWithMojazRequired = 'IsVehicleExistenceWithMojazRequired',
  IsVehicleOwnershipVerificationWithYakeenRequired = 'IsVehicleOwnershipVerificationWithYakeenRequired',
  InvoiceDocumentFromEnglish = 'InvoiceDocumentFromEnglish',
  InvoiceDocumentFromArabic = 'InvoiceDocumentFromArabic',
  GoGoMotorAddressLine1English = 'GoGoMotorAddressLine1English',
  GoGoMotorAddressLine1Arabic = 'GoGoMotorAddressLine1Arabic',
  GoGoMotorAddressLine2English = 'GoGoMotorAddressLine2English',
  GoGoMotorAddressLine2Arabic = 'GoGoMotorAddressLine2Arabic',
  CustomerPhoneNumber = 'CustomerPhoneNumber',
  IsNewCarEnabled = 'IsNewCarEnabled',
  PromotionCodeForCampaignUser = 'PromotionCodeForCampaignUser',
  IsPayfortEnabled = 'IsPayfortEnabled',
  MaxAskingPrice = 'MaxAskingPrice',
  DateFormat = 'DateFormat',
  DateTimeFormat = 'DateTimeFormat',
  MaxImageSizeInMB = 'MaxImageSizeInMB',
  MaxDocumentSizeInMB = 'MaxDocumentSizeInMB',
  IsRestrictOnBoardingFromWebForSelfListed = 'IsRestrictOnBoardingFromWebForSelfListed',
  OutletVehiclePurchaseDisclaimer = 'OutletVehiclePurchaseDisclaimer',
  EMICalculatorURL = 'EMICalculatorURL',
  VATGroupRegistrationNumber = 'VATGroupRegistrationNumber',
  FinanceItURL = 'FinanceItURL',
  PromotionCodeForSelfListCampaign = 'PromotionCodeForSelfListCampaign',
  PromotionCodeForSelfListPackageId = 'PromotionCodeForSelfListPackageId',
  SelfListPromotionCodeForCampaignUser = 'SelfListPromotionCodeForCampaignUser',
  SelfListPackageIdForCampaignUser = 'SelfListPackageIdForCampaignUser',
  BypassIdentityVerificationCheckToViewSellerDetails = 'BypassIdentityVerificationCheckToViewSellerDetails',
  MinimumFinanceRateForUsedCars = 'MinimumFinanceRateForUsedCars',
}

/** @enum {string} */
export enum SocialMedia {
  Facebook = 'FB',
  Instagram = 'INSTAGRAM',
  LinkedIn = 'LINKEDIN',
  Twitter = 'TWITTER',
  WhatsApp = 'WA',
  Email = 'MAIL',
  YouTube = 'YOUTUBE',
}

/** @enum {string} */
export enum SocialMediaPlatform {
  Facebook = 'FB',
  Instagram = 'Inst',
  Twitter = 'TW',
  WhatsApp = 'WA',
  Email = 'MAIL',
  YouTube = 'YT',
}

/** @enum {string} */
export enum AuthAction {
  ChangePhone = 'CHANGEPHONE',
}

/** @enum {string} */
export enum UserProfileStatus {
  YetToCreate = 'YetToCreate',
  Draft = 'Draft',
  Validated = 'Validated',
}

/** @enum {string} */
export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

/** @enum {string} */
export enum VehicleAgeType {
  All = 'all',
  New = 'new-cars',
  Old = 'used-cars',
  Outlet = 'outlet',
}

/** @enum {string} */
export enum SortByFilter {
  AskingPrice = 'AskingPrice',
  ListedDate = 'ListedDate',
  Mileage = 'Mileage',
  ManufactureYear = 'ManufactureYear',
  MonthlyEMI = 'MonthlyEMI',
}

/** @enum {string} */
export enum MultipleSortByFilter {
  Location = 'City',
  Importer = 'Importer',
  Supplier = 'Distributor',
  AskingPrice = 'AskingPrice',
  ManufactureYear = 'ManufactureYear',
  VehicleMake = 'VehicleMake',
  VehicleModel = 'VehicleModel',
  Spec = 'Spec',
}

/** @enum {string} */
export enum FilterType {
  Make = 'Make',
  Model = 'Model',
  Spec = 'Spec',
  BodyType = 'BodyType',
  Feature = 'Feature',
  Mileage = 'Mileage',
  Year = 'Year',
  Price = 'Price',
  FuelType = 'FuelType',
  ExteriorColor = 'ExteriorColor',
  InteriorColor = 'InteriorColor',
  Ownership = 'Ownership',
  Transmission = 'Transmission',
  Status = 'Status',
  City = 'City',
  SearchKey = 'SearchKey',
  EMI = 'MonthlyEMI',
  ImportedBy = 'ImportedBy',
  SuppliedBy = 'SuppliedBy',
  Dealer = 'Dealer',
  FulFilledBy = 'FulFilledBy',
  VehicleType = 'VehicleType',
}

/** @enum {string} */
export enum VehicleEvent {
  ShareListingLogs = 'ShareListingLogs',
}

/** @enum {string} */
export enum AffordableCars {
  CarsUnder20000 = 'CarsUnder20000',
  GreatDeal = 'GreatDeal',
  ShopByCarFeatures = 'ShopByCarFeatures',
}

export enum ServiceType {
  AutoCare = 'AutoCare',
  AutoPaint = 'AutoPaint',
  Tristar = 'Tristar',
}
export enum ImageArtifactKey {
  ProfileView = 'profile-view',
  RightSide = 'right-side',
  LeftSide = 'left-side',
  FrontView = 'front-view',
  Boot = 'boot',
  FrontWindScreen = 'front-windscreen',
  Dashboard = 'dashboard',
  GearShift = 'gear-shift',
  Odometer = 'odometer',
  ClutchPedal = 'abc-pedal',
  FrontSeat = 'car-front-seat',
  BackSeat = 'car-back-seats',
  RearWindScreen = 'rearwind-screen',
  RearView = 'rear-view',
  SpinProfileView = 'spincar-profile-view',
  Spin360View = 'spincar-360-view',
  DmgEvidenceBefore = 'Dmg-Evidence-Before',
  DmgEvidenceAfter = 'Dmg-Evidence-After',
  VehicleVideo = 'vehicle-video',
}
export enum MfgImageArtifactKey {
  MfgVideo = 'mfg-video',
  MfgDocument = 'mfg-document',
}
/** @enum {string} */
export enum TestDriveKeys {
  AllDate = 'AllDates',
  Weekend = 'Weekends',
  DateRange = 'DateRange',
  Date = 'Date',
  RequestBuyer = 'RequestBuyerToConnectForTD',
}

/** @enum {string} */
export enum VehicleListingSource {
  SellItForMe = 'SellItForMe',
  ListItForMe = 'ListItForMe',
}

/** @enum {string} */
export enum AbsherMessageCode {
  ABSHER_SEND_OTP_ERROR = 'ABSHER_SEND_OTP_ERROR',
  GENERATE_ABSHER_VERIFICATION_CODE_FAILED = 'GENERATE_ABSHER_VERIFICATIONCODE_FAILED',
  ABSHER_VERIFICATION_CODE_NOT_FOUND = 'ABSHER_VERIFICATION_CODE_NOT_FOUND',
  ABSHER_VERIFICATION_CODE_EXPIRED = 'ABSHER_VERIFICATIONCODE_EXPIRED',
  ABSHER_OTP_ATTEMPTS_EXCEEDED = 'ABSHER_OTP_ATTEMPTS_EXCEEDED',
  ABSHER_VERIFICATION_FAILED = 'ABSHER_VERIFICATION_FAILED',
  INCORRECT_VERIFICATION_CODE = 'INCORRECT_VERIFICATIONCODE',
  ABSHER_VERIFICATION_SUCCESS = 'ABSHER_VERIFICATION_SUCCESS',
}

/** @enum {string} */
export enum YakeenMessageCode {
  YAKEENINFORMATION_VERIFICATION_UPDATION_FAILED = 'YAKEENINFORMATION_VERIFICATION_UPDATION_FAILED',
  YAKEENINFORMATION_NOT_MATCHED = 'YAKEENINFORMATION_NOT_MATCHED',
  YAKEENINFORMATION_NOT_SAVED = 'YAKEENINFORMATION_NOT_SAVED',
}

export enum ConciergeType {
  BodyType = 'BodyType',
  VehicleType = 'VehicleType',
  Budget = 'Budget',
  Transmission = 'Transmission',
  FuelType = 'FuelType',
}

/** @enum {string} */
export enum ListingStatus {
  Saved = 'Saved',
  InspectionReady = 'InspectionReady',
  InspectionRejected = 'InspectionRejected',
  QualityCheckReady = 'QualityCheckReady',
  QCRequestForAChange = 'QCRequestForAChange',
  Listed = 'Listed',
  Sold = 'Sold',
  Deleted = 'Deleted',
  Delisted = 'Delisted',
  AwaitedListing = 'AwaitedListing',
  AwaitedRVApproval = 'AwaitedRVApproval',
  QCRejected = 'QCRejected',
  ListedInitiatedForUpgrade = 'ListedInitiatedForUpgrade',
  ListedSurveyReadyForUpgrade = 'ListedSurveyReadyForUpgrade',
  ListedSurveyRejectedForUpgrade = 'ListedSurveyRejectedForUpgrade',
  ListedQCReadyForUpgrade = 'ListedQCReadyForUpgrade',
  ListedQCRequestForAChangeForUpgrade = 'ListedQCRequestForAChangeForUpgrade',
  ListedQCRejectedForUpgrade = 'ListedQCRejectedForUpgrade',
  ListedReadyForRV = 'ListedReadyForRV',
  Booked = 'Booked',
}

/** @enum {string} */
export enum ELMChoice {
  Iqama = 'Iqama',
  Nin = 'Nin',
}

/** @enum {string} */
export enum VehicleListingWorkflowNumber {
  Saved = 1,
  InspectionReady = 2,
  AwaitedRVApproval = 2,
  InspectionRejected = 3,
  QualityCheckReady = 4,
  QCRequestForAChange = 5,
  QCRejected = 6,
  AwaitedListing = 7,
  Listed = 8,
  Sold = 9,
  Deleted = 10,
  Delisted = 11,
}

/** @enum {string} */
export enum ConciergeFrequency {
  WEEKLY = 'Weekly',
  DAILY = 'Daily',
}

/** @enum {string} */
export enum FuelTypeKey {
  Diesel = 'Diesel',
  Electric = 'Electr',
  Hybrid = 'Hybrid',
  Lpg = 'Lpg',
  Mhev = 'Mhev',
  Petrol = 'Petrol',
  Phev = 'Phev',
}

/** @enum {string} */
export enum TransmissionType {
  Automatic = 'Automatic',
  Manual = 'Manual',
}

/** @enum {string} */
export enum GenderId {
  MALE = '1',
  FEMALE = '2',
}

export enum ProductReferenceType {
  B2CPackage = 'B2CPackage',
  Vehicle = 'Vehicle',
  B2CService = 'B2CService',
  PromoCode = 'PromoCode',
  B2CPackageCreditItem = 'B2CPackageCreditItem',
}

/** @enum {string} */
export enum ServiceParameterValue {
  Full = 'FULL',
}

/** @enum {string} */
export enum ReferenceType {
  B2CPackage = 'B2CPackage',
  B2BPackage = 'B2BPackage',
  B2CService = 'B2CService',
  Vehicle = 'Vehicle',
}

/** @enum {string} */
export enum SubscriptionReferenceType {
  B2COrder = 'B2COrder',
  PromoCode = 'PromoCode',
}

/** @enum {string} */
export enum CartCount {
  NINEPLUS = '9+',
}

export enum PaymentType {
  MasterCard = 'MASTERCARD',
  Visa = 'VISA',
  STCPAY = 'STCPAY',
  APPLE_PAY = 'APPLE_PAY',
  MADA = 'MADA',
  AMEX = 'AMEX',
}

export enum VASServiceType {
  MotorInsurance = 'MotorInsurance',
  WarrantyService = 'WarrantyService',
  RoadsideAssistance = 'RoadsideAssistance',
  CarCare = 'CarCare',
  Reconditioning = 'Reconditioning',
  ServiceContract = 'ServiceContract',
}

export enum ServiceStatus {
  Saved = 'Saved',
  Active = 'Active',
  Deactive = 'Deactive',
  Delete = 'Delete',
}

/** @enum {string} */
export enum VehicleListingStatus {
  Saved = 1,
  InspectionReady = 2,
  InspectionRejected = 3,
  QualityCheckReady = 4,
  QCRequestForAChange = 5,
  Listed = 6,
  Sold = 7,
  Deleted = 8,
  Delisted = 9,
  AwaitedListing = 10,
  AwaitedRVApproval = 11,
  QCRejected = 12,
  Booked = 20,
}

/** @enum {string} */
export enum ArtifactCategory {
  VehicleListingImage = 'VehicleListingImage',
  VehicleListingDocument = 'VehicleListingDocument',
  ProfileImage = 'ProfileImage',
  ProfileDocument = 'ProfileDocument',
  PortalImage = 'PortalImage',
  PortalVideo = 'PortalVideo',
  SellerDocument = 'SellerDocument',
  BuyerDocument = 'BuyerDocument',
  FeedbackImage = 'FeedbackImage',
  FeedbackVideo = 'FeedbackVideo',
  SupportImage = 'SupportImage',
  VehicleListingInspectionImage = 'VehicleListingInspectionImage',
  VehicleListingSpinCarImage = 'VehicleListingSpinCarImage',
  VehicleListingSpinCar360 = 'VehicleListingSpinCar360',
  VehicleSupplierImage = 'VehicleSupplierImage',
  VehicleDmgEvidence = 'VehicleDmgEvidence',
  VehicleEBrochure = 'VehicleEBrochure',
}

/** @enum {string} */
export enum PageKey {
  ListingModel = 'ListingModel',
  NewListing = 'NewListing',
  NewDetails = 'NewDetails',
  NewListingV1 = 'NewListingV1',
  NewDetailsV1 = 'NewDetailsV1',
  OutletIntro = 'OutletIntro',
  Outlet = 'Outlet',
  OutletDetails = 'OutletDetails',
}

/** @enum {string} */
export enum BreadcrumbNavItem {
  Home = 'Home',
  BrandSearch = 'BrandSearch',
  ModelListing = 'ModelListing',
  VehicleListing = 'VehicleListing',
  VehicleListingWithMakeOnly = 'VehicleListingWithMakeOnly',
  OutletOverview = 'OutletOverview',
  Outlet = 'Outlet',
  OutletListing = 'OutletListing',
}

/** @enum {string} */
export enum VehicleTypeItem {
  New = 'New',
  Outlet = 'Outlet',
  PreOwned = 'PreOwned',
  SelfListed = 'SelfListed',
}

export enum TypeOfPayment {
  Finance = 'Finance',
  Cash = 'Cash',
}
