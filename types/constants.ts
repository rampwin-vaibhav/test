import {
  AffordableCars,
  SortByFilter,
  ListingStatus,
  VehicleListingStatus,
  MultipleSortByFilter,
  BreadcrumbNavItem,
  PageKey,
  VehicleTypeItem,
  TypeOfPayment,
} from './enums';
import { LabelConstants } from './i18n.labels';
import { Breadcrumb, BreadcrumbUrlObj } from './models';
import { i18n } from 'next-i18next';

export const OtherColorHexCode = '######';
export const UnitOfMeasureId = 1;
export const PageSizes = [15, 30, 50];
export const ApplicationKey = 'GGM-Portal';
export const AppTheme = {
  Default: 'default',
  V1: 'v1',
};

export const SortBy = [
  { key: 'LISTING_DATE', value: SortByFilter.ListedDate },
  { key: 'PRICE', value: SortByFilter.AskingPrice },
  { key: 'MILEAGE', value: SortByFilter.Mileage },
  { key: 'MANUFACTURING_YEAR', value: SortByFilter.ManufactureYear },
  { key: 'MONTHLY_EMI', value: SortByFilter.MonthlyEMI },
];

export const MultipleSortBy = [
  { key: 'LOCATION', value: MultipleSortByFilter.Location },
  { key: 'IMPORTER', value: MultipleSortByFilter.Importer },
  { key: 'SUPPLIER', value: MultipleSortByFilter.Supplier },
  { key: 'PRICE', value: MultipleSortByFilter.AskingPrice },
  { key: 'MANUFACTURING_YEAR', value: MultipleSortByFilter.ManufactureYear },
];

export const VehicleRequiredImages = [
  'profile-view',
  'right-side',
  'left-side',
  'front-view',
];

export const AffordableCarsFilter = [
  {
    key: AffordableCars.ShopByCarFeatures,
    label: 'SHOP_BY_CAR_FEATURES',
  },
  {
    key: AffordableCars.GreatDeal,
    label: 'SHOP_GREAT_DEAL',
  },
];

export const VehicleRequiredDocs = ['rc', 'bank-noc'];

export const InsuranceArtifacts = ['insurance', 'third-party-insurance'];

export const TitleTransferUrl =
  'https://www.absher.sa/wps/portal/individuals/static/vot/!ut/p/z0/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziDQ1dLDyM3A18LAwsnAwCXdzcjZxCjQ0MQs31g1Pz9AuyHRUBQ2zpbQ!!/#:~:text=Vehicle%20Ownership%20Transfer&text=Welcome%20to%20the%20vehicle%20sale,sale%20at%20a%20specified%20price.';

export const ApplicationSource = 'OnboardingFormalDMS';

export const DealerApplicationErrorCodes = {
  ERROR_DEALER_REGISTRATION_ID_EXIST: 'ERROR_DEALER_REGISTRATION_ID_EXIST',
  ERROR_DEALER_PRIMARY_EMAIL_EXIST: 'ERROR_DEALER_PRIMARY_EMAIL_EXIST',
  ERROR_DEALER_SECONDARY_EMAIL_EXIST: 'ERROR_DEALER_SECONDARY_EMAIL_EXIST',
  ERROR_DEALER_PRIMARY_PHONE_EXIST: 'ERROR_DEALER_PRIMARY_PHONE_EXIST',
  ERROR_DEALER_SECONDARY_PHONE_EXIST: 'ERROR_DEALER_SECONDARY_PHONE_EXIST',
  ERROR_DEALER_SAVE: 'ERROR_DEALER_SAVE',
};

export const defaultCity = 'Tabuk';

export const SpinCar360Parameters = '!disableautospin!hidecarousel';

export const RedirectURL = 'redirect_uri';

export const apiDateFormat = 'YYYY-MM-DD';

export const CMSPageKey = {
  HomePage: 'HomePage',
  FinanceIt: 'FinanceIt',
  Disclaimer: 'Disclaimer',
  Information: 'Information',
};

export const CMSConfigurationKey = {
  BannerImageWeb: 'BannerImageWeb',
  DefaultBannerWeb: 'DefaultBannerWeb',
  OutletVehiclesIntroduction: 'OutletVehiclesIntroduction',
};

export const OrderItemStatus = {
  ACTIVE: 'Active',
  CANCELLED: 'Cancelled',
};

export const UserPreference = '_SEARCH_PREFERENCE';
export const MultipleUserPreference = '_MULTIPLE_SEARCH_PREFERENCE';

export const AddressTypeKey = {
  Home: 'Home',
};

export const CountryCodes = [
  {
    code: 'in',
    value: '+91',
    inputMask: '#00 000 0000',
  },
  {
    code: 'sa',
    value: '+966',
    inputMask: '#00 000 000',
  },
];

