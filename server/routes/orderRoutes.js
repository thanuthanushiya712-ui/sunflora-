import express from "express";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Create order (mock checkout — no real payment gateway)
router.post("/", protect, async (req, res, next) => {
  try {
    const { items, shippingAddress, itemsTotal, shippingFee, grandTotal, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      itemsTotal,
      shippingFee,
      grandTotal,
      paymentMethod,
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// Logged-in user's own orders
router.get("/mine", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Admin: all orders
router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Admin: update order status
router.put("/:id/status", protect, adminOnly, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
