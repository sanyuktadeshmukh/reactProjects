import { configureStore } from "@reduxjs/toolkit";
import credentialReducer from "./credentialSlice";
import projectReducer from "./projectDataSlice"
const applicationStore = configureStore({
 reducer: {
  credentials: credentialReducer,
  projectData: projectReducer
 }
})

export default applicationStore;