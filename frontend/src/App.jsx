import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import UsersPage from "./pages/Users";
import Orders from "./pages/Orders";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapse
  const location = useLocation();

  // Pastikan desktop sidebar default terbuka
  useEffect(() => {
    // Function untuk cek ukuran layar
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // desktop: open
      } else {
        setSidebarOpen(false); // mobile: closed
      }
    };

    handleResize(); // Jalankan pertama kali saat mount

    window.addEventListener("resize", handleResize); // Pantau perubahan ukuran
    return () => window.removeEventListener("resize", handleResize); // cleanup
  }, []);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/products", label: "Products", icon: <Package size={18} /> },
    { path: "/users", label: "Users", icon: <Users size={18} /> },
    { path: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  ];

  const currentPage =
    navItems.find((item) => item.path === location.pathname)?.label ||
    "Admin Panel";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white text-gray-800 shadow-lg transform transition-all duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
          ${sidebarCollapsed ? "w-20" : "w-64"}
        `}
      >
        <div className="flex items-center justify-between h-14 px-4 md:px-6 border-b">
          <span
            className={`text-2xl font-bold ${
              sidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Admin Panel
          </span>
          <button
            className="hidden md:flex items-center justify-center w-8 h-8 text-gray-700"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 divide-y mt-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition rounded-r-md
                  ${
                    active
                      ? "bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span
                  className={`${sidebarCollapsed ? "hidden" : "inline-block"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6">
          {/* Hamburger mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-xl font-semibold">{currentPage}</h1>

          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Andhika</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Routes / Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

        {/* Footer sticky */}
        <footer className="bg-white shadow-md text-center text-gray-500 text-sm py-3">
          Made with by <span className="font-medium">@Andhika-D</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
