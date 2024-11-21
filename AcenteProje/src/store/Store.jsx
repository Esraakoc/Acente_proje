import { configureStore } from '@reduxjs/toolkit'
import FlightSlice from './Redux/FlightStore/FlightSlice'
import UserSlice from './Redux/UserStore/UserSlice'

export const store = configureStore({
  reducer: {
    flight: FlightSlice,
    user: UserSlice
  },
})