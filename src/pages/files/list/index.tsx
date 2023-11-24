import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Icon from "../../../@core/components/icon";
import FileCards from "./FileCards";
import { ChangeEvent, useRef, useState } from "react";
import ProgressModal from "../../../@core/components/progress-modal";

const FilesList = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      handleUploadFile(e.target.files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    setOpenModal(true);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    for (let progress = 0; progress <= 100; progress += 10) {
      await delay(500);
      setUploadProgress(progress);
    }

    setOpenModal(false);
    setUploadProgress(0);
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
      <ProgressModal open={openModal} progressVal={uploadProgress} />
    </>
  );
};

export default FilesList;
