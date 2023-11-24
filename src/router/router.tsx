import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BlankLayout from "../@core/layouts/BlankLayout";
import { routes } from "./constants";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserLayout from "../@core/layouts/UserLayout";
import FilesList from "../pages/files/list";
import GroupsList from "../pages/groups/list";
import PreviewGroup from "../pages/groups/Preview";
import ReportFile from "../pages/reports/report-file";
import ReportUser from "../pages/reports/report-user";
import ViewFileContent from "../pages/groups/viewFileContent";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<BlankLayout />}>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path={routes.FILES} element={<FilesList />} />
        <Route path={routes.GROUPS} element={<GroupsList />} />
        <Route path={`/${routes.GROUPS}/:groupId`} element={<PreviewGroup />} />
        <Route
          path={`/${routes.FILEREPORT}/:fileId`}
          element={<ReportFile />}
        />
        <Route
          path={`/${routes.USERREPORT}/:userId`}
          element={<ReportUser />}
        />
        <Route path={`/${routes.FILE}/:fileId`} element={<ViewFileContent />} />
      </Route>
    </>
  )
);
