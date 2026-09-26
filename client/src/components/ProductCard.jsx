import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-olive/10 bg-white/60 transition-shadow hover:shadow-lg hover:shadow-olive/10"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-sage/15 text-5xl">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
        ) : (
          <span aria-hidden="true">🌻</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-sage">{product.category}</span>
        <h3 className="font-display text-lg text-ink group-hover:text-olive">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-ink/60">{product.shortDescription}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-olive">₹{product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink/40 line-through">₹{product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
