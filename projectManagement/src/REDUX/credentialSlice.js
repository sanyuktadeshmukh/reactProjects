import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 userName:'',
 userEmail: '',
 userPassword: ''
}

const credentialSlice = createSlice({
 name: 'credentials',
 initialState,
 reducers: {
  setUserName: (state, action) => {
   state.userName = action.payload;
  },
  setUserEmail: (state, action) => {
   state.userEmail = action.payload;
  },
  setUserPass: (state, action) => {
   state.userPassword = action.payload;
  }
 }
})

export default credentialSlice.reducer;
export const { setUserEmail, setUserPass, setUserName } = credentialSlice.actions;