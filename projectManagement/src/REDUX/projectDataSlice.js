import { createSlice } from "@reduxjs/toolkit";


const initialState = {
 theme: '',
 reason:'Business',
 type: 'Internal',
 division: 'Compressor',
 category: 'Quality A',
 priority: 1,
 department: 'Strategy',
 startDate: '',
 endDate: '',
 location: 'Pune',
 userId:''
}

const projectSlice = createSlice({
 name: 'projectData',
 initialState,
 reducers: {
  setTheme: (state, action) => {
   state.theme = action.payload;
  },
  setReason: (state, action) => {
   state.reason = action.payload;
  },
  setType: (state, action) => {
   state.type = action.payload;
  },
  setDivision: (state, action) => {
   state.division = action.payload;
  },
  setCategory: (state, action) => {
   state.category = action.payload;
  },
  setPriority: (state, action) => {
   state.priority = action.payload;
  },
  setDepartment: (state, action) => {
   state.department = action.payload;
  },
  setStartDate: (state, action) => {
   state.startDate = action.payload;
  },
  setEndDate: (state, action) => {
   state.endDate = action.payload;
  },
  setLocation: (state, action) => {
   state.location = action.payload;
  },
  setUserId: (state, action) => {
   state.userId = action.payload;
  },
  resetProject: () => {
   return initialState;
  }
 }
})

export default projectSlice.reducer;
export const { setTheme, setReason, setType, setDivision, setCategory, setPriority, setDepartment, setStartDate, setEndDate, setLocation, setUserId, resetProject } = projectSlice.actions;