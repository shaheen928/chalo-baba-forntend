import axios from "axios";
import { PRODUCTS_URL } from "../constants";
import { Link, useLoaderData } from "react-router-dom";
import Product from "../components/ProductItem";
import HeroBanner from "../components/HeroBanner";
const HomeScreen = () => {
  const { products, page, pages, keyword } = useLoaderData();
  return (
    <>
      <HeroBanner />

      <div className="py-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-4 mb-4 md:mt-8">
          Latest Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 mb-10">
            {" "}
            {[...Array(pages).keys()].map((x) => (
              <Link
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1} `
                    : `/page/${x + 1}`
                }
                className={`px-4 py-2 rounded shadow-sm font-bold border transition-all ${
                  x + 1 === Number(page)
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {x + 1}{" "}
              </Link>
            ))}{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;

export const productsLoader = async ({ params }) => {
  const keyword = params.keyword || "";

  const pageNumber = params.pageNumber || 1;

  const { data } = await axios.get(
    `${PRODUCTS_URL}?keyword=${keyword ? keyword : ""}&pageNumber=${pageNumber}`,
  );
  return data;
};
