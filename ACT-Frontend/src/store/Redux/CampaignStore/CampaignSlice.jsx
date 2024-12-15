import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  campaign: null, // Kullanıcı bilgisi başlangıçta boş
  
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaign: (state, action) => {
      state.campaign = action.payload; // Kullanıcıyı günceller
    },
  },
});

export const { setCampaign } = campaignSlice.actions;

export default campaignSlice.reducer;