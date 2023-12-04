/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ResponseStatus {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  LOADING = "loading",
  FAILED = "failed",
}

export interface ApiState<T> {
  data: T | undefined;
  status: string;
  error?: any;
}
