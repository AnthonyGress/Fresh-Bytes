import { Typography, Container, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import aboutUs from "../assets/images/aboutUs.jpg";
import food from "../assets/images/food.jpg";

const useStyles = makeStyles((theme) => ({
  centerGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  aboutContent: {
    fontSize: "1.5rem",
    textIndent: "10%",
  },
  aboutImg: {
    borderRadius: "8px",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <section id="about">
      <Typography align="center" variant="h2">
        {"About Us"}
      </Typography>
      <Grid container>
        <Grid item md={6} className={classes.centerGrid}>
          <Box ml={2} mr={2} mt={3}>
            <img src={aboutUs} alt="about us" className={classes.aboutImg} />
            <img
              src={food}
              alt="cooking ingredients"
              className={classes.aboutImg}
            />
          </Box>
        </Grid>
        <Grid item md={6} className={classes.centerGrid}>
          <Container>
            <Box mt={3}>
              <p className={classes.aboutContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Luctus venenatis lectus magna fringilla urna porttitor rhoncus
                dolor purus. Orci sagittis eu volutpat odio facilisis mauris sit
                amet massa. Lectus mauris ultrices eros in cursus turpis massa
                tincidunt dui. Lectus vestibulum mattis ullamcorper velit. Massa
                sed elementum tempus egestas sed sed risus. Lectus arcu bibendum
                at varius vel. Nisi est sit amet facilisis. Hac habitasse platea
                dictumst quisque. Ultrices gravida dictum fusce ut. Ultrices
                vitae auctor eu augue ut lectus arcu. Purus semper eget duis at
                tellus at urna condimentum mattis. Mauris sit amet massa vitae.
                Quam elementum pulvinar etiam non quam lacus suspendisse. Ac
                orci phasellus egestas tellus rutrum tellus pellentesque eu
                tincidunt. Faucibus scelerisque eleifend donec pretium vulputate
                sapien nec sagittis.
              </p>
              <p className={classes.aboutContent}>
                Enim tortor at auctor urna nunc id cursus. Massa enim nec dui
                nunc. Nec ullamcorper sit amet risus nullam eget felis eget
                nunc. Viverra vitae congue eu consequat ac felis donec et odio.
                Gravida arcu ac tortor dignissim. Malesuada pellentesque elit
                eget gravida cum. Scelerisque purus semper eget duis at tellus
                at. Eget magna fermentum iaculis eu non diam phasellus
                vestibulum. Sit amet nisl suscipit adipiscing bibendum est
                ultricies. Sit amet aliquam id diam maecenas ultricies.
                Ultricies integer quis auctor elit sed vulputate mi. Sem integer
                vitae justo eget.
              </p>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </section>
  );
};

export default About;
