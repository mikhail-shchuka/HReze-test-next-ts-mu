import styled from "@emotion/styled";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Typography, TypographyProps } from "@mui/material";
import { Stack } from "@mui/system";
import { useAppSelector } from "../store/hooks";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Logo } from "./ui/Logo";
import { LogoName } from "./ui/LogoName";

export const LoginCard: React.FC = () => {
  const { loginScreen, userEmail } = useAppSelector((store) => store.auth);

  let title: string;
  let subTitle: string | React.ReactNode;
  let Form: React.FC = SignInForm;

  switch (loginScreen) {
    case "sign in":
      title = "Sign In to your account";
      subTitle = "Enter your details to proceed further";
      Form = SignInForm;
      break;
    case "sign up":
      title = "Tell us about yourself";
      subTitle = "Enter your details to proceed further";
      Form = SignUpForm;
      break;
    case "forgot password":
      title = "Forgot your password?";
      subTitle =
        "Please enter the email address associated with your account, and we`ll email you a link to reset your password.";
      Form = ForgotPasswordForm;
      break;
    case "reset password":
      title = "Request sent successfully!";
      subTitle = (
              <>
              We`ve sent a 6-digit confirmation email to your email.
              <br/>
              Please enter the code in below box to verify your email.
        </>)
      Form = ResetPasswordForm;
      break;
    case "success sign up":
      title = "Thank you!";
      subTitle = (
        <>
          We sent an email to {userEmail}
          <br />
          Click confirmation link in the email to verify your account
        </>
      );
      break;
    default:
      title = "Sign In to your account";
      subTitle = "Enter your details to proceed further";
      Form = SignInForm;
      break;
  }

  const TextLine = styled(Typography)<TypographyProps>({
    textAlign: "center",
  });

  return (
    <Stack justifyContent="center" alignItems="center" flex="1">
      <Box px="15px">
        {loginScreen === "success sign up" && (
          <Stack
            height="124px"
            width="181px"
            justifyContent="flex-end"
            alignItems="center"
            mx="auto"
            sx={{
              backgroundImage: "url(/images/path-element.svg)",
              mb: "30px",
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 70,
                height: 70,
                backgroundColor: "primary.main",
                borderRadius: "50%",
              }}
            >
              <DoneRoundedIcon sx={{ width: 28, height: 28 }} />
            </Stack>
          </Stack>
        )}
        <Box
          justifyContent="center"
          alignItems="center"
          display={{
            xs: loginScreen !== "success sign up" ? "none" : "flex",
            md: "flex",
          }}
          gap="8px"
          pb="32px"
        >
          <Logo
            sx={{ width: 50, height: 50, color: "primary.main" }}
            inheritViewBox
          />
          <LogoName
            sx={{ width: 65, height: 17, color: "primary.main" }}
            inheritViewBox
          />
        </Box>
        <Box>
          <TextLine variant="h3" pb="8px">
            {title}
          </TextLine>
          <TextLine variant="subtitle2" pb="32px" color="#637381">
            {subTitle}
          </TextLine>
          <Box maxWidth="420px" pb="10px" mx='auto'>
            {loginScreen !== "success sign up" ? <Form /> : ""}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
