import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagina: 0,
  nombreComun: "",
  continente: "",
  actividad: "",
  orden: "",
  tipoDeOrden: "",
};

export const querySlice = createSlice({
  name: "querys",
  initialState,
  reducers: {
    actualizarPagina: (state, action) => {
      state.pagina = action.payload;
    },
    filtrarPorNombre: (state, action) => {
      state.nombreComun =
        action.payload === null ? state.nombreComun : action.payload;
    },
    filtrarPorContinente: (state, action) => {
      state.continente = action.payload === null? state.continente : action.payload;
      
    },
    filtrarPorActividad: (state, action) => {
      state.actividad = action.payload === null? state.actividad : action.payload;
    },
    indicarUnOrden: (state, action) => {
      state.orden = action.payload;
    },
    indicarTipoDeOrden: (state, action) => {
      state.tipoDeOrden = action.payload;
    },
    resetearEstado: (state) => {
      // Restablece el estado a su valor inicial
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export const {
  actualizarPagina,
  filtrarPorNombre,
  filtrarPorContinente,
  filtrarPorActividad,
  indicarUnOrden,
  indicarTipoDeOrden,
  resetearEstado,
} = querySlice.actions;

export default querySlice.reducer;
