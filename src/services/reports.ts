import { protectedAxios } from "../@core/axios";

const userReport = (groupId: number, userId: number) => {
  return protectedAxios.get(`group/${groupId}/history/user/${userId}`);
};

const fileReport = (groupId: number, fileId: number) => {
  return protectedAxios.get(`group/${groupId}/history/file/${fileId}`);
};

const ReportService = {
  userReport,
  fileReport,
};

export default ReportService;
