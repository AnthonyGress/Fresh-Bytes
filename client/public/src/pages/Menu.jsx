import React from "react";
import Page1 from "../assets/images/1.jpg";
import Page2 from "../assets/images/2.jpg";
import Page3 from "../assets/images/3.jpg";
import {
  Typography,
  Box,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuImg: {
    borderRadius: "8px",
  },
}));

const Menu = () => {
  let style;
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  isMobile ? (style = { maxWidth: "95%" }) : (style = { maxWidth: "50%" });
  return (
    <section id="menu">
      <Typography align="center" variant="h2">
        {"Menu"}
      </Typography>
      <Box align="center" mt={3}>
        <Box>
          <img
            src={Page1}
            alt="Menu page 1"
            className={classes.menuImg}
            style={style}
          />
        </Box>
        <Box>
          <img
            src={Page2}
            alt="Menu page 2"
            className={classes.menuImg}
            style={style}
          />
        </Box>
        <Box>
          <img
            src={Page3}
            alt="Menu page 3"
            className={classes.menuImg}
            style={style}
          />
        </Box>
      </Box>
    </section>
  );
};

export default Menu;
