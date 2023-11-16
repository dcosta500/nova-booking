import { createSlice } from "@reduxjs/toolkit";

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

const materialModel = (id, name, image, stock) => {
  return {
    id,
    name,
    stock,
  };
};

const imgs = {
  ed2: {
    r127: require("src/images/buildings/ed2/ed2-plant-127.png"),
    r128: require("src/images/buildings/ed2/ed2-plant-128.png"),
    r107: require("src/images/buildings/ed2/ed2-plant-107.png"),
    r114: require("src/images/buildings/ed2/ed2-plant-114.png"),
  },
};

const ed2 = {
  id: "ed2",
  rooms: [
    roomModel("127", "150", imgs.ed2.r127),
    roomModel("128", "150", imgs.ed2.r128),
    roomModel("107", "15", imgs.ed2.r107),
    roomModel("114", "30", imgs.ed2.r114),
  ],
  material: [
    materialModel("erm_50", "Erlenmeyer 50ml", undefined, 5),
    materialModel("erm_100", "Erlenmeyer 100ml", undefined, 5),
    materialModel("erm_150", "Erlenmeyer 150ml", undefined, 5),
  ],
};

export const buildingsSlice = createSlice({
  name: "buildings",
  initialState: {
    ed2,
  },
  reducers: {
    decreaseStock: (state, action) => {
      // action.payload = {buildingId, materialId, quantityToDecrease}
      const payload = action.payload;

      // Find building
      const building = state.find((b) => b.id === payload.buildingId);
      if (building === undefined) return debugPrint("Building is undefined.");

      // Find material
      const material = building.material.find(
        (material) => (material.id = payload.materialId)
      );
      if (material === undefined) return debugPrint("Material is undefined.");

      // Decrease stock
      if (material.stock < payload.quantityToDecrease)
        return debugPrint("Not enough stock to fulfill request.");

      material.stock -= payload.quantityToDecrease;
    },
  },
});

export const { decreaseStock } = buildingsSlice.actions;

export default buildingsSlice.reducer;
