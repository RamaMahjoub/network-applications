import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FileActivities } from "./type";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import MuiTimeline, { TimelineProps } from "@mui/lab/Timeline";
import { styled } from "@mui/material";

const activities: FileActivities[] = [
  {
    id: 1,
    name: "Rama Mahjoub",
    activity: "Read text.txt file in 15/3/2020",
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
    name: "Lilas Mahjoub",
    activity: "Read text.txt file in 16/3/2020",
  },
  {
    id: 9,
    name: "Ghada Mahjoub",
    activity: "Read text.txt file in 16/3/2020",
  },
];

const Timeline = styled(MuiTimeline)<TimelineProps>({
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});
const ReportFile = () => {
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

export default ReportFile;
