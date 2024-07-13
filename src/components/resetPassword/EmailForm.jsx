"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EmailForm = ({authorizationToken}) => {
  const router=useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  const [resetPasswordEmailData, setResetPasswordEmailData] = useState({
    email: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordEmailData((prevData) => ({ ...prevData, [name]: value }));
  };
  if(authorizationToken){
    return router.push("/profile");
  }
  return (
    <div className="w-[450px] p-4 mx-auto shadow-lg rounded mt-16">
      <div className="mb-6">
        <h2 className="text-5xl font-semibold text-center">Reset Password</h2>
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
            value={resetPasswordEmailData.email}
            required
          />
        </div>

        <button
          className="btn btn-block btn-warning text-white mt-2"
          type="submit"
        >
          Send Reset Password Link
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
