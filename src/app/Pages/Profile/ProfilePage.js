import { Box, Typography } from "@mui/material";
import { updateName } from "src/redux/slices/userSlice";

// css
import "./ProfilePage.css";
import Page from "../Commons/Page";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const onClockLogin = () => {
    dispatch(updateName("Diogo Lemos"));
    navigate("/nova-booking/profile");
  };

  const login = (
    <Page title="Login">
      <Box className="profile-page-container">
        <Box onClick={onClockLogin}>a</Box>
      </Box>
    </Page>
  );

  const profile = (
    <Page title="Profile">
      <Box className="profile-page-container">
        <Box>
          <img className="profile-avatar" src={images.avatar} alt="Avatar" />
        </Box>
        <Typography sx={styles.userNameStyle}>{user.name}</Typography>
      </Box>
    </Page>
  );

  let content = user.name == undefined ? login : profile;

  return <Box class="box-page">{content}</Box>;
};

export default ProfilePage;
