"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Registration = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/user/registration", registrationData);
      console.log("Registration success", response.data);
      router.push("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center max-w-screen-xl mx-auto">
        <div className="flex-1">
          <div className="w-[450px] p-4">
            <div>
              <h2 className="text-5xl font-semibold">Join Now</h2>
              <p className="text-lg text-justify mt-2 mb-4">
                Already have an account?{" "}
                <Link href="/login" className="text-buttonBackground underline">
                  Login
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="font-semibold text-lg" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  className="w-full border-2 outline-borderColor border-borderColor rounded py-1 px-2 mt-1"
                  placeholder="Your Full Name"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={registrationData.fullName}
                  required
                />
              </div>
              <div className="my-6">
                <label className="font-semibold text-lg" htmlFor="email">
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  className="w-full border-2 outline-borderColor border-borderColor rounded py-1 px-2 mt-1"
                  placeholder="your@example.com"
                  type="email"
                  name="email"
                  id="email"
                  value={registrationData.email}
                  required
                />
              </div>
              <div className="my-6">
                <label className="font-semibold text-lg" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    className="w-full border-2 outline-borderColor border-borderColor rounded py-1 px-2 mt-1"
                    placeholder="Enter 6 character or more"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={registrationData.password}
                    required
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">{showPassword ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />} </button>
                </div>
              </div>
              <button
                className="text-white bg-[#050708] inline-block w-full focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
                type="submit"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1">
          <Image
          className=""
            src="/images/registration.png"
            alt="REGISTRATION"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </>
  )
}

export default Registration