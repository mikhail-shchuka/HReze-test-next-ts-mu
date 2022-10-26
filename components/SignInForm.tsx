import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { setLoginScreen, setUserEmail } from "../store/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { BpCheckbox } from "./ui/BpCheckbox";

interface Values {
  email: string;
  password: string;
}

interface Errors {
  email: "invalid" | "noUser" | "";
  password: "invalid" | "wrong" | "";
  checked: boolean;
}

export const SignInForm = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    checked: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange =
    (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setErrors({ ...errors, [prop]: "" });
    };

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleClickCheckbox = () => {
    setChecked((checked) => !checked);
    setErrors({ ...errors, checked: false });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isError = false;

    if (!checked) {
      setErrors((errors) => ({
        ...errors,
        checked: true,
      }));
      isError = true;
    }

    if (values.password.length < 6) {
      setErrors((errors) => ({
        ...errors,
        password: "invalid",
      }));
      isError = true;
    }

    if (!isValidEmail(values.email)) {
      setErrors((errors) => ({
        ...errors,
        email: "invalid",
      }));
      isError = true;
    }

    if (!isError) {
      dispatch(setLoginScreen("success sign up"));
      dispatch(setUserEmail(values.email));
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ mb: "25px" }} variant="filled" error={!!errors.email}>
        <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
        <FilledInput
          id="filled-adornment-email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          endAdornment={
            <InputAdornment position="end">
              <EmailOutlinedIcon sx={{ color: "primary.dark" }} />
            </InputAdornment>
          }
        />
        {!!errors.email && (
          <FormHelperText id="filled-adornment-email">
            {errors.email === "invalid"
              ? "Error! Enter a valid email"
              : "Such user does not exist"}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl variant="filled" error={!!errors.password}>
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{ color: "primary.dark" }}
              >
                {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!!errors.password && (
          <FormHelperText id="filled-adornment-password">
            Error! Password must be at least 6 characters long
          </FormHelperText>
        )}
      </FormControl>
      <Stack pb="25px" direction="row" alignItems="center">
        <Box display="inline-block">
          <FormControlLabel
            control={
              <BpCheckbox
                checked={checked}
                onChange={handleClickCheckbox}
                sx={{ py: 0 }}
              />
            }
            label="I agree with terms & conditions"
            componentsProps={{
              typography: {
                fontSize: 14,
                fontWeight: 700,
                color: errors.checked ? "red" : "inherit",
              },
            }}
          />
          {errors.checked && (
            <FormHelperText sx={{ color: "red" }}>
              Please, agree with terms & conditions
            </FormHelperText>
          )}
        </Box>
        <Button
          onClick={() => dispatch(setLoginScreen("forgot password"))}
          sx={{
            display: { xs: "none", md: "inline-block" },
            p: 0,
            height: "min-content",
          }}
        >
          <Typography variant="subtitle2">Forgot password?</Typography>
        </Button>
      </Stack>
      <Button
        type="submit"
        sx={{
          backgroundColor: "primary.main",
          color: "#FFF",
          width: 1,
          mb: "8px",
          "&.MuiButton-root:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <Typography variant="subtitle2">Sign In</Typography>
      </Button>

      <Button
        sx={{
          display: { xs: "inline-block", md: "none" },
          width: 1,
        }}
        onClick={() => dispatch(setLoginScreen("forgot password"))}
      >
        <Typography variant="subtitle2">Forgot password?</Typography>
      </Button>
    </form>
  );
};
