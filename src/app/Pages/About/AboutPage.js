import { Box, Typography } from "@mui/material";
import Page from "../Commons/Page";
import Orbit from "./Orbit";

// css
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <Page title="About">
      <Box className="about-description-container">
        <Typography className="about-description">Nova Booking</Typography>
        <Typography className="about-description">
          Group 10 - IPM Project 23/24
        </Typography>
      </Box>
      <Orbit />
    </Page>
  );
};

export default AboutPage;
