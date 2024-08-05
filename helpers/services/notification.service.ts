import { UserNotificationResponse } from '../../types/models';
import { axiosInstance } from '../api';

export default class NotificationService {
  /**
   * This service used to fetch user notification list
   * @param {number} pageNumber
   * @param {number} pageSize
   * @param {boolean} isRead
   * @returns {Promise<UserNotificationResponse>} returns the user notification list.
   */
  static fetchNotificationsList = async (
    pageNumber: number,
    pageSize: number,
    isRead: number,
    languageId: number
  ): Promise<UserNotificationResponse> => {
    try {
      const response = await axiosInstance.get<UserNotificationResponse>(
        `/api/Notification/usernotifications?pageNumber=${pageNumber}&pageSize=${pageSize}&isRead=${isRead}&languageId=${languageId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in NotificationService:fetchNotificationsList`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is used to fetch the Notifications unread count
   * @returns {number}
   */
  static fetchNotificationsUnreadCount = async (): Promise<number> => {
    try {
      const response = await axiosInstance.get<number>(
        `/api/Notification/userNotificationUnreadCount`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in NotificationService:fetchNotificationsUnreadCount`,
        error
      );
      throw error;
    }
  };
}
