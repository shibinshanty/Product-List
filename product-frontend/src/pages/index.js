import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ProductsTable() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const currentPage = parseInt(router.query.page) || 1
  const [page, setPage] = useState(currentPage)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/products/?page=${page}`)
      .then((res) => {
        console.log('API Response:', res.data)
        setProducts(res.data.results)
        setTotalPages(Math.ceil(res.data.count / 7))
        setLoading(false)
      })
      .catch((err) => {
        setError('Error fetching products')
        setLoading(false)
        console.error('Fetch error:', err.response || err.message || err)
      })
  }, [page])

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`)
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-blue-400 font-semibold">Loading...</p>
    )
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-900 text-white pt-20 px-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-400 drop-shadow">
            Product List
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="w-full text-sm text-left text-gray-300 border-collapse">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 border border-gray-700">ID</th>
                <th className="px-6 py-4 border border-gray-700">Name</th>
                <th className="px-6 py-4 border border-gray-700">Price</th>
                <th className="px-6 py-4 border border-gray-700">Brand</th>
                <th className="px-6 py-4 border border-gray-700">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-800 transition border-t border-gray-700"
                >
                  <td className="px-6 py-4 text-center">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-blue-400">
                    <Link href={`/products/${p.id}`} className="hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹ {p.price}</td>
                  <td className="px-6 py-4">{p.brand}</td>
                  <td className="px-6 py-4">{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-sm font-medium text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
