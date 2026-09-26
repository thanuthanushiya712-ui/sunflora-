import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

const categories = [
  { key: "face", label: "Face", blurb: "Oils, cleansers & masks" },
  { key: "hair", label: "Hair", blurb: "Traditional oils & serums" },
  { key: "body", label: "Body", blurb: "Scrubs & butters" },
  { key: "wellness", label: "Wellness", blurb: "Aromatherapy & calm" },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setFeatured(data.filter((p) => p.isFeatured).slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <div>
      {/* Brand mark — the website opens with the Sunflora logo */}
      <section className="flex flex-col items-center justify-center px-6 pt-14 pb-4 text-center">
        <div className="mb-5 flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-olive/20 bg-olive px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cream shadow-sm shadow-olive/20">
            Free shipping ₹799+
          </span>
          <span className="rounded-full border border-sunflower bg-sunflower-light/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
            10% off first order
          </span>
          <span className="rounded-full border border-clay/20 bg-cream px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-olive-dark">
            Gift-ready hampers
          </span>
        </div>

        <div className="relative">
          <div className="absolute -left-14 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-olive shadow-md shadow-olive/10 md:block">
            fresh pick
          </div>
          <div className="absolute -right-14 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-olive shadow-md shadow-olive/10 md:block">
            small batch
          </div>
          <img src="/logo.png" alt="Sunflora Organics" className="h-40 w-40 object-contain md:h-48 md:w-48" />
        </div>

        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-sage">
          Sunflora Organics
        </p>
      </section>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-clay">Cold-pressed, small-batch, honest</span>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
            Skin care that grew up on a farm, not in a lab.
          </h1>
          <p className="mt-6 max-w-md text-ink/70">
            Sunflora Organics presses, blends and bottles every batch by hand in
            Coimbatore — sunflower, hibiscus and turmeric, with nothing hiding
            behind a long ingredient list.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-olive px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-olive-dark"
            >
              Shop the range
            </Link>
            <Link
              to="/shop?category=gifting"
              className="rounded-full border border-olive px-7 py-3 text-sm font-semibold text-olive transition-colors hover:bg-olive/5"
            >
              Explore gifting
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="flex h-72 w-72 items-center justify-center rounded-organic bg-sunflower-light/60 text-8xl md:h-96 md:w-96">
            🌻
          </div>
          <div className="absolute -bottom-4 left-6 rounded-2xl bg-white px-5 py-3 shadow-lg shadow-olive/10">
            <p className="font-display text-lg text-olive">5,000+</p>
            <p className="text-xs text-ink/60">happy skins across Tamil Nadu</p>
          </div>
        </div>
      </section>

      <hr className="leaf-divider mx-auto max-w-6xl" />

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl text-ink">Shop by what you need</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.key}
              to={`/shop?category=${c.key}`}
              className="rounded-2xl border border-olive/10 bg-white/60 p-6 transition-colors hover:border-sunflower"
            >
              <h3 className="font-display text-xl text-olive">{c.label}</h3>
              <p className="mt-1 text-sm text-ink/60">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl text-ink">Bestsellers</h2>
            <Link to="/shop" className="text-sm font-medium text-olive hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
