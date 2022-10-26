import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { setLoginScreen } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface Values {
  code: Array<number | "-">;
  password: string;
  confirmPassword: string;
}

interface Errors {
  password: boolean;
  confirmPassword: boolean;
  code: boolean;
}

export const ResetPasswordForm: React.FC = () => {
  const email = useAppSelector((store) => store.auth.userEmail);

  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Values>({
    code: new Array(6).fill("-"),
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    password: false,
    confirmPassword: false,
    code: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setErrors({ ...errors, [prop]: false });
    };

  const handleChangeCode =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: any = event.target.value;

      if (newValue[0] === "-") {
        newValue = newValue.slice(1);
      }

      if (isNaN(+newValue)) {
        return;
      }

      if (newValue === "") {
        newValue = "-";
      } else {
        newValue = +newValue;
      }

      setValues((values) => {
        const updateCode = [...values.code];
        updateCode[index] = newValue;

        return { ...values, code: updateCode };
      });
    };

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    //check code

    if (values.password.length < 6) {
      setErrors((errors) => ({
        ...errors,
        password: true,
      }));

      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: true,
      }));

      return;
    }

    dispatch(setLoginScreen("success sign up"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="filled">
        <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
        <FilledInput
          disabled
          id="filled-adornment-email"
          type="email"
          value={email}
          endAdornment={
            <InputAdornment position="end">
              <EmailOutlinedIcon sx={{ color: "primary.dark" }} />
            </InputAdornment>
          }
        />
      </FormControl>
      <Stack direction="row" spacing={1}>
        {values.code.map((number, index) => (
          <FormControl key={index} variant="filled">
            <FilledInput
              type="text"
              value={number}
              placeholder="-"
              onChange={handleChangeCode(index)}
              sx={{
                "& > input": {
                  textAlign: "center",
                  p: '25%'
                },
              }}
            />
          </FormControl>
        ))}
      </Stack>
      <FormControl variant="filled" error={errors.password}>
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
                onClick={handleClickShowPassword}
                edge="end"
                sx={{ color: "primary.dark" }}
              >
                {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && (
          <FormHelperText id="filled-adornment-password">
            Error! Password must be at least 6 characters long
          </FormHelperText>
        )}
      </FormControl>
      <FormControl variant="filled" error={errors.confirmPassword}>
        <InputLabel htmlFor="filled-adornment-confirmPassword">
          Confirm password
        </InputLabel>
        <FilledInput
          id="filled-adornment-confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          endAdornment={
            <InputAdornment position="end">
              <CheckCircleOutlinedIcon
                sx={{
                  color:
                    values.confirmPassword === values.password &&
                    values.password.length > 5
                      ? "primary.main"
                      : "primary.dark",
                }}
              />
            </InputAdornment>
          }
        />
        {errors.confirmPassword && (
          <FormHelperText id="filled-adornment-confirmPassword">
            Error! Passwords do not match
          </FormHelperText>
        )}
      </FormControl>
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
        <Typography variant="subtitle2">Change Password</Typography>
      </Button>
      <Button
      onClick={() => dispatch(setLoginScreen('forgot password'))}
        sx={{
          backgroundColor: "#FFF",
          color: "primary.main",
          width: 1,
          mb: "8px",
          border: "1px solid",
          borderColor: "primary.main",
          "&.MuiButton-root:hover": {
            backgroundColor: "primary.dark",
            color: "#FFF",
          },
        }}
      >
        <Typography variant="subtitle2">Back</Typography>
      </Button>
    </form>
  );
};
