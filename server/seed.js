import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Sunflora Glow Face Oil",
    slug: "sunflora-glow-face-oil",
    description:
      "Cold-pressed sunflower and rosehip oil blend that sinks in fast and leaves skin dewy, never greasy. Rich in vitamin E to help even out tone over time.",
    shortDescription: "Cold-pressed face oil for a natural glow",
    category: "face",
    price: 499,
    compareAtPrice: 599,
    stock: 40,
    ingredients: ["Cold-pressed sunflower oil", "Rosehip oil", "Vitamin E", "Lavender essential oil"],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.7,
  },
  {
    name: "Sunflora Turmeric & Honey Cleanser",
    slug: "sunflora-turmeric-honey-cleanser",
    description:
      "A gentle gel cleanser with raw honey and turmeric that lifts away the day without stripping your skin's natural barrier.",
    shortDescription: "Gentle daily cleanser",
    category: "face",
    price: 349,
    stock: 60,
    ingredients: ["Raw honey", "Turmeric extract", "Aloe vera", "Coconut-derived surfactant"],
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.6,
  },
  {
    name: "Sunflora Hibiscus Hair Growth Oil",
    slug: "sunflora-hibiscus-hair-growth-oil",
    description:
      "A traditional blend of hibiscus, curry leaf and coconut oil, slow-infused to support stronger, thicker-looking hair.",
    shortDescription: "Traditional hibiscus + curry leaf oil",
    category: "hair",
    price: 429,
    stock: 35,
    ingredients: ["Coconut oil", "Hibiscus extract", "Curry leaf extract", "Fenugreek"],
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.8,
  },
  {
    name: "Sunflora Coffee & Cocoa Body Scrub",
    slug: "sunflora-coffee-cocoa-body-scrub",
    description:
      "Exfoliating scrub made with ground coffee and cocoa butter to polish skin and leave behind a warm, chocolatey scent.",
    shortDescription: "Exfoliating coffee body scrub",
    category: "body",
    price: 379,
    stock: 50,
    ingredients: ["Ground coffee", "Cocoa butter", "Brown sugar", "Almond oil"],
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.5,
  },
  {
    name: "Sunflora Calming Chamomile Roll-On",
    slug: "sunflora-calming-chamomile-roll-on",
    description:
      "A pocket-sized aromatherapy roll-on with chamomile and lavender to ease you through stressful moments.",
    shortDescription: "On-the-go aromatherapy roll-on",
    category: "wellness",
    price: 249,
    stock: 70,
    ingredients: ["Chamomile essential oil", "Lavender essential oil", "Jojoba oil"],
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.4,
  },
  {
    name: "Sunflora Self-Care Gift Box",
    slug: "sunflora-self-care-gift-box",
    description:
      "A curated box with our bestselling face oil, hair oil and roll-on, wrapped in recyclable kraft packaging — ready to gift.",
    shortDescription: "Curated 3-piece gift set",
    category: "gifting",
    price: 999,
    compareAtPrice: 1199,
    stock: 25,
    ingredients: [
      "Sunflora Glow Face Oil",
      "Sunflora Hibiscus Hair Growth Oil",
      "Sunflora Calming Chamomile Roll-On",
    ],
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.9,
  },
  {
    name: "Sunflora Rosewater Toner",
    slug: "sunflora-rosewater-toner",
    description:
      "Steam-distilled rosewater with a touch of witch hazel to tighten pores, balance pH, and prep skin for serums and oils.",
    shortDescription: "Alcohol-free hydrating toner",
    category: "face",
    price: 299,
    stock: 55,
    ingredients: ["Rosewater", "Witch hazel", "Glycerin"],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.5,
  },
  {
    name: "Sunflora Vitamin C Serum",
    slug: "sunflora-vitamin-c-serum",
    description:
      "A lightweight brightening serum with stabilized vitamin C and niacinamide to fade dark spots and even out skin tone.",
    shortDescription: "Brightening daily serum",
    category: "face",
    price: 599,
    compareAtPrice: 699,
    stock: 30,
    ingredients: ["Vitamin C (Sodium Ascorbyl Phosphate)", "Niacinamide", "Hyaluronic acid"],
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.6,
  },
  {
    name: "Sunflora Clay Mask",
    slug: "sunflora-clay-mask",
    description:
      "Multani mitti and bentonite clay draw out excess oil and impurities, leaving pores visibly tighter after just one use.",
    shortDescription: "Deep-cleansing clay mask",
    category: "face",
    price: 349,
    stock: 45,
    ingredients: ["Multani mitti", "Bentonite clay", "Neem extract"],
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.3,
  },
  {
    name: "Sunflora Onion Hair Shampoo",
    slug: "sunflora-onion-hair-shampoo",
    description:
      "A sulfate-free shampoo with onion seed oil and biotin to reduce hair fall and add shine, without weighing hair down.",
    shortDescription: "Sulfate-free anti-hairfall shampoo",
    category: "hair",
    price: 399,
    stock: 50,
    ingredients: ["Onion seed oil", "Biotin", "Aloe vera", "Coconut-derived cleanser"],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.7,
  },
  {
    name: "Sunflora Rice Water Hair Serum",
    slug: "sunflora-rice-water-hair-serum",
    description:
      "Fermented rice water and argan oil smooth the hair cuticle for a soft, frizz-free finish that lasts all day.",
    shortDescription: "Frizz-control leave-in serum",
    category: "hair",
    price: 449,
    stock: 30,
    ingredients: ["Fermented rice water", "Argan oil", "Silk amino acids"],
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.4,
  },
  {
    name: "Sunflora Neem & Tea Tree Anti-Dandruff Oil",
    slug: "sunflora-neem-tea-tree-anti-dandruff-oil",
    description:
      "A scalp oil blending neem and tea tree to calm itchiness and flaking, with a light, non-greasy after-feel.",
    shortDescription: "Scalp-soothing anti-dandruff oil",
    category: "hair",
    price: 379,
    stock: 40,
    ingredients: ["Neem oil", "Tea tree oil", "Coconut oil"],
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.5,
  },
  {
    name: "Sunflora Shea Butter Body Lotion",
    slug: "sunflora-shea-butter-body-lotion",
    description:
      "A fast-absorbing lotion with whipped shea butter and sunflower seed oil that leaves skin soft for hours, not just minutes.",
    shortDescription: "Everyday moisturizing body lotion",
    category: "body",
    price: 349,
    stock: 60,
    ingredients: ["Shea butter", "Sunflower seed oil", "Vitamin E"],
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.6,
  },
  {
    name: "Sunflora Charcoal Detox Soap",
    slug: "sunflora-charcoal-detox-soap",
    description:
      "Activated charcoal and tea tree cold-processed soap that lifts away dirt and excess oil without over-drying skin.",
    shortDescription: "Cold-processed detox bar soap",
    category: "body",
    price: 199,
    stock: 80,
    ingredients: ["Activated charcoal", "Tea tree oil", "Coconut oil base"],
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.4,
  },
  {
    name: "Sunflora Lavender Sleep Mist",
    slug: "sunflora-lavender-sleep-mist",
    description:
      "A calming pillow and room mist with lavender and chamomile essential oils to help you wind down at night.",
    shortDescription: "Calming pillow & room mist",
    category: "wellness",
    price: 279,
    stock: 45,
    ingredients: ["Lavender essential oil", "Chamomile essential oil", "Distilled water"],
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.6,
  },
  {
    name: "Sunflora Herbal Immunity Tea",
    slug: "sunflora-herbal-immunity-tea",
    description:
      "A caffeine-free herbal blend of tulsi, ginger and turmeric, steeped daily to support digestion and immunity.",
    shortDescription: "Caffeine-free tulsi-ginger tea",
    category: "wellness",
    price: 329,
    stock: 50,
    ingredients: ["Tulsi", "Dried ginger", "Turmeric", "Black pepper"],
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    isFeatured: false,
    rating: 4.5,
  },
  {
    name: "Sunflora Bridal Glow Hamper",
    slug: "sunflora-bridal-glow-hamper",
    description:
      "A pre-wedding skin prep hamper with our face oil, vitamin C serum, clay mask and rosewater toner in a keepsake box.",
    shortDescription: "4-piece bridal skin prep hamper",
    category: "gifting",
    price: 1499,
    compareAtPrice: 1799,
    stock: 15,
    ingredients: [
      "Sunflora Glow Face Oil",
      "Sunflora Vitamin C Serum",
      "Sunflora Clay Mask",
      "Sunflora Rosewater Toner",
    ],
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    isFeatured: true,
    rating: 4.8,
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected. Seeding products...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
