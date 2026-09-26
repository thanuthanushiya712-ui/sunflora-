import { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  category: "face",
  price: "",
  stock: "",
};

const AdminDashboard = () => {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadProducts = () => api.get("/products").then(({ data }) => setProducts(data));
  const loadOrders = () => api.get("/orders").then(({ data }) => setOrders(data));

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      slug: form.slug || form.name.toLowerCase().trim().replace(/\s+/g, "-"),
    };
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        setMessage("Product updated.");
      } else {
        await api.post("/products", payload);
        setMessage("Product created.");
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription || "",
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setTab("products");
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    loadOrders();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-3xl text-ink">Admin dashboard</h1>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setTab("products")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "products" ? "bg-olive text-cream" : "border border-olive/20 text-ink/70"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "orders" ? "bg-olive text-cream" : "border border-olive/20 text-ink/70"
          }`}
        >
          Orders
        </button>
      </div>

      {tab === "products" && (
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white/60 p-6">
            <h2 className="font-display text-lg text-ink">
              {editingId ? "Edit product" : "Add a product"}
            </h2>
            <input
              required
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
            />
            <input
              name="slug"
              placeholder="Slug (auto-generated if left blank)"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
            />
            <input
              required
              name="shortDescription"
              placeholder="Short description"
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
            />
            <textarea
              required
              name="description"
              placeholder="Full description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
            >
              <option value="face">Face</option>
              <option value="hair">Hair</option>
              <option value="body">Body</option>
              <option value="wellness">Wellness</option>
              <option value="gifting">Gifting</option>
            </select>
            <div className="flex gap-3">
              <input
                required
                type="number"
                name="price"
                placeholder="Price (₹)"
                value={form.price}
                onChange={handleChange}
                className="w-1/2 rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
              />
              <input
                required
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-1/2 rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
              />
            </div>
            {message && <p className="text-sm text-olive">{message}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-full bg-olive px-6 py-2 text-sm font-semibold text-cream hover:bg-olive-dark"
              >
                {editingId ? "Save changes" : "Add product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-olive/20 px-6 py-2 text-sm font-medium text-ink/70"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="max-h-[560px] overflow-y-auto rounded-2xl border border-olive/10">
            {products.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between border-b border-olive/10 px-4 py-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-ink/50">
                    ₹{p.price} · {p.stock} in stock · {p.category}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <button onClick={() => handleEdit(p)} className="text-olive hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-clay hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-8 space-y-4">
          {orders.length === 0 && <p className="text-ink/50">No orders yet.</p>}
          {orders.map((o) => (
            <div key={o._id} className="rounded-2xl border border-olive/10 bg-white/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-ink/50">{o._id}</p>
                  <p className="text-sm font-medium text-ink">
                    {o.user?.name} · {o.user?.email}
                  </p>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                  className="rounded-full border border-olive/20 bg-white px-3 py-1 text-sm outline-none"
                >
                  {["placed", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
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
    </div>
  );
};

export default AdminDashboard;
