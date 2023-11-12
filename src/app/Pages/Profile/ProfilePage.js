import { Box, Typography } from "@mui/material";
import Plate from "../Commons/Plate";

// css
import "./ProfilePage.css";
import Page from "../Commons/Page";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((store) => store.user);
  const images = {
    avatar: require("src/images/profile_pic.jpg"),
  };

  const styles = {
    userNameStyle: {
      fontSize: "3rem",
      fontWeight: "500",
      color: "white",
    },
  };

  return (
    <Box class="box-page">
      <Page title="Profile">
        <Box className="profile-page-container">
          <Box>
            <img className="profile-avatar" src={images.avatar} alt="Avatar" />
          </Box>
          <Typography sx={styles.userNameStyle}>{user.name}</Typography>
        </Box>
      </Page>
    </Box>
  );
};

export default ProfilePage;
