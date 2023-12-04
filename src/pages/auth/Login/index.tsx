import Box, { BoxProps } from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Icon from "../../../@core/components/icon";
import Button from "@mui/material/Button";
import { routes } from "../../../router/constants";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import usePasswordToggle from "../hooks/usePasswordToggle";
import { ILoginRequest } from "./schema";
import useForm from "../../../hooks/useForm";
import { loginValidation } from "../validations/loginValidation";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  login,
  selectLoginStatus,
} from "../../../store/authSlice";
import { ResponseStatus } from "../../../store/types";
import { useEffect } from "react";
import Clip from "../../../@core/components/clip-spinner";

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  width: "100%",
  maxWidth: 400,
  position: "relative",
}));

const Login = () => {
  const { showPassword, handleShow } = usePasswordToggle();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectLoginStatus);

  const initialValues: ILoginRequest = {
    email: "",
    password: "",
  };
  const handleSubmit = (values: ILoginRequest) => {
    console.log(values);
    dispatch(login(values));
  };
  const formik = useForm(
    initialValues,
    (values: ILoginRequest) => {
      handleSubmit(values);
    },
    loginValidation
  );

  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      navigate(`/${routes.FILES}`);
    }
  }, [status, navigate]);

  return (
    <Box className="content-center">
      <BoxWrapper>
        <Card>
          <CardHeader
            title="Welcome! 👋🏻"
            subheader="Please sign-in to your account and start the adventure"
          />
          <CardContent>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="auth-login"
                type="email"
                label="Email"
                sx={{ mb: 4 }}
                {...formik.getFieldProps("email")}
                helperText={
                  formik.touched.email && Boolean(formik.errors.email)
                    ? String(formik.errors.email)
                    : ""
                }
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <TextField
                fullWidth
                label="Password"
                id="auth-register-password"
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                sx={{ mb: 4 }}
                helperText={
                  formik.touched.password && Boolean(formik.errors.password)
                    ? String(formik.errors.password)
                    : ""
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleShow}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="toggle password visibility"
                      >
                        <Icon
                          fontSize="1.25rem"
                          icon={showPassword ? "tabler:eye" : "tabler:eye-off"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mb: 4, textTransform: "none" }}
                disabled={!formik.dirty || !formik.isValid}
              >
                {status === ResponseStatus.LOADING ? <Clip /> : "Sign in"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "text.secondary", mr: 1 }}>
                  Don't have an account?
                </Typography>
                <Typography component={Link} href={routes.REGISTER}>
                  Sign up
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </BoxWrapper>
    </Box>
  );
};

export default Login;
