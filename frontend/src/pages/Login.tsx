import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Login(){

 const navigate = useNavigate()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState("")
 const [loading,setLoading] = useState(false) 

const login = async (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault()

  setError("")
  setLoading(true)

  try{

   const res = await axios.post(

    `${import.meta.env.VITE_API_URL}/api/auth/login`,

    {email,password}

   )

   localStorage.setItem("token",res.data.token)

   navigate("/")

  }catch(err:any){

   setError(err.response?.data?.error || "Login failed")

  }

  setLoading(false)
 }

 return(

  <div className="bg-gray-950 min-h-screen">

   <Navbar/>

   <div className="flex justify-center items-center px-4 py-16">

    <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8">

     <h1 className="text-white text-2xl font-bold mb-6 text-center">
      Iniciar sesión
     </h1>

     {error && (

      <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">
       {error}
      </div>

     )}

     <form onSubmit={login} className="space-y-4">

      {/* Email */}
      <input
       type="email"
       required
       placeholder="Correo"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Password */}
      <input
       type="password"
       required
       minLength={6}
       placeholder="Contraseña"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Button */}
      <button
       type="submit"
       disabled={loading}
       className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
      >
       {loading ? "Logging in..." : "Login"}
      </button>

     </form>

     {/* Signup link */}
     <p className="text-gray-400 text-sm text-center mt-6">
      Ya tienes una cuenta?{" "}
      <span
       onClick={()=>navigate("/signup")}
       className="text-purple-400 cursor-pointer hover:underline"
      >
       Sign up
      </span>
     </p>

    </div>

   </div>

  </div>

 )
}