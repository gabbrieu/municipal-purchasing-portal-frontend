export interface ILoginValues {
  city: string;
  username: string;
  password: string;
}

export enum ERoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IBackendReqUser {
  userId: number;
  username: string;
  name: string;
  cpf: string;
  city: string;
  email: string;
  role: ERoles;
}

export interface IReqUser {
  userId: number;
  username: string;
  name: string;
  city: string;
  email: string;
  role: ERoles;
}

export interface IJWTPayload {
  sub: number;
  username: string;
  name: string;
  city: string;
  cpf: string;
  email: string;
  role: ERoles;
  iat: number;
  exp: number;
}

export interface IGetSessionData {
  data: IReqUser | undefined;
  loading: boolean;
  error: Error | undefined;
}
