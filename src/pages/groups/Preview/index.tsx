/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  styled,
  tableCellClasses,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Icon from "../../../@core/components/icon";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
import { Column, GroupFile } from "./type";
import { ChangeEvent, useRef, useState } from "react";
import DeleteMember from "../deleteMember";
import AddMember from "../addMember";
import DeleteFile from "../../files/delete";
import { getInitials } from "../../../@core/utils/getinitials";
import AddFile from "../addFile";
import ReserveFile from "../reserveFile";
import CancelReserveFile from "../cancelReserveFile";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../router/constants";
import ProgressModal from "../../../@core/components/progress-modal";

const members = [
  {
    id: 1,
    name: "rama",
    email: "rama@gmail.com",
  },
  {
    id: 2,
    name: "ghada",
    email: "ghada@gmail.com",
  },
  {
    id: 3,
    name: "amany",
    email: "amany@gmail.com",
  },
  {
    id: 4,
    name: "ghazi",
    email: "ghazi@gmail.com",
  },
  {
    id: 5,
    name: "lylas",
    email: "lylas@gmail.com",
  },
  {
    id: 6,
    name: "loujain",
    email: "loujain@gmail.com",
  },
  {
    id: 7,
    name: "hasan",
    email: "hasan@gmail.com",
  },
];

const columns: Column[] = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "created_at",
    label: "Created at",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "reserved_by",
    label: "Reserved by",
  },
];

const rows: GroupFile[] = [
  {
    id: 1,
    name: "nest.txt",
    created_at: new Date(),
    status: false,
    reserved_by: "Rama Mahjoub",
  },
  {
    id: 2,
    name: "next.txt",
    created_at: new Date(),
    status: true,
    reserved_by: null,
  },
  {
    id: 3,
    name: "nest.txt",
    created_at: new Date(),
    status: false,
    reserved_by: "Gahda Mahjoub",
  },
  {
    id: 4,
    name: "nest.txt",
    created_at: new Date(),
    status: false,
    reserved_by: "Amani Awad",
  },
  {
    id: 5,
    name: "nest.txt",
    created_at: new Date(),
    status: true,
    reserved_by: null,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey["100"],
    color: hexToRGBA(theme.palette.common.black, 0.6),
  },
  [`&.${tableCellClasses.body}`]: {
    color: hexToRGBA(theme.palette.common.black, 0.6),
    "& .MuiTypography-root": {
      fontSize: ".85rem",
    },
  },
}));

