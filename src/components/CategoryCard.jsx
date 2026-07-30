import { Link } from "react-router-dom";
export default function CategoryCard({category}){
 return <Link to={`/categories/${category.slug}`} className="card-lift group overflow-hidden rounded-[1.5rem] border border-[#ead9bc] bg-white shadow-sm">
   <div className="relative h-60 overflow-hidden"><img src={category.coverImage} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#3f101f]/90 via-transparent to-transparent"/></div>
   <div className="-mt-16 relative p-6 text-white"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-amber-300">Festive collection</p><h3 className="mt-1 text-2xl">{category.name}</h3><p className="mt-5 line-clamp-2 text-sm leading-6 text-[#624a3c]">{category.description}</p><span className="mt-4 inline-block text-sm font-bold text-[#a73524]">Explore collection →</span></div>
 </Link>
}
