import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, useStore } from '@/context/StoreContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, state } = useStore();
  const inWishlist = isInWishlist(product.id);
  const inCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      description: 'View your cart to checkout',
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.success(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      {
        description: product.name,
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card-product group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover img-zoom"
        />

        {/* Sale Badge */}
        {product.isOnSale && <span className="badge-sale rounded">Sale</span>}

        {/* Action Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              inWishlist
                ? 'bg-burgundy text-foreground'
                : 'bg-background/50 text-foreground hover:bg-burgundy'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Add to Cart Icon */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              inCart
                ? 'bg-gold text-background'
                : 'bg-background/50 text-foreground hover:bg-gold hover:text-background'
            }`}
          >
            <ShoppingBag className={`w-4 h-4 ${inCart ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Material */}
        <p className="text-xs text-gold uppercase tracking-wider mb-2">
          {product.material}
        </p>

        {/* Name */}
        <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating ? 'fill-gold text-gold' : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-foreground">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