const PreviewGroup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openDeleteMemberDialog, setOpenDeleteMemberDialog] =
    useState<boolean>(false);

  const [openDeleteFileDialog, setOpenDeleteFileDialog] =
    useState<boolean>(false);

  const [openAddMemberDialog, setOpenAddMemberDialog] =
    useState<boolean>(false);

  const [openAddFileDialog, setOpenAddFileDialog] = useState<boolean>(false);

  const [openReserveFileDialog, setOpenReserveFileDialog] =
    useState<boolean>(false);

  const [openCancelReserveFileDialog, setOpenCancelReserveFileDialog] =
    useState<boolean>(false);

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
  const handleDeleteMemberDialog = () => {
    setOpenDeleteMemberDialog((pre) => !pre);
  };

  const handleDeleteFileDialog = () => {
    setOpenDeleteFileDialog((pre) => !pre);
  };

  const handleAddMemberDialog = () => {
    setOpenAddMemberDialog((pre) => !pre);
  };

  const handleAddFileDialog = () => {
    setOpenAddFileDialog((pre) => !pre);
  };

  const handleReserveFileDialog = () => {
    setOpenReserveFileDialog((pre) => !pre);
  };

  const handleCancelReserveFileDialog = () => {
    setOpenCancelReserveFileDialog((pre) => !pre);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const renderCell = (value: any) => {
    if (typeof value === "boolean") {
      return (
        <Chip
          label={value ? "free" : "booked up"}
          sx={{
            minWidth: "100px",
            backgroundColor: value
              ? hexToRGBA(theme.palette.primary.main, 0.16)
              : hexToRGBA(theme.palette.error.main, 0.16),
            color: !value ? "error.main" : "primary.main",
            "&.MuiChip-root": {
              borderRadius: "4px",
            },
          }}
        />
      );
    } else if (value === null) {
      return <Typography className="text-lg">-</Typography>;
    } else {
      return (
        <Typography className="text-lg">{value.toLocaleString()}</Typography>
      );
    }
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            flexWrap: "wrap",
            padding: 1,
            paddingX: 5,
            backgroundColor: "rgba(0, 0, 0, .05)",
          }}
          borderTop={1}
          borderBottom={1}
          borderColor="divider"
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.secondary"
          >
            Members
          </Typography>
          <Button
            className="mx-8 whitespace-nowrap"
            variant="contained"
            startIcon={<Icon icon={"tabler:plus"} />}
            sx={{
              textTransform: "none",
            }}
            onClick={handleAddMemberDialog}
          >
            New member
          </Button>
        </Box>
        <List className="w-full divide-y">
          {members.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                paddingX: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar>
                    <Typography className="text-xs">
                      {getInitials(item.name)}
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  classes={{
                    primary: "font-medium leading-5 truncate",
                  }}
                  primary={item.name}
                  secondary={item.email}
                />
              </Box>
              <Box>
                <Tooltip title="Member report">
                  <IconButton
                    onClick={() =>
                      handleNavigate(`/${routes.USERREPORT}/${item.id}`)
                    }
                  >
                    <Icon icon="tabler:file-info" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Member">
                  <IconButton onClick={handleDeleteMemberDialog}>
                    <Icon icon="tabler:trash" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            flexWrap: "wrap",
            padding: 1,
            paddingX: 5,
            backgroundColor: "rgba(0, 0, 0, .05)",
          }}
          borderTop={1}
          borderBottom={1}
          borderColor="divider"
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.secondary"
          >
            Files
          </Typography>
          <div className="flex gap-2">
            <Button
              className="mx-8 whitespace-nowrap"
              variant="contained"
              startIcon={<Icon icon={"tabler:plus"} />}
              sx={{
                textTransform: "none",
              }}
              onClick={handleAddFileDialog}
            >
              Add File
            </Button>
            <Button
              className="mx-8 whitespace-nowrap"
              variant="contained"
              startIcon={<Icon icon={"mdi:account-lock-outline"} />}
              sx={{
                textTransform: "none",
              }}
              onClick={handleReserveFileDialog}
            >
              Reserve File
            </Button>
          </div>
        </Box>
        <Paper
          sx={{ width: "auto", overflow: "hidden", marginX: 5, marginY: 2 }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} align={column.align}>
                      {column.label}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <StyledTableCell key={`${row[column.id]}_${row.id}`}>
                        {renderCell(row[column.id])}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="left">
                      <Tooltip title="Read file">
                        <span>
                          <IconButton
                            disabled={row.status === false}
                            onClick={() => 
                              handleNavigate(`/${routes.FILE}/${row.id}`)
                            }
                          >
                            <Icon icon="tabler:eye" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Update file">
                        <span>
                          <IconButton
                            disabled={row.reserved_by !== "Rama Mahjoub"}
                            onClick={handleChooseFile}
                          >
                            <Icon icon="dashicons:update" />
                          </IconButton>
                          <input
                            ref={fileInputRef}
                            id="fileInput"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleFileChange}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="Cancel file reservation">
                        <span>
                          <IconButton
                            onClick={handleCancelReserveFileDialog}
                            disabled={row.reserved_by !== "Rama Mahjoub"}
                          >
                            <Icon icon="mdi:account-unlocked-outline" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="File report">
                        <IconButton
                          onClick={() =>
                            handleNavigate(`/${routes.FILEREPORT}/${row.id}`)
                          }
                        >
                          <Icon icon="tabler:file-info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete file">
                        <IconButton onClick={handleDeleteFileDialog}>
                          <Icon icon="tabler:trash" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <DeleteMember
        open={openDeleteMemberDialog}
        handleDialog={handleDeleteMemberDialog}
      />
      <DeleteFile
        open={openDeleteFileDialog}
        handleDialog={handleDeleteFileDialog}
      />
      <AddMember
        open={openAddMemberDialog}
        handleDialog={handleAddMemberDialog}
      />
      <AddFile open={openAddFileDialog} handleDialog={handleAddFileDialog} />
      <ReserveFile
        open={openReserveFileDialog}
        handleDialog={handleReserveFileDialog}
      />
      <CancelReserveFile
        open={openCancelReserveFileDialog}
        handleDialog={handleCancelReserveFileDialog}
      />
      <ProgressModal open={openModal} progressVal={uploadProgress} />
    </Grid>
  );
};

export default PreviewGroup;
