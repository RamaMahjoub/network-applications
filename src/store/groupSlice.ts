/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GroupService from "../services/groups";
import { ApiState, ResponseStatus } from "./types";
import { RootState } from ".";
import { IAddGroupRequest } from "../pages/groups/addGroup/schema";
import { toast } from "react-toastify";

export interface IGroupResponse {
  group_id: number;
  name: string;
  member_count: number;
}
interface IAllGroupsResponse {
  message: string;
  groups: IGroupResponse[];
}

interface IAddGroupResponse {
  message: string;
}

interface IDeleteGroupResponse {
  message: string;
}

type GroupState = {
  allUserGroups: ApiState<IAllGroupsResponse>;
  addGroup: ApiState<IAddGroupResponse>;
  deleteGroup: ApiState<IDeleteGroupResponse>;
};

const initialState: GroupState = {
  allUserGroups: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  addGroup: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  deleteGroup: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
};

export const getUserGroups = createAsyncThunk("groups/all-groups", async () => {
  try {
    const response = await GroupService.allUserGroups();
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const addGroup = createAsyncThunk(
  "groups/add-group",
  async (body: IAddGroupRequest) => {
    try {
      const response = await GroupService.addGroup(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/delete-group",
  async (params: { groupId: number }) => {
    try {
      const response = await GroupService.deleteGroup(params.groupId);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGroups.pending, (state) => {
        state.allUserGroups.status = ResponseStatus.LOADING;
      })
      .addCase(getUserGroups.fulfilled, (state, action: PayloadAction<any>) => {
        state.allUserGroups.status = ResponseStatus.SUCCEEDED;
        state.allUserGroups.data = action.payload;
      })
      .addCase(getUserGroups.rejected, (state, action) => {
        state.allUserGroups.status = ResponseStatus.FAILED;
        state.allUserGroups.error =
          action.error.message || "something went wrong..";
      })
      .addCase(addGroup.pending, (state) => {
        state.addGroup.status = ResponseStatus.LOADING;
      })
      .addCase(addGroup.fulfilled, (state, action: PayloadAction<any>) => {
        state.addGroup.status = ResponseStatus.SUCCEEDED;
        toast.success(action.payload.message);
        state.addGroup.data = action.payload;
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.addGroup.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.addGroup.error =
          action.error.message || "something went wrong..";
      })
      .addCase(deleteGroup.pending, (state) => {
        state.deleteGroup.status = ResponseStatus.LOADING;
      })
      .addCase(deleteGroup.fulfilled, (state, action: PayloadAction<any>) => {
        state.deleteGroup.status = ResponseStatus.SUCCEEDED;
        toast.success(action.payload.message);
        state.deleteGroup.data = action.payload;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.deleteGroup.status = ResponseStatus.FAILED;
        toast.error(action.error.message);
        state.deleteGroup.error =
          action.error.message || "something went wrong..";
      });
  },
});

export const selectAllUserGroupsStatus = (state: RootState) =>
  state.group.allUserGroups.status;
export const selectAllUserGroupsData = (state: RootState) =>
  state.group.allUserGroups.data;
export const selectAllUserGroupsError = (state: RootState) =>
  state.group.allUserGroups.error;

export const selectAddGroupStatus = (state: RootState) =>
  state.group.addGroup.status;
export const selectAddGroupData = (state: RootState) =>
  state.group.addGroup.data;
export const selectAddGroupError = (state: RootState) =>
  state.group.addGroup.error;

export const selectDeleteGroupStatus = (state: RootState) =>
  state.group.deleteGroup.status;
export const selectDeleteGroupData = (state: RootState) =>
  state.group.deleteGroup.data;
export const selectDeleteGroupError = (state: RootState) =>
  state.group.deleteGroup.error;

export default groupSlice.reducer;
