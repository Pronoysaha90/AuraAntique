import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Product Types
export interface Product {
  id: string;
  name: string;
  material: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isOnSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

// State Types
interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
}

// Action Types
type StoreAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: Product }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'SET_CHECKOUT_OPEN'; payload: boolean };

// Initial State
const initialState: StoreState = {
  cart: [],
  wishlist: [],
  isCartOpen: false,
  isCheckoutOpen: false,
};

// Reducer
function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'TOGGLE_WISHLIST': {
      const isInWishlist = state.wishlist.some(item => item.id === action.payload.id);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(item => item.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }
    case 'SET_CART_OPEN':
      return {
        ...state,
        isCartOpen: action.payload,
      };
    case 'SET_CHECKOUT_OPEN':
      return {
        ...state,
        isCheckoutOpen: action.payload,
      };
    default:
      return state;
  }
}

// Context
interface StoreContextType {
  state: StoreState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (product: Product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const isInWishlist = (productId: string) => {
    return state.wishlist.some(item => item.id === productId);
  };

  const setCartOpen = (open: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: open });
  };

  const setCheckoutOpen = (open: boolean) => {
    dispatch({ type: 'SET_CHECKOUT_OPEN', payload: open });
  };

  const cartTotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setCartOpen,
        setCheckoutOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
