import { AxiosProgressEvent } from "axios";
import { protectedAxios } from "../@core/axios";

const allUserFiles = () => {
  return protectedAxios.get("/file/myFiles");
};

const readFile = (groupId: number, fileId: number) => {
  return protectedAxios.get(`/group/${groupId}/file/read/${fileId}`);
};

const deleteFile = (fileId: number) => {
  return protectedAxios.delete(`/file/delete/${fileId}`);
};

const uploadFile = (
  file: File,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const body = new FormData();
  body.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    onUploadProgress,
  };
  return protectedAxios.post("/file/upload", body, config);
};

const FileService = {
  allUserFiles,
  readFile,
  deleteFile,
  uploadFile,
};

export default FileService;
