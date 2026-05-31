'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '@/data/products';
import { parsePriceCents } from '@/lib/price-utils';
import { getProductStock } from '@/lib/inventory';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutLoading: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'START_CHECKOUT_LOADING' }
  | { type: 'FINISH_CHECKOUT_LOADING' }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items };
    case 'ADD_ITEM': {
      const stock = getProductStock(action.product);
      if (stock !== null && stock <= 0) return state;

      const existing = state.items.find((i) => i.product.id === action.product.id);
      const nextQty = existing ? existing.quantity + 1 : 1;
      if (stock !== null && nextQty > stock) return state;

      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: nextQty }
              : i
          )
        : [...state.items, { product: action.product, quantity: 1 }];
      return { ...state, items };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) => {
          if (i.product.id !== action.productId) return i;
          const stock = getProductStock(i.product);
          const quantity =
            stock !== null ? Math.min(action.quantity, stock) : action.quantity;
          return quantity > 0 ? { ...i, quantity } : i;
        }).filter((i) => i.quantity > 0),
      };
    case 'CLEAR_CART':
      if (state.items.length === 0) return state;
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'START_CHECKOUT_LOADING':
      return { ...state, isCheckoutLoading: true };
    case 'FINISH_CHECKOUT_LOADING':
      return { ...state, isCheckoutLoading: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutLoading: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  startCheckoutLoading: () => void;
  finishCheckoutLoading: () => void;
  totalItems: number;
  subtotalCents: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'visage-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    isCheckoutLoading: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed });
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore storage errors
    }
  }, [state.items]);

  const addItem = useCallback(
    (product: Product) => dispatch({ type: 'ADD_ITEM', product }),
    []
  );
  const removeItem = useCallback(
    (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId }),
    []
  );
  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);
  const startCheckoutLoading = useCallback(
    () => dispatch({ type: 'START_CHECKOUT_LOADING' }),
    []
  );
  const finishCheckoutLoading = useCallback(
    () => dispatch({ type: 'FINISH_CHECKOUT_LOADING' }),
    []
  );

  // Sigurnosni timeout ako checkout stranica ne odgovori
  useEffect(() => {
    if (!state.isCheckoutLoading) return;
    const timeout = window.setTimeout(() => {
      dispatch({ type: 'FINISH_CHECKOUT_LOADING' });
    }, 15000);
    return () => window.clearTimeout(timeout);
  }, [state.isCheckoutLoading]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalCents = state.items.reduce(
    (sum, i) => sum + parsePriceCents(i.product.price) * i.quantity,
    0
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      isCheckoutLoading: state.isCheckoutLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      startCheckoutLoading,
      finishCheckoutLoading,
      totalItems,
      subtotalCents,
    }),
    [
      state.items,
      state.isOpen,
      state.isCheckoutLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      startCheckoutLoading,
      finishCheckoutLoading,
      totalItems,
      subtotalCents,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
