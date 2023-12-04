/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FileService from "../services/files";
import { ApiState, ResponseStatus } from "./types";
import { RootState } from ".";
import { AxiosProgressEvent } from "axios";
import { toast } from "react-toastify";

export interface IFileResponse {
  id: number;
  file_name: string;
  user_name: string;
  status: number;
  booker_name: string | null;
}

interface IAllFilesResponse {
  data: IFileResponse[];
}

interface IFileContentResponse {
  message: string;
  file_name: string;
  file_content: string;
}

interface IDeleteFileResponse {
  message: string;
}

type FileState = {
  uploadProgress: number;
  allUserFiles: ApiState<IAllFilesResponse>;
  uploadFile: ApiState<undefined>;
  fileContent: ApiState<IFileContentResponse>;
  deleteFile: ApiState<IDeleteFileResponse>;
};

const initialState: FileState = {
  uploadProgress: 0,
  allUserFiles: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  uploadFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  fileContent: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  deleteFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
};

export const uploadFile = createAsyncThunk(
  "files/upload-file",
  async (file: File, { dispatch }) => {
    try {
      const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        console.log("progress", progress);
        dispatch(setUploadProgress(progress));
      };
      const response = await FileService.uploadFile(file, onUploadProgress);
      console.log("responseeee", response.data);
      dispatch(setUploadProgress(0));
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const getUserFiles = createAsyncThunk("files/all-files", async () => {
  try {
    const response = await FileService.allUserFiles();
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const readFile = createAsyncThunk(
  "files/read",
  async (params: { groupId: number; fileId: number }) => {
    try {
      const response = await FileService.readFile(
        params.groupId,
        params.fileId
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteFile = createAsyncThunk(
  "files/delete-file",
  async (params: { fileId: number }) => {
    try {
      const response = await FileService.deleteFile(params.fileId);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFiles.pending, (state) => {
        state.allUserFiles.status = ResponseStatus.LOADING;
      })
      .addCase(getUserFiles.fulfilled, (state, action: PayloadAction<any>) => {
        state.allUserFiles.status = ResponseStatus.SUCCEEDED;
        state.allUserFiles.data = action.payload;
      })
      .addCase(getUserFiles.rejected, (state, action) => {
        state.allUserFiles.status = ResponseStatus.FAILED;
        state.allUserFiles.error =
          action.error.message || "something went wrong..";
      })
      .addCase(uploadFile.pending, (state) => {
        state.uploadFile.status = ResponseStatus.LOADING;
      })
      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.uploadFile.status = ResponseStatus.SUCCEEDED;
        state.uploadFile.data = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadFile.status = ResponseStatus.FAILED;
        state.uploadFile.error =
          action.error.message || "something went wrong..";
      })
      .addCase(readFile.pending, (state) => {
        state.fileContent.status = ResponseStatus.LOADING;
      })
      .addCase(readFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.fileContent.status = ResponseStatus.SUCCEEDED;
        state.fileContent.data = action.payload;
      })
      .addCase(readFile.rejected, (state, action) => {
        state.fileContent.status = ResponseStatus.FAILED;
        state.fileContent.error =
          action.error.message || "something went wrong..";
      })
      .addCase(deleteFile.pending, (state) => {
        state.deleteFile.status = ResponseStatus.LOADING;
      })
      .addCase(deleteFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.deleteFile.status = ResponseStatus.SUCCEEDED;
        toast.success(action.payload.message);
        state.deleteFile.data = action.payload;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.deleteFile.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.deleteFile.error =
          action.error.message || "something went wrong..";
      });
  },
});

export const selectAllUserFilesStatus = (state: RootState) =>
  state.file.allUserFiles.status;
export const selectAllUserFilesData = (state: RootState) =>
  state.file.allUserFiles.data;
export const selectAllUserFilesError = (state: RootState) =>
  state.file.allUserFiles.error;

export const selectUploadFileStatus = (state: RootState) =>
  state.file.uploadFile.status;
export const selectUploadFileData = (state: RootState) =>
  state.file.uploadFile.data;
export const selectUploadFileError = (state: RootState) =>
  state.file.uploadFile.error;

export const selectFileContentStatus = (state: RootState) =>
  state.file.fileContent.status;
export const selectFileContentData = (state: RootState) =>
  state.file.fileContent.data;
export const selectFileContentError = (state: RootState) =>
  state.file.fileContent.error;
export const selectUploadProgress = (state: RootState) =>
  state.file.uploadProgress;

export const selectDeleteFileStatus = (state: RootState) =>
  state.file.deleteFile.status;
export const selectDeleteFileData = (state: RootState) =>
  state.file.deleteFile.data;
export const selectDeleteFileError = (state: RootState) =>
  state.file.deleteFile.error;

export const { setUploadProgress } = fileSlice.actions;

export default fileSlice.reducer;
