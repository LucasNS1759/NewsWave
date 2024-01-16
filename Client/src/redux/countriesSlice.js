import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountries = createAsyncThunk(
  "countries/AllCountries",
  async (querys) => {
  console.log(querys)
    const response = querys
      ? await axios.get(`http://localhost:3001/countries?filtros=${querys}`)
      : await axios.get(`http://localhost:3001/countries?`);
      console.log(response.data)
    return response.data;
  }
);

const initialState = {
  allCountries: [],
  DetailContrie: {},
  
  activities: [],
  status: "idle",
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getAllCountries: (state, action) => {
      state.allCountries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.status = "success";
        state.allCountries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
export const {getAllCountries} = countriesSlice.actions

export const { setCountries } = countriesSlice.actions;






export const getAllCountries = (query) => async (dispatch) => {
  console.log(query);
  try {
    if (query) {
      const response = await axios.get(
        "http://localhost:3001/countries",
        query
      );
      console.log(response.data);
      dispatch(setCoutries(response.data.rows));
    }
    const response = await axios.get(`http://localhost:3001/countries?`);

    dispatch(setCoutries(response.data));
  } catch (error) {
    window.alert(error.message);
  }
};
