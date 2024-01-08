import { IAddGroupRequest } from "../pages/groups/addGroup/schema";
import { protectedAxios } from "../@core/axios";
import { IAddMemberRequest } from "../pages/groups/addMember/schema";
import { IFilesRequest } from "../pages/groups/addFile/schema";
import { IUnBookFileRequest } from "../pages/groups/cancelReserveFile/schema";
import { AxiosProgressEvent } from "axios";
import { IUpdateFile } from "../pages/groups/groupFiles/schema";

const allUserGroups = () => {
  return protectedAxios.get("/group/allGroups");
};

const addGroup = (payload: IAddGroupRequest) => {
  return protectedAxios.post("/group/store", payload);
};

const deleteGroup = (groupId: number) => {
  return protectedAxios.post(`/group/destroy/${groupId}`);
};

const addMemberToGroup = (body: IAddMemberRequest) => {
  return protectedAxios.post(`/group/groupMember`, body);
};

const deleteMemberFromGroup = (groupId: number, memberId: number) => {
  return protectedAxios.post(`/group/deleteMember/${groupId}/${memberId}`);
};

const getGroupMembers = (groupId: number) => {
  return protectedAxios.get(`/group/usersGroup/${groupId}`);
};

const getGroupFiles = (groupId: number) => {
  return protectedAxios.get(`/group/${groupId}/file/showAll`);
};

const showFilesToAddToGroup = (groupId: number) => {
  return protectedAxios.get(`/group/${groupId}/file/showToAdd`);
};

const showUnBookedFiles = (groupId: number) => {
  return protectedAxios.get(`/group/${groupId}/file/showUnBooked`);
};
const addFilesToGroup = (body: IFilesRequest) => {
  return protectedAxios.post(`/group/file/add`, body);
};

const deleteFileFromGroup = (groupId: number, fileId: number) => {
  return protectedAxios.delete(`/group/${groupId}/file/${fileId}`);
};

const cancelFileReservationInGroup = (body: IUnBookFileRequest) => {
  return protectedAxios.post(`/file/unBook`, body);
};

const bookFile = (body: IFilesRequest) => {
  return protectedAxios.post("/file/book", body);
};

const updateFile = (
  body: IUpdateFile,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    onUploadProgress,
  };
  return protectedAxios.post("/file/edit", body, config);
};

const GroupService = {
  allUserGroups,
  addGroup,
  deleteGroup,
  addMemberToGroup,
  deleteMemberFromGroup,
  getGroupMembers,
  getGroupFiles,
  addFilesToGroup,
  deleteFileFromGroup,
  cancelFileReservationInGroup,
  showFilesToAddToGroup,
  showUnBookedFiles,
  bookFile,
  updateFile
};

export default GroupService;
