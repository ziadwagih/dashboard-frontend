import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

export default function AuthCard() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Enable routing

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignup
      ? `${BASE_URL}/api/auth/register`
      : `${BASE_URL}/api/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.token) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      console.log("✅ Auth successful:", data.token);

      navigate("/home"); // ✅ Redirect to home after login
    } catch (err) {
      setLoading(false);
      console.error("❌ Auth error:", err);
      setError(err.message || "Authentication failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md backdrop-blur-xl bg-[rgba(15,23,42,0.7)] border border-[#00f0ff]/30 rounded-2xl p-8 shadow-2xl text-white"
    >
      <h2 className="text-2xl font-bold font-orbitron mb-6 text-center">
        {isSignup ? "Create Your Whale Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 font-sora">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#00f0ff]">Email</label>
          <input
            type="email"
            placeholder="whale@alpha.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-[#00f0ff]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00f0ff] transition"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#00f0ff]">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-[#00f0ff]/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00f0ff] transition"
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[#00f0ff]/20 border border-[#00f0ff] rounded-lg text-white font-bold hover:bg-[#00f0ff]/40 transition disabled:opacity-40"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm text-gray-400">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              className="text-[#00f0ff] hover:underline"
              onClick={() => setIsSignup(false)}
            >
              Log in
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <button
              className="text-[#00f0ff] hover:underline"
              onClick={() => setIsSignup(true)}
            >
              Sign up
            </button>
          </>
        )}
      </div>

      {/* Glow FX */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00f0ff] rounded-full filter blur-[100px] opacity-10 pointer-events-none" />
      <div className="text-[10px] text-center text-[#00f0ff]/70 mt-6 italic">
        Last signup: JPMorgan Analyst (3s ago)
      </div>
    </motion.div>
  );
}
