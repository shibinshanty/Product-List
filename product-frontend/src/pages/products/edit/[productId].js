import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function EditProduct() {
  const router = useRouter()
  const { productId } = router.query
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: 'Select Category',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    axios.get(`${API_URL}/products/${productId}/`)
      .then(res => {
        setFormData(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load product')
        setLoading(false)
      })
  }, [productId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/products/${productId}/`, {
        ...formData,
        price: parseFloat(formData.price),
      })
      router.push('/')
    } catch (err) {
      setError('Failed to update product')
    }
  }

  if (loading) return <p className="text-center mt-10 text-blue-400">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-900 text-gray-200 rounded-lg shadow-md border border-gray-800">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm text-gray-400">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Product Name"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-400">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Description"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-400">Price (₹)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Price"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-400">Brand</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Brand"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-400">Category</label>
          <select
      name="category"
      value={formData.category}
     onChange={handleChange}
     required
    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
>
  <option value="">
    -- Select Category --
  </option>
  <option value="Electronics">Electronics</option>
  <option value="Furniture">Furniture</option>
  <option value="Apparel">Apparel</option>
</select>

        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
