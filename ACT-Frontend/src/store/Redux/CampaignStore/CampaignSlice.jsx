import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  campaigns: [],           // Kampanya listesi
  selectedCampaign: null,  // Seçili kampanya
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload; // Kampanya listesini günceller
    },
    setSelectedCampaign: (state, action) => {
      state.selectedCampaign = action.payload; // Seçili kampanyayı günceller
    },
  },
});

export const { setCampaigns, setSelectedCampaign } = campaignSlice.actions;

export default campaignSlice.reducer;