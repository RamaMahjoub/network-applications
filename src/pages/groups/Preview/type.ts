// export interface GroupFile {
//   id: number;
//   name: string;
//   created_at: Date;
//   status: boolean;
//   reserved_by: string | null;

import { GroupFile } from "../../../store/groupFileSlice";

export interface Column {
  id: keyof GroupFile;
  label: string;
  minWidth?: number;
  align?: "left";
}