export const AutoDataMarketValueIndicators = {
  BELOW_MARKET_VALUE: 'BELOW_MARKET_VALUE',
  ABOVE_MARKET_VALUE: 'ABOVE_MARKET_VALUE',
  TOO_LOW_THAN_MARKET_PRICE: 'TOO_LOW_THAN_MARKET_PRICE',
  TOO_HIGH_THAN_MARKET_PRICE: 'TOO_HIGH_THAN_MARKET_PRICE',
};

export const AddressType = {
  PETROMIN_LOCATION: 'PetrominLocation',
};

export const SignInRedirectType = {
  BookMark: 'BookMark',
  ClickedSellerDetails: 'ClickedSellerDetails',
  ViewedInspectionReport: 'ViewedInspectionReport',
  MyCarValue: 'MyCarValue',
  ListACar: 'ListACar',
  BuyerUploadDoc: 'BuyerUploadDoc',
};

export const RequestRefund = {
  RequestRefundKey: 'RefundRequested',
  Refunded: 'Refunded',
};

export const InvoiceStatus = {
  PAID: 'Paid',
};

export const StatusAllowedForUpgrade: Array<string> = [
  ListingStatus.Saved,
  ListingStatus.Listed,
  ListingStatus.AwaitedRVApproval,
  ListingStatus.InspectionReady,
  ListingStatus.QualityCheckReady,
  ListingStatus.QCRequestForAChange,
];

export const StatusIDsAllowedForUpgrade: Array<number> = [
  VehicleListingStatus.Saved,
  VehicleListingStatus.Listed,
  VehicleListingStatus.AwaitedRVApproval,
  VehicleListingStatus.InspectionReady,
  VehicleListingStatus.QualityCheckReady,
  VehicleListingStatus.QCRequestForAChange,
];

export const ImageCategoryKey = {
  Other: 'Other',
};

export const ProfileArtifactType = {
  VehicleProfile: 'VehicleProfile',
  Trim: 'Trim',
  VehicleListing: 'VehicleListing',
};

export const PricingMethod = {
  Static: 'Static',
  Dynamic: 'Dynamic',
  Free: 'Free',
};
export const MimeTypes = {
  ImagePNG: 'image/png',
  ImageJPEG: 'image/jpeg',
  ImageJPG: 'image/jpg',
  ImageWebP: 'image/webp',
  ImageBMP: 'image/bmp',

  VideoMP4: 'video/mp4',

  ApplicationPDF: 'application/pdf',
  ApplicationDOCX:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ApplicationDOC: 'application/msword',
};

export const VASPurchaseMethod = {
  Cash: 'Cash',
  Finance: 'Finance',
};

export const ServiceName = {
  RoadsideAssistance: 'Roadside Assistance',
  ExtendedWarranty: 'Extended Warranty',
  TintingServices: 'Tinting Services',
  HomeDelivery: 'Home Delivery',
  VehicleRegistration: 'Vehicle Registration',
};
export const BreadcrumbsHierarchy = [
  {
    pageKey: PageKey.ListingModel,
    list: [BreadcrumbNavItem.Home, BreadcrumbNavItem.BrandSearch],
  },
  {
    pageKey: PageKey.NewListing,
    list: [
      BreadcrumbNavItem.Home,
      BreadcrumbNavItem.BrandSearch,
      BreadcrumbNavItem.ModelListing,
    ],
  },
  {
    pageKey: PageKey.NewDetails,
    list: [
      BreadcrumbNavItem.Home,
      BreadcrumbNavItem.BrandSearch,
      BreadcrumbNavItem.ModelListing,
      BreadcrumbNavItem.VehicleListing,
    ],
  },
  {
    pageKey: PageKey.NewListingV1,
    list: [BreadcrumbNavItem.Home, BreadcrumbNavItem.BrandSearch],
  },
  {
    pageKey: PageKey.NewDetailsV1,
    list: [
      BreadcrumbNavItem.Home,
      BreadcrumbNavItem.BrandSearch,
      BreadcrumbNavItem.VehicleListingWithMakeOnly,
    ],
  },
  { pageKey: PageKey.OutletIntro, list: [BreadcrumbNavItem.Home] },
  {
    pageKey: PageKey.Outlet,
    list: [BreadcrumbNavItem.Home, BreadcrumbNavItem.OutletOverview],
  },
  {
    pageKey: PageKey.OutletDetails,
    list: [
      BreadcrumbNavItem.Home,
      BreadcrumbNavItem.OutletOverview,
      BreadcrumbNavItem.OutletListing,
    ],
  },
];

