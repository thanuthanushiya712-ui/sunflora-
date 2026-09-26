import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const navLinkClass = ({ isActive }) =>
  `relative pb-1 transition-colors hover:text-olive ${
    isActive ? "text-olive after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-sunflower" : "text-ink/70"
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-olive/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Sunflora Organics" className="h-10 w-10 object-contain" />
          <span className="font-display text-2xl tracking-tight text-olive">
            Sunflora <span className="text-sunflower">Organics</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/shop?category=gifting" className={navLinkClass}>
            Gifting
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-5 text-sm font-medium">
          <Link to="/cart" className="relative text-ink/80 hover:text-olive">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[11px] text-cream">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/account" className="text-ink/80 hover:text-olive">
                My account
              </Link>
              <button onClick={logout} className="text-ink/80 hover:text-olive">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-ink/80 hover:text-olive">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
