import { Privileges, Roles } from '../enums';

export type AuthTokenResponse = {
  Token: string;
  RefreshTokenAD: string;
  LogoutUrl: string;
  TokenTimeInMinutes: number;
  ErrorMessage: string;
  IsAuthorized: boolean;
  UserId: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  MobileNumber: string;
  UserStatusId: number;
  UserProfileStatusKey: string;
  UserPrivileges: Array<Privileges>;
  UserRoles: Array<Roles>;
  isActive: boolean;
  LanguageForLogin: number;
};

export type AuthTokenWithOtpResponse = {
  Token: string;
  RefreshToken: string;
  LogoutUrl: string;
  TokenTimeInMinutes: number;
  ErrorMessage: string;
  IsAuthorized: boolean;
  UserId: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  MobileNumber: string;
  UserStatusId: number;
  UserProfileStatusKey: string;
  UserPrivileges: Array<Privileges>;
  UserRoles: Array<Roles>;
  isActive: boolean;
  LanguageForLogin: number;
};

export type LoginOTPResponse = {
  SessionKey: string;
};
