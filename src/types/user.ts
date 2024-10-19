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
  city: string;
  cpf: string;
  email: string;
  role: ERoles;
}
