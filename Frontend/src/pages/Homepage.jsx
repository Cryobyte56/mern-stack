import React, { useEffect, useState } from "react";
import "./../index.css";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // State to track validation errors
  const [formErrors, setFormErrors] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const openModal = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct({ ...product });
    setIsModalOpen(true);
    setFormErrors({ name: "", price: "", image: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // Validation logic
  const validateForm = () => {
    const errors = {
      name: "",
      price: "",
      image: "",
    };

    if (!updatedProduct?.name) errors.name = "Product Name is required.";
    if (!updatedProduct?.price) errors.price = "Price is required.";
    if (!updatedProduct?.image) errors.image = "Image URL is required.";

    setFormErrors(errors);

    // Return true if no errors, false if there are errors
    return !Object.values(errors).some((error) => error);
  };

  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState({});

  const handleUpdateProduct = async () => {
    // Validate the form before proceeding with the update
    if (!validateForm()) return;

    if (currentProduct) {
      // Proceed with product update
      await updateProduct(currentProduct._id, updatedProduct);
      setAlert({ show: true, type: "success", message: "Product Updated!" });
      closeModal();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="flex items-center no-underline text-[#27622c] text-7xl sm:text-xl font-bold text-center">
          PRODUCTS
        </h1>

        {alert.show && (
          <div
            className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 rounded-lg p-4 text-center text-gray-800 ${
              alert.type === "success" ? "bg-green-200" : "bg-red-200"
            } shadow-lg transition-all duration-300 ease-in-out mb-5`}
            role="alert"
          >
            {alert.message}
          </div>
        )}

        <div className="w-screen mt-10 px-10 grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setAlert={setAlert}
              openModal={openModal} // Pass modal opener to the card
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex mt-4 flex-col items-center">
            <h1 className="no-underline text-gray-700 text-xl sm:text-xl font-medium text-center">
              No Products Found
            </h1>
            <TbMoodEmptyFilled className="mt-2 text-2xl" />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  className={`w-full px-3 py-2 border rounded-lg ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                  name="name"
                  value={updatedProduct?.name || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    formErrors.price ? "border-red-500" : ""
                  }`}
                  name="price"
                  value={updatedProduct?.price || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                {formErrors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.price}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  className={`w-full px-3 py-2 border rounded-lg ${
                    formErrors.image ? "border-red-500" : ""
                  }`}
                  name="image"
                  value={updatedProduct?.image || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
                {formErrors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.image}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateProduct} // Use the updated handleUpdateProduct function
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
