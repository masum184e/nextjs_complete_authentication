"use client"
import Link from "next/link"
import axios from "axios";
import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const [authorizedUser, setAuthorizedUser] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/admin");
        if (response.data.success) {
          setAuthorizedUser(response.data.data);
        } else {
          console.error("Error fetching profile data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.data.success) {
        console.log("Logout success", response.data);
        router.push("/login");
      } else {
        console.error("Error during sign out:", response.data.message);
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="border-r rounded bg-gray-100 p-2 w-2/12">
          <ul>
            <li className="text-xl text-gray-700 hover:text-black pr-2 mb-2 hover:font-medium flex items-center gap-2">
              <FaUsers />
              <Link href="/admin">Dashboard</Link>
              </li>
            <li className="text-xl text-gray-700 hover:text-black pr-2 mb-2 hover:font-medium flex items-center gap-2">
            <MdDashboard />
              <Link href="/users">Users</Link>
              </li>
            <li onClick={handleSignOut} className="text-xl text-gray-700 hover:text-black pr-2 mb-2 hover:font-medium flex items-center gap-2">
            <IoLogOut />
              <button >Log Out</button>
              </li>
          </ul>
        </div>
        <div className="flex gap-4 w-8/12">
          <div className="w-32 h-32 border rounded text-center p-4 flex flex-col justify-center items-center">
            <span className="text-4xl font-bold">10</span>
            <span>User</span>
          </div>
          <div className="w-32 h-32 border rounded text-center p-4 flex flex-col justify-center items-center">
            <span className="text-4xl font-bold">10</span>
            <span>Admin</span>
          </div>
          <div className="border p-4">
            <h3 className="text-xl font-bold">{authorizedUser?.fullName}</h3>
            <h5>{authorizedUser?.email}</h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin