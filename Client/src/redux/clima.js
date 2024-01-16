import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  datosZona: { codigoDeEstado: "B", ciudad: "Buenos Aires" },
  coordenadas: { latitud: -34.6118, longitud: -58.4173 },
};

export const climaSlice = createSlice({
  name: "clima",
  initialState,
  reducers: {
    actualizarDatosZona: (state, action) => {
      state.datosZona = action.payload;
    },
    actualizarCoordenadas: (state, action) => {
      state.coordenadas = action.payload;
    },
  },
});

export const { actualizarCoordenadas, actualizarDatosZona } =
  climaSlice.actions;

export default climaSlice.reducer;
