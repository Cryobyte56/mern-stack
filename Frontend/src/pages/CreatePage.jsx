import React, { useState, useEffect } from "react";
import "./../index.css";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const [alert, setAlert] = useState({
    show: false,
    type: "", 
    message: "",
  });

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      setAlert({ show: true, type: "success", message });
    } else {
      setAlert({ show: true, type: "danger", message });
    }

    // Reset State of the Fields
    setNewProduct({ name: "", price: "", image: "" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 5000); 

    return () => clearTimeout(timer); // Clear timer if the component is unmounted
  }, []);

  return (
    // Body of the Page
    <div className="flex justify-center">
      {/* Fields Container */}
      <div className="w-full max-w-sm mt-12 p-6">
        <div className="w-full p-6">
          {/* Header */}
          <h1 className="mb-8 text-center font-bold text-xl text-gray-900">
            Create New Product
          </h1>

          {/* Bootstrap Alert */}
          {alert.show && (
            <div
              className={`rounded-lg p-2 text-center text-gray-800alert mb-4 ${
                alert.type === "success" ? "bg-green-200" : "bg-red-200"
              }`}
              role="alert"
            >
              {alert.message}
            </div>
          )}

          <div className="space-y-4 flex flex-col">
            {/* Product Name */}
            <input
              className="rounded-full bg-white p-3 border shadow-inner"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* Product Price */}
            <input
              className="rounded-full bg-white p-3 border shadow-inner"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* Product Image Link */}
            <input
              className="rounded-full bg-white p-3 border shadow-inner"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            {/* Submit Button */}
            <button
              className="w-full bg-[#245e2c] hover:bg-[#215526] rounded-full p-2 text-white"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
