import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Cart = () => {
  const { items, updateQuantity, removeItem, itemsTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shippingFee = itemsTotal >= 799 || itemsTotal === 0 ? 0 : 60;
  const grandTotal = itemsTotal + shippingFee;

  const handleCheckout = () => {
    navigate(user ? "/checkout" : "/login?redirect=/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 font-display text-2xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink/60">Nothing here yet — let's fix that.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-olive px-7 py-3 text-sm font-semibold text-cream hover:bg-olive-dark"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-display text-3xl text-ink">Your cart</h1>

      <div className="mt-8 divide-y divide-olive/10">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-2xl">
              🌻
            </div>
            <div className="flex-1">
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-ink/50">₹{item.price} each</p>
            </div>
            <div className="flex items-center rounded-full border border-olive/20">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="px-3 py-1 text-ink/70 hover:text-olive"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="px-3 py-1 text-ink/70 hover:text-olive"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <p className="w-16 text-right font-medium text-ink">
              ₹{item.price * item.quantity}
            </p>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-clay hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 ml-auto max-w-sm space-y-2 rounded-2xl bg-white/60 p-6">
        <div className="flex justify-between text-sm text-ink/70">
          <span>Subtotal</span>
          <span>₹{itemsTotal}</span>
        </div>
        <div className="flex justify-between text-sm text-ink/70">
          <span>Shipping</span>
          <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
        </div>
        <div className="flex justify-between border-t border-olive/10 pt-2 font-semibold text-ink">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-3 w-full rounded-full bg-olive py-3 text-sm font-semibold text-cream hover:bg-olive-dark"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
