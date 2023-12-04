/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import GroupMembers from "../groupMembers";
import GroupFiles from "../groupFiles";

const PreviewGroup = () => {
  const theme = useTheme();
  const { groupId } = useParams();

  return (
    <Grid
      container
      spacing={3}
      sx={{
        width: "auto",
        marginX: `-${theme.spacing(3)}`,
        [theme.breakpoints.down("sm")]: {
          marginLeft: `-${theme.spacing(4)}`,
          marginRight: `-${theme.spacing(4)}`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          flexWrap: "wrap",
          width: "auto",
          paddingY: 3,
          paddingX: 5,
        }}
      >
        <Typography
          variant="h6"
          className="flex font-extrabold tracking-tight text-24 md:text-32"
        >
          Group Name
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GroupMembers groupId={Number(groupId!)} />
        <GroupFiles groupId={Number(groupId!)} />
      </Box>
    </Grid>
  );
};

export default PreviewGroup;
