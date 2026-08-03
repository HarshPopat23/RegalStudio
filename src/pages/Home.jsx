import { Link } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import WhatsAppButton from "../components/WhatsAppButton";
import { generalWhatsAppUrl } from "../utils/whatsapp";
import { siteConfig } from "../config/siteConfig";

export default function Home() {
  const { categories, products } = useStore();

  const activeCats = categories
    .filter((category) => category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const featured = products.filter(
    (product) =>
      product.isAvailable &&
      product.isFeatured &&
      activeCats.some((category) => category.id === product.categoryId),
  );

  return (
    <div className="festive-bg">
      <section className="hero-pattern relative overflow-hidden px-5 py-16 text-white md:py-24 lg:px-8">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-amber-300/20" />
        <div className="absolute -right-10 top-12 h-72 w-72 rounded-full border border-amber-300/20" />
        <div className="absolute bottom-8 left-8 text-5xl opacity-10">❋</div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.32em] text-amber-300">
              Indian celebrations, beautifully crafted
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] md:text-7xl">
              <span className="text-amber-300">Premium</span>
              <br />
              Baby Shower, Wedding and Festival Cutouts
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f3ddd4]">
              Discover premium festival, wedding, birthday, and custom
              decorative cutout designs crafted for memorable celebrations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/categories"
                className="rounded-full bg-[#f4bd3a] px-7 py-3.5 font-bold text-[#46131f] shadow-lg hover:bg-white"
              >
                Explore Designs
              </Link>
              <WhatsAppButton href={generalWhatsAppUrl()} />
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-xs font-bold uppercase tracking-widest text-[#ebc9b9]">
              <span>✦ Made in India</span>
              <span>✦ Customisable</span>
              <span>✦ Premium finish</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="overflow-hidden rounded-[2rem] border-4 border-amber-300/60 bg-[#f8e5c3] p-2 shadow-2xl">
              <img
                src="/regal-print-banner.webp"
                alt="Regal Print premium decoration cutouts"
                className="max-h-[650px] w-full rounded-[1.5rem] object-contain"
              />
            </div>

            <div className="absolute -bottom-5 -left-2 rounded-2xl border border-amber-300/40 bg-[#fff8ea] p-4 text-[#5a1828] shadow-xl sm:-left-5">
              <b className="font-display text-xl">100% Customisation</b>
              <p className="text-xs text-[#8a6154]">Made for your celebration</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Celebrations we love"
          title="Popular Decoration Collections for Events"
          copy="Thoughtfully designed pieces that bring tradition, colour and joy to every special gathering."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeCats.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/categories"
            className="inline-block rounded-full border-2 border-[#8c2638] px-6 py-3 font-bold text-[#8c2638] hover:bg-[#8c2638] hover:text-white"
          >
            View all collections
          </Link>
        </div>
      </section>

      <section className="bg-[#f4e6ce] px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Customer favourites" title="Featured Cutout Designs" />
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="The Regal promise" title="Why Families Choose Us" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [
              "❋",
              "Rooted in Tradition",
              "Indian motifs and cultural details treated with care and contemporary elegance.",
            ],
            [
              "✦",
              "Made Just for You",
              "Names, colours, sizes and themes personalised to match your celebration.",
            ],
            [
              "♢",
              "Crafted to Impress",
              "Crisp printing, thoughtful layering and durable materials for a premium finish.",
            ],
          ].map(([icon, title, copy]) => (
            <div
              key={title}
              className="rounded-3xl border border-[#ead8bc] bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff0d2] text-2xl text-[#b13a26]">
                {icon}
              </div>
              <h3 className="mt-5 text-2xl text-[#5a182a]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#796255]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#126373] p-8 text-white md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.3em] text-[#ffd36b]">
                Your idea, our craft
              </p>
              <h2 className="mt-3 text-4xl">Dreaming of a custom theme?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#d7eff1]">
                Share your event, colours, names and inspiration. We’ll help turn
                it into a celebration-ready cutout design.
              </p>
            </div>
            <WhatsAppButton>Discuss a Custom Design</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="bg-[#591729] px-5 py-20 text-center text-white">
        <SectionHeading
          light
          eyebrow="Follow our celebrations"
          title="Fresh from Instagram"
          copy="Behind-the-scenes craft, new launches and real celebration inspiration."
        />
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full border border-amber-300 px-7 py-3 font-bold text-amber-200 hover:bg-amber-300 hover:text-[#49101f]"
        >
          Follow @regalprint.gift ↗
        </a>
      </section>

      <section className="px-5 py-16 text-center">
        <h2 className="text-3xl text-[#5a182a]">
          Ready to make your celebration regal?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#765e4f]">
          Tell us what you love and we’ll guide you through customization,
          pricing and delivery.
        </p>
        <div className="mt-7">
          <WhatsAppButton>Start Your Order</WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
