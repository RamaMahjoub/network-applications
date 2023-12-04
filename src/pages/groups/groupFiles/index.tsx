/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Chip,
  IconButton,
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
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icon from "../../../@core/components/icon";
import { routes } from "../../../router/constants";
import { ResponseStatus } from "../../../store/types";
import { Column } from "../Preview/type";
import AddFile from "../addFile";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupFile, updateFile } from "../../../store/groupFileSlice";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
import DeleteFile from "../deleteFile";
import ReserveFile from "../reserveFile";
import CancelReserveFile from "../cancelReserveFile";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getGroupFiles,
  selectAllGroupFilesData,
  selectAllGroupFilesError,
  selectAllGroupFilesStatus,
} from "../../../store/groupFileSlice";
import NoData from "../../../@core/components/no-data";
import Clip from "../../../@core/components/clip-spinner";
import { getUserData } from "../../../@core/utils/user-storage";
import { selectUploadProgress } from "../../../store/fileSlice";
import { IUpdateFile } from "./schema";
import ProgressModal from "../../../@core/components/progress-modal";

interface Props {
  groupId: number;
}
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
    id: "booker_name",
    label: "Booker Name",
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

const GroupFiles = ({ groupId }: Props) => {
  const user = getUserData();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filesStatus = useAppSelector(selectAllGroupFilesStatus);
  const filesError = useAppSelector(selectAllGroupFilesError);
  const filesData = useAppSelector(selectAllGroupFilesData);
  const [selectedFileId, setFileId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadProgress = useAppSelector(selectUploadProgress);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddFileDialog, setOpenAddFileDialog] = useState<boolean>(false);
  const [openDeleteFileDialog, setOpenDeleteFileDialog] =
    useState<boolean>(false);

  const [openReserveFileDialog, setOpenReserveFileDialog] =
    useState<boolean>(false);

  const [openCancelReserveFileDialog, setOpenCancelReserveFileDialog] =
    useState<boolean>(false);

  const handleAddFileDialog = useCallback(() => {
    setOpenAddFileDialog((pre) => !pre);
  }, []);

  const handleDeleteFileDialog = useCallback(() => {
    setOpenDeleteFileDialog((pre) => !pre);
  }, []);

  const handleReserveFileDialog = useCallback(() => {
    setOpenReserveFileDialog((pre) => !pre);
  }, []);

  const handleCancelReserveFileDialog = useCallback(() => {
    setOpenCancelReserveFileDialog((pre) => !pre);
  }, []);

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleUpdateFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const request: IUpdateFile = {
        file_id: selectedFileId!,
        group_id: groupId,
        file: e.target.files[0],
      };
      setOpenModal(true);
      dispatch(updateFile(request)).then(() =>
        dispatch(getGroupFiles({ id: groupId }))
      );
    }
  };
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    dispatch(getGroupFiles({ id: groupId }));
  }, [dispatch, groupId]);

  let files = <NoData />;

  if (filesStatus === ResponseStatus.LOADING) {
    files = <Clip />;
  } else if (filesStatus === ResponseStatus.IDLE) {
    files = <NoData />;
  } else if (filesStatus === ResponseStatus.FAILED) {
    files = <div>{filesError}</div>;
  }

  const renderCell = (value: any, column: keyof GroupFile) => {
    console.log("type", typeof value);
    if (column === "status") {
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
    <>
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
      <Paper sx={{ width: "auto", overflow: "hidden", marginX: 5, marginY: 2 }}>
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
              {filesStatus === ResponseStatus.SUCCEEDED ? (
                filesData?.data.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => {
                      console.log(row[column.id], column.id);
                      return (
                        <StyledTableCell key={`${row[column.id]}_${column.id}`}>
                          {renderCell(row[column.id], column.id)}
                        </StyledTableCell>
                      );
                    })}
                    <StyledTableCell align="left">
                      <Tooltip title="Read file">
                        <span>
                          <IconButton
                            disabled={row.status === 0}
                            onClick={() =>
                              handleNavigate(
                                `/${routes.GROUPS}/${groupId}/${routes.FILE}/${row.id}`
                              )
                            }
                          >
                            <Icon icon="tabler:eye" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Update file">
                        <span>
                          <IconButton
                            disabled={row.booker_name !== user?.name}
                            onClick={() => {
                              setFileId(row.id);
                              handleChooseFile();
                            }}
                          >
                            <Icon icon="dashicons:update" />
                          </IconButton>
                          <input
                            ref={fileInputRef}
                            id="fileInput"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleUpdateFile}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="Cancel file reservation">
                        <span>
                          <IconButton
                            onClick={() => {
                              setFileId(row.id);
                              handleCancelReserveFileDialog();
                            }}
                            disabled={row.booker_name !== user?.name}
                          >
                            <Icon icon="mdi:account-unlocked-outline" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="File report">
                        <IconButton
                          onClick={() =>
                            handleNavigate(
                              `/${routes.GROUPS}/${groupId}/${routes.FILEREPORT}/${row.id}`
                            )
                          }
                        >
                          <Icon icon="tabler:file-info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete file">
                        <IconButton
                          onClick={() => {
                            setFileId(row.id);
                            handleDeleteFileDialog();
                          }}
                        >
                          <Icon icon="tabler:trash" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>{files}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <AddFile
        groupId={Number(groupId!)}
        open={openAddFileDialog}
        handleDialog={handleAddFileDialog}
      />
      <DeleteFile
        fileId={selectedFileId!}
        groupId={Number(groupId!)}
        open={openDeleteFileDialog}
        handleDialog={handleDeleteFileDialog}
      />
      <ReserveFile
        groupId={Number(groupId!)}
        open={openReserveFileDialog}
        handleDialog={handleReserveFileDialog}
      />
      <CancelReserveFile
        fileId={selectedFileId!}
        groupId={Number(groupId!)}
        open={openCancelReserveFileDialog}
        handleDialog={handleCancelReserveFileDialog}
      />
      <ProgressModal
        open={openModal}
        progressVal={uploadProgress}
        handleOpen={setOpenModal}
      />
    </>
  );
};

export default GroupFiles;
