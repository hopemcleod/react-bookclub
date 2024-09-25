// This component is based on a MUI Material component: https://github.com/mui/material-ui/tree/v5.15.10/docs/data/material/getting-started/templates/sign-in
// Typography variant h5 is 20px

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { HelixPalette, HelixStyles } from "helix";
import { checkCredentialsApi } from "../../../api/api";
import logo from "../../../assets/images/Logo.png";
import { IS_LOGGED_IN_EVENT, USER_SESSION_KEY } from "../../constants";
import { useEventBus } from "../../../hooks";
import { User } from "../../../modules/authorization/types";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidMessage, setInvalidMessage] = useState<string | null>("");
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const { fireEvent } = useEventBus();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const valid = emailFormatIsValid() && passwordFormatIsValid();
    if (!valid) {
      setInvalidMessage("Email or password is incorrect.");
      resetCredentials();
    }

    setIsValid(valid);
  };

  const resetCredentials = () => {
    setEmail("");
    setPassword("");
  };

  /**
   * Put the user in the session to avoid needless API hits.
   * @param user Logged in user's user
   */
  const setInSession = (user: User) => {
    const formattedUser = JSON.stringify(user);
    sessionStorage.setItem(USER_SESSION_KEY, formattedUser);
  };

  useEffect(() => {
    const checkCredentials = async () => {
      setInvalidMessage("");
      try {
        const { message, user } = await checkCredentialsApi({
          email: email,
          password: password,
        });

        if (message === "Authentication successful.") {
          const sessionUser = {
            email: user.email,
            id: user.id,
            isAdmin: user.user_type === 1 ? true : false,
            firstName: user.first_name,
            lastName: user.last_name,
            isLoggedIn: true,
          };

          setInSession(sessionUser);
          navigate("/home");
          fireEvent(IS_LOGGED_IN_EVENT);
        } else {
          setInvalidMessage("Email or password is incorrect.");
          resetCredentials();
          setIsValid(false);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    isValid && checkCredentials();
  }, [isValid]);

  const emailFormatIsValid = () => {
    setInvalidMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordFormatIsValid = () => {
    setInvalidMessage("");
    return password.length === 8 || password.length > 8;
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const inputProps = {
    style: {
      border: "2px",
      borderRadius: "10px",
      marginBottom: "15px",
      height: "36px",
      ":hover": {
        svg: { fill: HelixPalette.neutral50 },
      },
      ":active:focus": { svg: { fill: HelixPalette.neutral80 } },
      ":focusVisible": { boxShadow: HelixStyles.focusVisible2 },
    },
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        placeItems: "center",
        marginTop: "100px",
      }}
    >
      <img src={logo} alt="logo" />
      <Typography
        component="h2"
        variant="h5"
        sx={{
          color: HelixPalette.neutral100,
          fontFamily: "gilroy-bold, Arial, Helvetica, sans-serif",
          marginTop: "24px",
          marginBottom: "10px",
          fontweight: 600,
        }}
      >
        Login with your existing account
      </Typography>
      <Box
        id="main-content-id"
        role="form"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        width="100%"
      >
        <Typography sx={{ color: HelixPalette.danger_DM }}>
          {invalidMessage}
        </Typography>
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          autoComplete="email"
          autoFocus
          fullWidth
          data-testid="email"
          id="email"
          InputProps={inputProps}
          margin="normal"
          name="email"
          onChange={handleEmail}
          required
          aria-invalid={isValid}
          value={email}
        />
        <InputLabel htmlFor="password">Password</InputLabel>
        <TextField
          autoComplete="current-password"
          fullWidth
          data-testid="password"
          id="password"
          InputProps={inputProps}
          margin="normal"
          name="password"
          onChange={handlePassword}
          required
          type="password"
          aria-invalid={isValid}
          value={password}
        />
        <Box
          sx={{
            display: "block",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          <Button
            data-testid="login"
            variant="contained"
            color="primary"
            type="submit"
            style={{
              backgroundColor: HelixPalette.teal80,
              borderRadius: 8,
              borderColor: "transparent",
              color: HelixPalette.white,
              fontSize: 17,
              fontWeight: "bolder",
              height: 45,
              width: "100%",
              textTransform: "none",
              marginBottom: "20px",
            }}
          >
            Login
          </Button>
          <a
            data-testid="forgot-password"
            href="/forgot-password"
            style={{
              fontSize: 17,
              color: HelixPalette.teal80,
              fontWeight: "bolder",
              fontFamily: "gilroy-bold, Arial, Helvetica, sans-serif",
            }}
          >
            Forgot your password?
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
