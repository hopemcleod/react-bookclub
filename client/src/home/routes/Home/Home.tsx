import {useEffect} from 'react';
import { HelixStyles } from "helix";
import { Box, Typography } from "@mui/material";
import logo from "../../../assets/images/Logo.png";

export const Home = () => {
    useEffect(() => {
      document.title = "Home Page";
    });
  
    return (
      <Box paddingLeft="85px">
        <Typography {...HelixStyles.style_01} component="h1" mb="0.25rem">
          Welcome to the Test Automation Project!
        </Typography>
        <img
          src={logo}
          alt="logo"
          style={{ position: "absolute", top: 0, right: 0, width: "148px" }}
        />
        <Box
          border="double"
          sx={{
            borderColor: "text.primary",
            borderRadius: "16px",
            paddingLeft: 2,
            marginRight: 5,
            marginTop: 5,
          }}
        >
          <Typography {...HelixStyles.style_01} component="h2" mb="0.25rem">
            Purpose of the project
          </Typography>
          <p className="home-page">
            In order for testers to get hands on experience writing UI Automation
            tests without being thrown in at the deep end - an automation demo
            project has been developed. It allows testers to create a suite of
            automated UI tests and familiarize themselves with the UI automation
            framework used at <company> using a demo application. The project
            consists of multiple elements:
          </p>
          <ol>
            <li>Demo application</li>
            <li>
              Example UI Automation solution (using UI Automation Framework)
            </li>
            <li>Automation Training Material</li>
          </ol>
          <Typography {...HelixStyles.style_01} component="h2" mb="0.25rem">
            How to use the project
          </Typography>
          <p className="home-page">
            The tester is required to carry out a couple of steps first:
          </p>
          <ol>
            <li>
              Make sure they have access to the website from their local
              environment
            </li>
            <li>Create the testing framework </li>
          </ol>
          The links below provides help on how to do this.
          <Typography {...HelixStyles.style_01} component="h2" mb="0.25rem">
            Useful links
          </Typography>
          <ul className="home-page">
            <li>How to access the website</li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href=""
              >
                Initial automation testing setup
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href=""
              >
                UI Automation Framework Overview
              </a>
            </li>
          </ul>
        </Box>
      </Box>
    );
  };

export default Home;