import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  InputAdornment,
  TextField,
} from "@material-ui/core/";
import { Alert } from "@material-ui/lab/";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const matches = useMediaQuery("(min-width:600px)"); // Variable for media query

  return (
    <section>
      <Typography align="center" variant="h2">
        {"Log In"}
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
                autoComplete="password"
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
                The provided credentials are incorrect
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
      {/* <div className="container">
        <Link to="/signup">← Go to Signup</Link>
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email address:</label>
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
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div> */}
    </section>
  );
}

export default Login;
