/** @enum {string} */
export enum GTMEvents {
  PageView = 'Page View',
  ViewedSellerDetails = 'Viewed Seller Details',
  ViewedCar = 'Viewed Used Car Details',
  ConciergeServiceRequest = 'Concierge Service Request',
  CustomerSupportRequest = 'Customer Support Request',
  AddBookmark = 'Vehicle Bookmarked',
  CompletedSearch = 'Completed Used Cars Search',
  AddedToCompare = 'Added to Compare',
  CompareClick = 'Clicked Compare',
  MyCarValueRequest = 'My Car Value Request',
  ListMyCar = 'List My Car',
  AutoCare = 'Auto Care',
  BodyPaint = 'Body & Paint',
  Tristar = 'Tristar',
  TitleTransfer = 'Title Transfer',
  LanguageSwitched = 'Language Switched',
  RemovedBookmark = 'Removed Bookmark',
  ApplyPromotion = 'Apply_Promotion',
  SignUp = 'Sign_Up',
  SignIn = 'Sign_In',
  ViewedCarGA = 'Viewed_Used_Car_Details',
  ViewedSellerDetailsGA = 'Viewed_Seller_Details',
}

/** @enum {string} */
export enum GTMSubEvents {
  Initiated = 'Initiated',
  Submitted = 'Submitted',
  ProcessInitiated = 'Process Initiated',
  VehicleDetails = 'Enter Your Vehicle Details',
  AdditionalForm = 'Additional Information',
  UploadImages = 'Upload Images',
  UploadDocs = 'Upload Documents',
  ConfirmDetails = 'Confirm Details',
  InspectionAppointment = 'Schedule An Inspection Appointment',
  ProcessCompleted = 'Process Completed',
  ViewedService = 'Viewed Service',
  BookServiceInitiated = 'Book a Service Request Initiated',
  BookServiceSubmitted = 'Book a Service Request Submitted',
  AppliedFilter = 'Applied A Search Filter',
  SearchedVehicle = 'Dashboard Search Clicked',
  Recommendations = 'Recommendations',
  ListMyCarError = 'Process Error',
}

export type PageViewEventParams = {
  url: string;
  title?: string;
  userId?: string;
};

export type ViewedSellerDetailsEventParams = {
  dealerId?: string;
  sellerId?: string;
  userId?: string;
  languageId?: string;
};

export type ViewedCarEventParams = {
  vehicleListingId?: string;
  userId?: string;
  make?: string;
  model?: string;
};

export type StartConciergeEventParams = {
  userId?: string;
};

export type SubmitConciergeEventParams = {
  userId?: string;
};

export type RaiseQueryEventParams = {
  userId?: string;
  vehicleListingId?: string;
};

export type SubmitQueryEventParams = {
  userId?: string;
  vehicleListingId?: string;
};

export type AddBookmarkEventParams = {
  userId?: string;
  vehicleListingId?: string;
};

export type AppliedFilterEventParams = {
  userId?: string;
  make?: string;
  model?: string;
  trim?: string;
  bodyType?: string;
  priceRangeFrom?: string;
  priceRangeTo?: string;
  mileageFrom?: string;
  mileageTo?: string;
  yearFrom?: string;
  yearTo?: string;
  features?: string;
  city?: string;
  fuelType?: string;
  interiorColor?: string;
  exteriorColor?: string;
  owner?: string;
  transmissionType?: string;
};

export type SearchedVehicleEventParams = {
  userId?: string;
  searchKey?: string;
};

export type CompletedSearchEventParams = {
  bodyType?: string;
  priceRangeFrom?: string;
  priceRangeTo?: string;
  fuelType?: string;
  transmissionType?: string;
  userId?: string;
};

export type AddedToCompareEventParams = {
  make?: string;
  model?: string;
  fuelType?: string;
  transmissionType?: string;
  vehicleListingId?: string;
  userId?: string;
};

export type EvaluateMyCarValueEventParams = {
  userId?: string;
};

export type ClickedBookServiceEventParams = {
  userId?: string;
};

export type CompletedBookServiceEventParams = {
  userId?: string;
};
