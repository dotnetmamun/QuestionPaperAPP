import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Question Paper Manager
        </div>
        <div className="flex gap-6">
          <Link to="/" className="text-white hover:text-gray-300 text-lg">
            Home
          </Link>
          <Link to="/create" className="text-white hover:text-gray-300 text-lg">
            Create
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
