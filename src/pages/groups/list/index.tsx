import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import GroupCards from "./GroupCards";
import Icon from "../../../@core/components/icon";
import { useCallback, useState } from "react";
import AddGroup from "../addGroup";

const GroupsList = () => {
  const [openAddGroup, setOpenAddGroup] = useState<boolean>(false);
  const handleDialog = useCallback(() => {
    setOpenAddGroup((pre) => !pre);
  }, []);
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
            Groups
          </Typography>
          <Button
            className="mx-8 whitespace-nowrap"
            variant="contained"
            startIcon={<Icon icon={"tabler:plus"} />}
            sx={{
              textTransform: "none",
            }}
            onClick={handleDialog}
          >
            Add New Group
          </Button>
        </Box>
        <Grid item xs={12}>
          <Box
            className="flex flex-wrap w-full p-8 mb-8 border rounded-xl"
            sx={{
              backgroundColor: "rgba(0, 0, 0, .05)",
            }}
          >
            <GroupCards />
          </Box>
        </Grid>
      </Grid>
      <AddGroup open={openAddGroup} handleOpen={handleDialog} />
    </>
  );
};

export default GroupsList;
