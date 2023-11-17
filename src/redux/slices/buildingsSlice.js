import { createSlice, current } from "@reduxjs/toolkit";

const debugPrint = (message, obj) => {
  console.log(`DEBUG MESSAGE: FROM BUILDING_SLICE, ${message}`);
  console.log(obj);
  return "debug_print";
};

const roomModel = (name, maxOcupation, image) => {
  return {
    name,
    maxOcupation,
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
      r127: require("src/images/buildings/ed2/ed2-plant-127.png"),
      r128: require("src/images/buildings/ed2/ed2-plant-128.png"),
      r107: require("src/images/buildings/ed2/ed2-plant-107.png"),
      r114: require("src/images/buildings/ed2/ed2-plant-114.png"),
    },
    materials: {
      erlenmeyer: require("src/images/materials/erlenmeyer.png"),
      book: require("src/images/materials/book.png"),
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
  id: "library",
  rooms: [
    roomModel("127", "150", imgs.library.rooms.r127),
    roomModel("128", "150", imgs.library.rooms.r128),
    roomModel("107", "15", imgs.library.rooms.r107),
    roomModel("114", "30", imgs.library.rooms.r114),
  ],
  items: [
    itemModel(
      "mat_erm_50",
      "Erlenmeyer 50ml",
      imgs.library.materials.erlenmeyer,
      5
    ),
    itemModel(
      "mat_erm_100",
      "Erlenmeyer 100ml",
      imgs.library.materials.erlenmeyer,
      5
    ),
    itemModel(
      "mat_erm_150",
      "Erlenmeyer 150ml",
      imgs.library.materials.erlenmeyer,
      5
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
  id: "ed2",
  rooms: [
    roomModel("127", "150", imgs.ed2.rooms.r127),
    roomModel("128", "150", imgs.ed2.rooms.r128),
    roomModel("107", "15", imgs.ed2.rooms.r107),
    roomModel("114", "30", imgs.ed2.rooms.r114),
  ],
  items: [
    itemModel(
      "mat_erm_50",
      "Erlenmeyer 50ml",
      imgs.ed2.materials.erlenmeyer,
      5
    ),
    itemModel(
      "mat_erm_100",
      "Erlenmeyer 100ml",
      imgs.ed2.materials.erlenmeyer,
      5
    ),
    itemModel(
      "mat_erm_150",
      "Erlenmeyer 150ml",
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
