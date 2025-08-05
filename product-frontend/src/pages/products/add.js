import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ArrowLeftCircle } from 'lucide-react'

export default function AddProduct() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    }

    try {
   
      await axios.post(`${API_URL}/products/`, payload)

      
      const res = await axios.get(`${API_URL}/products/`)
      const totalCount = res.data.count
      const lastPage = Math.ceil(totalCount / 7)

      router.push(`/?page=${lastPage}`)
    } catch (error) {
      console.error('Failed to add product:', error)
      if (error.response) {
        alert('Error: ' + JSON.stringify(error.response.data))
      } else {
        alert('Error: ' + error.message)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="bg-gray-900 text-white shadow-xl border border-gray-700 rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-white">➕ Add New Product</h1>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-blue-400 hover:underline"
          >
            <ArrowLeftCircle size={20} /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>-- Select Category --</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Apparel">Apparel</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}



