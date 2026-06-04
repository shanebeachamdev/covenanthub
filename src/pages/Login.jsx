import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    login(form.email, form.password);
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-white">
          CovenantHub
        </h1>

        <p className="text-zinc-400 mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-lg transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;