"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import Provider from "@/context/Provider";

const Profile = () => {
  const { setLoader } = useContext(Provider)
  const router = useRouter();

  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [changePasswordData, setChangePasswordData] = useState({
    newPassword: "",
    currentPassword: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoader(true);
        const response = await axios.get("/api/user");
        if (response.data.success) {
          setAuthorizedUser(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoader(false);
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
      setLoader(true);
      const response = await axios.get("/api/logout");
      if (response.data.success) {
        toast.success("Logout success");
        router.push("/login");
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      const response = await axios.put("/api/user", changePasswordData);
      if (response.data.success) {
        toast.success(response.data.message)
        setChangePasswordData({
          newPassword: "",
          currentPassword: "",
        })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoader(false);
    }
  };

  const handleFileInputClick = () => {
    document.getElementById("upload-file").click();
  };

  const uploadProfilePicture = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById("upload-file");
    if (fileInput.files.length > 0) {
      formData.append("profilePicture", fileInput.files[0]);
      try {
        setLoader(true);
        const response = await axios.put("/api/user/upload-profile-picture",
          {
            body: formData,
            // headers: { "Content-Type": "multipart/form-data" },
          });
        if (response.data.success) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="flex mt-8 gap-5">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center mb-8">
              <Image
                className="rounded-full border-2 border-[#050708]"
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
            <Image
              className="border-2 border-[#050708]"
              src="/images/avatar.jpg"
              alt="AVATAR"
              width={100}
              height={100}
            />
          </div>
          <form onSubmit={uploadProfilePicture} className="flex">
            <button
              className="text-[#050708] border border-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-3/4"
              type="button"
              onClick={handleFileInputClick}
            >
              Select File
            </button>
            <input type="file" id="upload-file" name="profilePicture" className="hidden" required />
            <button
              className="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-1/4"
              type="submit"
            >
              Upload
            </button>
          </form>
          <button
            className="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div>
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
            <div className="my-6">
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

export default Profile;