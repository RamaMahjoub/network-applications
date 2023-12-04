/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiState, ResponseStatus } from "./types";
import ReportService from "../services/reports";
import { RootState } from ".";

interface IReport {
  id: number;
  event: string;
  file_name: string;
  user_name: string;
  time: Date;
}

interface IReportResponse {
  message: string;
  data: IReport[];
}

type ReportState = {
  fileReport: ApiState<IReportResponse>;
  memberReport: ApiState<IReportResponse>;
};

const initialState: ReportState = {
  fileReport: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  memberReport: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
};

export const getFileReport = createAsyncThunk(
  "report/file",
  async (params: { groupId: number; fileId: number }) => {
    try {
      const response = await ReportService.fileReport(
        params.groupId,
        params.fileId
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const getMemberReport = createAsyncThunk(
  "report/member",
  async (params: { groupId: number; memberId: number }) => {
    try {
      const response = await ReportService.userReport(
        params.groupId,
        params.memberId
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFileReport.pending, (state) => {
        state.fileReport.status = ResponseStatus.LOADING;
      })
      .addCase(getFileReport.fulfilled, (state, action: PayloadAction<any>) => {
        state.fileReport.status = ResponseStatus.SUCCEEDED;
        state.fileReport.data = action.payload;
      })
      .addCase(getFileReport.rejected, (state, action) => {
        state.fileReport.status = ResponseStatus.FAILED;
        state.fileReport.error =
          action.error.message || "something went wrong..";
      })
      .addCase(getMemberReport.pending, (state) => {
        state.memberReport.status = ResponseStatus.LOADING;
      })
      .addCase(
        getMemberReport.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.memberReport.status = ResponseStatus.SUCCEEDED;
          state.memberReport.data = action.payload;
        }
      )
      .addCase(getMemberReport.rejected, (state, action) => {
        state.memberReport.status = ResponseStatus.FAILED;
        state.memberReport.error =
          action.error.message || "something went wrong..";
      });
  },
});

export const selectGetFileReportStatus = (state: RootState) =>
  state.report.fileReport.status;
export const selectGetFileReportData = (state: RootState) =>
  state.report.fileReport.data;
export const selectGetFileReportError = (state: RootState) =>
  state.report.fileReport.error;

export const selectGetMemberReportStatus = (state: RootState) =>
  state.report.memberReport.status;
export const selectGetMemberReportData = (state: RootState) =>
  state.report.memberReport.data;
export const selectGetMemberReportError = (state: RootState) =>
  state.report.memberReport.error;

export default reportSlice.reducer;
