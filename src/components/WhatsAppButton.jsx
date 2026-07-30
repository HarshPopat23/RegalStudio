import { generalWhatsAppUrl } from "../utils/whatsapp";
export default function WhatsAppButton({href, children="Order on WhatsApp", floating=false}){
  if(floating) return <a aria-label="Chat on WhatsApp" href={href||generalWhatsAppUrl()} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1e985f] text-2xl text-white shadow-xl hover:scale-105">◉</a>;
  return <a href={href||generalWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16734d] px-6 py-3 font-bold text-white shadow-md hover:-translate-y-0.5 hover:bg-[#105c3d]">◉ {children}</a>;
}
