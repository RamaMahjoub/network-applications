import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Icon from "../../../@core/components/icon";
import Typography from "@mui/material/Typography";
import { routes } from "../../../router/constants";
import { Link } from "react-router-dom";
import { CardDataType } from "./type";
import { useState } from "react";
import DeleteGroup from "../deleteGroup";

interface Props {
  card: CardDataType;
}
const GroupItem = ({ card }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const handleDeleteDialog = () => {
    setOpenDeleteDialog((pre) => !pre);
  };
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        sx={{
          cursor: "pointer",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, .05)" },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
              component={Link}
              to={`/${routes.GROUPS}/${card.id}`}
            >
              <Typography>{card.name}</Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {`Total ${card.totalUsers} users`}
              </Typography>
            </Box>
            <Tooltip title="Delete group">
              <IconButton onClick={handleDeleteDialog}>
                <Icon icon="tabler:trash" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
      <DeleteGroup open={openDeleteDialog} handleDialog={handleDeleteDialog} />
    </Grid>
  );
};

export default GroupItem;