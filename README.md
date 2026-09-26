# Sunflora Organics 🌻

A full-stack MERN e-commerce website for an organic skincare brand, in the
style of brands like Deyga and Vilvah — cold-pressed oils, honest
ingredients, warm earthy branding.

## Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt
- **Checkout:** Mock — orders are recorded in the database (Cash on
  Delivery style), no real payment gateway is wired up. Swap in
  Razorpay/Stripe later if you need real payments.

## Project structure

```
sunflora-organics/
  client/     React frontend (Vite)
  server/     Express + MongoDB backend
```

## Quick start (one command)

From the project root:

```bash
npm run install:all   # installs both server/ and client/ dependencies
npm run dev            # starts backend (port 5000) and frontend (port 5173) together
```

You'll still need to do the one-time setup first: copy `server/.env.example`
to `server/.env` and add your `MONGO_URI` + `JWT_SECRET`, then run
`npm run seed --prefix server` once to load sample products. After that,
`npm run dev` from the root is all you need every time.

## 1. Backend setup (manual / step-by-step)

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI (Atlas or local) and a random JWT_SECRET
npm run seed   # loads 6 sample products into your database
npm run dev    # starts the API on http://localhost:5000
```

## 2. Frontend setup

```bash
cd client
npm install
cp .env.example .env
# VITE_API_URL should point at your backend, e.g. http://localhost:5000/api
npm run dev    # starts the site on http://localhost:5173
```

## 3. Creating an admin account

Sign up normally through the site (`/signup`), then in MongoDB (Atlas UI,
Compass, or `mongosh`) change that user's `role` field from `"customer"`
to `"admin"`:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } });
```

Log out and back in — you'll now see an **Admin** link in the navbar at
`/admin`, where you can add/edit/delete products and update order status.

## Branding

The Sunflora Organics logo lives at `client/public/logo.png` — it's used
as the site favicon, in the navbar mark, and as the opening brand splash
at the top of the homepage. Swap that file out any time to update the
logo everywhere at once.

## Features

- Product listing with category filter + search
- Product detail page with quantity selector
- Cart (persisted in localStorage) — a full backend Cart API also exists
  at `/api/cart` (get/add/update/remove/clear) if you want to move the
  cart server-side later
- Signup/login with JWT, protected checkout and account routes
- Checkout with shipping address form + payment method selection
  (Cash on Delivery / Card / UPI — Card and UPI are mocked, no real
  gateway is called)
- Order success page
- **My account** page: order history + editable profile details (name,
  phone, address), backed by `GET/PUT /api/auth/me`
- Admin dashboard: product CRUD + order status management

## Deploying (matches your other projects' setup)

- **Frontend:** deploy `client/` to Vercel. Set `VITE_API_URL` to your
  deployed backend URL as an environment variable.
- **Backend:** deploy `server/` to Render. Set `MONGO_URI`, `JWT_SECRET`,
  and `CLIENT_URL` (your Vercel URL, for CORS) as environment variables.

## Next steps you might want

- Real payment gateway (Razorpay works well for INR)
- Product image uploads (e.g. Cloudinary) instead of the placeholder icon
- Order emails via Nodemailer (you've already used this in your Bulk Mail
  project, so the setup will feel familiar)
- Wishlist / reviews
