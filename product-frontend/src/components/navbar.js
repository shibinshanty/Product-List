import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white mb-4 md:mb-0">
          🛍️ Products
        </h1>

        <div className="flex gap-4">
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">
              Home
            </button>
          </Link>
          <Link href="/products/add">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition">
              Add Product
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}




