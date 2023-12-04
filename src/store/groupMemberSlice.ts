/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GroupService from "../services/groups";
import { ApiState, ResponseStatus } from "./types";
import { RootState } from ".";
import { IAddMemberRequest } from "../pages/groups/addMember/schema";

export interface GroupMember {
  member_id: number;
  username: string;
  email: string;
}

interface IAllGroupMembersResponse {
  message: string;
  group_name: string;
  group_members: GroupMember[];
  admin_username: string;
  admin_email: string;
}

interface IAddGroupMemberResponse {
  message: string;
}

interface IDeleteMemberResponse {
  message: string;
}

type GroupMembersState = {
  allGroupMembers: ApiState<IAllGroupMembersResponse>;
  addMember: ApiState<IAddGroupMemberResponse>;
  deleteMember: ApiState<IDeleteMemberResponse>;
};

const initialState: GroupMembersState = {
  allGroupMembers: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  addMember: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
  deleteMember: {
    status: ResponseStatus.IDLE,
    data: undefined,
  },
};

export const addMember = createAsyncThunk(
  "group/add-member",
  async (body: IAddMemberRequest) => {
    try {
      const response = await GroupService.addMemberToGroup(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteMember = createAsyncThunk(
  "group/delete-member",
  async (params: { groupId: number; memberId: number }) => {
    try {
      const response = await GroupService.deleteMemberFromGroup(
        params.groupId,
        params.memberId
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);
export const getGroupMembers = createAsyncThunk(
  "group/all-members",
  async (params: { id: number }) => {
    try {
      const response = await GroupService.getGroupMembers(params.id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const groupMemberSlice = createSlice({
  name: "groupMember",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupMembers.pending, (state) => {
        state.allGroupMembers.status = ResponseStatus.LOADING;
      })
      .addCase(
        getGroupMembers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allGroupMembers.status = ResponseStatus.SUCCEEDED;
          state.allGroupMembers.data = action.payload;
        }
      )
      .addCase(getGroupMembers.rejected, (state, action) => {
        state.allGroupMembers.status = ResponseStatus.FAILED;
        state.allGroupMembers.error =
          action.error.message || "something went wrong..";
      })
      .addCase(addMember.pending, (state) => {
        state.addMember.status = ResponseStatus.LOADING;
      })
      .addCase(addMember.fulfilled, (state, action: PayloadAction<any>) => {
        state.addMember.status = ResponseStatus.SUCCEEDED;
        state.addMember.data = action.payload;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.addMember.status = ResponseStatus.FAILED;
        state.addMember.error =
          action.error.message || "something went wrong..";
      })
      .addCase(deleteMember.pending, (state) => {
        state.deleteMember.status = ResponseStatus.LOADING;
      })
      .addCase(deleteMember.fulfilled, (state, action: PayloadAction<any>) => {
        state.deleteMember.status = ResponseStatus.SUCCEEDED;
        state.deleteMember.data = action.payload;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        console.log("slice", ResponseStatus.FAILED);
        state.deleteMember.status = ResponseStatus.FAILED;
        state.deleteMember.error =
          action.error.message || "something went wrong..";
      });
  },
});

export const selectAllGroupMembersStatus = (state: RootState) =>
  state.groupMember.allGroupMembers.status;
export const selectAllGroupMembersData = (state: RootState) =>
  state.groupMember.allGroupMembers.data;
export const selectAllGroupMembersError = (state: RootState) =>
  state.groupMember.allGroupMembers.error;

export const selectAddMemberStatus = (state: RootState) =>
  state.groupMember.addMember.status;
export const selectAddMemberData = (state: RootState) =>
  state.groupMember.addMember.data;
export const selectAddMemberError = (state: RootState) =>
  state.groupMember.addMember.error;

export const selectDeleteMemberStatus = (state: RootState) =>
  state.groupMember.deleteMember.status;
export const selectDeleteMemberData = (state: RootState) =>
  state.groupMember.deleteMember.data;
export const selectDeleteMemberError = (state: RootState) =>
  state.groupMember.deleteMember.error;

export default groupMemberSlice.reducer;
