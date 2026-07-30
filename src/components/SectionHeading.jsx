export default function SectionHeading({eyebrow,title,copy,light=false}){
 return <div className="mx-auto max-w-2xl text-center"><p className={`text-xs font-bold uppercase tracking-[.28em] ${light?"text-amber-300":"text-[#b13a26]"}`}>{eyebrow}</p><h2 className={`mt-3 text-3xl font-bold md:text-4xl ${light?"text-white":"text-[#54172a]"}`}>{title}</h2>{copy&&<p className={`mt-4 leading-7 ${light?"text-[#ecd8cb]":"text-[#765e4f]"}`}>{copy}</p>}<div className="ornament mt-5 justify-center">✦</div></div>
}
