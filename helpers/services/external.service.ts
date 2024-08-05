import axios from 'axios';

export default class ExternalService {
  static getFileData = async (url: string): Promise<Blob> => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      return await response.data;
    } catch (error) {
      console.error(`Error in ExternalService:getFileData`, error);
      throw error;
    }
  };
}
