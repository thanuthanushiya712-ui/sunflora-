import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/cart — the logged-in user's saved cart
router.get("/", protect, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart — replace the whole cart (used to sync localStorage -> server on login)
router.put("/", protect, async (req, res, next) => {
  try {
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/cart/items — add or increment one item
router.post("/items", protect, async (req, res, next) => {
  try {
    const { product, name, price, image, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const existing = cart.items.find((i) => i.product.toString() === product);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product, name, price, image, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/items/:productId — set exact quantity
router.put("/items/:productId", protect, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    } else {
      const item = cart.items.find((i) => i.product.toString() === req.params.productId);
      if (item) item.quantity = quantity;
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/items/:productId
router.delete("/items/:productId", protect, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart — clear cart (used after placing an order)
router.delete("/", protect, async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] }, { upsert: true });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
});

export default router;
