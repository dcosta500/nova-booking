import {
  Box,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Page from "../../Commons/Page";
import NovaButton from "../../Commons/NovaButton";

// css
import "./Ed2.css";
import { useState } from "react";
import ItemsList from "../../Commons/ItemsList";
import { useDispatch, useSelector } from "react-redux";
import DateStockPicker from "../../Commons/DateStockPicker";
import { decreaseStock } from "src/redux/slices/buildingsSlice";
import { addReservation } from "src/redux/slices/userSlice";
import CheckIcon from "@mui/icons-material/Check";

const Ed2 = (props) => {
  const mapImg = {
    default: require("src/images/buildings/ed2/ed2-plant.png"),
    room_127: require("src/images/buildings/ed2/ed2-plant-127.png"),
    room_128: require("src/images/buildings/ed2/ed2-plant-128.png"),
    room_107: require("src/images/buildings/ed2/ed2-plant-107.png"),
    room_114: require("src/images/buildings/ed2/ed2-plant-114.png"),
  };

  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.buildings);

  const [subPage, setSubPage] = useState(undefined);
  const [showSuccess, setShowSuccess] = useState(undefined);
  const [map, setMap] = useState(undefined);
  const [item, setItem] = useState(undefined);
  const [room, setRoom] = useState(undefined);

  const [roomInfo, setRoomInfo] = useState(undefined);

  const [key, setKey] = useState(1);

  const forceRerender = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const reset = () => {
    setItem(undefined);
    setRoom(undefined);
    setMap(undefined);
    setRoomInfo(undefined);
  };

  const onSelect = (item) => {
    if (item.stock > 0) {
      setShowSuccess(false);
      setItem(item);
      forceRerender();
    }
  };

  const onCancelClick = () => {
    reset();
  };

  const onRoomAcceptClick = (date) => {
    setItem(undefined);
    setShowSuccess(true);

    dispatch(
      addReservation({
        buildingId: buildings.ed2.id,
        itemId: room.id,
        date,
        quantity: undefined,
      })
    );

    setTimeout(() => setShowSuccess(false), 5000);
    reset();
  };

  const onItemAcceptClick = (date, quantity) => {
    setRoom(undefined);
    setShowSuccess(true);

    dispatch(
      decreaseStock({
        buildingId: buildings.ed2.id,
        itemId: item.id,
        quantity: quantity,
      })
    );

    dispatch(
      addReservation({
        buildingId: buildings.ed2.id,
        itemId: item.id,
        date,
        quantity,
      })
    );

    setTimeout(() => setShowSuccess(false), 5000);
    reset();
  };

  const paperStyle = {
    backgroundColor: "#6c6c6c",
  };

  const pages = [
    {
      id: "rooms",
      title: "Rooms",
    },
    {
      id: "materials",
      title: "Materials",
    },
  ];

  const leftButtons = pages.map((e, key) => (
    <Box key={key} className="ed2-button">
      <NovaButton
        onClick={() => {
          setSubPage(e.id);
          reset();
        }}
        className="ed2-button"
      >
        {e.title}
      </NovaButton>
    </Box>
  ));

  const noneContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography sx={{ color: "#303030", fontSize: "2rem" }}>
        Select an Option
      </Typography>
    </Box>
  );

  const materialsContent = (
    <Box className="ed2-materials-content-itemlist-container">
      <ItemsList
        height="100%"
        items={buildings.ed2.items.filter((item) => item.id.startsWith("mat"))}
        onSelect={onSelect}
      />
    </Box>
  );

  const roomsContent = (
    <Box className="ed2-rooms-content-container">
      <Box className="ed2-rooms-content">
        <img
          style={{ height: "40vh" }}
          src={mapImg[map === undefined ? "default" : map]}
          alt="ed2_map"
        />
      </Box>
    </Box>
  );

  const centerDisplayContent = () => {
    switch (subPage) {
      case "materials":
        return materialsContent;
      case "rooms":
        return roomsContent;
      default:
        return noneContent;
    }
  };

  const buttonAndInfoColumn = (
    <Box className="column-1">
      <Box className="ed2-button-section">{leftButtons}</Box>
      <Box className="ed2-info-section">
        {subPage === "rooms" && roomInfo !== undefined && (
          <Paper sx={paperStyle} className="ed2-info-card">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: 0,
              }}
              className="ed2-info-content"
            >
              <Typography>{roomInfo.name}</Typography>
              <Typography>Max Ocupation: {roomInfo.maxOcupation}</Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );

  const roomsRightColumnContent = () => {
    let lst = buildings.ed2.rooms;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        {lst.map((e, key) => (
          <Box key={key} className="ed2-right-button-container">
            <NovaButton
              onMouseEnter={() => {
                setMap(e.id);
                setRoomInfo({ name: e.name, maxOcupation: e.maxOcupation });
              }}
              onClick={() => setRoom(e)}
              className="ed2-button"
            >
              {e.name}
            </NovaButton>
          </Box>
        ))}
      </Box>
    );
  };

  const rightColumnPicker = () => {
    if (subPage === "rooms") {
      if (showSuccess)
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              height: "100%",
            }}
          >
            <CheckIcon />
            <Typography>Reservation registered!</Typography>
          </Box>
        );
      else if (room !== undefined) {
        return (
          <DateStockPicker
            doStock={false}
            itemName={room.name}
            onCancel={onCancelClick}
            onAccept={onRoomAcceptClick}
          />
        );
      } else return roomsRightColumnContent();
    } else {
      if (showSuccess)
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              height: "100%",
            }}
          >
            <CheckIcon />
            <Typography>Reservation registered!</Typography>
          </Box>
        );
      else if (item !== undefined)
        return (
          <DateStockPicker
            key={key}
            doStock={true}
            minStock={item.stock == 0 ? 0 : 1}
            maxStock={item.stock}
            itemName={item.name}
            onCancel={onCancelClick}
            onAccept={onItemAcceptClick}
          />
        );
    }
  };

  return (
    <Page title="Building 2">
      <Box className="ed2-page-container">
        {buttonAndInfoColumn}
        <Box className="column-2">
          <Paper sx={paperStyle} className="center-display">
            {centerDisplayContent()}
          </Paper>
        </Box>
        <Box className="column-3">
          <Paper
            sx={{ height: "50vh", ...paperStyle }}
            className="ed2-right-picker"
          >
            {rightColumnPicker()}
          </Paper>
        </Box>
      </Box>
    </Page>
  );
};

export default Ed2;
