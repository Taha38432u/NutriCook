import { useState } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import useUser from "../features/Authentication/useUser.js";
import UserNav from "./UserNav";
import AdminNav from "./AdminNav";

function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading, user } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 p-5 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        {/* Hamburger Menu */}
        <button
          className="text-3xl text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`absolute left-0 z-[1] w-full bg-gray-800 py-4 pl-7 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:py-0 md:pl-0 ${
          isMenuOpen
            ? "top-[70px] opacity-100"
            : "top-[-400px] opacity-0 md:top-0 md:opacity-100"
        }`}
      >
        {user.user.role === "user" && <UserNav />}
        {user.user.role === "admin" && <AdminNav />}
        {/* Logout */}
        <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
          <FaSignOutAlt />
          <button
            className="text-xl font-bold hover:text-blue-300"
            onClick={() => {
              alert("Logged out!");
              // Add logout logic here
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
