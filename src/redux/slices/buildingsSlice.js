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

const ed2 = {
  id: "ed2",
  rooms: [
    roomModel("127", "150", undefined),
    roomModel("128", "150", undefined),
    roomModel("107", "15", undefined),
    roomModel("114", "30", undefined),
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
