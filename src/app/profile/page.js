"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
  const router = useRouter();

  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [changePasswordData, setChangePasswordData] = useState({
    newPassword: "",
    currentPassword: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user");
        if (response.data.success) {
          setAuthorizedUser(response.data.data);
        } else {
          throw error;
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);


  const handleChange = async (event) => {
    const { name, value } = event.target;
    setChangePasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.data.success) {
        console.log("Logout success", response.data);
        router.push("/login");
      } else {
        throw error;
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <>
      <div className="flex mt-8 gap-5">
        <div className="flex-1">
          <div className="flex gap-4 items-center mb-20">
            <Image
              className="rounded-full border-2 border-[#050708] p-2"
              src="/images/avatar.jpg"
              alt="AVATAR"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-4xl font-bold flex items-center gap-4 ">
                {authorizedUser?.fullName}
              </h2>
              <h4> {authorizedUser?.email}</h4>
            </div>
          </div>
          <button
            className="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <div className="flex-1">
          <form >
            <div>
              <label className="font-semibold text-lg" htmlFor="newPassword">
                New Password
              </label>
              <input
                onChange={handleChange}
                className="w-full border-2 rounded py-1 px-2 mt-1"
                placeholder="Enter a strong password"
                type="password"
                name="newPassword"
                id="newPassword"
                value={changePasswordData.newPassword}
                required
              />
            </div>
            <div className="my-6">
              <label className="font-semibold text-lg" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                onChange={handleChange}
                className="w-full border-2 rounded py-1 px-2 mt-1"
                placeholder="Enter a strong password"
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={changePasswordData.currentPassword}
                required
              />
            </div>
            <button
              className="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
              type="submit"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile