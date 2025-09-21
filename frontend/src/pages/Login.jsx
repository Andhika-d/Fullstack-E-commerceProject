import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { Eye, EyeOff, Mail } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.email === "admin@mail.com" && form.password === "123456") {
      toast({
        title: "✅ Login sukses",
        description: "Selamat datang kembali, Andhika!",
      });
      navigate("/");
    } else {
      toast({
        title: "❌ Login gagal",
        description: "Email atau password salah",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <Card className="rounded-2xl border-none shadow-lg bg-white/70 backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
              alt="logo"
              className="w-16 h-16 rounded-full mx-auto shadow-md border-2 border-white"
            />
          </motion.div>
          <CardTitle className="text-2xl font-semibold tracking-tight text-gray-800">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Silakan login untuk masuk ke dashboard admin
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            {/* Email */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="h-11 rounded-xl border-gray-200 pr-10 focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Mail size={18} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="h-11 rounded-xl border-gray-200 pr-10 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Lupa password?
                </button>
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium tracking-wide"
            >
              Login
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-gray-500">
              Belum punya akun?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
