import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
import * as React from "react";
import ContentColumn from "./ContentColumn";

// css
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NovaButton from "../Commons/NovaButton";

const HomePage = () => {
  const dispatch = useDispatch();
  const paths = useSelector((store) => store.paths);
  const user = useSelector((store) => store.user);
  const buildings = useSelector((store) => store.buildings);

  const navigate = useNavigate();

  const [mapImage, setMapImage] = React.useState("main");

  const maps = {
    main: require("src/images/map/ipm-map.png"),
    library: require("src/images/map/ipm-map-library.png"),
    ed2: require("src/images/map/ipm-map-ed2.png"),
  };

  const buttonListStyle = {
    overflowY: "scroll",
  };

  const metaStyles = {
    fontSize: "0.85rem",
  };

  const retrieveReservations = () => {
    if (
      user.name === undefined ||
      user.reservations.get(user.name) === undefined
    )
      return [];
    return user.reservations.get(user.name);
  };

  const buildingsObj = [
    {
      name: "Library",
      mapName: "library",
      path: paths.libraryPage,
    },
    {
      name: "Building 2",
      mapName: "ed2",
      path: paths.ed2,
    },
  ];

  const upcomingReservationsContent = () => {
    const retrieveItemImage = (reservation) => {
      let building = { ...buildings[reservation.buildingId] };

      let image;
      if (reservation.itemId.startsWith("room"))
        image = building.rooms.find(
          (e, idx) => e.id === reservation.itemId
        ).image;
      else
        image = building.items.find(
          (e, idx) => e.id === reservation.itemId
        ).image;

      return image;
    };

    const retrieveBuildingName = (reservation) => {
      return buildings[reservation.buildingId].name;
    };

    const retrieveItemName = (reservation) => {
      let building = { ...buildings[reservation.buildingId] };

      let name;
      if (reservation.itemId.startsWith("room"))
        name = building.rooms.find(
          (e, idx) => e.id === reservation.itemId
        ).name;
      else
        name = building.items.find(
          (e, idx) => e.id === reservation.itemId
        ).name;

      return name;
    };

    return retrieveReservations().map((r, key) => (
      <Box className="reservation-container" key={key}>
        <Paper>
          <Box className="reservation-inner-container">
            <Box className="reservation-image-container">
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={retrieveItemImage(r)}
              />
            </Box>
            <Box className="reservation-metadata">
              <Box>
                <Typography sx={metaStyles}>{retrieveItemName(r)}</Typography>
                {}
                <Typography sx={{ color: "grey", ...metaStyles }}>
                  {retrieveBuildingName(r)}{" "}
                  {!r.itemId.startsWith("room") && "- Qty:"} {r.quantity}
                </Typography>
              </Box>
              <Box>
                <Typography>Deadline:</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {r.date.format("DD-MM-YYYY")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    ));
  };

  let upcomingReservationsColumn = {
    title: "Upcoming Reservations",
    content:
      retrieveReservations().length === 0 ? undefined : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            overflowY: "scroll",
            width: "100%",
          }}
        >
          {upcomingReservationsContent()}
        </Box>
      ),
  };

  let selectBuildingColumn = {
    title: "Select a Building",
    content: (
      <List sx={buttonListStyle}>
        {buildingsObj.map((building, key) => (
          <ListItem key={key}>
            <Box className="select-building-button-container">
              <NovaButton
                onMouseEnter={() => setMapImage(building.mapName)}
                onClick={() =>
                  navigate(
                    user.name === undefined ? paths.profilePage : building.path
                  )
                }
              >
                {building.name}
              </NovaButton>
            </Box>
          </ListItem>
        ))}
      </List>
    ),
  };

  return (
    <Box className="home-page-section">
      <ContentColumn title={upcomingReservationsColumn.title}>
        {upcomingReservationsColumn.content}
      </ContentColumn>
      <Box className="map-container">
        <img className="map-image" src={maps[mapImage]} alt="Map" />
      </Box>
      <ContentColumn title={selectBuildingColumn.title}>
        {selectBuildingColumn.content}
      </ContentColumn>
    </Box>
  );
};

export default HomePage;
