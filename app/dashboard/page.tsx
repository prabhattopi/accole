'use client';

import { useState, useEffect, useContext } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../hooks/api';
import PrelineScript from '../components/PrelineScript';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
interface Product {
  _id: string;
  name: string;
  img: string;
  quantity: number;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', img: '', quantity: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {logout}=useAuth()

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await addProduct(newProduct.name, newProduct.img, newProduct.quantity);
      setProducts([...products, data]);
      setNewProduct({ name: '', img: '', quantity: 0 });
    } catch (err) {
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    setLoading(true);
    try {
      await updateProduct(updatedProduct._id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PrelineScript />

      <div className="container mx-auto p-6">
      <button onClick={logout} className='btn btn-primary'>Logout</button>
        <h1 className="text-3xl font-bold mb-6">Inventory Dashboard</h1>
       

        {/* Sticky Add New Product Section */}
        <div className="sticky top-0 bg-white p-4 shadow-md z-10">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="mt-4 flex space-x-2">
            <input
              type="text"
              placeholder="Product Name"
              className="border px-4 py-2 mr-2"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border px-4 py-2 mr-2"
              value={newProduct.img}
              onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border px-4 py-2 mr-2"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Display Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 w-96 h-72 shadow-lg rounded-lg">
              <Image
                src={product.img}
                alt={product.name}
               width={150}
               height={60}
      
                className="rounded-md"
              />
              <h2 className="text-xl font-bold mt-2">{product.name}</h2>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateProduct(editingProduct);
                }}
              >
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border px-4 py-2 w-full"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="border px-4 py-2 w-full mt-2"
                  value={editingProduct.img}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, img: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="border px-4 py-2 w-full mt-2"
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, quantity: Number(e.target.value) })
                  }
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

