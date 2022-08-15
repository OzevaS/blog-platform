export interface IUser {
  image?: string;
  username: string;
  email: string;
  token: string;
}

export interface IUserRegisterResponse {
  user?: IUser;
  errors?: {
    body: string[];
  };
}

export interface IUserLoginResponse {
  user?: IUser;
  errors?: {
    body: string[];
  };
}

export interface IUserRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserEditRequest {
  username?: string;
  email?: string;
  password?: string;
  avatarURL?: string;
  token: string;
}

export type UserLoginError = string | null;
export type UserRegisterError = {
  username: string | null;
  email: string | null;
} | null;
export type UserEditError = {
  username: string | null;
  email: string | null;
} | null;
