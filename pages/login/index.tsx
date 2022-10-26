import { Stack } from "@mui/material";
import { NextPage } from "next";

import { LoginCard } from "../../components/LoginCard";
import WelcomeCard from "../../components/WelcomeCard";
import { useAppSelector } from "../../store/hooks";

const Login: NextPage = () => {
  const screen = useAppSelector((store) => store.auth.loginScreen);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      spacing="44px"
      sx={{
        minHeight: "100vh",
        p: { xs: 0, md: 5 },
        minWidth: 310,
        "@media (max-width: 900px)": {
          minHeight: "700px",
        },
      }}
    >
      {(screen === "sign in" || screen === 'sign up') && <WelcomeCard />}
      <LoginCard />
    </Stack>
  );
};

export default Login;
