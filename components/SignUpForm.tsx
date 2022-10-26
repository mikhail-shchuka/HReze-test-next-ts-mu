import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

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
import { setLoginScreen } from "../store/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { BpCheckbox } from "./ui/BpCheckbox";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
  confirmPassword: boolean;
  checked: boolean;
}

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Values>({
    firstName: "",
    email: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: false,
    email: false,
    lastName: false,
    phone: false,
    password: false,
    confirmPassword: false,
    checked: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange =
    (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setErrors({ ...errors, [prop]: false });
    };

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleClickCheckbox = () => {
    setChecked((checked) => !checked);
    setErrors({ ...errors, checked: false });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = Object.entries(values);
    let isError = false;

    for (const [field, value] of fields) {
      if (value.trim().length < 3) {
        setErrors((errors) => ({
          ...errors,
          [field]: true,
        }));

        isError = true;
      }
    }

    if (!checked) {
      setErrors((errors) => ({
        ...errors,
        checked: true,
      }));
      isError = true;
    }

    if (values.password !== values.confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: true,
      }));
      isError = true;
    }

    if (values.password.length < 6) {
      setErrors((errors) => ({
        ...errors,
        password: true,
      }));
      isError = true;
    }

    if (!isValidEmail(values.email)) {
      setErrors((errors) => ({
        ...errors,
        email: true,
      }));
      isError = true;
    }

    if (!isError) {
      dispatch(setLoginScreen("success sign up"));
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing="8px">
        <FormControl variant="filled" error={errors.firstName}>
          <InputLabel htmlFor="filled-adornment-firstName">
            First name
          </InputLabel>
          <FilledInput
            id="filled-adornment-firstName"
            value={values.firstName}
            onChange={handleChange("firstName")}
            endAdornment={
              <InputAdornment position="end">
                <PersonOutlineIcon sx={{ color: "primary.dark" }} />
              </InputAdornment>
            }
          />
          {errors.firstName && (
            <FormHelperText id="filled-adornment-firstName">
              Error! The first name must be at least 3 characters long
            </FormHelperText>
          )}
        </FormControl>
        <FormControl variant="filled" error={errors.lastName}>
          <InputLabel htmlFor="filled-adornment-lastName">Last name</InputLabel>
          <FilledInput
            id="filled-adornment-lastName"
            value={values.lastName}
            onChange={handleChange("lastName")}
            endAdornment={
              <InputAdornment position="end">
                <PersonOutlineIcon sx={{ color: "primary.dark" }} />
              </InputAdornment>
            }
          />
          {errors.lastName && (
            <FormHelperText id="filled-adornment-lastName">
              Error! The last name must be at least 3 characters long
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
      <FormControl variant="filled" error={errors.email}>
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
        {errors.email && (
          <FormHelperText id="filled-adornment-email">
            Error! Enter a valid email
          </FormHelperText>
        )}
      </FormControl>
      <FormControl variant="filled" error={errors.phone}>
        <InputLabel htmlFor="filled-adornment-phone">Phone Number</InputLabel>
        <FilledInput
          id="filled-adornment-phone"
          type="phone"
          value={values.phone}
          onChange={handleChange("phone")}
          endAdornment={
            <InputAdornment position="end">
              <LocalPhoneOutlinedIcon sx={{ color: "primary.dark" }} />
            </InputAdornment>
          }
        />
        {errors.phone && (
          <FormHelperText id="filled-adornment-phone">
            Error! Enter a valid phone number
          </FormHelperText>
        )}
      </FormControl>
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
                onMouseDown={handleMouseDownPassword}
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
      <Box pb="25px">
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
        <Typography variant="subtitle2">Continue</Typography>
      </Button>
    </form>
  );
};
