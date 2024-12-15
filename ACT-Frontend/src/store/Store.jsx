import { configureStore } from '@reduxjs/toolkit'
import FlightSlice from './Redux/FlightStore/FlightSlice'
import UserSlice from './Redux/UserStore/UserSlice'
import CampaignSlice from './Redux/CampaignStore/CampaignSlice'

export const store = configureStore({
  reducer: {
    flight: FlightSlice,
    user: UserSlice,
    campaign: CampaignSlice,
  },
})