import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const links = [["/admin", "Overview"], ["/admin/categories", "Categories"], ["/admin/products", "Products"]];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="bg-[#451321] p-5 text-white md:min-h-screen md:w-64">
      <Logo light />
      <nav className="mt-8 flex gap-2 md:grid">
        {links.map(([to, label]) => (
          <NavLink
            end={to === "/admin"}
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-bold ${
                isActive ? "bg-[#d6a62c] text-[#42101e]" : "text-[#ebd4ca] hover:bg-white/10"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout} className="mt-5 w-full rounded-xl border border-white/20 px-4 py-3 text-left text-sm font-bold hover:bg-white/10">
        Log out
      </button>
    </aside>
  );
}
