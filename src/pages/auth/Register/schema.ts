export interface IRegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
  };
  Token: string;
}
