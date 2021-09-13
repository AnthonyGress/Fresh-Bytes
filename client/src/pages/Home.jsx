import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HeroCard from "../components/HeroCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1300,
    height: 650,
    marginTop: "auto",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <section id="home">
      <Box className="heroImg">
        <HeroCard />
      </Box>
    </section>
  );
};

export default Home;
