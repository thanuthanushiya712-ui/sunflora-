import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/products/${slug}`)
      .then(({ data }) => setProduct(data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-ink/60">We couldn't find that product.</p>
      </div>
    );
  }

  if (!product) {
    return <div className="mx-auto max-w-6xl px-6 py-20 text-center text-ink/50">Loading…</div>;
  }

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-sage/15 text-8xl">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full rounded-2xl object-cover object-center" />
          ) : (
            <span aria-hidden="true">🌻</span>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wide text-sage">{product.category}</span>
          <h1 className="mt-2 font-display text-4xl text-ink">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-olive">₹{product.price}</span>
            {product.compareAtPrice && (
              <span className="text-ink/40 line-through">₹{product.compareAtPrice}</span>
            )}
          </div>
          <p className="mt-5 text-ink/70">{product.description}</p>

          {product.ingredients?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-ink">Key ingredients</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="rounded-full bg-sage/20 px-3 py-1 text-xs text-olive-dark">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-olive/20">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-ink/70 hover:text-olive"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 text-ink/70 hover:text-olive"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="rounded-full bg-olive px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-olive-dark disabled:cursor-not-allowed disabled:bg-ink/20"
            >
              {product.stock === 0 ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
            </button>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="mt-4 block text-sm font-medium text-olive hover:underline"
          >
            Go to cart →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
