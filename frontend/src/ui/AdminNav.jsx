import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaFlag,
  FaUser,
} from "react-icons/fa";

function AdminNav() {
  return (
    <>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaTachometerAlt />
        <Link to="/dashboard" className="text-xl font-bold hover:text-blue-300">
          Dashboard
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaBook />
        <Link
          to="/all-recipes"
          className="text-xl font-bold hover:text-blue-300"
        >
          All Recipes
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaUsers />
        <Link
          to="/api/v1/users"
          className="text-xl font-bold hover:text-blue-300"
        >
          Users
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaFlag />
        <Link
          to="/admin/reports"
          className="text-xl font-bold hover:text-blue-300"
        >
          Reports
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaUser />
        <Link to="/me" className="text-xl font-bold hover:text-blue-300">
          Profile
        </Link>
      </li>
    </>
  );
}

export default AdminNav;
