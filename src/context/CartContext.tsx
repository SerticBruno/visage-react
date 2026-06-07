'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Product } from '@/data/products';
import { parsePriceCents } from '@/lib/price-utils';
import { getProductStock } from '@/lib/inventory';

const VISITOR_TOKEN_KEY = 'visage-visitor-token';
const CART_SYNC_DEBOUNCE_MS = 5000;

function getOrCreateVisitorToken(): string {
  try {
    const existing = localStorage.getItem(VISITOR_TOKEN_KEY);
    if (existing) return existing;
    const token = crypto.randomUUID();
    localStorage.setItem(VISITOR_TOKEN_KEY, token);
    return token;
  } catch {
    return crypto.randomUUID();
  }
}

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
  | { type: 'REPLACE_ITEMS'; items: CartItem[] }
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
    case 'REPLACE_ITEMS':
      return { ...state, items: action.items };
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
  replaceCartItems: (items: CartItem[]) => void;
  openCart: () => void;
  closeCart: () => void;
  startCheckoutLoading: () => void;
  finishCheckoutLoading: () => void;
  totalItems: number;
  subtotalCents: number;
  /** Call with email+name when user fills checkout form (triggers server sync for pre-checkout recovery) */
  syncEmailToCart: (email: string, name?: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'visage-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    isCheckoutLoading: false,
  });

  const visitorTokenRef = useRef<string | null>(null);
  const syncEmailRef = useRef<{ email: string; name?: string } | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount and initialise visitor token
  useEffect(() => {
    visitorTokenRef.current = getOrCreateVisitorToken();
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

  // Debounced server sync for pre-checkout cart snapshots
  useEffect(() => {
    if (!visitorTokenRef.current) return;

    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);

    syncTimerRef.current = setTimeout(() => {
      const token = visitorTokenRef.current;
      if (!token) return;

      fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorToken: token,
          items: state.items.map((i) => ({
            productId: i.product.id,
            title: i.product.title,
            quantity: i.quantity,
            price: i.product.price,
          })),
          ...(syncEmailRef.current ?? {}),
        }),
      }).catch(() => {
        // silent — cart sync is best-effort
      });
    }, CART_SYNC_DEBOUNCE_MS);

    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
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
  const replaceCartItems = useCallback((items: CartItem[]) => {
    syncEmailRef.current = null;
    dispatch({ type: 'REPLACE_ITEMS', items });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, []);

  const clearCart = useCallback(() => {
    syncEmailRef.current = null;
    dispatch({ type: 'CLEAR_CART' });
    try {
      localStorage.setItem(STORAGE_KEY, '[]');
    } catch {
      // ignore storage errors
    }
    const token = visitorTokenRef.current;
    if (token) {
      fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorToken: token, items: [] }),
      }).catch(() => {
        // silent
      });
    }
  }, []);

  const syncEmailToCart = useCallback((email: string, name?: string) => {
    syncEmailRef.current = { email, name };
    const token = visitorTokenRef.current;
    if (!token || !state.items.length) return;
    // Immediate sync when email is captured (onBlur on checkout form)
    fetch('/api/cart/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorToken: token,
        items: state.items.map((i) => ({
          productId: i.product.id,
          title: i.product.title,
          quantity: i.quantity,
          price: i.product.price,
        })),
        customerEmail: email,
        ...(name ? { customerName: name } : {}),
      }),
    }).catch(() => {
      // silent
    });
  }, [state.items]);
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
      replaceCartItems,
      openCart,
      closeCart,
      startCheckoutLoading,
      finishCheckoutLoading,
      totalItems,
      subtotalCents,
      syncEmailToCart,
    }),
    [
      state.items,
      state.isOpen,
      state.isCheckoutLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      replaceCartItems,
      openCart,
      closeCart,
      startCheckoutLoading,
      finishCheckoutLoading,
      totalItems,
      subtotalCents,
      syncEmailToCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
