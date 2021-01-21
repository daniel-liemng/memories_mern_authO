import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";

import memories from "../../images/memories.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();

  // Google User Data
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // console.log("USR", user);

  useEffect(() => {
    // If token exists
    const token = user?.token;

    // JWT

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <AppBar position='static' color='inherit' className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        />
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.username} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              className={classes.logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
