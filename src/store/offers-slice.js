import { createSlice } from "@reduxjs/toolkit";
import { fetchOffers } from "../thunks/offers.thunks";

const initialState = {
  offers: [],
  offersQty: {},
  totalPrice: 0,
  loading: false,
};

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    changeSelectedQty: (state, action) => {
      const { id, newQty } = action.payload;
      const offer = state.offers.find((o) => o.id === id);

      const qtyDiff = newQty - (state.offersQty[id] ?? 0);
      const priceDiff = qtyDiff * offer.price;
      state.totalPrice = +(state.totalPrice + priceDiff).toFixed(2);

      state.offersQty[id] = newQty;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        if (action?.error?.name !== 'AbortError') {
          state.loading = false;
        }
      });
  },
});

export const { changeSelectedQty } = offersSlice.actions;

export default offersSlice.reducer;
