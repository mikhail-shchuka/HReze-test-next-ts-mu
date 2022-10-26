import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { setLoginScreen } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function WelcomeCard() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const screen = useAppSelector(store => store.auth.loginScreen)

  const TextLine = styled(Typography)<TypographyProps>({
    fontSize: "4vw",
    lineHeight: "5vw",
  });

  return (
    <Card
      sx={{
        borderRadius: { xs: "0px 0px 20px 20px", md: "20px" },
        flex: "1",
        display: "flex",
        flexDirection: "column",
        minHeight: "360px",
      }}
    >
      <CardContent
        sx={{
          p: 4,
          // backgroundColor: "primary.main",
          backgroundImage: "url(/images/rectangle-green.png)",
          backgroundSize: 'cover',
          flex: "1",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <Box>
          <Box sx={{ width: { xs: 120, md: 180 }, pb: "40px" }}>
            <Image
              src="/images/logo.svg"
              alt="logo"
              height="70px"
              width="180px"
            />
          </Box>
          <TextLine variant="h1">Welcome</TextLine>
          <TextLine variant="h1">to our awesome</TextLine>
          <TextLine variant="h1">digital product</TextLine>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          height: 80,
          px: 2,
          backgroundColor: "primary.dark",
          flex: "0 0",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: 1, flex: "1" }}
        >
          <Typography variant="subtitle2" sx={{ color: "#FFFFFF" }}>
            {screen === 'sign in' ? 'You don`t have an account?' : 'Already have an account?'}
          </Typography>
          <Button sx={{ backgroundColor: "primary.main", color: "#FFF" }} onClick={() => dispatch(setLoginScreen(screen === 'sign in' ? 'sign up' : 'sign in'))}>
            <Typography variant="subtitle2">{screen === 'sign in' ? 'Sign Up' : 'Sign In'}</Typography>
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
