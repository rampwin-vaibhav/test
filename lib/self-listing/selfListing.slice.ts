import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelfListingConstants } from '../../types/i18n.labels';
import {
  B2CPackages,
  ListingImageArtifact,
  promoResponse,
} from '../../types/models';

interface UserDetails {
  userId: string;
  sequenceNo: string;
  customerNationalId: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  poBoxNo: number;
  cityCode: {
    CIT_CODE: number;
    CIT_NAME_EN: string;
    CIT_NAME_AR: string;
  };
  finance: string;
  gender: string;
}

// Define a type for the slice state
export interface SelfListingState {
  isOpen: boolean;
  showAdditionalInfoModal: boolean;
  loader: boolean;
  hasClickedVehicleDetailsForm: boolean;
  currentStep: SelfListingConstants;
  data: {
    vehicle_listing_id: number | null;
    brand: { brandId: number; brandName: string };
    manufacture_year: {
      year: number | null;
      yearCode: number;
    };
    model: {
      modelId: number;
      modelName: string;
      modelYear: number;
    };
    body_type_code: number;
    plate_data: {
      plate1: string | number | null;
      plate2: string | number | null;
      plate3: string | number | null;
      plate_number: string | null | null;
    };
    variant: { variantId: number; variantName: string };
    fuel_type: string;
    transmission: string;
    city: { cityId: number; cityName: string };
    kms_driven: number;
    expected_price: number;
    isPriceNegotiable: boolean;
    vehicleImages: Array<ListingImageArtifact>;
    imageVerifications: Array<any>;
  };
  user_details: UserDetails;
  contact_options: {
    phone_call: boolean;
    whatsapp: boolean;
    email: string;
    communication: boolean;
  };
  package_data: B2CPackages | null;
  promocode: string | null;
}

// Define the initial state using that type
export const selfListingInitialState: SelfListingState = {
  isOpen: false,
  showAdditionalInfoModal: false,
  loader: false,
  hasClickedVehicleDetailsForm: false,
  currentStep: SelfListingConstants.SelfListingVerifyYourCar,
  data: {
    vehicle_listing_id: 4841,
    brand: { brandId: 0, brandName: '' },
    model: {
      modelId: 0,
      modelName: '',
      modelYear: 1990,
    },
    variant: { variantId: 0, variantName: '' },
    body_type_code: -1,
    fuel_type: '',
    transmission: '',
    manufacture_year: {
      year: null,
      yearCode: -1,
    },
    plate_data: {
      plate1: '',
      plate2: '',
      plate3: '',
      plate_number: '',
    },
    kms_driven: 0,
    city: { cityId: 0, cityName: '' },
    expected_price: 0,
    isPriceNegotiable: true,
    vehicleImages: [],
    imageVerifications: [],
  },
  user_details: {
    sequenceNo: '',
    userId: '',
    customerNationalId: '',
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    poBoxNo: 0,
    cityCode: {
      CIT_CODE: 0,
      CIT_NAME_EN: '',
      CIT_NAME_AR: '',
    },
    finance: '',
    gender: '',
  },
  contact_options: {
    phone_call: true,
    whatsapp: false,
    email: '',
    communication: true,
  },
  package_data: null,
  promocode: null,
};

export const selfListingSlice = createSlice({
  name: 'self-listing-flow',
  initialState: selfListingInitialState,
  reducers: {
    setHasClickedVehicleDetailsForm: (state, action) => {
      return { ...state, hasClickedVehicleDetailsForm: action.payload };
    },
    setOpenSelfListingFlow: (state, action) => {
      return { ...state, isOpen: action.payload };
    },
    setShowAdditionalInfoModal: (state, action) => {
      return { ...state, showAdditionalInfoModal: action.payload };
    },
    setLoader: (state, action) => {
      return { ...state, loader: action.payload };
    },
    updateSelfListingStep: (state, action) => {
      return { ...state, currentStep: action.payload };
    },
    updateSelfListingFlow: (state, action) => {
      return { ...state, data: { ...state.data, ...action.payload } };
    },
    rehydrateSelfListingState: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUserDetails: (state, action) => {
      return {
        ...state,
        user_details: { ...state.user_details, ...action.payload },
      };
    },
    updateSelfListingPackageState: (state, action) => {
      return {
        ...state,
        package_data: action.payload,
      };
    },
    updateSelfListingPromocode: (state, action) => {
      return {
        ...state,
        promocode: action.payload,
      };
    },
  },
});

export const {
  setLoader,
  rehydrateSelfListingState,
  setShowAdditionalInfoModal,
  setOpenSelfListingFlow,
  updateSelfListingFlow,
  updateSelfListingStep,
  updateUserDetails,
  setHasClickedVehicleDetailsForm,
  updateSelfListingPackageState,
  updateSelfListingPromocode,
} = selfListingSlice.actions;

export default selfListingSlice.reducer;
