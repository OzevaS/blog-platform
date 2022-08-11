export interface IUser {
  id: string;
  avatarURL: string | null;
  username: string;
  email: string;
  password: string;
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
