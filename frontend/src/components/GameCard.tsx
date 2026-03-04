import { useNavigate } from "react-router-dom"

type Props = {
 id:string
 title:string
 image:string
}

export default function GameCard({id,title,image}:Props){

 const navigate = useNavigate()

 return(

  <div
   onClick={()=>navigate(`/game/${id}`)}
   className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
  >

   <img
    src={image}
    className="w-full aspect-[3/3] object-cover"
   />

   <div className="p-4 flex justify-between items-center">

    <h3 className="text-white text-sm font-semibold">
     {title}
    </h3>

    <span className="text-yellow-400">⭐</span>

   </div>

  </div>

 )
}