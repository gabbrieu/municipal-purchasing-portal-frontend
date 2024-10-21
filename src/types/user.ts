export interface ILoginValues {
  city: string;
  username: string;
  password: string;
}

export enum ERoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IReqUser {
  userId: number;
  username: string;
  name: string;
  city: string;
  cpf: string;
  email: string;
  role: ERoles;
}

export interface IGetSessionData {
  data: IReqUser | undefined;
  loading: boolean;
  error: Error | undefined;
}
