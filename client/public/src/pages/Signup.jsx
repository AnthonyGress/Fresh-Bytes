import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import TextField from "@material-ui/core/TextField";
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  InputAdornment,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
// import { styled } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Alert } from "@material-ui/lab/";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    button: {
      "&:hover": {
        background: theme.palette.secondary.main,
      },
    },
  },
}));

// const MyCard = styled(Card)({
//   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//   color: "white",
//   height: 48,
//   padding: "0 30px",
// });
function Signup(props) {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)"); // Variable for media query
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section>
      <Typography align="center" variant="h2">
        {"Sign Up"}
      </Typography>
      <Container
        className="d-flex justify-content-center"
        style={
          matches
            ? { width: "60%", marginTop: "5%" }
            : { width: "80%", marginTop: "5%" }
        }
      >
        <Card
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
          elevation={12}
        >
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleFormSubmit}
            style={{ width: "90%" }}
          >
            <Box className="d-flex align-items-center col">
              <TextField
                autoComplete="given-name"
                style={{ width: "100%" }}
                variant="outlined"
                placeholder="First"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleChange}
                label="First Name"
                color="primary"
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                autoComplete="family-name"
                style={{ width: "100%" }}
                variant="outlined"
                placeholder="Last"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleChange}
                label="Last Name"
                color="primary"
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                autoComplete="email"
                style={{ width: "100%" }}
                variant="outlined"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                label="Email"
                color="primary"
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                autoComplete="new-password"
                style={{ width: "100%" }}
                variant="outlined"
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                label="Password"
                color="primary"
                required={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {error ? (
              <Alert severity="error">
                Could not create new user. Please try again
              </Alert>
            ) : null}
            <Box boxShadow={5} mt={4}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth={true}
              >
                {"Submit"}
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </section>
  );
}
/* <>
   <div className="container">
        <Link to="/login">← Go to Login</Link>
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div> 
      </>
  */
export default Signup;
