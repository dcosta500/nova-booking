// css
import { Box } from "@mui/material";
import "./Orbit.css";

const Orbit = () => {
  const imgs = {
    logo: require("src/images/logo_icon.png"),
    costa: require("src/images/ourPhotos/costaProfile.jpeg"),
    lemos: require("src/images/ourPhotos/lemosProfile.jpg"),
    jose: require("src/images/ourPhotos/joseProfile.jpg"),
    pina: require("src/images/ourPhotos/pinaProfile.jpeg"),
  };

  return (
    <Box className="about-container">
      <div id="circle-orbit-container">
        <div id="inner-orbit">
          <div class="inner-orbit-cirlces">
            <img class="orbit-image" src={imgs.pina} />
          </div>
        </div>

        <div id="middle-orbit">
          <div class="middle-orbit-cirlces">
            <img class="orbit-image" src={imgs.jose} />
          </div>
        </div>

        <div id="outer-orbit">
          <div class="outer-orbit-cirlces">
            <img class="orbit-image" src={imgs.lemos} />
          </div>
        </div>

        <div id="outermost-orbit">
          <div class="outermost-orbit-cirlces">
            <img class="orbit-image" src={imgs.costa} />
          </div>
        </div>

        <div id="logo-center-container">
          <img class="logo-center-img" src={imgs.logo} alt="Logo Center" />
        </div>
      </div>
    </Box>
  );
};

export default Orbit;
