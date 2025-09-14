import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import UsersPage from "./pages/Users";
import Orders from "./pages/Orders";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/products", label: "Products", icon: <Package size={18} /> },
    { path: "/users", label: "Users", icon: <Users size={18} /> },
    { path: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-gray-800 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="p-4 text-2xl font-bold border-b">Admin Panel</div>

        <nav className="flex-1 divide-y">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition ${
                  active
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6">
          {/* Tombol hamburger (mobile) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          {/* Profile kanan */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Andhika</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
