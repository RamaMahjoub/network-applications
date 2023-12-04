import { Box, BoxProps, Typography, styled } from "@mui/material";

const NoDataWrapper = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  borderRadius: 1,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));
const NoData = () => {
  return (
    <NoDataWrapper>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "1.125rem",
          lineHeight: "normal",
          color: "rgba(0, 0, 0, .5)",
        }}
      >
        No Data...
      </Typography>
    </NoDataWrapper>
  );
};

export default NoData;
