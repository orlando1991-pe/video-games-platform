import { Link } from "react-router-dom"

export default function Navbar() {

  return (
    <nav className="bg-gray-900 text-white w-full px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        🎮 GameHub
      </h1>

      <div className="flex gap-6">

        <Link to="/" className="hover:text-green-400">
          Inicio
        </Link>

        <Link to="/login" className="hover:text-green-400">
          Login
        </Link>

      </div>

    </nav>
  )
}