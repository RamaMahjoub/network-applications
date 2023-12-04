import { Checkbox, DialogActions, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import IconifyIcon from "../../../@core/components/icon";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  bookFile,
  getGroupFiles,
  getUnBookedFiles,
  selectBookFileStatus,
  selectFilesToBookData,
  selectFilesToBookError,
  selectFilesToBookStatus,
} from "../../../store/groupFileSlice";
import NoData from "../../../@core/components/no-data";
import { ResponseStatus } from "../../../store/types";
import Clip from "../../../@core/components/clip-spinner";

interface Props {
  open: boolean;
  handleDialog: () => void;
  groupId: number;
}

const ReserveFile = ({ open, handleDialog, groupId }: Props) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const filesStatus = useAppSelector(selectFilesToBookStatus);
  const filesError = useAppSelector(selectFilesToBookError);
  const filesData = useAppSelector(selectFilesToBookData);
  const bookFilesStatus = useAppSelector(selectBookFileStatus);

  let files = <NoData />;
  if (filesStatus === ResponseStatus.LOADING) {
    files = <Clip />;
  } else if (filesStatus === ResponseStatus.IDLE) {
    files = <NoData />;
  } else if (filesStatus === ResponseStatus.FAILED) {
    files = <div>{filesError}</div>;
  }

  useEffect(() => {
    dispatch(getUnBookedFiles({ id: groupId }));
  }, [dispatch, groupId]);

  const handleSelect = (id: number) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleBookFiles = () => {
    const requset = {
      group_id: groupId,
      file_ids: selected,
    };
    dispatch(bookFile(requset)).then(() => {
      handleDialog();
      dispatch(getGroupFiles({ id: groupId }));
    });
  };
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleDialog}>
      <DialogTitle
        sx={{
          textAlign: "center",
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(12)} !important`,
          ],
        }}
      >
        Reserve File
      </DialogTitle>
      <DialogContent
        sx={{
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(6)} !important`,
          ],
        }}
      >
        <Box
          sx={{
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>All Files</Typography>
          {filesStatus === ResponseStatus.SUCCEEDED
            ? filesData?.data.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  borderBottom={1}
                  borderColor="divider"
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconifyIcon
                      width={36}
                      height={36}
                      icon="heroicons-outline:document"
                      color={`${theme.palette.text.secondary}`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        noWrap
                        sx={{
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        {file.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Checkbox
                    checked={selected.includes(file.id)}
                    onChange={() => handleSelect(file.id)}
                  />
                </Box>
              ))
            : files}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(12)} !important`,
          ],
          py: (theme) => `${theme.spacing(3)} !important`,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
          }}
          onClick={handleBookFiles}
        >
          {bookFilesStatus === ResponseStatus.LOADING ? (
            <Clip />
          ) : (
            "Reserve Files"
          )}
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: (theme) => theme.palette.action.disabled,
          }}
          onClick={handleDialog}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReserveFile;
