import { ILoginRequest } from "../pages/auth/Login/schema";
import { IRegisterRequest } from "../pages/auth/Register/schema";
import http from "../@core/axios";

const register = (payload: IRegisterRequest) => {
  return http.post("/auth/register", payload);
};

const login = (payload: ILoginRequest) => {
  return http.post("/auth/login", payload);
};

const AuthService = {
  register,
  login,
};

export default AuthService;
