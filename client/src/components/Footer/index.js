import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import Instagram from "@material-ui/icons/Instagram";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSvgIcon-root": {
      fill: "black",
      "&:hover": {
        fill: theme.palette.primary.main,
      },
    },
  },
  flexWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer style={{ marginTop: "1.5rem" }}>
      {/* <Grid container>
        <Grid item xs={12} md={4}>
          <Typography align="center">Help</Typography>
        </Grid>
      </Grid> */}
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} style={{ maxHeight: "7rem" }}>
            <Box borderBottom={1} align="center">
              <Typography align="center">Help</Typography>
            </Box>
            <Box className={classes.flexWrapper}>
              <Link
                href="https://maps.google.com/maps?q=28.600865410611277,%20-81.32605610659066&ll=28.600865410611277,%20-81.32605610659066&z=17"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                Find Us
              </Link>
              <Box>
                <Link href="/login" color="inherit">
                  Sign In
                </Link>
              </Box>
              <Box>
                <Link href="/signup" color="inherit">
                  Sign up
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} style={{ maxHeight: "7rem" }}>
            <Box borderBottom={1} align="center">
              <Typography align="center">Restaurant Hours</Typography>
            </Box>
            <Box
              className={classes.flexWrapper}
              style={{ flexDirection: "column" }}
            >
              <Box>
                <Typography color="inherit" align="center">
                  Closed Monday
                </Typography>
              </Box>
              <Box>
                <Typography color="inherit" align="center">
                  Tuesday - Sunday, 11:00 AM - 12:00 AM
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} style={{ maxHeight: "7rem" }}>
            <Box borderBottom={1} align="center">
              <Typography align="center">Socials</Typography>
            </Box>
            <Box className={classes.flexWrapper}>
              <Box>
                <Link
                  href="https://facebook.com"
                  className={classes.root}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook fontSize="large" />
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://twitter.com"
                  className={classes.root}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter fontSize="large" />
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://www.instagram.com/"
                  className={classes.root}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram fontSize="large" />
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
