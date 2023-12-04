import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { getInitials } from "../../../@core/utils/getinitials";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Icon from "../../../@core/components/icon";
import { routes } from "../../../router/constants";
import ListItemText from "@mui/material/ListItemText";
import { GroupMember } from "../../../store/groupMemberSlice";
import DeleteMember from "../deleteMember";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  member: GroupMember;
  groupId: number;
}
const MemberItem = ({ member, groupId }: Props) => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState<number | null>(null);
  const [openDeleteMemberDialog, setOpenDeleteMemberDialog] =
    useState<boolean>(false);
  const handleDeleteMemberDialog = useCallback(() => {
    setOpenDeleteMemberDialog((pre) => !pre);
  }, []);
  const handleNavigate = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <ListItem
        key={member.member_id}
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
                {getInitials(member.username)}
              </Typography>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            classes={{
              primary: "font-medium leading-5 truncate",
            }}
            primary={member.username}
            secondary={member.email}
          />
        </Box>
        <Box>
          <Tooltip title="Member report">
            <IconButton
              onClick={() =>
                handleNavigate(
                  `/${routes.GROUPS}/${groupId}/${routes.USERREPORT}/${member.member_id}`
                )
              }
            >
              <Icon icon="tabler:file-info" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Member">
            <IconButton
              onClick={() => {
                setMemberId(member.member_id);
                handleDeleteMemberDialog();
              }}
            >
              <Icon icon="tabler:trash" />
            </IconButton>
          </Tooltip>
        </Box>
      </ListItem>
      <DeleteMember
        groupId={groupId}
        memberId={memberId!}
        open={openDeleteMemberDialog}
        handleDialog={handleDeleteMemberDialog}
      />
    </>
  );
};

export default MemberItem;
