"use client"
import Link from "next/link"
import axios from "axios";
import { useState, useEffect } from "react";

const Admin = () => {
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
  return (
    <>
      <div className="flex gap-4">
        <div className="">
          <ul>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/users">Users</Link></li>
            <li><Link href="/users">Log Out</Link></li>
          </ul>
        </div>
        <div className="flex gap-4">
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