import { Link } from "react-router-dom";
export default function Logo({ light=false }) {
  return <Link to="/" className="flex items-center gap-3">
    <span className={`grid h-10 w-10 place-items-center rounded-full border ${light?"border-amber-300/60 bg-white/10":"border-amber-600/30 bg-amber-50"} text-xl`}>✦</span>
    <span><b className={`font-display block text-xl leading-none ${light?"text-white":"text-[#641c2e]"}`}>Regal Studio</b><small className={`${light?"text-amber-100":"text-[#8f6b54]"} text-[9px] uppercase tracking-[.24em]`}>Crafted celebrations</small></span>
  </Link>;
}
