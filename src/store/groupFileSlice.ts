/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GroupService from "../services/groups";
import { ApiState, ResponseStatus } from "./types";
import { RootState } from ".";
import { IFilesRequest } from "../pages/groups/addFile/schema";
import { IUnBookFileRequest } from "../pages/groups/cancelReserveFile/schema";
import { IUpdateFile } from "../pages/groups/groupFiles/schema";
import { AxiosProgressEvent } from "axios";
import { setUploadProgress } from "./fileSlice";
import { toast } from "react-toastify";

export interface GroupFile {
  id: number;
  name: string;
  status: number;
  created_at: Date;
  booker_name: string | null;
}

export interface FileToAdd {
  id: number;
  name: string;
}

interface IAllGroupFilesResponse {
  data: GroupFile[];
}

interface IFilesToAddResponse {
  data: FileToAdd[];
}

interface IAddFileResponse {
  message: string;
}

interface IDeleteFileResponse {
  message: string;
}

interface IUnBookFileResponse {
  message: string;
}

interface IUpdateFileResponse {
  message: string;
}

interface IFilesToBookResponse {
  message: string;
  data: FileToAdd[];
}

type GroupFilesState = {
  allGroupFiles: ApiState<IAllGroupFilesResponse>;
  filesToAdd: ApiState<IFilesToAddResponse>;
  filesToBook: ApiState<IFilesToBookResponse>;
  addFile: ApiState<IAddFileResponse>;
  deleteFile: ApiState<IDeleteFileResponse>;
  unBookFile: ApiState<IUnBookFileResponse>;
  bookFile: ApiState<any>;
  updateFile: ApiState<IUpdateFileResponse>;
};

const initialState: GroupFilesState = {
  allGroupFiles: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  filesToAdd: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  filesToBook: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  addFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  deleteFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  unBookFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  bookFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  updateFile: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
};

