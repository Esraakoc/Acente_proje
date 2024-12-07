import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Kullanıcı bilgisi başlangıçta boş
  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Kullanıcıyı günceller
    },
    clearUser: (state) => {
      state.user = null; // Kullanıcıyı temizler
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;