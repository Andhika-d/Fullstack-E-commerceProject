import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import UsersPage from "./pages/Users";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Master from "./pages/Master"; // ✅ Halaman landing

import { Toaster } from "./components/ui/toaster";

function App() {
  // misal nanti lo simpan token login di localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Master />} />  {/* ✅ Sekarang ini default */}

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={isLoggedIn ? <Products /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={isLoggedIn ? <UsersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;