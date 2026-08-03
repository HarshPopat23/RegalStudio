import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { siteConfig } from "../config/siteConfig";

function SocialIcon({ children }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white/20">
      {children}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#431322] text-[#f7e8ce]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#e8cfc0]">
            Premium decorative cutouts for festivals, weddings and every
            celebration worth remembering.
          </p>
        </div>

        <div>
          <h4 className="text-lg text-white">Explore</h4>
          <div className="mt-4 grid gap-3 text-sm">
            <Link to="/categories">All Collections</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/contact">Custom Designs</Link>
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg text-white">Connect</h4>
          <div className="mt-4 grid gap-3 text-sm">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span>{siteConfig.phone}</span>
            <div className="mt-2 flex gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <SocialIcon>
                  <FaInstagram className="h-5 w-5" />
                </SocialIcon>
              </a>

              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <SocialIcon>
                  <FaFacebookF className="h-5 w-5" />
                </SocialIcon>
              </a>

              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <SocialIcon>
                  <FaYoutube className="h-5 w-5" />
                </SocialIcon>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#cdaea1]">
        © {new Date().getFullYear()} Regal Print. Made with celebration in mind.
      </div>
    </footer>
  );
}
