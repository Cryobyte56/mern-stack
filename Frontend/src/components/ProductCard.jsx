import React from "react";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";

const ProductCard = ({ product, setAlert, openModal }) => {
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      setAlert({ show: true, type: "success", message });
    } else {
      setAlert({ show: true, type: "error", message });
    }
  };

  return (
    <div className="shadow-lg bg-white rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h1 className="text-xl mb-2 w-full truncate text-ellipsis">
          {product.name}
        </h1>
        <p className="text-xl mb-4 font-bold">{product.price}</p>
        <div className="flex p-2 py-4 space-x-2">
          <button
            onClick={() => openModal(product)} // Trigger modal with product data
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative flex items-center">
              <FaEdit className="mr-2" />
              Edit
            </span>
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative flex items-center">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
