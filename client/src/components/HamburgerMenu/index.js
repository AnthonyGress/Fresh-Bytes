import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Link, NavLink } from "react-router-dom";
const drawerWidth = 420;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   flexGrow: 1,
  // },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    justifyContent: "space-between",
    paddingTop: "env(safe-area-inset-top, 0)",
    paddingLeft: "env(safe-area-inset-left, 0)",
    paddingRight: "env(safe-area-inset-right, 0)",
    paddingBottom: "calc(env(safe-area-inset-bottom, 0)/2)",
    padding: theme.spacing(0, 1),
    alignItems: "center !important",
    display: "flex",
    ...theme.mixins.toolbar,
    background: theme.palette.primary.main,
    maxHeight: "100px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  navBrand: {
    fontFamily: "Oswald, monospace",
    fontWeight: 300,
    letterSpacing: "5px",
    color: "white",
    marginLeft: "12px",
  },
  navLink: {
    fontFamily: "Oswald, monospace",
    fontWeight: 400,
    letterSpacing: "2px",
    fontSize: "1.5rem",
    width: "100%",
    marginTop: ".5rem",
    marginBottom: ".5rem",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        variant="temporary"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawerHeader}>
          <Typography variant="h5" className={classes.navBrand}>
            FBK
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon style={{ color: "var(--light)" }} fontSize="large" />
          </IconButton>
        </Box>
        <Divider />
        <List className={classes.alignCenter}>
          <Box>
            <NavLink to="/" activeClassName="activeMobile" exact>
              <ListItem
                onClick={() => setOpenDrawer(false)}
                className={classes.nav}
              >
                <ListItemText>
                  <Typography className={classes.navLink}>Home</Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
            <NavLink to="/about" activeClassName="activeMobile" exact>
              <ListItem
                onClick={() => setOpenDrawer(false)}
                className={classes.nav}
              >
                <ListItemText>
                  <Typography className={classes.navLink}>About</Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
            <NavLink to="/menu" activeClassName="activeMobile" exact>
              <ListItem
                onClick={() => setOpenDrawer(false)}
                className={classes.nav}
              >
                <ListItemText>
                  <Typography className={classes.navLink}>Menu</Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
            <NavLink to="/order" activeClassName="activeMobile" exact>
              <ListItem
                onClick={() => setOpenDrawer(false)}
                className={classes.nav}
              >
                <ListItemText>
                  <Typography className={classes.navLink}>Order</Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
          </Box>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        // edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      {/* <Link to="/">
        <Typography variant="h6" className={classes.navBrand}>
          FBK
        </Typography>
      </Link> */}
    </>
  );
}
export default DrawerComponent;
