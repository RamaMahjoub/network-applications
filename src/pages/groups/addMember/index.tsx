import { Avatar, Checkbox, DialogActions } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { getInitials } from "../../../@core/utils/getinitials";

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

interface Props {
  open: boolean;
  handleDialog: () => void;
}
const AddMember = ({ open, handleDialog }: Props) => {
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
        Add New Member
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
          <Typography>All Users</Typography>
          {members.map((member) => (
            <Box
              key={member.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              borderBottom={1}
              borderColor="divider"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 36, height: 36 }}>
                  <Typography className="text-xs">
                    {getInitials(member.name)}
                  </Typography>
                </Avatar>
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
                    {member.name}
                  </Typography>
                  <Typography
                    noWrap
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {member.email}
                  </Typography>
                </Box>
              </Box>
              <Checkbox
                checked={selected.includes(member.id)}
                onChange={() => handleSelect(member.id)}
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
          Add Members
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

export default AddMember;
