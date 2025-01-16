import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx"; // Assuming Sidebar will act as the Top Navbar now

function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      {/* Top Navbar */}
      <header className="bg-gray-800 text-white shadow-md">
        <Sidebar /> {/* This will serve as the top navigation bar */}
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-auto bg-gray-900 px-11 pt-11">
        <div className="pb-13 mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
