import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  WarrantyConstants,
  WarrantyTypeConstants,
} from '../../../types/i18n.labels';
import { PackageType } from '../../../pages/vas/warranty/packages';

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
export interface WarrantyState {
  isOpen: boolean;
  showAdditionalInfoModal: boolean;
  loader: boolean;
  type: WarrantyTypeConstants;
  currentStep: WarrantyConstants;
  data: {
    vehicle_type: string;
    brand: { brandId: number; brandName: string };
    model: {
      modelId: number;
      modelName: string;
      modelYear: number;
    };
    variant: { variantId: number; variantName: string };
    manufacture_year: number;
    kms_driven: number;
    cylinders: number;
    cubic_capacity: number;
    vehicle_specifications: { label: string; value: string };
    chassisNumber: number;
    vehicleValue: number;
    pre_warranty_check_date: string;
  };
  package_data: PackageType | null;
  snapshotId: number;
  invoiceId: number;
  user_details: UserDetails;
}

// Define the initial state using that type
export const warrantyInitialState: WarrantyState = {
  isOpen: false,
  showAdditionalInfoModal: false,
  loader: false,
  type: WarrantyTypeConstants.PreOwnedCar,
  currentStep: WarrantyConstants.VerifyYourCar,
  data: {
    vehicle_type: '',
    brand: { brandId: 0, brandName: '' },
    model: {
      modelId: 0,
      modelName: '',
      modelYear: 1990,
    },
    variant: { variantId: 0, variantName: '' },
    manufacture_year: 1990,
    kms_driven: 0,
    cylinders: 2,
    cubic_capacity: 0,
    vehicle_specifications: { label: 'GCC', value: 'GCC' },
    chassisNumber: 0,
    vehicleValue: 0,
    pre_warranty_check_date: '',
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
  package_data: null,
  snapshotId: 0,
  invoiceId: 0,
};

export const warrantySlice = createSlice({
  name: 'warranty-flow',
  initialState: warrantyInitialState,
  reducers: {
    setOpenWarrantyFlow: (state, action) => {
      return { ...state, isOpen: action.payload };
    },
    setShowAdditionalInfoModal: (state, action) => {
      return { ...state, showAdditionalInfoModal: action.payload };
    },
    setWarrantyFlowType: (state, action) => {
      return { ...state, type: action.payload };
    },
    setLoader: (state, action) => {
      return { ...state, loader: action.payload };
    },
    updateWarrantyStep: (state, action) => {
      return { ...state, currentStep: action.payload };
    },
    updateWarrantyFlow: (state, action) => {
      return { ...state, data: { ...state.data, ...action.payload } };
    },
    updateWarrantySnapshotId: (state, action) => {
      return { ...state, snapshotId: action.payload };
    },
    updateWarrantyInvoiceId: (state, action) => {
      return { ...state, invoiceId: action.payload };
    },
    rehydrateWarrantyState: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateWarrantyPackageState: (state, action) => {
      return {
        ...state,
        package_data: { ...state.package_data, ...action.payload },
      };
    },
    updateUserDetails: (state, action) => {
      return {
        ...state,
        user_details: { ...state.user_details, ...action.payload },
      };
    },
  },
});

export const {
  setOpenWarrantyFlow,
  setWarrantyFlowType,
  setLoader,
  updateWarrantyFlow,
  updateWarrantyStep,
  updateWarrantySnapshotId,
  updateWarrantyInvoiceId,
  rehydrateWarrantyState,
  updateWarrantyPackageState,
  setShowAdditionalInfoModal,
  updateUserDetails,
} = warrantySlice.actions;

export default warrantySlice.reducer;
