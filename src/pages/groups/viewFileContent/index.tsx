import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  readFile,
  selectFileContentData,
  selectFileContentError,
  selectFileContentStatus,
} from "../../../store/fileSlice";
import { useParams } from "react-router-dom";
import NoData from "../../../@core/components/no-data";
import { ResponseStatus } from "../../../store/types";
import Clip from "../../../@core/components/clip-spinner";

const ViewFileContent = () => {
  const { groupId, fileId } = useParams();
  console.log(groupId, fileId, "ffffffffffffffff")
  const dispatch = useAppDispatch();
  const filesStatus = useAppSelector(selectFileContentStatus);
  const filesError = useAppSelector(selectFileContentError);
  const filesData = useAppSelector(selectFileContentData);
  let content = <NoData />;
  let formatted = "";
  useEffect(() => {
    dispatch(readFile({ groupId: Number(groupId!), fileId: Number(fileId!) }));
  }, [dispatch, groupId, fileId]);

  if (filesStatus === ResponseStatus.LOADING) {
    content = <Clip />;
  } else if (filesStatus === ResponseStatus.IDLE) {
    content = <NoData />;
  } else if (filesStatus === ResponseStatus.FAILED) {
    content = <div>{filesError}</div>;
  } else formatted = filesData!.file_content.replace(/\\r\\n/g, "\n");
  
  return (
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
          {filesData ? filesData!.file_name : ""}
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Box
          className="flex flex-wrap justify-center w-full p-8 mb-8 border rounded-xl"
          sx={{
            backgroundColor: "rgba(0, 0, 0, .05)",
          }}
        >
          {filesStatus === ResponseStatus.SUCCEEDED ? (
            <SyntaxHighlighter style={coldarkDark} children={formatted} />
          ) : (
            content
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ViewFileContent;
