// import axios from "axios";
// import { PRODUCTS_URL } from "../constants";
// import { Link, useLoaderData } from "react-router-dom";
// import Product from "../components/ProductItem";
// import HeroBanner from "../components/HeroBanner";
// const HomeScreen = () => {
//   const { products, page, pages, keyword } = useLoaderData();
//   return (
//     <>
//       <HeroBanner />

//       <div className="py-1">
//         <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-4 mb-4 md:mt-8">
//           Latest Products
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
//           {products.map((product) => (
//             <Product key={product._id} product={product} />
//           ))}
//         </div>

//         {pages > 1 && (
//           <div className="flex justify-center items-center gap-2 mt-12 mb-10">
//             {" "}
//             {[...Array(pages).keys()].map((x) => (
//               <Link
//                 to={
//                   keyword
//                     ? `/search/${keyword}/page/${x + 1} `
//                     : `/page/${x + 1}`
//                 }
//                 className={`px-4 py-2 rounded shadow-sm font-bold border transition-all ${
//                   x + 1 === Number(page)
//                     ? "bg-slate-800 text-white border-slate-800"
//                     : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
//                 }`}
//               >
//                 {x + 1}{" "}
//               </Link>
//             ))}{" "}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomeScreen;

// export const productsLoader = async ({ params }) => {
//   const keyword = params.keyword || "";

//   const pageNumber = params.pageNumber || 1;

//   const { data } = await axios.get(
//     `${PRODUCTS_URL}?keyword=${keyword ? keyword : ""}&pageNumber=${pageNumber}`,
//   );
//   return data;
// };


import { Link, useParams } from "react-router-dom";
import Product from "../components/ProductItem";
import HeroBanner from "../components/HeroBanner";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";

const HomeScreen = () => {
   const { keyword, pageNumber } = useParams();

   const { data, isLoading, error } = useGetProductsQuery({
    keyword: keyword || "",
    pageNumber: pageNumber || 1,
  });

   if (isLoading) {
    return (
      <>
        <HeroBanner />
        <Loader />
      </>
    );
  }

   if (error) {
    return (
      <>
        <HeroBanner />
        <div className="text-center py-12 px-4">
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl max-w-md mx-auto border border-rose-100 shadow-sm">
            <p className="font-semibold">Error loading products.</p>
            <p className="text-xs mt-1">{error?.data?.message || error.error || "Please try again later."}</p>
          </div>
        </div>
      </>
    );
  }

   const products = data?.products || [];
  const page = data?.page || 1;
  const pages = data?.pages || 1;

  return (
    <>
      <HeroBanner />

      <div className="py-1">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-4 mb-4 md:mt-8">
          {keyword ? "Search Results" : "Latest Products"}
        </h2>
        
        {products.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-xl text-center text-gray-500 my-6">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}

         {pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 mb-10">
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                }
                className={`px-4 py-2 rounded shadow-sm font-bold border transition-all ${
                  x + 1 === Number(page)
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;