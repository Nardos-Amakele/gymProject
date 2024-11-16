"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number; // Add price field to the product interface
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // New states for add product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Equipment',
    price: '', // Add price field
  });

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory/');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data); // Update the state with the fetched products
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Delete a product
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Open the edit modal with product details
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  // Handle product update
  const handleProductUpdate = async () => {
    if (editProduct) {
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('description', editProduct.description);
      formData.append('category', 'Equipment'); // Example, adjust as needed
      formData.append('price', editProduct.price.toString());  // Include price
      if (file) formData.append('image', file);

      try {
        const response = await fetch(`http://localhost:5000/api/inventory/${editProduct.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          const updatedProduct = await response.json();
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === updatedProduct.data.id ? updatedProduct.data : product
            )
          );
          setIsModalOpen(false);
        } else {
          console.error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };


  // Handle add product
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price);
    if (file) formData.append('image', file);

    // Log the formData for debugging
    console.log("FormData being sent:", newProduct);

    try {
      const response = await fetch('http://localhost:5000/api/inventory/', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, responseData.data]);
        setNewProduct({ name: '', description: '', category: 'Equipment', price: '' }); // Reset form state
        setFile(null);
      } else {
        console.error('Failed to add product:', responseData.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };




  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-4 lg:space-y-0 lg:space-x-10">
      {/* Product Form Section */}
      <div className="w-full lg:w-1/3 p-2 rounded-lg">
        <h2 className="text-sm font-extralight mb-4">Product name</h2>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product name..."
          className="w-full mb-6 bg-[#121212] text-gray-300 text-sm font-extralight rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />

        <h2 className="text-sm font-extralight mb-4">Description</h2>
        <textarea
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          className="w-full mb-6 bg-[#121212] text-gray-300 text-sm font-extralight rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue resize-none h-24"
        ></textarea>

        <h2 className="text-sm font-extralight mb-4">Category</h2>
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="w-full mb-6 bg-[#121212] text-sm font-extralight text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        >
          <option>Equipment</option>
          <option>Clothing</option>
          <option>Accessories</option>
        </select>
        <h2 className="text-sm font-extralight mb-4">Price</h2>
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Product price..."
          className="w-full mb-6 bg-[#121212] text-gray-300 text-sm font-extralight rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />

        <h2 className="text-sm font-extralight mb-4">Upload Media</h2>
        <div className="w-full h-36 bg-[#121212] rounded-lg flex items-center justify-center border-dashed border-2 border-zinc-500 relative">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute  inset-0 opacity-0 cursor-pointer"
          />
          <FontAwesomeIcon icon={faUpload} className="text-gray-500 text-2xl" />
          <span className="hidden text-gray-500 text-sm mt-2">{file ? file.name : "Upload Media"}</span>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddProduct}
          className="mt-6 bg-customBlue text-white px-4 py-2 rounded-lg w-full"
        >
          Add Product
        </button>
      </div>
      {/* Product List Section */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-sm font-extralight mb-4">Product List</h2>
        <div className="bg-[#121212] p-7 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-[#1d1d1d] p-4 rounded-lg relative flex flex-col items-center text-center">
                {/* Delete Button */}
                <button onClick={() => handleDelete(product.id)} className="absolute top-2 right-2 text-red-500">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 mb-4" />
                <h3 className="font-extralight">{product.name}</h3>
                <p className="text-xs text-gray-400">{product.description}</p>
                {/* Edit Button */}
                <button onClick={() => handleEdit(product)} className="absolute bottom-2 right-2 text-customBlue">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#121212] p-6 rounded-lg w-96 text-white">
            <h2 className="text-sm font-extralight mb-4">Edit Product</h2>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              className="w-full mb-4 bg-[#1d1d1d] rounded-lg p-3 focus:ring-customBlue text-sm font-extralight text-gray-300"
            />
            <textarea
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              className="w-full mb-4 bg-[#1d1d1d] rounded-lg p-3 h-24 focus:ring-customBlue text-sm font-extralight text-gray-300"
            ></textarea>
            <div className="mb-4">
              <h3 className="text-sm font-extralight mb-2">Update Image</h3>
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full bg-[#1d1d1d] text-sm font-extralight text-gray-300 rounded-lg p-2"
              />
              {editProduct.imageUrl && <img src={editProduct.imageUrl} alt="Preview" className="w-24 h-24 mt-2" />}
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={handleProductUpdate} className="bg-customBlue text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
