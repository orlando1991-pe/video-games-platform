import Navbar from "../components/Navbar"
import GameCard from "../components/GameCard"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home(){

 const [games,setGames]=useState([])
 const [page,setPage]=useState(1)
 const [totalPages,setTotalPages]=useState(1)

 useEffect(()=>{

  axios
   .get(`http://localhost:3000/api/games?page=${page}&limit=12`)
   .then(res=>{
    setGames(res.data.data)
    setTotalPages(res.data.totalPages)
   })

 },[page])

 return(

  <div className="bg-gray-950 min-h-screen w-full">

   <Navbar/>

   <div className="w-full px-6 py-6">

    <h2 className="text-white text-2xl font-bold mb-6">
      Game Catalog
    </h2>

    <div className="
      grid gap-6
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-6
      xl:grid-cols-8
    ">

     {games.map((game:any)=>(
       <GameCard
         key={game.id}
         id={game.id}
         title={game.title}
         image={game.image_url}
       />
     ))}

    </div>

    {/* Pagination */}
    <div className="flex justify-center mt-10 gap-4">

     <button
      disabled={page===1}
      onClick={()=>setPage(page-1)}
      className="px-4 py-2 bg-gray-800 text-white rounded"
     >
      Prev
     </button>

     <span className="text-white">
      Page {page} of {totalPages}
     </span>

     <button
      disabled={page===totalPages}
      onClick={()=>setPage(page+1)}
      className="px-4 py-2 bg-gray-800 text-white rounded"
     >
      Next
     </button>

    </div>

   </div>

  </div>
 )
}