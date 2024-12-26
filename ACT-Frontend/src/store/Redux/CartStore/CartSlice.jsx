import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [], // Sepet uçuşlarını saklamak için bir dizi
  selectedFlight: null, // Ödeme sayfasında gösterilecek seçilen uçuş
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartList: (state, action) => {
      state.cartList = [...state.cartList, action.payload]; // Yeni uçuşu mevcut listeye ekler
    },
    clearCart: (state) => {
      state.cartList = []; // Sepeti temizler
    },
    setFlightInfo: (state, action) => {
      state.selectedFlight = action.payload; // Ödeme için seçilen uçuş bilgisini saklar
    },
  },
});

export const { addCartList, clearCart, setFlightInfo } = CartSlice.actions;

export default CartSlice.reducer;