import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, CreditCard, Truck, Shield, Lock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { toast } from 'sonner';
import { z } from 'zod';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(50),
  lastName: z.string().min(2, 'Last name is required').max(50),
  email: z.string().email('Invalid email address').max(100),
  address: z.string().min(5, 'Address is required').max(200),
  city: z.string().min(2, 'City is required').max(100),
  zipCode: z.string().min(3, 'Zip code is required').max(20),
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(19),
  expiryDate: z.string().min(5, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV is required').max(4),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { state, setCheckoutOpen, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Lock body scroll when checkout is open
  useEffect(() => {
    if (state.isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isCheckoutOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      checkoutSchema.parse(formData);
      setStep('success');
      clearCart();
      toast.success('Order placed successfully!');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as keyof CheckoutFormData] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setStep('form');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
  };

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-background border-2 rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 ${
      hasError ? 'border-destructive' : 'border-border/50 hover:border-border'
    }`;

  return (
    <AnimatePresence>
      {state.isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/90"
          />

          {/* Checkout Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[90vh] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 bg-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Lock className="w-4 h-4 text-accent" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-foreground">
                  {step === 'form' ? 'Secure Checkout' : 'Order Confirmed'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 py-4 px-4 bg-muted/30 rounded-xl border border-border/30">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                      <Shield className="w-4 h-4 text-accent" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                      <Truck className="w-4 h-4 text-accent" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                      <CreditCard className="w-4 h-4 text-accent" />
                      <span>Easy Payment</span>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={inputClasses(!!errors.firstName)}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1.5">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={inputClasses(!!errors.lastName)}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1.5">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClasses(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Shipping Address
                    </h3>
                    <div>
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={inputClasses(!!errors.address)}
                      />
                      {errors.address && (
                        <p className="text-xs text-destructive mt-1.5">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={inputClasses(!!errors.city)}
                        />
                        {errors.city && (
                          <p className="text-xs text-destructive mt-1.5">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="Zip Code"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={inputClasses(!!errors.zipCode)}
                        />
                        {errors.zipCode && (
                          <p className="text-xs text-destructive mt-1.5">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Payment Details
                    </h3>
                    <div>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        className={inputClasses(!!errors.cardNumber)}
                      />
                      {errors.cardNumber && (
                        <p className="text-xs text-destructive mt-1.5">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          maxLength={5}
                          className={inputClasses(!!errors.expiryDate)}
                        />
                        {errors.expiryDate && (
                          <p className="text-xs text-destructive mt-1.5">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          className={inputClasses(!!errors.cvv)}
                        />
                        {errors.cvv && (
                          <p className="text-xs text-destructive mt-1.5">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="pt-4 mt-2 border-t border-border/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-accent font-medium">Free</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-xl font-display text-accent">
                        ${cartTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 btn-gold rounded-xl text-base font-semibold tracking-wide"
                  >
                    Place Order
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">
                    Thank You for Your Order!
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                    Your order has been confirmed. We'll send you an email with tracking 
                    information once your jewelry has shipped.
                  </p>
                  <motion.button 
                    onClick={handleClose} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold rounded-xl px-10"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
