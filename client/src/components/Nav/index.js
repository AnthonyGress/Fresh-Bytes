import React, { useState } from "react";
import Auth from "../../utils/auth";
import Cart from "../Cart";
import HamburgerMenu from "../HamburgerMenu";

import { Link, NavLink } from "react-router-dom";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import logo from "../../assets/images/FreshBytesLogoOnlyWhite.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nav: {
    backgroundColor: theme.palette.primary.main,
  },
  navBrand: {
    fontFamily: "Oswald, monospace",
    fontWeight: 300,
    letterSpacing: "5px",
    marginLeft: ".5rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    maxHeight: "60px",
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function MenuAppBar() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userActions = () => {
    if (Auth.loggedIn()) {
      return (
        <div>
          <Link to="/account">
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Link>
          <Link to="/orderHistory">
            <MenuItem onClick={handleClose}>Order History</MenuItem>
          </Link>

          <a href="/">
            <MenuItem onClick={() => Auth.logout()}>Logout</MenuItem>
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">
            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem onClick={handleClose}>Login</MenuItem>
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className={classes.root}>
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar className={classes.row}>
          {isMobile ? (
            <>
              <Link to="/">
                <Box p={0.5} className={classes.brandWrapper}>
                  <img
                    src={logo}
                    alt="fresh bytes logo"
                    className={classes.logo}
                  />
                  <Typography variant="h5" className={classes.navBrand}>
                    FBK
                  </Typography>
                </Box>
              </Link>
              <div
                style={{
                  position: "absolute",
                  right: "2%",
                  display: "flex",
                }}
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Cart />
                <HamburgerMenu />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  {userActions()}
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Link to="/">
                <Box p={0.5} className={classes.brandWrapper}>
                  <img
                    src={logo}
                    alt="fresh bytes logo"
                    className={classes.logo}
                  />
                  <Typography variant="h5" className={classes.navBrand}>
                    FBK
                  </Typography>
                </Box>
              </Link>
              <Box className={classes.row} mt={-1}>
                <Box className={classes.row}>
                  <Box
                    pl={1}
                    pr={1}
                    pt={0.5}
                    pb={0.5}
                    className="navLink"
                    component={NavLink}
                    to="/"
                    exact
                  >
                    Home
                  </Box>
                  <Box
                    className="navLink"
                    pl={1}
                    pr={1}
                    pt={0.5}
                    pb={0.5}
                    component={NavLink}
                    to="/about"
                    exact
                  >
                    About
                  </Box>
                  <Box
                    className="navLink"
                    pl={1}
                    pr={1}
                    pt={0.5}
                    pb={0.5}
                    component={NavLink}
                    to="/menu"
                    exact
                  >
                    Menu
                  </Box>
                  <Box
                    className="navLink"
                    pl={1}
                    pr={1}
                    pt={0.5}
                    pb={0.5}
                    component={NavLink}
                    to="/order"
                    exact
                  >
                    Order
                  </Box>
                </Box>
              </Box>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Cart />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  {userActions()}
                </Menu>
              </div>
            </>
          )}
          {/* <IconButton
            onClick={() => setOpenDrawer(!openDrawer)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon fontSize="large" />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </nav>
  );
}
