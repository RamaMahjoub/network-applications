export interface GroupFile {
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
}
