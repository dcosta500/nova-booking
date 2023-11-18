import { createSlice, current } from "@reduxjs/toolkit";

const debugPrint = (message, obj) => {
  console.log(`DEBUG MESSAGE: FROM BUILDING_SLICE, ${message}`);
  console.log(obj);
  return "debug_print";
};

const roomModel = (id, name, maxOcupation, image, picture) => {
  return {
    id,
    name,
    maxOcupation,
    image,
    picture,
  };
};

const itemModel = (id, name, image, stock) => {
  return {
    id,
    name,
    image,
    stock,
  };
};

const imgs = {
  library: {
    rooms: {
      soloRooms: require("src/images/buildings/library/solo_rooms.png"),
      groupRooms: require("src/images/buildings/library/group_rooms.png"),
    },
    materials: {
      erlenmeyer: require("src/images/materials/erlenmeyer.png"),
      book: require("src/images/materials/book.png"),
      room: require("src/images/materials/room.png"),
      webcam: require("src/images/materials/webcam.png"),
      microphone: require("src/images/materials/microphone.webp"),
    },
  },
  ed2: {
    rooms: {
      r127: require("src/images/buildings/ed2/ed2-plant-127.png"),
      r128: require("src/images/buildings/ed2/ed2-plant-128.png"),
      r107: require("src/images/buildings/ed2/ed2-plant-107.png"),
      r114: require("src/images/buildings/ed2/ed2-plant-114.png"),
    },
    materials: {
      erlenmeyer: require("src/images/materials/erlenmeyer.png"),
    },
  },
};

const library = {
  name: "Library",
  id: "library",
  soloRoomsMap: imgs.library.rooms.soloRooms,
  groupRoomsMap: imgs.library.rooms.groupRooms,
  rooms: [
    // Individual Rooms
    roomModel("room_sr1", "Individual Room 1", 1, imgs.library.materials.room),
    roomModel("room_sr2", "Individual Room 2", 1, imgs.library.materials.room),
    roomModel("room_sr3", "Individual Room 3", 1, imgs.library.materials.room),
    roomModel("room_sr4", "Individual Room 4", 1, imgs.library.materials.room),
    roomModel("room_sr5", "Individual Room 5", 1, imgs.library.materials.room),
    roomModel("room_sr6", "Individual Room 6", 1, imgs.library.materials.room),
    roomModel("room_sr7", "Individual Room 7", 1, imgs.library.materials.room),
    roomModel("room_sr8", "Individual Room 8", 1, imgs.library.materials.room),
    roomModel("room_sr9", "Individual Room 9", 1, imgs.library.materials.room),
    roomModel(
      "room_sr10",
      "Individual Room 10",
      1,
      imgs.library.materials.room
    ),
    roomModel(
      "room_sr11",
      "Individual Room 11",
      1,
      imgs.library.materials.room
    ),
    roomModel(
      "room_sr12",
      "Individual Room 12",
      1,
      imgs.library.materials.room
    ),
    roomModel(
      "room_sr13",
      "Individual Room 13",
      1,
      imgs.library.materials.room
    ),
    roomModel(
      "room_sr14",
      "Individual Room 14",
      1,
      imgs.library.materials.room
    ),
    roomModel(
      "room_sr15",
      "Individual Room 15",
      1,
      imgs.library.materials.room
    ),
    roomModel(
      "room_sr16",
      "Individual Room 16",
      1,
      imgs.library.materials.room
    ),
    // Group Rooms
    roomModel("room_gr1", "Group Room 1", 8, imgs.library.materials.room),
    roomModel("room_gr2", "Group Room 2", 8, imgs.library.materials.room),
    roomModel("room_gr3", "Group Room 3", 8, imgs.library.materials.room),
    roomModel("room_gr4", "Group Room 4", 8, imgs.library.materials.room),
  ],
  items: [
    itemModel("mat_web_1", "Webcam 2", imgs.library.materials.webcam, 34),
    itemModel(
      "mat_web_2",
      "Webcam 2 Pro Max",
      imgs.library.materials.webcam,
      34
    ),
    itemModel(
      "mat_web_3",
      "Webcam 2 Super Pro Mega Max",
      imgs.library.materials.webcam,
      34
    ),
    itemModel("mat_web_4", "Webcam 3", imgs.library.materials.webcam, 34),
    itemModel(
      "mat_mic_1",
      "Microphone 1",
      imgs.library.materials.microphone,
      31
    ),
    itemModel(
      "mat_mic_2",
      "Microphone 2",
      imgs.library.materials.microphone,
      97
    ),
    itemModel(
      "mat_mic_3",
      "Microphone 3",
      imgs.library.materials.microphone,
      92
    ),
    itemModel(
      "mat_mic_4",
      "Microphone 4",
      imgs.library.materials.microphone,
      123
    ),
    itemModel(
      "book_hp_1",
      "Harry Potter and the Philosopher's Stone",
      imgs.library.materials.book,
      10
    ),
    itemModel(
      "book_hp_2",
      "Harry Potter and the Chamber of Secrets",
      imgs.library.materials.book,
      8
    ),
    itemModel(
      "book_hp_3",
      "Harry Potter and the Prisoner of Azkaban",
      imgs.library.materials.book,
      5
    ),
  ],
};

const ed2 = {
  name: "Building 2",
  id: "ed2",
  rooms: [
    roomModel("room_127", "Room 127", "150", imgs.ed2.rooms.r127),
    roomModel("room_128", "Room 128", "150", imgs.ed2.rooms.r128),
    roomModel("room_107", "Room 107", "15", imgs.ed2.rooms.r107),
    roomModel("room_114", "Room 114", "30", imgs.ed2.rooms.r114),
  ],
  items: [
    itemModel(
      "mat_erm_50",
      "Erlenmeyer 50ml",
      imgs.ed2.materials.erlenmeyer,
      37
    ),
    itemModel(
      "mat_erm_100",
      "Erlenmeyer 100ml",
      imgs.ed2.materials.erlenmeyer,
      23
    ),
    itemModel(
      "mat_erm_150",
      "Erlenmeyer 150ml",
      imgs.ed2.materials.erlenmeyer,
      12
    ),
    itemModel(
      "mat_erm_200",
      "Erlenmeyer 200ml",
      imgs.ed2.materials.erlenmeyer,
      5
    ),
  ],
};

export const buildingsSlice = createSlice({
  name: "buildings",
  initialState: {
    library,
    ed2,
  },
  reducers: {
    decreaseStock: (state, action) => {
      // action.payload = {buildingId, itemId, quantity}
      const payload = action.payload;
      const currentState = current(state);

      // Find building
      const building = { ...currentState[`${payload.buildingId}`] };
      if (building === undefined) return debugPrint("Building is undefined.");

      // Find item
      let itemIdx = -1;
      building.items.find((item, index) => {
        if (item.id == payload.itemId) {
          itemIdx = index;
          return true;
        }
      });

      if (itemIdx === -1) return debugPrint("Item is undefined.");

      // Decrease stock
      if (building.items[itemIdx].stock < payload.quantityToDecrease)
        return debugPrint("Not enough stock to fulfill request.");

      state[building.id]["items"][itemIdx].stock -= payload.quantity;
    },
  },
});

export const { decreaseStock } = buildingsSlice.actions;

export default buildingsSlice.reducer;
