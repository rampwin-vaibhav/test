import { axiosInstance } from '../api';
import axios from 'axios';
import { CommonUtils } from '../utilities';
import { axiosTestInstance } from '../api/interceptors';

export default class VasService {
  static getWarrantyVASPackages = async (payload: any) => {
    try {
      const res = await axiosTestInstance.get(
        `api/ValueAddedService/warrantyvaspackages`,
        {
          params: payload,
        }
      );
      if (res.status === 200) {
        if (res.data.IsSuccess) {
          return Promise.resolve(res.data);
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  static getPaymentToken = async (payload: any) => {
    try {
      const response = await axiosTestInstance.post(
        `api/paymentservice/token`,
        payload
      );

      return Promise.resolve(response);
    } catch (error) {
      return error;
    }
  };

  static storeVASWarrantyPurchaseProcess = async (payload: any) => {
    try {
      const response = await axiosTestInstance.post(
        '/api/ValueAddedService/VASWarrantyPurchaseProcess',
        payload
      );

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  static async getNewTokenForYakeen() {
    try {
      const response = await axios.get(
        'https://centralservices.gogomotor.com/api/external_services/vehicle_info_by_sequence.php',
        {
          headers: {
            // 'app-id': '6a8020cb',
            // 'api-key': '4a5cf5aa0d113fbbe560ec714a043e67',
          },
        }
      );
      localStorage.setItem(
        'yak-po',
        `${CommonUtils.encode(`${response.data.access_token}`)}`
      );
      return response.data.access_token; // Adjust this based on the actual structure of your token response
    } catch (error) {
      throw new Error('Failed to get new token');
    }
  }

  static verifyCarDetails = async ({
    userId,
    sequenceNo,
  }: {
    userId: string;
    sequenceNo: string;
  }) => {
    const url = `https://centralservices.gogomotor.com/api/external_services/vehicle_info_by_sequence.php`;

    try {
      const response = await axios.post(
        url,
        {
          vehicleSequenceNo: sequenceNo,
          ownerID: userId,
        },
        {
          headers: {
            'Access-Token': '6652e7ccc14771.85806391',
          },
        }
      );

      return Promise.resolve(response.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  static saveWarrantySnapshot = async (payload: any) => {
    try {
      const response = await axiosTestInstance.post(
        `api/Warranty/savewarrantysnapshot`,
        payload
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return error;
    }
  };

  static getWayPntToken = async () => {
    try {
      const response = await axios.post(
        'https://devwp.waypoint-systems.com:446/PETROMIN_API/GetToken',
        {
          client_id: '25787fb111115b5a5d6bde6e5e742b9',
          client_secret: '627Ef1111115f383E7C436d0B5F63F',
        },
        {
          headers: {
            'client-code': 'PETROMIN',
          },
        }
      );
      localStorage.setItem(
        'waypnt-po',
        `${CommonUtils.encode(`${response.data.access_token}`)}`
      );
      return response.data.access_token; // Adjust this based on the actual structure of your token response
    } catch (error) {
      return Promise.reject(error);
    }
  };

  static getCities = async () => {
    try {
      let token = localStorage.getItem('waypnt-po');
      if (!token) {
        token = await this.getWayPntToken();
      }
      const response = await axios.get(
        `https://devwp.wpoynt.co:446/PETROMIN_API/GetCity`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Promise.resolve(response.data);
    } catch (error: any) {
      console.log(error);
      // if (error.response?.status === 401) {
      //   const newToken = await this.getWayPntToken();
      //   const response = await axios.get(
      //     `https://devwp.wpoynt.co:446/PETROMIN_API/GetCity`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${newToken}`,
      //       },
      //     }
      //   );
      //   return Promise.resolve(response.data);
      // }
      return Promise.reject(error);
    }
  };
}
