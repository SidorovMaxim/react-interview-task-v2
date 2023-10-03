import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOffers = createAsyncThunk("offers/fetchOffers", async (_, thunkAPI) => {
  const response = await fetch('http://localhost:3001/offers', {
    signal: thunkAPI.signal
  });

  return await response.json();
});