export const Breadcrumbs = [
  {
    key: BreadcrumbNavItem.Home,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => {
      return {
        label: String(i18n?.t(LabelConstants.HOME)),
        route: '/',
        sequence: 1,
      };
    },
  },
  {
    key: BreadcrumbNavItem.BrandSearch,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => {
      return {
        label: String(i18n?.t(LabelConstants.NEW_CARS)),
        route: '/newcars/new',
        sequence: 2,
      };
    },
  },
  {
    key: BreadcrumbNavItem.ModelListing,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => {
      return {
        label: o.make || '',
        route: `/newcars/new?m=${o.makeKey}`,
        sequence: 3,
      };
    },
  },
  {
    key: BreadcrumbNavItem.VehicleListing,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => {
      return {
        label: `${o.make} ${o.model}`,
        route: `/newcars/new/${o.makeKey}/${o.modelKey}`,
        sequence: 4,
      };
    },
  },
  {
    key: BreadcrumbNavItem.VehicleListingWithMakeOnly,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => {
      return {
        label: `${o.make}`,
        route: `/newcars/new/${o.makeKey}`,
        sequence: 4,
      };
    },
  },
  {
    key: BreadcrumbNavItem.OutletOverview,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => ({
      label: String(i18n?.t(LabelConstants.OUTLET_OVERVIEW_LABEL)),
      route: '/newcars/outlet/intro',
      sequence: 2,
    }),
  },
  {
    key: BreadcrumbNavItem.OutletListing,
    getMapping: (o: BreadcrumbUrlObj): Breadcrumb => ({
      label: String(i18n?.t(LabelConstants.LISTING_LABEL)),
      route: '/newcars/outlet',
      sequence: 3,
    }),
  },
];

export const VinNumberLength = 17;

export const VehicleTypes = [
  {
    VehicleKey: VehicleTypeItem.New,
    VehicleType: LabelConstants.NEW,
  },
  {
    VehicleKey: VehicleTypeItem.Outlet,
    VehicleType: LabelConstants.OUTLET,
  },
  {
    VehicleKey: VehicleTypeItem.PreOwned,
    VehicleType: LabelConstants.PRE_OWNED,
  },
  {
    VehicleKey: VehicleTypeItem.SelfListed,
    VehicleType: LabelConstants.SELF_LISTED,
  },
];

export const FileExtensionMetaData = [
  { type: MimeTypes.ImagePNG, value: 'PNG' },
  { type: MimeTypes.ImageJPEG, value: 'JPEG' },
  { type: MimeTypes.ImageJPG, value: 'JPG' },
  { type: MimeTypes.ApplicationPDF, value: 'PDF' },
];

export const DocMimeTypes = [
  MimeTypes.ImagePNG,
  MimeTypes.ImageJPEG,
  MimeTypes.ImageJPG,
  MimeTypes.ApplicationPDF,
];

export const VehicleDealStatusKey = {
  BalanceDoneByCustomer: 'BalancePaymentDoneByCustomer',
};
export const DocumentTypeLabelMapping: { [key: string]: string } = {
  SubscriptionInvoice: 'DOC_TYPE_SUBSCRIPTION_INVOICE',
  RecieptInvoice: 'DOC_TYPE_RECEIPT_INVOICE',
  QuotationDocument: 'DOC_TYPE_QUOTATION_DOCUMENT',
  GenericInvoice: 'DOC_TYPE_GENERIC_INVOICE',
  DebitNote: 'DOC_TYPE_DEBIT_NOTE',
  CreditNote: 'DOC_TYPE_CREDIT_NOTE',
  Quotation: 'DOC_TYPE_QUOTATION',
  DeliveryNote: 'DOC_TYPE_DELIVERY_NOTE',
  VehicleInvoice: 'DOC_TYPE_VEHICLE_INVOICE',
  Po: 'DOC_TYPE_PO_DOCUMENT',
  ProformaInvoice: 'DOC_TYPE_PROFORMA_INVOICE',
  FinalInvoice: 'DOC_TYPE_FINAL_INVOICE',
  PurchaseOrder: 'DOC_TYPE_PURCHASE_ORDER',
};

export const PaymentTypes = [
  { label: 'YES', value: TypeOfPayment.Finance },
  { label: 'NO', value: TypeOfPayment.Cash },
];

export const SellOldCar = [
  { label: 'YES', value: LabelConstants.YES },
  { label: 'NO', value: LabelConstants.NO },
];

export const MediaPageSectionKeys = {
  BannerImageWarranty: 'BannerImageWarranty',
  ProcessToBuyWarranty: 'ProcessToBuyWarranty',
  BenefitsWarranty: 'BenefitsWarranty',
  EligibleCriteriaWarranty: 'EligibleCriteriaWarranty',
  DetailsWarranty: 'DetailsWarranty',
  FAQWarranty: 'FAQWarranty',
};

export const WebsitePlatform = {
  Web: 'Web',
  Mobile: 'Mobile',
};

export const MediaPageKey = {
  WarrantyVAS: 'WarrantyVAS',
  TestimonialWarranty: 'TestimonialWarranty',
  GooglePlayStore: 'GooglePlayStore',
  AppStore: 'AppStore',
};
