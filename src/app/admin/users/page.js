"use client"
import { ImplementContext } from "@/context/Provider";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const { setLoader } = useContext(ImplementContext)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoader(true);
        const response = await axios.get("/api/admin/user");
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoader(false);
      }
    };
    fetchProfileData();
  }, []);
  return (
    <div className="overflow-auto max-h-[92vh]">
      {users && users.length > 0 ?
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-center">
            <thead className="text-xs text-white uppercase bg-black">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-3">{user.fullName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.createdAt}</td>
                  <td className="px-6 py-3">
                    <span className={`${user.role === "admin" ? "bg-black text-white px-2 py-1 rounded" : ""}`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
        : <>
          <h1 className="text-2xl text-center font-bold w-full">No User Found</h1>
        </>}
    </div>
  )
}

export default Users;
