import { Box, Button, Grid, Typography } from "@mui/material";
import Icon from "../../../@core/components/icon";
import FileCards from "./FileCards";
import { ChangeEvent, useRef, useState } from "react";
import ProgressModal from "../../../@core/components/progress-modal";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getUserFiles,
  selectUploadProgress,
  uploadFile,
} from "../../../store/fileSlice";
const FilesList = () => {
  const dispatch = useAppDispatch();
  const uploadProgress = useAppSelector(selectUploadProgress);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOpenModal(true);
      dispatch(uploadFile(e.target.files[0])).then(() =>
        dispatch(getUserFiles())
      );
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Grid container spacing={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            flexWrap: "wrap",
            width: "100%",
            padding: 5,
            paddingBottom: 0,
            paddingRight: 0,
          }}
        >
          <Typography
            variant="h6"
            className="flex font-extrabold tracking-tight text-24 md:text-32"
          >
            Files
          </Typography>
          <Button
            className="mx-8 whitespace-nowrap"
            variant="contained"
            startIcon={<Icon icon={"tabler:plus"} />}
            sx={{
              textTransform: "none",
            }}
            onClick={handleChooseFile}
          >
            Upload file
          </Button>
          <input
            ref={fileInputRef}
            id="fileInput"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
        </Box>
        <Grid item xs={12}>
          <Box
            className="flex flex-wrap w-full p-8 mb-8 border rounded-xl"
            sx={{
              backgroundColor: "rgba(0, 0, 0, .05)",
            }}
          >
            <FileCards />
          </Box>
        </Grid>
      </Grid>
      <ProgressModal open={openModal} progressVal={uploadProgress} handleOpen={setOpenModal} />
    </>
  );
};

export default FilesList;
