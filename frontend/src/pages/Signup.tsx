import { useState } from "react"
import axios from "axios"

export default function Signup(){

 const [email,setEmail]=useState("")
 const [username,setUsername]=useState("")
 const [password,setPassword]=useState("")

 const signup = async ()=>{

  await axios.post(
   "http://localhost:3000/api/auth/signup",
   {email,username,password}
  )
 }

 return(
  <div>
   <h2>Create account</h2>

   <input
    placeholder="Email"
    onChange={(e)=>setEmail(e.target.value)}
   />

   <input
    placeholder="Username"
    onChange={(e)=>setUsername(e.target.value)}
   />

   <input
    type="password"
    placeholder="Password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button onClick={signup}>Signup</button>
  </div>
 )
}