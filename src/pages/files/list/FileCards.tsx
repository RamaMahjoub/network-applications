import Grid from "@mui/material/Grid";
import { File } from "./type";
import FileItem from "./FileItem";

const rows: File[] = [
  {
    id: 1,
    name: "nest.txt",
    created_at: new Date(),
    status: false,
    reserved_by: "Rama Mahjoub",
  },
  {
    id: 2,
    name: "next.txt",
    created_at: new Date(),
    status: false,
    reserved_by: "Ghada Mahjoub",
  },
  {
    id: 3,
    name: "nest.txt",
    created_at: new Date(),
    status: true,
  },
  {
    id: 4,
    name: "nest.txt",
    created_at: new Date(),
    status: false,
    reserved_by: "Hasan Mahjoub",
  },
  {
    id: 5,
    name: "nest.txt",
    created_at: new Date(),
    status: true,
  },
];

const FileCards = () => {
  return (
    <Grid container spacing={4}>
      {rows.map((file) => (
        <FileItem file={file} key={file.id} />
      ))}
    </Grid>
  );
};

export default FileCards;
