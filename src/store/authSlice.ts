/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IRegisterRequest,
} from "../pages/auth/Register/schema";
import AuthService from "../services/auth";
import { ILoginRequest } from "../pages/auth/Login/schema";
import { ApiState, ResponseStatus } from "./types";
import { RootState } from ".";
import { setUserData, setUserToken } from "./../@core/utils/user-storage";
import { toast } from "react-toastify";

export interface User {
  name: string;
  username: string;
  email: string;
}

interface IRegisterResponse {
  message: string;
  user: User;
  Token: string;
}

interface ILoginResponse {
  message: string;
  Token: string;
}
type AuthState = {
  register: ApiState<IRegisterResponse>;
  login: ApiState<ILoginResponse>;
};

const initialState: AuthState = {
  register: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  login: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
};
export const register = createAsyncThunk(
  "auth/register",
  async (body: IRegisterRequest) => {
    try {
      const response = await AuthService.register(body);
      const user = {
        name: response.data.user.name,
        username: response.data.user.username,
        email: response.data.user.email,
      };
      setUserData(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (body: ILoginRequest) => {
    try {
      const response = await AuthService.login(body);
      const user = {
        name: response.data.user.name,
        username: response.data.user.username,
        email: response.data.user.email,
      };
      setUserData(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.register.status = ResponseStatus.LOADING;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.register.status = ResponseStatus.SUCCEEDED;
        const token = { token: action.payload.Token };
        setUserToken(token);
        toast.success(action.payload.message);
        state.register.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.register.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.register.error =
          action.error.message || "something went wrong..";
      })
      .addCase(login.pending, (state) => {
        state.login.status = ResponseStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.login.status = ResponseStatus.SUCCEEDED;
        const token = { token: action.payload.Token };
        setUserToken(token);
        toast.success(action.payload.message);
        state.login.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.login.error =
          action.error.message || "something went wrong..";
      });
  },
});

export const selectLoginStatus = (state: RootState) => state.auth.login.status;
export const selectLoginData = (state: RootState) => state.auth.login.data;
export const selectLoginError = (state: RootState) => state.auth.login.error;

export const selectRegisterStatus = (state: RootState) =>
  state.auth.register.status;
export const selectRegisterData = (state: RootState) =>
  state.auth.register.data;
export const selectRegisterError = (state: RootState) =>
  state.auth.register.error;

export default authSlice.reducer;
