import Typography from "@mui/material/Typography";
import Icon from "../../../@core/components/icon";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { SyntheticEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import DeleteFile from "../delete";
import Chip from "@mui/material/Chip";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
import { IFileResponse } from "../../../store/fileSlice";

interface Props {
  file: IFileResponse;
}
const FileItem = ({ file }: Props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleDeleteDialog = () => {
    setOpenDeleteDialog((pre) => !pre);
  };

  const handleOpenMenu = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const styles = {
    display: "flex",
    width: "100%",
    gap: 1,
  };
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className="flex flex-col items-center justify-center m-4 rounded-lg shadow sm:w-160 h-160"
      >
        <CardHeader
          sx={{ justifyContent: "end", width: "100%", paddingBottom: 0 }}
          action={
            <IconButton onClick={handleOpenMenu}>
              <Icon icon="iconamoon:menu-kebab-vertical-bold" />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            paddingX: 8,
            "&:last-child": { paddingBottom: 8 },
            paddingTop: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            fontSize="4rem"
            icon="heroicons-outline:document"
            color={`${theme.palette.text.secondary}`}
          />
          <Typography className="font-medium truncate text-12">
            {file.file_name}
          </Typography>
          {file.status === 1 ? (
            <Chip
              label="free"
              sx={{
                minWidth: "100px",
                backgroundColor: hexToRGBA(theme.palette.primary.main, 0.16),
                color: "primary.main",
                "&.MuiChip-root": {
                  borderRadius: "4px",
                },
              }}
            />
          ) : (
            <Chip
              label={`${file.booker_name}`}
              avatar={
                <Icon
                  color={`${theme.palette.error.main}`}
                  icon="mdi:account-lock-outline"
                />
              }
              sx={{
                minWidth: "100px",
                backgroundColor: hexToRGBA(theme.palette.error.main, 0.16),
                color: "error.main",
                "&.MuiChip-root": {
                  borderRadius: "4px",
                },
                "&.MuiChip-label": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                },
              }}
            />
          )}
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleDeleteDialog();
          }}
        >
          <Box sx={styles}>
            <Icon icon="tabler:trash" />
            Delete file
          </Box>
        </MenuItem>
      </Menu>
      <DeleteFile fileId={file.id} open={openDeleteDialog} handleDialog={handleDeleteDialog} />
    </Grid>
  );
};

export default FileItem;
