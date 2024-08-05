import {
  AddAppointmentPayload,
  AddAppointmentResponseData,
  AddUserLocationPayload,
  AddUserLocationResponseData,
  InspectionReportData,
  InspectionSlotsData,
  UpdateVehicleListingPayload,
  UpdateVehicleListingResponse,
} from '../../types/models';
import { axiosInstance } from '../api';

export default class InspectionService {
  /**
   * This service is use to fetch inspection report.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @returns {Promise <InspectionReportData>} Returns list of make
   */
  static fetchInspectionReport = async (
    vehicleListingId: number
  ): Promise<InspectionReportData> => {
    try {
      const response = await axiosInstance.get<InspectionReportData>(
        `/api/inspection/inspectionreport?vehicleListingId=${vehicleListingId}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InspectionService:fetchInspectionReport`, error);
      throw error;
    }
  };

  /**
   * This service is use to add  Appointment.
   * @param {Object} [payload] - payload data
   * @returns {AddAppointmentResponseData}- true or false
   */
  static addAppointment = async (
    payload: AddAppointmentPayload
  ): Promise<AddAppointmentResponseData> => {
    try {
      const response = await axiosInstance.post<AddAppointmentResponseData>(
        `/api/inspection/appointment`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in InspectionService:addAppointment`, error);
      throw error;
    }
  };

  /**
   * This service is use to add Diamond/Platinum user location.
   * @param {Object} [payload] - payload data
   * @returns {AddUserLocationResponseData}- true or false
   */
  static addUserLocation = async (
    payload: AddUserLocationPayload
  ): Promise<AddUserLocationResponseData> => {
    try {
      const response = await axiosInstance.post<AddUserLocationResponseData>(
        `/api/Profile/userlocation`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in InspectionService:addUserLocation`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all inspections slots.
   * @param {string}  [date] - date.
   * @param {number} [locationId] - locationId`
   * @returns {Promise<Array<InspectionSlotsData>>} Returns list of inspection slots
   */
  static fetchInspectionSlots = async (
    date: string,
    locationId: number
  ): Promise<Array<InspectionSlotsData>> => {
    try {
      const response = await axiosInstance.get<Array<InspectionSlotsData>>(
        `/api/inspection/inspectionslots?date=${date}&locationId=${locationId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InspectionService:fetchInspectionSlots`, error);
      throw error;
    }
  };

  /**
   * This service is use to add Diamond/Platinum user location.
   * @param {Object} [payload] - payload data
   * @returns {UpdateVehicleListingResponse}- true or false
   */
  static updateVehicleListing = async (
    payload: UpdateVehicleListingPayload
  ): Promise<UpdateVehicleListingResponse> => {
    try {
      const response = await axiosInstance.put<UpdateVehicleListingResponse>(
        `/api/Vehicle/updatevehiclelisting`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in InspectionService:addUserLocation`, error);
      throw error;
    }
  };
}
