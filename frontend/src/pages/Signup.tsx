import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Signup(){

 const navigate = useNavigate()

 const [form,setForm] = useState({
  email:"",
  username:"",
  password:"",
  firstName:"",
  lastName:"",
  phone:""
 })

 const [loading,setLoading] = useState(false)
 const [error,setError] = useState("")

 const handleChange = (e:any)=>{
  setForm({
   ...form,
   [e.target.name]:e.target.value
  })
 }

 const signup = async(e:any)=>{

  e.preventDefault()

  setLoading(true)
  setError("")

  try{

   await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    form
   )

   navigate("/login")

  }catch(err:any){

   setError(err.response?.data?.message || "Signup failed")

  }

  setLoading(false)
 }

 return(

  <div className="bg-gray-950 min-h-screen">

   <Navbar/>

   <div className="flex justify-center items-center px-4 py-12">

    <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8">

     <h1 className="text-white text-2xl font-bold mb-6 text-center">
      Crear tu cuenta
     </h1>

     {error && (
      <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">
       {error}
      </div>
     )}

     <form onSubmit={signup} className="space-y-4">

      <input
       type="text"
       name="firstName"
       placeholder="Nombres"
       required
       pattern="[A-Za-zÀ-ÿ\s]{2,}"
       title="Only letters allowed"
       onChange={handleChange}
       className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Apellidos */}
      <input
       type="text"
       name="lastName"
       placeholder="Apellidos"
       required
       pattern="[A-Za-zÀ-ÿ\s]{2,}"
       title="Only letters allowed"
       onChange={handleChange}
       className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Email */}
      <input
       type="email"
       name="email"
       placeholder="Correo"
       required
       onChange={handleChange}
       className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Username */}
      <input
       type="text"
       name="username"
       placeholder="Nombre de usuario"
       required
       onChange={handleChange}
       className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        required
        minLength={8}
        pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
        placeholder="Contraseña"
        title="Password must contain at least 8 characters, one uppercase letter and one number"
        className="w-full bg-gray-800 text-white rounded-lg px-4 py-3"
       />
       <p className="text-gray-400 text-sm">
        Contraseña debe contener:
        • al menos 8 caracteres
        • Una letra mayúscula
        • Un número
       </p> 

      {/* Teléfono */}
      <input
        type="tel"
        name="phone"
        required
        pattern="[0-9]{9,15}"
        title="Teléfono debe contener solo números (9-15 digits)"
        placeholder="Teléfono"
        className="w-full bg-gray-800 text-white rounded-lg px-4 py-3"
       />   

      <button
       type="submit"
       disabled={loading}
       className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
      >
       {loading ? "Creando cuenta..." : "Registrar"}
      </button>

     </form>

     <p className="text-gray-400 text-sm text-center mt-6">
      Ya tienes una cuenta?{" "}
      <span
       onClick={()=>navigate("/login")}
       className="text-purple-400 cursor-pointer hover:underline"
      >
       Login
      </span>
     </p>

    </div>

   </div>

  </div>
 )
}