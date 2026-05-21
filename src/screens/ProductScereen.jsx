import axios from "axios";
import { PRODUCTS_URL } from "../constants";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import StartInput from "../components/StarInput";
import { useCreateReviewMutation } from "../slices/productApiSlice";

const ProductScereen = () => {
  const product = useLoaderData();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const addToCardHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      createReview({
        productId: product._id,
        rating,
        comment,
      }).unwrap();

      alert("review added");
      setRating(0);
      setComment("");
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link
        className="btn bg-gray-200 px-4 py-2 rounded mb-2 sm:mb-4 inline-block hover:bg-gray-400"
        to="/"
      >
        Go Back
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-1">
        <div
          className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50/50
        w-full  flex items-center justify-center"
        >
          <img
            src={product && product.image && typeof product.image === 'String' && product.image.startWith('http') ? product.image : `https://chalo-baba-backend.vercel.app${product.image}`}
            alt={product.name}
            className="w-full h-full max-h-full max-w-full object-cover "
          />
        </div>
        <div className="flex flex-col gap-2.5 md:gap-4">
          <h1 className="text-xl md:text-3xl font-bold text-slate-800 leading-tight ">
            {product.name}{" "}
          </h1>
          <hr />
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <hr />
          <p className="text-xl md:text-2xl font-semibold text-slate-900">
            Price: Rs{product.price}{" "}
          </p>
          <p className="text-gray-600 leading-relaxed">
            <span className="font-bold">Description:</span>
            {product.description}{" "}
          </p>
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm mt-1 sm:mt-4">
            <div className="flex justify-between sm:mb-2">
              <span>Price:</span>
              <strong>{product.price} </strong>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-4">
              <span>Status:</span>
              <span
                className={
                  product.countInStock > 0
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}{" "}
              </span>
            </div>
            {product.countInStock > 0 && (
              <div
                className="flex justify-between items-center py-3
               border-t border-gray-100 my-4"
              >
                {" "}
                <span className="text-gray-700 font-semibold">Qty:</span>
                <div className="relative">
                  <select
                    className=" block appearance-none w-24 bg-white border border-gray-300 hover:border-blue-500 px-4 py-2.5 pr-8 rounded-lg shadow-inner focus:outline-none
                     focus:ring-2 focus:ring-blue-100 focus:border-blue-600 text-gray-800 transition-colors
                     "
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 ">
                    <i className="bi bi-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={addToCardHandler}
            className="w-full bg-slate-800 text-white py-3 rounded-md hover:bg-slate-700 disabled:bg-gray-400"
            disabled={product.countInStock === 0}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="mt-5 md:mt-8 border-t border-gray-100 pt-5">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Customer Review
        </h2>
        {product.reviews.length === 0 && (
          <div className="bg-blue-50 p-4 rounded-lg text-blue-700 ">
            {" "}
            No Reviews Yet{" "}
          </div>
        )}
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div
              key={review._id}
              className="border-b pb-4 bg-gray-50 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center mb-2 ">
                <strong>{review.name} </strong>
                <Rating value={review.rating} />
              </div>
              <p className="text-gray-500 text-sm mb-2">
                {review.createdAt.substring(0, 10)}{" "}
              </p>
              <p className="text-gray-700">{review.comment} </p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label className="d-block mb-2"> Your Rating</label>
          <StartInput rating={rating} setRating={setRating} />
        </div>
        <div className="my-4 px-1 sm:px-0">
          <label className="block text-slate-400 text-sm mb-1.5 font-medium">
            Comment
          </label>

          <textarea
            className="w-full bg-white text-slate-800 border border-gray-300 rounded-xl p-3 
               outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-100 transition-all text-sm placeholder-gray-400 "
            rows="3"
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm">
          Submit Review
        </button>
      </form>
    </>
  );
};
export default ProductScereen;

export const productLoader = async ({ params }) => {
  const { data } = await axios.get(`${PRODUCTS_URL}/${params.id}`);
  return data;
};
