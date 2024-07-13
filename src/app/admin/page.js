"use client"
import Provider from "@/context/Provider";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const { setLoader } = useContext(Provider);
  const [authorizedUser, setAuthorizedUser] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoader(true);
        const response = await axios.get("/api/admin");
        if (response.data.success) {
          setAuthorizedUser(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoader(false)
      }
    };
    fetchProfileData();
  }, []);

  return (
    <>
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
    </>
  )
}

export default Admin