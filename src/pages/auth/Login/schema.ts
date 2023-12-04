export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    Token: string;
}