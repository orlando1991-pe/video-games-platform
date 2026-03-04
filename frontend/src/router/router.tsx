import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import GameDetail from "../pages/GameDetail"

export default function Router(){

 return(

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/game/:id" element={<GameDetail/>}/>

   </Routes>

  </BrowserRouter>

 )
}