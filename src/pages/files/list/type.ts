export interface File {
  id: number;
  name: string;
  created_at: Date;
  status?: boolean;
  reserved_by?: string;
}

export interface Column {
  id: "id" | "name" | "status" | "reserved_by" | "created_at";
  label: string;
  minWidth?: number;
  align?: "left";
}