export const getGroupFiles = createAsyncThunk(
  "group/all-files",
  async (params: { id: number }) => {
    try {
      const response = await GroupService.getGroupFiles(params.id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const getFilesToAdd = createAsyncThunk(
  "group/files-to-add",
  async (params: { id: number }) => {
    try {
      const response = await GroupService.showFilesToAddToGroup(params.id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const getUnBookedFiles = createAsyncThunk(
  "group/files-to-book",
  async (params: { id: number }) => {
    try {
      const response = await GroupService.showUnBookedFiles(params.id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const addFileToGroup = createAsyncThunk(
  "group/add-file",
  async (body: IFilesRequest) => {
    try {
      const response = await GroupService.addFilesToGroup(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);
export const deleteFileFromGroup = createAsyncThunk(
  "group/delete-file",
  async (params: { groupId: number; fileId: number }) => {
    try {
      const response = await GroupService.deleteFileFromGroup(
        params.groupId,
        params.fileId
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const bookFile = createAsyncThunk(
  "group/book-file",
  async (body: IFilesRequest) => {
    try {
      const response = await GroupService.bookFile(body);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const unBookFile = createAsyncThunk(
  "group/unbook-file",
  async (body: IUnBookFileRequest) => {
    try {
      const response = await GroupService.cancelFileReservationInGroup(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const updateFile = createAsyncThunk(
  "group/update-file",
  async (body: IUpdateFile, { dispatch }) => {
    try {
      const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        console.log("progress", progress);
        dispatch(setUploadProgress(progress));
      };
      const response = await GroupService.updateFile(body, onUploadProgress);
      dispatch(setUploadProgress(0));
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const groupFileSlice = createSlice({
  name: "groupFile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupFiles.pending, (state) => {
        state.allGroupFiles.status = ResponseStatus.LOADING;
      })
      .addCase(getGroupFiles.fulfilled, (state, action: PayloadAction<any>) => {
        state.allGroupFiles.status = ResponseStatus.SUCCEEDED;
        state.allGroupFiles.data = action.payload;
      })
      .addCase(getGroupFiles.rejected, (state, action) => {
        state.allGroupFiles.status = ResponseStatus.FAILED;
        state.allGroupFiles.error =
          action.error.message || "something went wrong..";
      })
      .addCase(getFilesToAdd.pending, (state) => {
        state.filesToAdd.status = ResponseStatus.LOADING;
      })
      .addCase(getFilesToAdd.fulfilled, (state, action: PayloadAction<any>) => {
        state.filesToAdd.status = ResponseStatus.SUCCEEDED;
        state.filesToAdd.data = action.payload;
      })
      .addCase(getFilesToAdd.rejected, (state, action) => {
        state.filesToAdd.status = ResponseStatus.FAILED;
        state.filesToAdd.error =
          action.error.message || "something went wrong..";
      })
      .addCase(getUnBookedFiles.pending, (state) => {
        state.filesToBook.status = ResponseStatus.LOADING;
      })
      .addCase(
        getUnBookedFiles.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.filesToBook.status = ResponseStatus.SUCCEEDED;
          state.filesToBook.data = action.payload;
        }
      )
      .addCase(getUnBookedFiles.rejected, (state, action) => {
        state.filesToBook.status = ResponseStatus.FAILED;
        state.filesToBook.error =
          action.error.message || "something went wrong..";
      })
      .addCase(addFileToGroup.pending, (state) => {
        state.addFile.status = ResponseStatus.LOADING;
      })
      .addCase(
        addFileToGroup.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.addFile.status = ResponseStatus.SUCCEEDED;
          toast.success(action.payload.message);
          state.addFile.data = action.payload;
        }
      )
      .addCase(addFileToGroup.rejected, (state, action) => {
        state.addFile.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.addFile.error = action.error.message || "something went wrong..";
      })
      .addCase(deleteFileFromGroup.pending, (state) => {
        state.deleteFile.status = ResponseStatus.LOADING;
      })
      .addCase(
        deleteFileFromGroup.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.deleteFile.status = ResponseStatus.SUCCEEDED;
          toast.success(action.payload.message);
          state.deleteFile.data = action.payload;
        }
      )
      .addCase(deleteFileFromGroup.rejected, (state, action) => {
        state.deleteFile.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.deleteFile.error =
          action.error.message || "something went wrong..";
      })
      .addCase(unBookFile.pending, (state) => {
        state.unBookFile.status = ResponseStatus.LOADING;
      })
      .addCase(unBookFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.unBookFile.status = ResponseStatus.SUCCEEDED;
        toast.success(action.payload.message);
        state.unBookFile.data = action.payload;
      })
      .addCase(unBookFile.rejected, (state, action) => {
        state.unBookFile.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.unBookFile.error =
          action.error.message || "something went wrong..";
      })
      .addCase(bookFile.pending, (state) => {
        state.bookFile.status = ResponseStatus.LOADING;
      })
      .addCase(bookFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.bookFile.status = ResponseStatus.SUCCEEDED;
        const blob = new Blob([action.payload.data], {
          type: "application/zip",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded_files.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Files booked successfully");
        state.bookFile.data = action.payload;
      })
      .addCase(bookFile.rejected, (state, action) => {
        state.bookFile.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.bookFile.error = action.error.message || "something went wrong..";
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.updateFile.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.updateFile.error =
          action.error.message || "something went wrong..";
      })
      .addCase(updateFile.pending, (state) => {
        state.updateFile.status = ResponseStatus.LOADING;
      })
      .addCase(updateFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateFile.status = ResponseStatus.SUCCEEDED;
        toast.success(action.payload.message);
        state.updateFile.data = action.payload;
      });
  },
});

export const selectAllGroupFilesStatus = (state: RootState) =>
  state.groupFile.allGroupFiles.status;
export const selectAllGroupFilesData = (state: RootState) =>
  state.groupFile.allGroupFiles.data;
export const selectAllGroupFilesError = (state: RootState) =>
  state.groupFile.allGroupFiles.error;

export const selectFilesToAddStatus = (state: RootState) =>
  state.groupFile.filesToAdd.status;
export const selectFilesToAddData = (state: RootState) =>
  state.groupFile.filesToAdd.data;
export const selectFilesToAddError = (state: RootState) =>
  state.groupFile.filesToAdd.error;

export const selectFilesToBookStatus = (state: RootState) =>
  state.groupFile.filesToBook.status;
export const selectFilesToBookData = (state: RootState) =>
  state.groupFile.filesToBook.data;
export const selectFilesToBookError = (state: RootState) =>
  state.groupFile.filesToBook.error;

export const selectAddFileStatus = (state: RootState) =>
  state.groupFile.addFile.status;
export const selectAddFileData = (state: RootState) =>
  state.groupFile.addFile.data;
export const selectAddFileError = (state: RootState) =>
  state.groupFile.addFile.error;

export const selectDeleteFileStatus = (state: RootState) =>
  state.groupFile.deleteFile.status;
export const selectDeleteFileData = (state: RootState) =>
  state.groupFile.deleteFile.data;
export const selectDeleteFileError = (state: RootState) =>
  state.groupFile.deleteFile.error;

export const selectUnBookFileStatus = (state: RootState) =>
  state.groupFile.unBookFile.status;
export const selectUnBookFileData = (state: RootState) =>
  state.groupFile.unBookFile.data;
export const selectUnBookFileError = (state: RootState) =>
  state.groupFile.unBookFile.error;

export const selectBookFileStatus = (state: RootState) =>
  state.groupFile.bookFile.status;
export const selectBookFileData = (state: RootState) =>
  state.groupFile.bookFile.data;
export const selectBookFileError = (state: RootState) =>
  state.groupFile.bookFile.error;

export const selectUpdateFileStatus = (state: RootState) =>
  state.groupFile.updateFile.status;
export const selectUpdateFileData = (state: RootState) =>
  state.groupFile.updateFile.data;
export const selectUpdateFileError = (state: RootState) =>
  state.groupFile.updateFile.error;

export default groupFileSlice.reducer;
