import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

const categories = ["face", "hair", "body", "wellness", "gifting"];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    api
      .get("/products", { params })
      .then(({ data }) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, search]);

  const setCategory = (c) => {
    if (c) setSearchParams({ category: c });
    else setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-4xl text-ink">Shop everything</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setCategory("")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            category === "" ? "bg-olive text-cream" : "border border-olive/20 text-ink/70"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
              category === c ? "bg-olive text-cream" : "border border-olive/20 text-ink/70"
            }`}
          >
            {c}
          </button>
        ))}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="ml-auto rounded-full border border-olive/20 bg-white px-4 py-1.5 text-sm text-ink outline-none focus:border-olive"
        />
      </div>

      {loading ? (
        <p className="mt-14 text-center text-ink/50">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="mt-14 text-center text-ink/50">
          No products found. Try a different category or search term.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
