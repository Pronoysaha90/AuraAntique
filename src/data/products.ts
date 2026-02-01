import productRubyPendant from '@/assets/product-ruby-pendant.jpg';
import productEmeraldEarrings from '@/assets/product-emerald-earrings.jpg';
import productDiamondRing from '@/assets/product-diamond-ring.jpg';
import productSapphireBracelet from '@/assets/product-sapphire-bracelet.jpg';
import categoryNecklaces from '@/assets/category-necklaces.jpg';
import categoryEarrings from '@/assets/category-earrings.jpg';
import categoryRings from '@/assets/category-rings.jpg';
import categoryBracelets from '@/assets/category-bracelets.jpg';

import { Product } from '@/context/StoreContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Victorian Ruby Pendant',
    material: '18K Gold • Ruby',
    price: 2450,
    originalPrice: 4200,
    image: productRubyPendant,
    category: 'Necklaces',
    rating: 5,
    isOnSale: true,
  },
  {
    id: '2',
    name: 'Emerald Drop Earrings',
    material: '22K Gold • Emerald',
    price: 2850,
    image: productEmeraldEarrings,
    category: 'Earrings',
    rating: 5,
  },
  {
    id: '3',
    name: 'Art Deco Diamond Ring',
    material: 'Platinum & Gold • Diamond',
    price: 1890,
    originalPrice: 4800,
    image: productDiamondRing,
    category: 'Rings',
    rating: 5,
    isOnSale: true,
  },
  {
    id: '4',
    name: 'Sapphire Tennis Bracelet',
    material: '18K White Gold • Sapphire',
    price: 3650,
    image: productSapphireBracelet,
    category: 'Bracelets',
    rating: 5,
  },
];

export const categories = [
  {
    name: 'Necklaces',
    pieces: 24,
    image: categoryNecklaces,
  },
  {
    name: 'Earrings',
    pieces: 32,
    image: categoryEarrings,
  },
  {
    name: 'Rings',
    pieces: 28,
    image: categoryRings,
  },
  {
    name: 'Bracelets',
    pieces: 18,
    image: categoryBracelets,
  },
];

export const testimonials = [
  {
    text: "The Victorian pendant I purchased exceeded expectations. The craftsmanship is extraordinary, and you can truly feel the heritage in every detail.",
    author: "Eleanor Thompson",
    role: "Jewelry Enthusiast",
  },
  {
    text: "AuraAntique has become my go-to for meaningful gifts. Each piece tells a story and the quality is simply unmatched in the market.",
    author: "James Richardson",
    role: "Fashion Designer",
  },
  {
    text: "The attention to detail is remarkable. I've been collecting from AuraAntique for years and the quality is simply unmatched in the market.",
    author: "Sophia Chen",
    role: "Art Collector",
  },
];

export const stats = [
  { value: '15+', label: 'Master Artisans' },
  { value: '500+', label: 'Unique Designs' },
  { value: '10K+', label: 'Happy Clients' },
  { value: '40+', label: 'Years of Excellence' },
];
