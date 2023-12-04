import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiTimeline, { TimelineProps } from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { TimelineDot, TimelineItem } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import NoData from "../../../@core/components/no-data";
import Clip from "../../../@core/components/clip-spinner";
import { ResponseStatus } from "../../../store/types";
import {
  getMemberReport,
  selectGetMemberReportData,
  selectGetMemberReportError,
  selectGetMemberReportStatus,
} from "../../../store/reportSlice";
import { useEffect } from "react";

const Timeline = styled(MuiTimeline)<TimelineProps>({
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

const ReportUser = () => {
  const { groupId, memberId } = useParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectGetMemberReportStatus);
  const error = useAppSelector(selectGetMemberReportError);
  const data = useAppSelector(selectGetMemberReportData);
  let content = <NoData />;

  if (status === ResponseStatus.LOADING) {
    content = <Clip />;
  } else if (status === ResponseStatus.IDLE) {
    content = <NoData />;
  } else if (status === ResponseStatus.FAILED) {
    content = <div>{error?.message}</div>;
  }
  
  useEffect(() => {
    dispatch(
      getMemberReport({
        groupId: Number(groupId!),
        memberId: Number(memberId!),
      })
    );
  }, [dispatch, groupId, memberId]);

  return (
    <Grid container spacing={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          flexWrap: "wrap",
          width: "100%",
          padding: 5,
          paddingBottom: 0,
          paddingRight: 0,
        }}
      >
        <Typography
          variant="h6"
          className="flex font-extrabold tracking-tight text-24 md:text-32"
        >
          Activity Timeline
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Box
          className="flex flex-wrap w-full p-8 mb-8 border rounded-xl"
          sx={{
            backgroundColor: "rgba(0, 0, 0, .05)",
          }}
        >
          <Timeline>
            {status === ResponseStatus.SUCCEEDED &&
            data?.data &&
            data?.data.length > 0
              ? data?.data.map((activity, index) => {
                  console.log(activity);
                  const event = `${activity.event} ${activity.file_name} in ${activity.time}`;
                  return (
                    <TimelineItem key={activity.id}>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        {index !== data?.data.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ paddingLeft: (theme) => theme.spacing(1) }}
                          >
                            {activity.user_name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.disabled"
                            sx={{ paddingLeft: (theme) => theme.spacing(1) }}
                          >
                            {event}
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })
              : content}
          </Timeline>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReportUser;
