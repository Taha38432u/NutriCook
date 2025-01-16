import { Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaPlusSquare,
  FaHeart,
  FaUser,
  FaAppleAlt,
} from "react-icons/fa"; // Import FaAppleAlt for nutrients

function UserNav() {
  return (
    <>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaHome />
        <Link to="/home" className="text-xl font-bold hover:text-blue-300">
          Home
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaBook />
        <Link
          to="my-recipes"
          className="text-xl font-bold hover:text-blue-300"
        >
          My Recipes
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaPlusSquare />
        <Link to="/create" className="text-xl font-bold hover:text-blue-300">
          Create Recipe
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaAppleAlt />
        <Link
          to="/check-nutrients"
          className="text-xl font-bold hover:text-blue-300"
        >
          Check Nutrients
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaHeart />
        <Link to="/likes" className="text-xl font-bold hover:text-blue-300">
          Liked Recipes
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

export default UserNav;
