import { useGetUsersQuery } from "../../slices/userApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDeleteUserMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
 



const UserListScreen = () => {
  const {data: users , isLoading ,error}= useGetUsersQuery()
  const [deleteUser,{isLoading: loadinDelete}] = useDeleteUserMutation()

  const dedeteHandler = async (id) => {
if(window.confirm('Do you really want to delete the user'))
  try {
    deleteUser(id).unwrap()
    toast.success('User deleted')
  } catch (err) {
    toast.error(err?.data?.message || err.error)
  }
  }
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">User Managment</h1>
       {isLoading ? (
        <Loader />
       ): error ? 
       (
       <Message variant="danger">{error?.data?.message || error.error} </Message>
       ): (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
          <table className="w-full text-left border-collapse min-w-163">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-xs">
                <th className="p-4 font-bold">ID</th>
                <th className="p-4 font-bold">NAME</th>
                <th className="p-4 font-bold">EMAIL</th>
                <th className="p-4 font-bold">ADMIN</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {users.map((user) => (
                <tr key={user._id} className="border-t border-slate-50 hover:bg-slate-50 transition">
                  <td className="p-4">{user._id} </td>
                  <td className="p-4 font-medium whitespace-nowrap max-w-50">{user.name} </td>
                  <td className="p-4">
                    <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                      {user.email}
                    </a>
                  </td>
                  <td className="p-4">
                    {user.isAdmin ? (<FaCheck className="text-green-500" />) : (<FaTimes className="text-red-500" />)}
                  </td>
                  <td className="p-4 flex gap-2 ">
                    <Link to={`/admin/user/${user._id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaEdit /></Link>
                     
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    onClick={()=> dedeteHandler(user._id)}>
                    <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )
      }
    </div>
  )
}
export default UserListScreen