import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getUserToken } from "../@core/utils/user-storage";
import { routes } from "./constants";
interface Props {
  element: ReactElement;
}

const AuthGuard: FC<Props> = ({ element }) => {
  const isAuthinticated = getUserToken();
  if (isAuthinticated?.token !== undefined) return element;
  return <Navigate to={`/${routes.LOGIN}`} replace />;
};

export default AuthGuard;
