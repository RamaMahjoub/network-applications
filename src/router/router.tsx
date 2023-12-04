import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BlankLayout from "../@core/layouts/BlankLayout";
import { routes } from "./constants";
import UserLayout from "../@core/layouts/UserLayout";
import {
  FilesList,
  GroupsList,
  Login,
  PreviewGroup,
  Register,
  ReportFile,
  ReportUser,
  ViewFileContent,
} from ".";
import AuthGuard from "./AuthGuard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<BlankLayout />}>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route
          path={routes.FILES}
          element={<AuthGuard element={<FilesList />} />}
        />
        <Route
          path={routes.GROUPS}
          element={<AuthGuard element={<GroupsList />} />}
        />
        <Route
          path={`/${routes.GROUPS}/:groupId`}
          element={<AuthGuard element={<PreviewGroup />} />}
        />
        <Route
          path={`/${routes.GROUPS}/:groupId/${routes.FILEREPORT}/:fileId`}
          element={<AuthGuard element={<ReportFile />} />}
        />
        <Route
          path={`/${routes.GROUPS}/:groupId/${routes.USERREPORT}/:memberId`}
          element={<AuthGuard element={<ReportUser />} />}
        />
        <Route
          path={`/${routes.GROUPS}/:groupId/${routes.FILE}/:fileId`}
          element={<AuthGuard element={<ViewFileContent />} />}
        />
      </Route>
    </>
  )
);
