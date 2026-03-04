import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function GameDetail(){

 const {id} = useParams()
 const [game,setGame]=useState<any>(null)

 useEffect(()=>{

  axios
   .get(`http://localhost:3000/api/games/${id}`)
   .then(res=>setGame(res.data))

 },[id])

 if(!game) return <div className="text-white p-10">Loading...</div>

 return(

  <div className="bg-gray-950 min-h-screen">

   <Navbar/>

   <div className="max-w-6xl mx-auto p-8 flex gap-10">

    <img
     src={game.image_url}
     className="w-80 rounded-lg"
    />

    <div>

     <h1 className="text-white text-3xl font-bold mb-4">
      {game.title}
     </h1>

     <p className="text-gray-400 mb-4">
      Genre: {game.genre}
     </p>

     <p className="text-yellow-400 mb-4">
      ⭐ {game.rating}
     </p>

     <p className="text-gray-300">
      {game.description || "No description available."}
     </p>

    </div>

   </div>

  </div>
 )
}