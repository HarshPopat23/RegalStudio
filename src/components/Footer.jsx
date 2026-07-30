import { Link } from "react-router-dom";
import Logo from "./Logo";
import { siteConfig } from "../config/siteConfig";
export default function Footer(){
  return <footer className="bg-[#431322] text-[#f7e8ce]">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div><Logo light/><p className="mt-5 max-w-sm text-sm leading-7 text-[#e8cfc0]">Premium decorative cutouts for festivals, weddings and every celebration worth remembering.</p></div>
      <div><h4 className="text-lg text-white">Explore</h4><div className="mt-4 grid gap-3 text-sm"><Link to="/categories">All Collections</Link><Link to="/about">Our Story</Link><Link to="/contact">Custom Designs</Link><Link to="/admin/login">Admin</Link></div></div>
      <div><h4 className="text-lg text-white">Connect</h4><div className="mt-4 grid gap-3 text-sm"><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a><span>{siteConfig.phone}</span></div></div>
    </div>
    <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#cdaea1]">© {new Date().getFullYear()} Regal Studio. Made with celebration in mind.</div>
  </footer>;
}
