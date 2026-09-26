import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-6xl">🌻</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Order placed!</h1>
      <p className="mt-2 text-ink/60">
        Thank you — we're getting your order ready.
        {orderId && (
          <>
            {" "}
            Your order ID is <span className="font-mono text-ink">{orderId}</span>.
          </>
        )}
      </p>
      <Link
        to="/shop"
        className="mt-8 inline-block rounded-full bg-olive px-7 py-3 text-sm font-semibold text-cream hover:bg-olive-dark"
      >
        Continue shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
