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
const drawerWidth = "420px";

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
        <Box
          className={classes.drawerHeader}
          style={{
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
          }}
        >
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
