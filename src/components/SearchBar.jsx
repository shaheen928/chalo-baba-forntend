import { PRODUCTS_URL } from "../constants";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [isSeletcted, setIsSeletcsd] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
   return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword.trim().length > 1 && isSeletcted) {
        try {
          const { data } = await axios.get(
            `${PRODUCTS_URL}?keyword=${keyword}&suggest=true`,
          );

          setSuggestions(data.slice(0, 5));
        } catch (error) {
          console.error("Error fetching suggestions", error);
        }
      } else {
        setSuggestions([]);
        setIsSeletcsd(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [keyword, isSeletcted]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setSuggestions([]);
      setIsSeletcsd(false);
    }
  };

  return (
    <div className="relative w-full mx-auto" ref={searchBarRef}>
      <form onSubmit={submitHandler} className="flex items-center w-full ">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setIsSeletcsd(true);
            setKeyword(e.target.value);
          }}
          placeholder="Search Products..."
          className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        />
        <button
          type="submit"
          className="bg-slate-600 text-white px-4 md:px-3 lg:px-4 py-2.5 rounded-r-lg hover:bg-slate-500 transition-colors"
        >
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-slate-200 mt-1 rounded-md shadow-2xl overflow-hidden">
          {suggestions.map((product) => (
            <li
              key={product._id}
              onClick={() => {
                setIsSeletcsd(false);
                setKeyword(product.name);
                navigate(`/search/${product.name}`);
                setSuggestions([]);
              }}
              className="px-4 py-3 hover:bg-slate-100 cursor-pointer border-b last:border-b-0 text-slate-700 flex items-center justify-between"
            >
              <span>{product.name}</span>
              <span className="text-xs text-slate-400">Product</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
