import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import UsersPage from "./pages/Users";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
