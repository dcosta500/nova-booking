// css
import { useState } from "react";
import "./MyReservations.css";
import Page from "../Commons/Page";
import {
  Box,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const MyReservations = (props) => {
  const user = useSelector((state) => state.user);
  const buildings = useSelector((state) => state.buildings);
  const [tab, setTab] = useState("mat");

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

  const createReservationCard = (r, key) => {
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

    return (
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
    );
  };

  const contentPicker = () => {
    const res = retrieveReservations().filter((e) => e.itemId.startsWith(tab));
    if (res.length === 0)
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#303030", fontSize: "2rem" }}>
            None
          </Typography>
        </Box>
      );
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "90%",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        {res.map((e, key) => createReservationCard(e, key))}
      </Box>
    );
  };

  return (
    <Page title="My Reservations">
      <Box>
        <Tabs
          sx={{ color: "white", borderColor: "white" }}
          value={tab}
          onChange={(e, t) => setTab(t)}
          variant="scrollable"
          textColor="inherit"
          indicatorColor="inherit"
        >
          <Tab value="mat" label="Materials" />
          <Tab value="book" label="Books" />
          <Tab value="room" label="Rooms" />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
          height: "50vh",
          width: "100%",
        }}
      >
        {contentPicker()}
      </Box>
    </Page>
  );
};

export default MyReservations;
