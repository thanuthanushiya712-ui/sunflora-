import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios.js";

const Checkout = () => {
  const { items, itemsTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const shippingFee = itemsTotal >= 799 ? 0 : 60;
  const grandTotal = itemsTotal + shippingFee;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    try {
      const { data } = await api.post("/orders", {
        items: items.map((i) => ({
          product: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        shippingAddress: form,
        itemsTotal,
        shippingFee,
        grandTotal,
        paymentMethod,
      });
      clearCart();
      navigate("/order-success", { state: { orderId: data._id } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>
      <p className="mt-1 text-sm text-ink/60">
        This is a mock checkout for demo purposes — orders are recorded but no real payment is taken.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          {[
            { name: "fullName", label: "Full name" },
            { name: "phone", label: "Phone number" },
            { name: "street", label: "Street address" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "pincode", label: "Pincode" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium text-ink/80">{field.label}</label>
              <input
                required
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-olive/20 bg-white px-4 py-2 outline-none focus:border-olive"
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium text-ink/80">Payment method</label>
            <div className="mt-2 space-y-2">
              {["Cash on Delivery", "Card (mock)", "UPI (mock)"].map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2 text-sm ${
                    paymentMethod === method ? "border-olive bg-olive/5" : "border-olive/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method}
                </label>
              ))}
            </div>
            {paymentMethod !== "Cash on Delivery" && (
              <p className="mt-2 text-xs text-ink/50">
                Demo mode — no real payment is processed, the order is recorded as if payment succeeded.
              </p>
            )}
          </div>

          {error && <p className="text-sm text-clay">{error}</p>}

          <button
            type="submit"
            disabled={placing || items.length === 0}
            className="w-full rounded-full bg-olive py-3 text-sm font-semibold text-cream hover:bg-olive-dark disabled:cursor-not-allowed disabled:bg-ink/20"
          >
            {placing ? "Placing order…" : `Place order · ₹${grandTotal}`}
          </button>
        </form>

        <div className="h-fit rounded-2xl bg-white/60 p-6">
          <h2 className="font-display text-lg text-ink">Order summary</h2>
          <div className="mt-4 space-y-2">
            {items.map((i) => (
              <div key={i.productId} className="flex justify-between text-sm text-ink/70">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>₹{i.price * i.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 border-t border-olive/10 pt-3 text-sm">
            <div className="flex justify-between text-ink/70">
              <span>Subtotal</span>
              <span>₹{itemsTotal}</span>
            </div>
            <div className="flex justify-between text-ink/70">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between pt-1 font-semibold text-ink">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
