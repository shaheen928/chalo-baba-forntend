import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User updateds successfuly");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
<div className="container mx-auto px-4 pt-24 pb-8">
      <Link
        to="/admin/userlist"
        className="btn btn-light my-3 bg-slate-100 px-4 py-2 rounded-lg inline-block"
      >
        Go Back
      </Link>
      <div className="max-w-md mx-auto p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold mb-6 ">Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium text-slate-600">
                Is Admin
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-xl
             hover:bg-slate-800 transition "
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default UserEditScreen;
    