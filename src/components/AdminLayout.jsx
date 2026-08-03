import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
export default function AdminLayout(){return <div className="min-h-screen bg-[#f8f1e6] md:flex"><AdminSidebar/><div className="min-w-0 flex-1"><header className="border-b border-[#e3d2b7] bg-white px-6 py-5"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b13a26]">Regal Print</p><h1 className="text-2xl text-[#501526]">Admin Dashboard</h1></header><main className="p-5 md:p-8"><Outlet/></main></div></div>}
