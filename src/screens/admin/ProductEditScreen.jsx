import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { data: product, isLoading, error } = useProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
     try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!productId) {
      toast.error("Product ID is missing!");
      return;
    }
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      console.log(productId);
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-10">
      <Link
        to="/admin/productlist"
        className="bg-slate-200 hover:bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-slate-700 hover:text-white
      transition-all mb-4 sm:mb-6 inline-block font-bold text-sm sm:text-base"
      >
        Go Back
      </Link>
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-slate-800">Edit Product</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message} </Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base
              outline-none transition "
              />
            </div>
            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base
              outline-none transition "
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                  Stock Count
                </label>
                <input
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base
              outline-none transition "
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 text-sm sm:text-basefocus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 text-sm sm:text-basefocus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                Image
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 mb-2 text-sm sm:text-base"
              />
              <input
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
               file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
               file:text-blue-700 hover:file:bg-blue-100  sm:text-base  "
              />
              {loadingUpload && <Loader />}
            </div>
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-600 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base
              outline-none transition "
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-2xl
              font-bold text-base sm:text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default ProductEditScreen;
