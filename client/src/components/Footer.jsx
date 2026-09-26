const Footer = () => {
  return (
    <footer className="mt-24 border-t border-olive/10 bg-olive text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl">Sunflora Organics</h3>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Small-batch skin and hair care, made with cold-pressed oils and
            ingredients we can pronounce. Grown honestly, from farm to face.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sunflower">
            Shop
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li>Face</li>
            <li>Hair</li>
            <li>Body</li>
            <li>Wellness</li>
            <li>Gifting</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sunflower">
            Get in touch
          </h4>
          <p className="mt-3 text-sm text-cream/70">hello@sunfloraorganics.in</p>
          <p className="text-sm text-cream/70">Coimbatore, Tamil Nadu</p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Sunflora Organics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
