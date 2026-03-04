import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login(){

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const navigate = useNavigate()

 const login = async ()=>{

  const res = await axios.post(
   "http://localhost:3000/api/auth/login",
   {email,password}
  )

  localStorage.setItem("token",res.data.token)

  navigate("/")
 }

 return(

  <div className="flex justify-center items-center min-h-screen bg-gray-950">

   <div className="bg-gray-900 p-8 rounded-xl w-96">

    <h2 className="text-white text-2xl mb-6">Login</h2>

    <input
     className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
     placeholder="Email"
     onChange={(e)=>setEmail(e.target.value)}
    />

    <input
     type="password"
     className="w-full mb-6 p-3 rounded bg-gray-800 text-white"
     placeholder="Password"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button
     onClick={login}
     className="w-full bg-green-500 py-3 rounded text-white font-bold"
    >
     Login
    </button>

   </div>

  </div>
 )
}