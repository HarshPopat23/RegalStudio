import { Link } from "react-router-dom";

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Regal Print home">
      <img
        src="/regal-print-logo.webp"
        alt="Regal Print logo"
        className="h-14 w-14 rounded-full border border-amber-500/40 bg-white object-cover shadow-sm"
      />
      <span>
        <b
          className={`font-display block text-xl leading-none ${
            light ? "text-white" : "text-[#641c2e]"
          }`}
        >
          Regal Print
        </b>
        <small
          className={`${
            light ? "text-amber-100" : "text-[#8f6b54]"
          } text-[9px] uppercase tracking-[.24em]`}
        >
          Crafted celebrations
        </small>
      </span>
    </Link>
  );
}
