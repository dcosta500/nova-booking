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
import "./Library.css";
import { useState } from "react";
import ItemsList from "../../Commons/ItemsList";
import { useDispatch, useSelector } from "react-redux";
import DateStockPicker from "../../Commons/DateStockPicker";
import { decreaseStock } from "src/redux/slices/buildingsSlice";
import { addReservation } from "src/redux/slices/userSlice";
import CheckIcon from "@mui/icons-material/Check";

const Library = (props) => {
  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.buildings);

  const [subPage, setSubPage] = useState(undefined);
  const [tabValue, setTabValue] = useState("gr");

  const [item, setItem] = useState(undefined);
  const [showSuccess, setShowSuccess] = useState(undefined);
  const [room, setRoom] = useState(undefined);
  const [roomInfo, setRoomInfo] = useState(undefined);

  const [key, setKey] = useState(1);

  const forceRerender = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const reset = () => {
    setItem(undefined);
    setRoom(undefined);
    setRoomInfo(undefined);
  };

  const handleChange = (event, newValue) => {
    reset();
    setTabValue(newValue);
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
        buildingId: buildings.library.id,
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
        buildingId: buildings.library.id,
        itemId: item.id,
        quantity: quantity,
      })
    );

    dispatch(
      addReservation({
        buildingId: buildings.library.id,
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
    {
      id: "books",
      title: "Books",
    },
  ];

  /* preguicodromo: "preguicodromo",
    teamRooms: "teamRooms",
    soloRooms: "soloRooms",
    agoraRoom: "agoraRoom", */

  const leftButtons = pages.map((e, key) => (
    <Box key={key} className="library-button">
      <NovaButton
        onClick={() => {
          setSubPage(e.id);
          reset();
        }}
        className="library-button"
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

  const booksContent = (
    <Box className="library-materials-content-itemlist-container">
      <ItemsList
        height="100%"
        items={buildings.library.items.filter((item) =>
          item.id.startsWith("book")
        )}
        onSelect={onSelect}
      />
    </Box>
  );

  const materialsContent = (
    <Box className="library-materials-content-itemlist-container">
      <ItemsList
        height="100%"
        items={buildings.library.items.filter((item) =>
          item.id.startsWith("mat")
        )}
        onSelect={onSelect}
      />
    </Box>
  );

  const groupRoomsContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
      }}
    >
      <img
        style={{ height: "12rem" }}
        src={buildings.library.groupRoomsMap}
        alt="group_rooms_map"
      />
    </Box>
  );

  const soloRoomsContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
      }}
    >
      <img
        style={{ height: "12rem" }}
        src={buildings.library.soloRoomsMap}
        alt="solo_rooms_map"
      />
    </Box>
  );
  /* 
  const preguicodromoContent = <Typography>Preguiçodromo Content</Typography>;

  const agoraRoomContent = <Typography>Ágora room content</Typography>; */

  const roomsScreen = () => {
    switch (tabValue) {
      case "gr":
        return groupRoomsContent;
      case "sr":
        return soloRoomsContent;
      /* case "pr":
        return preguicodromoContent;
      case "ag":
        return agoraRoomContent; */
    }
  };

  const roomsContent = (
    <Box className="library-rooms-content-container">
      <Box className="library-tabs-container">
        <Tabs
          sx={{ color: "white", borderColor: "white" }}
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          textColor="inherit"
          indicatorColor="inherit"
        >
          <Tab value="gr" label="Group Rooms" />
          <Tab value="sr" label="Solo Rooms" />
          {/* <Tab value="pr" label="Preguiçodromo" />
          <Tab value="ag" label="Ágora Room" /> */}
        </Tabs>
      </Box>
      <Box className="library-rooms-content">{roomsScreen()}</Box>
    </Box>
  );

  const centerDisplayContent = () => {
    switch (subPage) {
      case "books":
        return booksContent;
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
      <Box className="library-button-section">{leftButtons}</Box>
      <Box className="library-info-section">
        {subPage === "rooms" && roomInfo !== undefined && (
          <Paper sx={paperStyle} className="library-info-card">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: 0,
              }}
              className="library-info-content"
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
    let lst = buildings.library.rooms.filter((e) =>
      e.id.startsWith(`room_${tabValue}`)
    );
    if (lst.length === 0) return undefined;
    else
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
            <Box key={key} className="library-right-button-container">
              <NovaButton
                onMouseEnter={() =>
                  setRoomInfo({ name: e.name, maxOcupation: e.maxOcupation })
                }
                onClick={() => setRoom(e)}
                className="library-button"
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
    <Page title="Library">
      <Box className="library-page-container">
        {buttonAndInfoColumn}
        <Box className="column-2">
          <Paper sx={paperStyle} className="center-display">
            {centerDisplayContent()}
          </Paper>
        </Box>
        <Box className="column-3">
          <Paper
            sx={{ height: "50vh", ...paperStyle }}
            className="library-right-picker"
          >
            {rightColumnPicker()}
          </Paper>
        </Box>
      </Box>
    </Page>
  );
};

export default Library;
