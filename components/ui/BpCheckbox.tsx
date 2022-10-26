import styled from "@emotion/styled";
import { Checkbox, CheckboxProps, useTheme } from "@mui/material";

export const BpCheckbox: React.FC<CheckboxProps> = (props) => {
  const theme = useTheme();

  const BpIcon = styled("span")({
    borderRadius: 4,
    width: 20,
    height: 20,
    backgroundColor:
      theme.palette.mode === "dark" ? "#394b59" : "rgba(145, 158, 171, 0.24)",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  });

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundImage: `radial-gradient(circle at center,  #fff 30%, ${theme.palette.primary.main} 0)`,
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });

  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
};
