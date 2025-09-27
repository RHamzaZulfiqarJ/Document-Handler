import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const role = JSON.parse(Cookies.get("profile"))?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("profile");
    navigate("/");
  };

  return (
    <div className="sticky top-0 shadow-black/10 shadow-sm bg-gray-100 z-10 flex items-center justify-between px-4">
      {role === "admin" && <div className="text-xl py-5">Admin Dashboard</div>}
      <div className="text-xl py-5">Document Storing App</div>
      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-4 py-2 text-white cursor-pointer">
        Logout
      </button>
    </div>
  );
};

export default Header;
