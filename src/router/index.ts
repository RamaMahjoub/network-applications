import { lazy } from "react";

export const Login = lazy(() => import("../pages/auth/Login"));
export const Register = lazy(() => import("../pages/auth/Register"));
export const FilesList = lazy(() => import("../pages/files/list"));
export const GroupsList = lazy(() => import("../pages/groups/list"));
export const PreviewGroup = lazy(() => import("../pages/groups/Preview"));
export const ReportFile = lazy(() => import("../pages/reports/report-file"));
export const ReportUser = lazy(() => import("../pages/reports/report-user"));
export const ViewFileContent = lazy(() => import("../pages/groups/viewFileContent"));

