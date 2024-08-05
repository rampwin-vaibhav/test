import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { SessionUtils } from '../utilities';
import { AuthService } from '../services';
import { memoizedRefreshTokenWithOTP } from './refreshToken-with-otp';

/**
 * Created Axios instance with default settings.
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosTestInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://po-apim-nonprod.azure-api.net/po-api-uat'
      : process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios request interceptor to attach authorization token to API request.
 *  - Note: It will not attach authorization token to every request.
 *          To attach authorization token to API request, we need to pass `credentials` header with `true` value.
 */
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const credentials = config.headers!['credentials'];
    delete config.headers!['credentials'];
    if (credentials) {
      const accessToken = SessionUtils.getAccessToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
/**
 * Axios request interceptor to attach authorization token to API request.
 *  - Note: It will not attach authorization token to every request.
 *          To attach authorization token to API request, we need to pass `credentials` header with `true` value.
 */
axiosTestInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const credentials = config.headers!['credentials'];
    delete config.headers!['credentials'];
    if (credentials) {
      const accessToken =
        process.env.NODE_ENV === 'development'
          ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzMTYiLCJNb2JpbGVOdW1iZXIiOiIrOTY2MzIxMjM0NTY3IiwiVXNlclByaXZpbGVnZXMiOiJWZWhpY2xlVmlldyxWZWhpY2xlRGV0YWlsc1ZpZXcsVmVoaWNsZUhpc3RvcnlWaWV3LERNU1VzZXJzVmlldyxETVNDcmVhdGVVc2Vyc1ZpZXcsRE1TVXBkYXRlVXNlcnNWaWV3LFByb2ZpbGVDaGFuZ2VSZXF1ZXN0VmlldyxDaGFuZ2VQcm9maWxlVmlldyxCdWxrVXBsb2FkVmlldyxCdWxrVXBsb2FkUmVwb3J0VmlldyxTYWxlc1BlcnNvblZpZXcsUGFja2FnZXNWaWV3LFZpZXdCYXRjaGVzLEJ1bGtVcGxvYWQsQWN0aXZlUGFja2FnZVRhYlZpZXcsU3Vic2NyaXB0aW9uVGFiVmlldyxQYWNrYWdlSGlzdG9yeVRhYlZpZXcsRG93bmxvYWRCdWxrVXBsb2FkU2FtcGxlRmlsZSxWaWV3QmF0Y2hlcyxSZW1vdmVGZWF0dXJlVmVoaWNsZSxGZWF0dXJlVmVoaWNsZSxWYWxpZGF0ZVBhY2thZ2VTdWJzY3JpcHRpb25Gb3JGZWF0dXJlLEdldFBheW1lbnRUb2tlbixEZWxldGVWZWhpY2xlLFZpZXdTYWxlc1BlcnNvbnNTdGF0aXN0aWNzLERNU1ZlaGljbGVBc3NpZ25tZW50LFZpZXdEZWFsZXJJbmZvcm1hdGlvbixWaWV3RE1TQWRtaW5TdGF0aXN0aWNzLEdldEFjdGl2ZVBhY2thZ2VzLEdldFBhY2thZ2VTdWJzY3JpcHRpb25zLEdldFBhY2thZ2VTdWJzY3JpcHRpb25IaXN0b3J5LFNvbGRWZWhpY2xlLFZpZXdTZWxsZXJEb2N1bWVudEFydGlmYWN0VHlwZXMsVmlld1ZlaGljbGVRQ1N0YXR1c0RldGFpbHMsU2VhcmNoVXNlcixFZGl0VmVoaWNsZSxWaWV3UGV0cm9taW5Mb2NhdGlvbnMsVmlld0xpc3RpbmdJbWFnZXMsVmlld0xpc3RpbmdEb2N1bWVudHMsRWRpdFZlaGljbGUsVXBkYXRlWWVhck1ha2VNb2RlbFRyaW0sRG93bmxvYWREb2N1bWVudCxTYXZlVmVoaWNsZVByb2ZpbGUsVmlld1ZlaGljbGVQcm9maWxlLFZpZXdQcm9kdWN0Q2F0YWxvZ3VlLFZpZXdEZWFscyxTYXZlVmVoaWNsZVByb2ZpbGUsVmlld1ZlaGljbGVQcm9maWxlLFZpZXdQcm9kdWN0Q2F0YWxvZ3VlLFZpZXdEZWFscyxQdXJjaGFzZVdhcnJhbnR5IiwiVXNlclJvbGVzIjoiRE1TQWRtaW4iLCJBcHBsaWNhdGlvbklkIjoiMiIsIkFwcGxpY2F0aW9uS2V5IjoiR0dNLUJ1c2luZXNzIiwibmJmIjoxNzIwNzg5MDkwLCJleHAiOjE3Mjg1NjUwOTB9.ggcJ923RvL9my7qkC6HGvy5e_DIpo9lNBi49sSEcb4M'
          : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyMzA1IiwiTW9iaWxlTnVtYmVyIjoiKzk2NjU0MzQyMTA0NSIsIlVzZXJQcml2aWxlZ2VzIjoiVmVoaWNsZVZpZXcsVmVoaWNsZURldGFpbHNWaWV3LFZlaGljbGVIaXN0b3J5VmlldyxETVNVc2Vyc1ZpZXcsRE1TQ3JlYXRlVXNlcnNWaWV3LERNU1VwZGF0ZVVzZXJzVmlldyxQcm9maWxlQ2hhbmdlUmVxdWVzdFZpZXcsQ2hhbmdlUHJvZmlsZVZpZXcsQnVsa1VwbG9hZFZpZXcsQnVsa1VwbG9hZFJlcG9ydFZpZXcsU2FsZXNQZXJzb25WaWV3LFBhY2thZ2VzVmlldyxWaWV3QmF0Y2hlcyxCdWxrVXBsb2FkLEFjdGl2ZVBhY2thZ2VUYWJWaWV3LFN1YnNjcmlwdGlvblRhYlZpZXcsUGFja2FnZUhpc3RvcnlUYWJWaWV3LERvd25sb2FkQnVsa1VwbG9hZFNhbXBsZUZpbGUsVmlld0JhdGNoZXMsUmVtb3ZlRmVhdHVyZVZlaGljbGUsRmVhdHVyZVZlaGljbGUsVmFsaWRhdGVQYWNrYWdlU3Vic2NyaXB0aW9uRm9yRmVhdHVyZSxHZXRQYXltZW50VG9rZW4sRGVsZXRlVmVoaWNsZSxWaWV3U2FsZXNQZXJzb25zU3RhdGlzdGljcyxETVNWZWhpY2xlQXNzaWdubWVudCxWaWV3RGVhbGVySW5mb3JtYXRpb24sVmlld0RNU0FkbWluU3RhdGlzdGljcyxHZXRBY3RpdmVQYWNrYWdlcyxHZXRQYWNrYWdlU3Vic2NyaXB0aW9ucyxHZXRQYWNrYWdlU3Vic2NyaXB0aW9uSGlzdG9yeSxTb2xkVmVoaWNsZSxWaWV3U2VsbGVyRG9jdW1lbnRBcnRpZmFjdFR5cGVzLFZpZXdWZWhpY2xlUUNTdGF0dXNEZXRhaWxzLFNlYXJjaFVzZXIsRWRpdFZlaGljbGUsVmlld1BldHJvbWluTG9jYXRpb25zLFZpZXdMaXN0aW5nSW1hZ2VzLFZpZXdMaXN0aW5nRG9jdW1lbnRzLEVkaXRWZWhpY2xlLFVwZGF0ZVllYXJNYWtlTW9kZWxUcmltLERvd25sb2FkRG9jdW1lbnQsU2F2ZVZlaGljbGVQcm9maWxlLFZpZXdWZWhpY2xlUHJvZmlsZSxWaWV3UHJvZHVjdENhdGFsb2d1ZSxWaWV3RGVhbHMiLCJVc2VyUm9sZXMiOiJETVNBZG1pbiIsIkFwcGxpY2F0aW9uSWQiOiIyIiwiQXBwbGljYXRpb25LZXkiOiJHR00tQnVzaW5lc3MiLCJuYmYiOjE3MjA5MzM2NjcsImV4cCI6MTcyODcwOTY2N30.AYHOE2HvShvUofP9J3YPTSTi7qMq-ROz9iR4nPvMH4k';
      if (accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Axios response interceptor to handle 401 Response.
 * If we received 401 response, it will execute refresh token memoized method, and execute next request with new config.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshTokenWithOTP();

      if (result) {
        const accessToken = SessionUtils.getAccessToken();
        if (accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${accessToken}`,
          };
        }
      } else {
        const logoutUrl = SessionUtils.getLogoutURL();
        await AuthService.signOut(logoutUrl);
        await AuthService.logout();
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);
/**
 * Axios response interceptor to handle 401 Response.
 * If we received 401 response, it will execute refresh token memoized method, and execute next request with new config.
 */

axiosTestInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const accessToken =
        process.env.NODE_ENV === 'development'
          ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzMTYiLCJNb2JpbGVOdW1iZXIiOiIrOTY2MzIxMjM0NTY3IiwiVXNlclByaXZpbGVnZXMiOiJWZWhpY2xlVmlldyxWZWhpY2xlRGV0YWlsc1ZpZXcsVmVoaWNsZUhpc3RvcnlWaWV3LERNU1VzZXJzVmlldyxETVNDcmVhdGVVc2Vyc1ZpZXcsRE1TVXBkYXRlVXNlcnNWaWV3LFByb2ZpbGVDaGFuZ2VSZXF1ZXN0VmlldyxDaGFuZ2VQcm9maWxlVmlldyxCdWxrVXBsb2FkVmlldyxCdWxrVXBsb2FkUmVwb3J0VmlldyxTYWxlc1BlcnNvblZpZXcsUGFja2FnZXNWaWV3LFZpZXdCYXRjaGVzLEJ1bGtVcGxvYWQsQWN0aXZlUGFja2FnZVRhYlZpZXcsU3Vic2NyaXB0aW9uVGFiVmlldyxQYWNrYWdlSGlzdG9yeVRhYlZpZXcsRG93bmxvYWRCdWxrVXBsb2FkU2FtcGxlRmlsZSxWaWV3QmF0Y2hlcyxSZW1vdmVGZWF0dXJlVmVoaWNsZSxGZWF0dXJlVmVoaWNsZSxWYWxpZGF0ZVBhY2thZ2VTdWJzY3JpcHRpb25Gb3JGZWF0dXJlLEdldFBheW1lbnRUb2tlbixEZWxldGVWZWhpY2xlLFZpZXdTYWxlc1BlcnNvbnNTdGF0aXN0aWNzLERNU1ZlaGljbGVBc3NpZ25tZW50LFZpZXdEZWFsZXJJbmZvcm1hdGlvbixWaWV3RE1TQWRtaW5TdGF0aXN0aWNzLEdldEFjdGl2ZVBhY2thZ2VzLEdldFBhY2thZ2VTdWJzY3JpcHRpb25zLEdldFBhY2thZ2VTdWJzY3JpcHRpb25IaXN0b3J5LFNvbGRWZWhpY2xlLFZpZXdTZWxsZXJEb2N1bWVudEFydGlmYWN0VHlwZXMsVmlld1ZlaGljbGVRQ1N0YXR1c0RldGFpbHMsU2VhcmNoVXNlcixFZGl0VmVoaWNsZSxWaWV3UGV0cm9taW5Mb2NhdGlvbnMsVmlld0xpc3RpbmdJbWFnZXMsVmlld0xpc3RpbmdEb2N1bWVudHMsRWRpdFZlaGljbGUsVXBkYXRlWWVhck1ha2VNb2RlbFRyaW0sRG93bmxvYWREb2N1bWVudCxTYXZlVmVoaWNsZVByb2ZpbGUsVmlld1ZlaGljbGVQcm9maWxlLFZpZXdQcm9kdWN0Q2F0YWxvZ3VlLFZpZXdEZWFscyxTYXZlVmVoaWNsZVByb2ZpbGUsVmlld1ZlaGljbGVQcm9maWxlLFZpZXdQcm9kdWN0Q2F0YWxvZ3VlLFZpZXdEZWFscyxQdXJjaGFzZVdhcnJhbnR5IiwiVXNlclJvbGVzIjoiRE1TQWRtaW4iLCJBcHBsaWNhdGlvbklkIjoiMiIsIkFwcGxpY2F0aW9uS2V5IjoiR0dNLUJ1c2luZXNzIiwibmJmIjoxNzIwNzg5MDkwLCJleHAiOjE3Mjg1NjUwOTB9.ggcJ923RvL9my7qkC6HGvy5e_DIpo9lNBi49sSEcb4M'
          : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyMzA1IiwiTW9iaWxlTnVtYmVyIjoiKzk2NjU0MzQyMTA0NSIsIlVzZXJQcml2aWxlZ2VzIjoiVmVoaWNsZVZpZXcsVmVoaWNsZURldGFpbHNWaWV3LFZlaGljbGVIaXN0b3J5VmlldyxETVNVc2Vyc1ZpZXcsRE1TQ3JlYXRlVXNlcnNWaWV3LERNU1VwZGF0ZVVzZXJzVmlldyxQcm9maWxlQ2hhbmdlUmVxdWVzdFZpZXcsQ2hhbmdlUHJvZmlsZVZpZXcsQnVsa1VwbG9hZFZpZXcsQnVsa1VwbG9hZFJlcG9ydFZpZXcsU2FsZXNQZXJzb25WaWV3LFBhY2thZ2VzVmlldyxWaWV3QmF0Y2hlcyxCdWxrVXBsb2FkLEFjdGl2ZVBhY2thZ2VUYWJWaWV3LFN1YnNjcmlwdGlvblRhYlZpZXcsUGFja2FnZUhpc3RvcnlUYWJWaWV3LERvd25sb2FkQnVsa1VwbG9hZFNhbXBsZUZpbGUsVmlld0JhdGNoZXMsUmVtb3ZlRmVhdHVyZVZlaGljbGUsRmVhdHVyZVZlaGljbGUsVmFsaWRhdGVQYWNrYWdlU3Vic2NyaXB0aW9uRm9yRmVhdHVyZSxHZXRQYXltZW50VG9rZW4sRGVsZXRlVmVoaWNsZSxWaWV3U2FsZXNQZXJzb25zU3RhdGlzdGljcyxETVNWZWhpY2xlQXNzaWdubWVudCxWaWV3RGVhbGVySW5mb3JtYXRpb24sVmlld0RNU0FkbWluU3RhdGlzdGljcyxHZXRBY3RpdmVQYWNrYWdlcyxHZXRQYWNrYWdlU3Vic2NyaXB0aW9ucyxHZXRQYWNrYWdlU3Vic2NyaXB0aW9uSGlzdG9yeSxTb2xkVmVoaWNsZSxWaWV3U2VsbGVyRG9jdW1lbnRBcnRpZmFjdFR5cGVzLFZpZXdWZWhpY2xlUUNTdGF0dXNEZXRhaWxzLFNlYXJjaFVzZXIsRWRpdFZlaGljbGUsVmlld1BldHJvbWluTG9jYXRpb25zLFZpZXdMaXN0aW5nSW1hZ2VzLFZpZXdMaXN0aW5nRG9jdW1lbnRzLEVkaXRWZWhpY2xlLFVwZGF0ZVllYXJNYWtlTW9kZWxUcmltLERvd25sb2FkRG9jdW1lbnQsU2F2ZVZlaGljbGVQcm9maWxlLFZpZXdWZWhpY2xlUHJvZmlsZSxWaWV3UHJvZHVjdENhdGFsb2d1ZSxWaWV3RGVhbHMiLCJVc2VyUm9sZXMiOiJETVNBZG1pbiIsIkFwcGxpY2F0aW9uSWQiOiIyIiwiQXBwbGljYXRpb25LZXkiOiJHR00tQnVzaW5lc3MiLCJuYmYiOjE3MjA5MzM2NjcsImV4cCI6MTcyODcwOTY2N30.AYHOE2HvShvUofP9J3YPTSTi7qMq-ROz9iR4nPvMH4k';

      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };

      return axios(config);
    }
    return Promise.reject(error);
  }
);
