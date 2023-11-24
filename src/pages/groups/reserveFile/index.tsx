import { Checkbox, DialogActions, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import IconifyIcon from "../../../@core/components/icon";
import { File } from "../../files/list/type";

const rows: File[] = [
  {
    id: 1,
    name: "nest.txt",
    created_at: new Date(),
  },
  {
    id: 2,
    name: "next.txt",
    created_at: new Date(),
  },
  {
    id: 3,
    name: "nest.txt",
    created_at: new Date(),
  },
  {
    id: 4,
    name: "nest.txt",
    created_at: new Date(),
  },
  {
    id: 5,
    name: "nest.txt",
    created_at: new Date(),
  },
];

interface Props {
  open: boolean;
  handleDialog: () => void;
}

const ReserveFile = ({ open, handleDialog }: Props) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<number[]>([]);

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
          {rows.map((file) => (
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
          ))}
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
        >
          Reserve Files
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
