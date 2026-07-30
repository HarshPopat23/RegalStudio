import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, loading, login } = useAuth();

  if (!loading && admin) return <Navigate to="/admin" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Incorrect email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hero-pattern grid min-h-screen place-items-center p-5">
      <div className="w-full max-w-md rounded-[2rem] bg-[#fffaf0] p-8 shadow-2xl">
        <Logo />
        <p className="mt-8 text-xs font-bold uppercase tracking-[.22em] text-[#b13a26]">Private access</p>
        <h1 className="mt-2 text-3xl text-[#54172a]">Admin login</h1>
        <p className="mt-2 text-sm text-[#7b665b]">Sign in with the admin account created in Appwrite.</p>
        {error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="text-sm font-bold">Email<input type="email" required className="admin-input mt-2" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="text-sm font-bold">Password<input type="password" required minLength="8" className="admin-input mt-2" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <button disabled={submitting} className="mt-2 rounded-xl bg-[#a73524] px-5 py-3 font-bold text-white hover:bg-[#81281d] disabled:opacity-60">
            {submitting ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
