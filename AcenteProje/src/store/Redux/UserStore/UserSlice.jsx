import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 userInfo: [
  {
    name: "furkan",
    surname: "sahin",
    phone: "5356230534",
    mail: "asdasd@gmail.com"
  }
 ],
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
})

export const {  } = UserSlice.actions

export default UserSlice.reducer