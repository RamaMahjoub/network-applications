import Box, { BoxProps } from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import { IRegisterRequest } from "./schema";
import { registerValidation } from "../validations/registerValidation";
import useForm from "../../../hooks/useForm";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import usePasswordToggle from "../hooks/usePasswordToggle";
import Icon from "../../../@core/components/icon";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { routes } from "../../../router/constants";

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  width: "100%",
  maxWidth: 400,
  position: "relative",
}));

const Register = () => {
  const { showPassword, handleShow } = usePasswordToggle();
  const { showPassword: showConfirmPassword, handleShow: handleShowConfirm } =
    usePasswordToggle();
  const initialValues: IRegisterRequest = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useForm(
    initialValues,
    (values: IRegisterRequest) => {
      alert(values);
    },
    registerValidation
  );
  return (
    <Box className="content-center">
      <BoxWrapper>
        <Card>
          <CardHeader
            title="Adventure starts here 🚀"
            subheader="Make your app management easy!"
          />
          <CardContent>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                type="username"
                label="Username"
                sx={{ mb: 4 }}
                {...formik.getFieldProps("username")}
                helperText={
                  formik.touched.username && Boolean(formik.errors.username)
                    ? String(formik.errors.username)
                    : ""
                }
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
              />
              <TextField
                fullWidth
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
              <TextField
                fullWidth
                label="Confirm Password"
                id="auth-register-confirm-password"
                {...formik.getFieldProps("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                sx={{ mb: 4 }}
                helperText={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                    ? String(formik.errors.confirmPassword)
                    : ""
                }
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleShowConfirm}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="toggle password visibility"
                      >
                        <Icon
                          fontSize="1.25rem"
                          icon={
                            showConfirmPassword
                              ? "tabler:eye"
                              : "tabler:eye-off"
                          }
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
                Sign up
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
                  Already have an account?
                </Typography>
                <Typography component={Link} href={routes.LOGIN}>
                  Sign in
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </BoxWrapper>
    </Box>
  );
};

export default Register;
