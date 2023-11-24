import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiTimeline, { TimelineProps } from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { UserActivities } from "./type";
import { TimelineDot, TimelineItem } from "@mui/lab";

const Timeline = styled(MuiTimeline)<TimelineProps>({
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

const activities: UserActivities[] = [
  {
    id: 1,
    name: "Rama Mahjoub",
    activity: "joined the group in 12/3/2020",
  },
  {
    id: 2,
    name: "Rama Mahjoub",
    activity: "Reserve text.txt file in 15/3/2020",
  },
  {
    id: 3,
    name: "Rama Mahjoub",
    activity: "Update text.txt file in 15/3/2020",
  },
  {
    id: 4,
    name: "Rama Mahjoub",
    activity: "Update text.txt file in 15/3/2020",
  },
  {
    id: 5,
    name: "Rama Mahjoub",
    activity: "Cancel Reserve text.txt file in 15/3/2020",
  },
  {
    id: 6,
    name: "Rama Mahjoub",
    activity: "Read next.txt file in 16/3/2020",
  },
  {
    id: 7,
    name: "Rama Mahjoub",
    activity: "Update text.txt file in 15/3/2020",
  },
  {
    id: 8,
    name: "Rama Mahjoub",
    activity: "Cancel Reserve text.txt file in 15/3/2020",
  },
  {
    id: 9,
    name: "Rama Mahjoub",
    activity: "Read next.txt file in 16/3/2020",
  },
];
const ReportUser = () => {
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
            {activities.map((activity, index) => (
              <TimelineItem key={activity.id}>
                <TimelineSeparator>
                  {/* <Avatar sx={{ width: 36, height: 36 }}>
                    <Typography className="text-xs">
                      {getInitials(activity.name)}
                    </Typography>
                  </Avatar> */}
                  <TimelineDot color="primary" />
                  {index !== activities.length - 1 && <TimelineConnector />}
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
                      {activity.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.disabled"
                      sx={{ paddingLeft: (theme) => theme.spacing(1) }}
                    >
                      {activity.activity}
                    </Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReportUser;
