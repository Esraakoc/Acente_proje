import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flightList: null,
}

export const FlightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    addFlightList: (state,actions) => {
      state.flightList = actions.payload
    },
  },
})

export const { addFlightList } = FlightSlice.actions

export default FlightSlice.reducer