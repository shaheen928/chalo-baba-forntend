import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SerchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex items-center w-full mx-w-sm">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-slate-800 text-white px-4 py-2.5 rounded-r-lg hover:bg-slate-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SerchBox;
