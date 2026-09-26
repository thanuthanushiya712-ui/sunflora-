import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const statusColor = {
  placed: "bg-sage/20 text-olive-dark",
  processing: "bg-sunflower/20 text-clay",
  shipped: "bg-sunflower/20 text-clay",
  delivered: "bg-olive/15 text-olive",
  cancelled: "bg-clay/15 text-clay",
};

const Account = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    api
      .get("/orders/mine")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoadingOrders(false));

    api.get("/auth/me").then(({ data }) => {
      setForm({ name: data.name || "", phone: data.phone || "", address: data.address || "" });
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSavedMessage("");
    const { data } = await api.put("/auth/me", form);
    localStorage.setItem(
      "sunflora_user",
      JSON.stringify({ ...user, name: data.name })
    );
    setSavedMessage("Details updated.");
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-display text-3xl text-ink">My account</h1>
      <p className="mt-1 text-sm text-ink/60">{user?.email}</p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setTab("orders")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "orders" ? "bg-olive text-cream" : "border border-olive/20 text-ink/70"
          }`}
        >
          Order history
        </button>
        <button
          onClick={() => setTab("profile")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "profile" ? "bg-olive text-cream" : "border border-olive/20 text-ink/70"
          }`}
        >
          Profile details
        </button>
      </div>

      {tab === "orders" && (
        <div className="mt-8 space-y-4">
          {loadingOrders && <p className="text-ink/50">Loading orders…</p>}
          {!loadingOrders && orders.length === 0 && (
            <p className="text-ink/50">You haven't placed any orders yet.</p>
          )}
          {orders.map((o) => (
            <div key={o._id} className="rounded-2xl border border-olive/10 bg-white/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-ink/50">{o._id}</p>
                  <p className="text-xs text-ink/50">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColor[o.status]}`}
                >
                  {o.status}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-ink/70">
                {o.items.map((i) => (
                  <li key={i.name}>
                    {i.name} × {i.quantity} — ₹{i.price * i.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm font-semibold text-ink">Total: ₹{o.grandTotal}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "profile" && (
        <form onSubmit={handleSave} className="mt-8 max-w-sm space-y-4">
          <div>
            <label className="text-sm font-medium text-ink/80">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-olive/20 bg-white px-4 py-2 outline-none focus:border-olive"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-olive/20 bg-white px-4 py-2 outline-none focus:border-olive"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Address</label>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 w-full rounded-lg border border-olive/20 bg-white px-4 py-2 outline-none focus:border-olive"
            />
          </div>
          {savedMessage && <p className="text-sm text-olive">{savedMessage}</p>}
          <button
            type="submit"
            className="rounded-full bg-olive px-7 py-2.5 text-sm font-semibold text-cream hover:bg-olive-dark"
          >
            Save changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Account;
