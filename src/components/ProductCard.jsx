import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
export default function ProductCard({product}){
 return <Link to={`/products/${product.slug}`} className="card-lift group overflow-hidden rounded-[1.5rem] border border-[#ead9bc] bg-white shadow-sm">
  <div className="relative h-64 overflow-hidden bg-[#f3e5cc]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>{product.isFeatured&&<span className="absolute left-4 top-4 rounded-full bg-[#d4a62a] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#41121f]">Featured</span>}</div>
  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a77050]">{product.productCode}</p><h3 className="mt-1 text-xl text-[#56182a]">{product.name}</h3><div className="mt-4 flex items-center justify-between"><b className="text-lg text-[#b43d28]">₹{formatPrice(product.price)}</b><span className="text-sm font-bold text-[#126373]">View details →</span></div></div>
 </Link>
}
