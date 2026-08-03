import { generalWhatsAppUrl } from "../utils/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton({
  href,
  children = "Order on WhatsApp",
  floating = false,
}) {
  const url = href || generalWhatsAppUrl();

  if (floating) {
    return (
      <a
        aria-label="Chat with Regal Print on WhatsApp"
        href={url}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#20a464] text-white shadow-xl hover:scale-105 hover:bg-[#17804d]"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16734d] px-6 py-3 font-bold text-white shadow-md hover:-translate-y-0.5 hover:bg-[#105c3d]"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
}
