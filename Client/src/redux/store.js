import { configureStore } from "@reduxjs/toolkit";

// import { countriesSlice } from "./countriesSlice.js";
import { querySlice } from "./querysSlice.js";
import { userSlice } from "./userSlice.js";
import {climaSlice} from "./clima.js"


export default configureStore({
  reducer: {
    // countriesSlice: countriesSlice.reducer,
    querySlice: querySlice.reducer,
    userSlice : userSlice.reducer,
    climaSlice : climaSlice.reducer
   
  },
});
