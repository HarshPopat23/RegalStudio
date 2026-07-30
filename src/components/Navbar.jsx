"use client";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { generalWhatsAppUrl } from "../utils/whatsapp";
const links=[["/","Home"],["/categories","Collections"],["/about","Our Story"],["/contact","Contact"]];
export default function Navbar(){
  const [open,setOpen]=useState(false);
  return <header className="sticky top-0 z-40 border-b border-[#e8d8bd] bg-[#fffaf0]/95 backdrop-blur">
    <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
      <Logo/>
      <div className="hidden items-center gap-8 md:flex">
        {links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>`text-sm font-semibold ${isActive?"text-[#b13a26]":"text-[#5a4337] hover:text-[#b13a26]"}`}>{label}</NavLink>)}
        <a href={generalWhatsAppUrl()} target="_blank" rel="noreferrer" className="rounded-full bg-[#16734d] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#105c3d]">WhatsApp Order</a>
      </div>
      <button aria-label="Toggle navigation" onClick={()=>setOpen(!open)} className="rounded-lg border border-[#decdb1] p-2 text-xl md:hidden">{open?"×":"☰"}</button>
    </nav>
    {open&&<div className="border-t border-[#eadcc6] bg-[#fffaf0] px-5 py-4 md:hidden">{links.map(([to,label])=><NavLink onClick={()=>setOpen(false)} key={to} to={to} className="block py-3 font-semibold">{label}</NavLink>)}<a href={generalWhatsAppUrl()} className="mt-2 block rounded-xl bg-[#16734d] p-3 text-center font-bold text-white">WhatsApp Order</a></div>}
  </header>;
}
