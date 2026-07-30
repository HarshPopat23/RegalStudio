import { useStore } from "../hooks/useStore";
import CategoryCard from "../components/CategoryCard";
import EmptyState from "../components/EmptyState";
import SectionHeading from "../components/SectionHeading";
export default function Categories(){const {categories}=useStore();const list=categories.filter(c=>c.isActive).sort((a,b)=>a.displayOrder-b.displayOrder);return <section className="festive-bg min-h-[70vh] px-5 py-16 lg:px-8"><SectionHeading eyebrow="Explore every occasion" title="Our Festive Collections" copy="Find a design for the celebration in your heart—or ask us to create something entirely yours."/><div className="mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.length?list.map(c=><CategoryCard key={c.id} category={c}/>):<EmptyState title="Collections coming soon"/>}</div></section>}
