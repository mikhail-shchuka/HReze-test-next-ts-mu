import { Stack, useTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export const StartLayout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      spacing='44px'
      sx={{
        height: "100vh",
        p: { xs: 0, md: 5 },
        minWidth: 310,
        "@media (max-width: 900px)": {
          minHeight: '700px'
        },
      }}
    >
      {children}
    </Stack>
  );
};
