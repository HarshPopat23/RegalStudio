import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const location = useLocation();
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="hero-pattern grid min-h-screen place-items-center text-2xl text-white">Loading…</div>;
  }

  return admin
    ? <Outlet />
    : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}
