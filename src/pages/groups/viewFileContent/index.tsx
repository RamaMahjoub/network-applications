import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const content: string = `export interface GroupFile {
  id: number;
  name: string;
  created_at: Date;
  status: boolean;
  reserved_by: string | null;
}

export interface Column {
  id: "id" | "name" | "status" | "created_at" | "reserved_by";
  label: string;
  minWidth?: number;
  align?: "left";
}`;

const ViewFileContent = () => {
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
          File Name
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Box
          className="flex flex-wrap w-full p-8 mb-8 border rounded-xl"
          sx={{
            backgroundColor: "rgba(0, 0, 0, .05)",
          }}
        >
          <SyntaxHighlighter
            style={coldarkDark}
            children={content}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ViewFileContent;
