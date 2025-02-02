import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [], 
  selectedFlight: null, 
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartList: (state, action) => {
      state.cartList = [...state.cartList, action.payload]; 
    },
    clearCart: (state) => {
      state.cartList = []; 
    },
    setFlightInfo: (state, action) => {
      state.selectedFlight = action.payload; 
    },
  },
});

export const { addCartList, clearCart, setFlightInfo } = CartSlice.actions;

export default CartSlice.reducer;