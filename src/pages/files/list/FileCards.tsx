import Grid from "@mui/material/Grid";
import FileItem from "./FileItem";
import { ResponseStatus } from "../../../store/types";
import NoData from "../../../@core/components/no-data";
import Clip from "../../../@core/components/clip-spinner";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getUserFiles,
  selectAllUserFilesData,
  selectAllUserFilesError,
  selectAllUserFilesStatus,
} from "../../../store/fileSlice";
import { useEffect } from "react";

const FileCards = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAllUserFilesStatus);
  const error = useAppSelector(selectAllUserFilesError);
  const data = useAppSelector(selectAllUserFilesData);
  let content = <NoData />;

  if (status === ResponseStatus.LOADING) {
    content = <Clip />;
  } else if (status === ResponseStatus.IDLE) {
    content = <NoData />;
  } else if (status === ResponseStatus.FAILED) {
    content = <div>{error}</div>;
  }

  useEffect(() => {
    dispatch(getUserFiles());
  }, [dispatch]);
  return (
    <Grid container spacing={4}>
      {status === ResponseStatus.SUCCEEDED &&
      data?.data &&
      data?.data.length > 0 ? (
        data?.data.map((file) => <FileItem file={file} key={file.id} />)
      ) : (
        <Grid item xs={12} className="flex items-center justify-center w-full">
          {content}
        </Grid>
      )}
    </Grid>
  );
};

export default FileCards;
