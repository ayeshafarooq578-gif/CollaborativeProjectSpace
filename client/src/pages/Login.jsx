import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow w-[420px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-5"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-center mt-6">
          Don't have an account?

          <Link
            className="text-indigo-600 ml-2"
            to="/register"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;