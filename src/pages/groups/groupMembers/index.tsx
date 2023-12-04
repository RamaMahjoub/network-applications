import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { ResponseStatus } from "../../../store/types";
import Icon from "../../../@core/components/icon";
import NoData from "../../../@core/components/no-data";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getGroupMembers,
  selectAllGroupMembersData,
  selectAllGroupMembersError,
  selectAllGroupMembersStatus,
} from "../../../store/groupMemberSlice";
import Clip from "../../../@core/components/clip-spinner";
import MemberItem from "./MemberItem";
import AddMember from "../addMember";

interface Props {
  groupId: number;
}
const GroupMembers = ({ groupId }: Props) => {
  const [openAddMemberDialog, setOpenAddMemberDialog] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const membersStatus = useAppSelector(selectAllGroupMembersStatus);
  const membersError = useAppSelector(selectAllGroupMembersError);
  const membersData = useAppSelector(selectAllGroupMembersData);
  let members = <NoData />;

  if (membersStatus === ResponseStatus.LOADING) {
    members = <Clip />;
  } else if (membersStatus === ResponseStatus.IDLE) {
    members = <NoData />;
  } else if (membersStatus === ResponseStatus.FAILED) {
    members = <div>{membersError}</div>;
  }

  useEffect(() => {
    dispatch(getGroupMembers({ id: groupId }));
  }, [dispatch, groupId]);

  const handleAddMemberDialog = useCallback(() => {
    setOpenAddMemberDialog((pre) => !pre);
  }, []);

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
        {membersStatus === ResponseStatus.SUCCEEDED
          ? membersData?.group_members.map((member) => (
              <MemberItem
                member={member}
                groupId={groupId}
                key={member.member_id}
              />
            ))
          : members}
      </List>
      <AddMember
        groupId={Number(groupId!)}
        open={openAddMemberDialog}
        handleDialog={handleAddMemberDialog}
      />
    </>
  );
};

export default GroupMembers;
