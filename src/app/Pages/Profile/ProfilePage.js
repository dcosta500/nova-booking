import {
  Box,
  Button,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { updateName } from "src/redux/slices/userSlice";

// css
import "./ProfilePage.css";
import Page from "../Commons/Page";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import NovaTextField from "../Commons/NovaTextField";

const useStyles = (theme) => ({
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: "white",
  },
});

const ProfilePage = () => {
  const classes = useStyles();
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

  const onClickLogin = () => {
    dispatch(updateName("Diogo Lemos"));
    navigate("/nova-booking/profile");
  };

  const onClickLogout = () => {
    dispatch(updateName(undefined));
  };

  const login = (
    <Page title="Login">
      <Box className="login-page-container">
        <Box className="text-field-container">
          <NovaTextField
            label="Username"
            icon={<AccountCircle style={{ color: "white" }} />}
          />
        </Box>
        <Box sx={{ height: "2rem" }} />
        <Box className="text-field-container">
          <NovaTextField
            label="Password"
            isPassword={true}
            icon={<KeyIcon style={{ color: "white" }} />}
          />
        </Box>
        <Box sx={{ height: "2rem" }} />
        <Box className="login-buttons-container">
          <Button
            onClick={onClickLogin}
            className="select-building-button"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Page>
  );

  const profile = (
    <Page title="Profile">
      <Box className="profile-page-container">
        <Box>
          <Box>
            <img className="profile-avatar" src={images.avatar} alt="Avatar" />
          </Box>
          <Typography sx={styles.userNameStyle}>{user.name}</Typography>
        </Box>
        <Button
          onClick={onClickLogout}
          className="select-building-button"
          variant="contained"
        >
          Logout
        </Button>
      </Box>
    </Page>
  );

  let content = user.name == undefined ? login : profile;

  return <Box class="box-page">{content}</Box>;
};

export default ProfilePage;
