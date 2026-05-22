import { Link } from "react-router-dom";
import Rating from "./Rating";
import StartInput from "./StarInput";

const ProductItem = ({ product }) => {
  return (
    <div
      className=" flex flex-col h-auto bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl
  transition-all duration-300 border border-gray-100 group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden h-30 sm:h-56">
          <img
            src={product?.image}
             alt={product.name}
            className="h-full w-full object-cover group-hover:scale-110 transition -transform duration-500"
          />
        </div>
      </Link>
      <div className="p-3 pb-1.5 grow flex flex-col justify-between gap-0.5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-bold line-clamp-2 min-h-9 text-slate-800 hover:text-blue-600  mb-0.5">
            {product.name}
          </h3>
        </Link>

        <div className="my-0.5 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis ">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviws`}
          />
        </div>
        <div className="flex justify-between items-center mt-0.5 sm:mt-2 pt-1 w-full">
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            Rs {product.price}{" "}
          </span>
          <button className="bg-slate-800 text-white p-1.5 sm:p-2 rounded-lg hover:bg-slate-700 transition-clors">
            <i className="bi  bi-cart-plus text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
