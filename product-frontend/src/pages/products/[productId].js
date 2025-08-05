import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, Pencil, ArrowLeft } from 'lucide-react'

export default function ProductDetail() {
  const router = useRouter()
  const { productId } = router.query
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!productId) return

    setLoading(true)
    setError(null)

    axios.get(`${API_URL}/products/${productId}/`)
      .then(response => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch product')
        setLoading(false)
      })
  }, [productId, API_URL])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return

    setDeleting(true)
    try {
      await axios.delete(`${API_URL}/products/${productId}/`)
      router.push('/')
    } catch (err) {
      alert('Failed to delete product.')
      setDeleting(false)
    }
  }

  if (loading) return <p className="text-center mt-10 text-blue-400">Loading product details...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!product) return null

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-gray-200 rounded-xl shadow-lg border border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow">{product.name}</h1>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Products
        </button>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <p><span className="font-semibold text-gray-400">💰 Price:</span> ₹ {product.price}</p>
        <p><span className="font-semibold text-gray-400">🏷️ Brand:</span> {product.brand}</p>
        <p><span className="font-semibold text-gray-400">📦 Category:</span> {product.category}</p>
        <div>
          <p className="font-semibold text-gray-400 mb-1">📝 Description:</p>
          <p className="bg-gray-800 px-4 py-2 rounded-md text-sm text-gray-300">
            {product.description || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push(`/products/edit/${productId}`)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Pencil size={16} /> Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`flex items-center gap-2 px-5 py-2 rounded text-white transition ${
            deleting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          <Trash2 size={16} /> {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}





