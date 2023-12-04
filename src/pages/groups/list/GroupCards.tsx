import { Grid } from "@mui/material";
import GroupItem from "./GroupItem";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import NoData from "../../../@core/components/no-data";
import Clip from "../../../@core/components/clip-spinner";
import {
  getUserGroups,
  selectAllUserGroupsData,
  selectAllUserGroupsError,
  selectAllUserGroupsStatus,
} from "../../../store/groupSlice";
import { ResponseStatus } from "../../../store/types";
import { useEffect } from "react";

const GroupCards = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAllUserGroupsStatus);
  const error = useAppSelector(selectAllUserGroupsError);
  const data = useAppSelector(selectAllUserGroupsData);
  let content = <NoData />;

  if (status === ResponseStatus.LOADING) {
    content = <Clip />;
  } else if (status === ResponseStatus.IDLE) {
    content = <NoData />;
  } else if (status === ResponseStatus.FAILED) {
    content = <div>{error}</div>;
  }

  useEffect(() => {
    dispatch(getUserGroups());
  }, [dispatch]);

  return (
    <Grid container spacing={4}>
      {status === ResponseStatus.SUCCEEDED &&
      data?.groups &&
      data?.groups.length > 0
        ? data?.groups.map((group) => {
            console.log(group);
            return <GroupItem card={group} key={group.group_id} />;
          })
        : content}
    </Grid>
  );
};

export default GroupCards;
