import { Link } from "react-router-dom";
import {
  useGetAdminProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const ProductListScreen = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetAdminProductQuery();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
   const[deleProduct,{isLoading: loadingDelete}] = useDeleteProductMutation()


   const deleteHandler = async (id) => {
    if(window.confirm('Do you really want to delete the product'))
      try {
        deleProduct(id).unwrap()
        toast.success('Product deleted')
      } catch (err) {
        toast.error(err?.data?.mesaage || err.error)
      }
   }



  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create new product"))
      try {
        await createProduct().unwrap();
        refetch();
        toast.success("Sample product created ! you can edit it.");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
  };
  
  
  return (
    <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-4 sm:mb-8 ">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight text-center sm:text-left">
          Products Inventory
        </h1>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl 
         text-sm sm:text-base font-bold hover:bg-blue-700 transition-all shadoe-md hover:shadow-lg shadow-blue-200 justify-center"
        >
          <FaPlus />
          Create Product
        </button>
      </div>
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}{" "}
        </Message>
      ) : (
        <div
          className="overflow-x-auto w-full bg-white rounded-2xl sm:rounded-3xl 
    shadow-xl border border-slate-100 "
        >
          <table className="w-full text-left border-collapse min-w-200 ">
            <thead className="bg-slate-900 text-white uppercase text-sm">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Brand</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b last:border-b-0 hover:bg-slate-50 transition"
                >
                  <td className="p-4 text-xs text-slate-500">{product._id}</td>
                  <td className="p-3 sm:p-4 font-semibold text-slate-800 max-w-75 turncate whitespace-nowrap ">
                    {product.name}
                  </td>
                  <td className="p-3 sm:p-4 font-bold text-blue-600 whitespace-nowrap">
                    {product.price}{" "}
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">{product.category} </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">{product.brand} </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex justify-center items-center gap-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="p-2 bg-blue-50 text-blue-600 hover:text-white hover:bg-blue-600 transition-all shadow-sm rounded-lg"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <FaTrash />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
