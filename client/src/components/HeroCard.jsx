import React from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../assets/images/logo_bg.png";

const useStyles = makeStyles((theme) => ({
  heroCard: {
    position: "relative",
    top: "-10%",
    // left: "-5%",
    zIndex: "0",
  },
}));

const HeroCard = () => {
  let style;
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  isMobile
    ? (style = { transform: "scale(1.0)", marginLeft: "-10%" })
    : (style = { transform: "scale(.8)" });

  return (
    <>
      <Box className={classes.heroCard} style={style}>
        <img src={Logo} alt="logo" />
      </Box>
    </>
  );
};

export default HeroCard;
