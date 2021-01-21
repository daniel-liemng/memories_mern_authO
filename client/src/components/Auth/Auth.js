import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Button,
  Typography,
  Container,
  Avatar,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import Input from "./Input";
import GoogleIcon from "./GoogleIcon";

const Auth = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {};

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };

  // Google Sign In
  const handleGoogleSuccess = async (res) => {
    // console.log(res);

    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", payload: { result, token } });

      // Redirect
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In Failed");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Input
              label='Email'
              name='email'
              handleChange={handleChange}
              type='email'
            />

            <Input
              label='Password'
              name='password'
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                label='Confirm Password'
                name='confirmPassword'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>

          <Button
            type='button'
            variant='contained'
            color='primary'
            fullWidth
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>

          {/* Google Login */}
          <GoogleLogin
            clientId='749114631117-b24rt35j5qem1mte3uc716nfm49pk0gk.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<GoogleIcon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />

          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Log In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
