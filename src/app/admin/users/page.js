"use client"
import axios from "axios";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/admin/user");
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          console.error("Error fetching profile data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);
  return (
    <>


      {users && users.length > 0 ?
        <>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 text-center">
            <thead class="text-xs text-white uppercase bg-gray-500 ">
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Created At</th>
              <th scope="col" class="px-6 py-3">Role</th>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={user._id} className="border-b bg-gray-50" >
                    <td className="px-6 py-3">{user.fullName}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.createdAt}</td>
                    <td className="px-6 py-3"><span className={`${user.role === "admin" ? "bg-black text-white px-2 py-1 rounded" : ""}`}>{user.role}</span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </>
        : <>
          <h1 className="text-2xl text-center font-bold w-full" >No User Found</h1>
        </>}
    </>
  )
}

export default Users