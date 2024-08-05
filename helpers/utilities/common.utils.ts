import moment from 'moment';
import { Locales, PageKey } from '../../types/enums';
import {
  Breadcrumbs,
  BreadcrumbsHierarchy,
  CountryCodes,
  FileExtensionMetaData,
} from '../../types/constants';
import {
  Breadcrumb,
  BreadcrumbUrlObj,
  ValidateFileType,
} from '../../types/models';

export class CommonUtils {
  /**
   * This utility method is used to get userId(GUID) for anonymous user.
   * @returns It returns anonymous userId for chatbot.
   */
  static getChatBotAnonymousUserId = (): string => {
    var isLocalStorage =
      'localStorage' in window && window['localStorage'] !== null;
    if (
      isLocalStorage &&
      localStorage.getItem('applicationUniqueId') !== null
    ) {
      return String(localStorage.getItem('applicationUniqueId'));
    } else {
      const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r =
              (parseFloat(
                '0.' +
                  Math.random().toString().replace('0.', '') +
                  new Date().getTime()
              ) *
                16) |
              0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      if (isLocalStorage) {
        localStorage.setItem('applicationUniqueId', guid);
      }
      return guid;
    }
  };

  /**
   * This utility method will use to resolve locale (en/ar) and return language id.
   * @param {string} locale - possible values are en | ar
   * @returns {number} This return LanguageId
   */
  static getLanguageId = (locale: string): number => {
    if (locale === Locales.AR) return 2;
    return 1;
  };

  /**
   * This utility method is use to encode T type of Object to Base64.
   * @param {T} data - data object.
   * @returns Base64 encoded string.
   */
  static encode<T>(data: T, optimize: boolean = true): string | null {
    if (Object.keys(data as any).length !== 0) {
      // clean empty props.
      Object.keys(data as any).forEach((key) => {
        if (
          Array.isArray((data as any)[key]) &&
          ((data as any)[key] as Array<any>).length === 0 &&
          optimize
        ) {
          delete (data as any)[key];
        }
      });

      const stringData = JSON.stringify(data);
      return Buffer.from(stringData).toString('base64');
    }
    return null;
  }
  /**
   * This utility method is use to clean the props.
   */

  static cleanEmptyProps<T>(data: T): void {
    if (Object.keys(data as any).length !== 0) {
      Object.keys(data as any).forEach((key) => {
        if (
          Array.isArray((data as any)[key]) &&
          ((data as any)[key] as Array<any>).length === 0
        ) {
          delete (data as any)[key];
        }
      });
    }
  }

  /**
   * This utility method is use to decode Base64 string to Object.
   * @param {string} encodedString - Base64 encoded string.
   * @returns {T} Object.
   */
  static decode<T>(encodedString: string): T {
    const decodedString = Buffer.from(encodedString, 'base64').toString(
      'ascii'
    );
    return JSON.parse(decodedString) as T;
  }
  /**
   * This utility method is use to decode Base64 string to Object simply.
   * @param {string} encodedString - Base64 encoded string.
   * @returns {T} Object.
   */
  static decodeB64<T>(encodedString: string): T {
    const decodedString = Buffer.from(encodedString, 'base64').toString();
    return JSON.parse(decodedString) as T;
  }

  /**
   * This utility method is use omitting properties from an given object.
   * @param {T} obj - Object
   * @param {Array<keyof T>} props - List of properties to remove from output object.
   * @returns {T} - new object without omitted properties.
   */
  static omit<T>(obj: T, props: Array<keyof T>) {
    const result = { ...obj };
    props.forEach(function (prop) {
      delete result[prop];
    });
    return result;
  }

  /**
   * This utility method is convert file data into base64 string | ArrayBuffer.
   * @param {File} file
   * @returns {string | ArrayBuffer | null} base64 string | ArrayBuffer
   */
  static convertBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /**
   * This utility method is convert file data into base64 string | ArrayBuffer.
   * @param {File} file
   * @returns {string | ArrayBuffer | null} base64 string | ArrayBuffer
   */
  static blobConvertBase64 = (
    file: Blob,
    mimeType: string
  ): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64data = fileReader.result;
        resolve(
          base64data?.toString().replace('application/octet-stream', mimeType)
        );
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /**
   *  This utility method is used to convert date format from UTC to Local
   * @param date utc date
   * @returns local date
   */
  static convertUTCToLocal = (date: string) => {
    const local = moment.utc(date).local().format('');
    return local;
  };

  /**
   * This utility method is use to check item is available in array or not for primitive data types.
   * @param {T} item - search value
   * @param {Array<T>} list - list of items
   * @returns True/False
   */
  static hasItem = <T>(item: T, list: Array<T>): boolean => {
    return (
      list?.some(
        (x) => String(x).toLowerCase() === String(item).toLowerCase()
      ) || false
    );
  };

  static getFieldValue = (value?: string): string | null => {
    if (value || value?.trim()) {
      return value.trim();
    }
    return null;
  };

  static getCountryCodes = () => {
    const allowedCountryCodes = (
      process.env.NEXT_PUBLIC_COUNTRY_CODES || ''
    ).split('|');
    return CountryCodes.filter((x) => allowedCountryCodes.includes(x.code));
  };

  static isValidUrl = (str: string) => {
    const pattern = new RegExp(
      '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return pattern.test(str);
  };

  /**
   *  This utility method is used to create breadcrumbs
   */
  static GetPageBreadcrumbs = (PageKey: PageKey, o: BreadcrumbUrlObj) => {
    const breadcrumbs: Array<Breadcrumb> = [];
    const breadcrumb = BreadcrumbsHierarchy.find((x) => x.pageKey === PageKey);
    if (breadcrumb) {
      breadcrumb.list.forEach((x) => {
        const r = Breadcrumbs.find((y) => y.key === x);
        if (r) breadcrumbs.push(r.getMapping(o));
      });
    }
    return breadcrumbs.sort(function (a, b) {
      return a.sequence - b.sequence;
    });
  };

  /**
   *  This utility method is used to create file type msg
   */
  static getFileTypeMessageString = (fileTypes: Array<string>) => {
    const fileType = FileExtensionMetaData.filter((x) =>
      fileTypes.includes(x.type)
    )
      .map((fileType) => fileType.value)
      .join(', ');
    return fileType;
  };

  /**
   *  This utility method is used to validate file type and file size
   */
  static IsFileValid = async (
    file: File,
    {
      checkFileSize = true,
      checkFileType = true,
      fileSize = 10,
      fileType,
    }: ValidateFileType
  ) => {
    let result = { isFileSizeValid: false, isFileTypeValid: false };

    if (checkFileSize) {
      const allowedImageSize = fileSize * 1048576;
      if (file.size > allowedImageSize) {
        result = { ...result, isFileSizeValid: false };
      } else {
        result = { ...result, isFileSizeValid: true };
      }
    }
    if (checkFileType) {
      if (!fileType?.includes(file?.type)) {
        result = { ...result, isFileTypeValid: false };
      } else {
        result = { ...result, isFileTypeValid: true };
      }
    }
    return result;
  };

  static encodeB64 = (params: string) => {
    const encode = Buffer.from(`${params}`).toString('base64');
    return encode;
  };
}
