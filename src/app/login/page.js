"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setloginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/user/login", loginData);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  return (
    <>
      <div className="flex h-screen items-center max-w-screen-xl mx-auto">
        <div className="flex-1">
          <div className="w-[450px] p-4">
            <div>
              <h2 className="text-5xl font-semibold">Login</h2>
              <p className="text-lg text-justify mt-3 mb-4">
                Doesn&#39;t have an account yet?{" "}
                <Link
                  href="/registration"
                  className="text-buttonBackground underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
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
                  value={loginData.email}
                  required
                />
              </div>
              <div className="mt-6">
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
                    value={loginData.password}
                    required
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? (
                      <FaEye className="text-xl" />
                    ) : (
                      <FaEyeSlash className="text-xl" />
                    )}{" "}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <Link href="/reset-password-email" className="text-warning">
                  Reset Password ?
                </Link>
              </div>
              <button
                className="text-white bg-[#050708] inline-block w-full focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
                type="submit"
              >
                Login
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

export default Login