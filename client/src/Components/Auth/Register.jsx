import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  /////////////////////////////////////// Constants //////////////////////////////////////////
  const navigate = useNavigate();

  /////////////////////////////////////// States //////////////////////////////////////////
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  /////////////////////////////////////// Functions //////////////////////////////////////////
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let temp = {};
    temp.name = data.name ? "" : "Name is required";
    temp.email = data.email ? "" : "Email is required";
    temp.phone = data.phone ? "" : "Phone is required";
    temp.password = data.password.length >= 6 ? "" : "Password must be at least 6 characters";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3000/api/v1/auth/register", data);
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">Register Yourself</h1>
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Name</label>
                <input
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Phone</label>
                <input
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  type="text"
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <input
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  type="text"
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <input
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  type="password"
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Register
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Login Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
