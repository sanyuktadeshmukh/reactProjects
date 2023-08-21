import { Route, Routes } from "react-router-dom";
import React from 'react'
import Landing from "./CREDENTIALS/Landing";
import Login from "./CREDENTIALS/Login";
import Signup from "./CREDENTIALS/Signup";
import UserWindow from "./PROJECT/UserWindow";
export default function RouterComponents() {
 return (
  <Routes>
   <Route path="/" element={<Landing />}></Route>
   <Route path="/Login" element={<Login />}></Route>
     <Route path="/Signup" element={<Signup />}></Route>
     <Route path="/Userprojects" element={<UserWindow />}></Route>
   </Routes>
  )
}
