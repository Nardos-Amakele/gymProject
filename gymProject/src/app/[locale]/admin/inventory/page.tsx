"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const HomePage = () =>{
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Gym T-Shirt",
      description: "A comfortable and stylish gym t-shirt.",
      imageUrl: "https://media.istockphoto.com/id/587819694/photo/wetsuit-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=kPCOWZw-nJHoV1NmFrHstg3BwA34rkJr4_mM50nf0NE=",
    },
    {
      id: 2,
      name: "Running Shorts",
      description: "Breathable running shorts.",
      imageUrl: "https://media.istockphoto.com/id/1308845005/photo/blue-sport-shorts.jpg?s=1024x1024&w=is&k=20&c=9w8CcyUi4e_ek-hE772LJ9Pfm6lU_Ep4LZFt24t-Fts=",
    },
    {
      id: 3,
      name: "Dumbbells Set",
      description: "A complete set of dumbbells for strength training.",
      imageUrl: "https://media.istockphoto.com/id/1325558282/vector/barbell-dumbbells-and-kettlebell-vector.jpg?s=1024x1024&w=is&k=20&c=2qpajxGe6UYOoudZubvd9rl6DLynl-vRnIWXfA9OeVo=",
    },
  ]);

  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("File uploaded:", e.target.files[0]);
    }
  };

  // Delete a product
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Open the edit modal with product details
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  // Handle product update
  const handleProductUpdate = () => {
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? editProduct : p));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-4 lg:space-y-0 lg:space-x-10">
      {/* Product Form Section */}
      <div className="w-full lg:w-1/3 p-2 rounded-lg">
        <h2 className="text-sm font-extralight mb-4">Product name</h2>
        <input
          type="text"
          placeholder="Product name..."
          className="w-full mb-6 bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />

        <h2 className="text-sm font-extralight mb-4">Description</h2>
        <textarea
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          className="w-full mb-6 bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue resize-none h-24"
        ></textarea>

        <h2 className="text-sm font-extralight mb-4">Category</h2>
        <select className="w-full mb-6 bg-[#121212] text-sm font-extralight text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue">
          <option>Equipment</option>
          <option>Clothing</option>
          <option>Accessories</option>
        </select>

        <h2 className="text-sm font-extralight mb-4">Upload Media</h2>
        <div className="w-full h-36 bg-[#121212] rounded-lg flex items-center justify-center border-dashed border-2 border-zinc-500 relative">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <FontAwesomeIcon icon={faUpload} className="text-gray-500 text-2xl" />
          <span className="hidden text-gray-500 text-sm mt-2">{file ? file.name : "Upload Media"}</span>
        </div>
      </div>

      {/* Product List Section */}
      <div className="w-full lg:w-2/3  ">
        <h2 className="text-sm font-extralight mb-4">Product List</h2>
        <div className='bg-[#121212] p-7 rounded-xl'>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1d1d1d] p-4 rounded-lg relative flex flex-col items-center text-center "
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(product.id)}
                className="absolute top-2 right-2 text-red-500"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <img src={product.imageUrl} alt={product.name} className="w-24 h-24 mb-4" />
              <h3 className="font-extralight">{product.name}</h3>
              <p className="text-xs text-gray-400">{product.description}</p>
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(product)}
                className="absolute bottom-2 right-2 text-customBlue"
              >
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
}

const page = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen bg-[#121212]">
        <AdminSidebar locale={""} />
      </div>


      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto bg-black">
          <HomePage />
        </div>
      </div>
    </div>
  )
}

export default page
