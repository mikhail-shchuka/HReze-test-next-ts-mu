import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { setLoginScreen, setUserEmail } from "../store/auth/authSlice";
import { useAppDispatch } from "../store/hooks";

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState(false);

  const dispatch = useAppDispatch();

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorEmail(true);
      return;
    }

    dispatch(setLoginScreen("reset password"));
    dispatch(setUserEmail(email));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ mb: "25px" }} variant="filled" error={errorEmail}>
        <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
        <FilledInput
          id="filled-adornment-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorEmail(false);
          }}
          endAdornment={
            <InputAdornment position="end">
              <EmailOutlinedIcon sx={{ color: "primary.dark" }} />
            </InputAdornment>
          }
        />
        {errorEmail && (
          <FormHelperText id="filled-adornment-email">
            Error! Enter a valid email
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
        <Typography variant="subtitle2">Reset Password</Typography>
      </Button>
      <Button
        onClick={() => dispatch(setLoginScreen("sign in"))}
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
