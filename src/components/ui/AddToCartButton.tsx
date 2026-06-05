'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { canAddToCart, getMaxQtyMessage, getProductStock } from '@/lib/inventory';
import QtyMaxHintTooltip from '@/components/ui/QtyMaxHintTooltip';
import StockNotifyButton from '@/components/ui/StockNotifyButton';
import { FaShoppingCart, FaCheck, FaMinus, FaPlus } from 'react-icons/fa';

interface Props {
  product: Product;
  variant?: 'primary' | 'secondary' | 'icon' | 'quantity' | 'card';
  className?: string;
}

export default function AddToCartButton({ product, variant = 'primary', className = '' }: Props) {
  const { addItem, items, updateQuantity } = useCart();
  const [added, setAdded] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const [selectQty, setSelectQty] = useState(1);
  const [maxQtyHint, setMaxQtyHint] = useState(false);
  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxQtyHintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartQty = items.find((i) => i.product.id === product.id)?.quantity ?? 0;
  const stock = getProductStock(product);
  const outOfStock = stock !== null && stock <= 0;
  const maxReached = stock !== null && !outOfStock && cartQty >= stock;

  useEffect(() => {
    return () => {
      if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
      if (maxQtyHintTimerRef.current) clearTimeout(maxQtyHintTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setSelectQty(1);
    setMaxQtyHint(false);
  }, [product.id]);

  const flashMaxQtyHint = () => {
    setMaxQtyHint(true);
    if (maxQtyHintTimerRef.current) clearTimeout(maxQtyHintTimerRef.current);
    maxQtyHintTimerRef.current = setTimeout(() => setMaxQtyHint(false), 2500);
  };

  const flashAdded = () => {
    setAdded(true);
    setPopKey((k) => k + 1);
    if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => setAdded(false), 1600);
  };

  const handleAddOnce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (outOfStock || !canAddToCart(product, cartQty, 1)) return;
    addItem(product);
    flashAdded();
  };

  if (outOfStock) {
    return <StockNotifyButton product={product} variant={variant} className={className} />;
  }

  if (variant === 'quantity') {
    const maxSelectable = stock !== null ? Math.max(1, stock - cartQty) : 99;

    const handleMinus = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectQty((q) => Math.max(1, q - 1));
    };

    const handlePlus = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectQty >= maxSelectable) {
        if (stock !== null) flashMaxQtyHint();
        return;
      }
      setSelectQty((q) => q + 1);
    };

    const atMaxSelectable = stock !== null && selectQty >= maxSelectable;
    const maxQtyMessage =
      stock !== null ? getMaxQtyMessage(stock, maxSelectable, cartQty) : '';

    const handleAddSelected = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!canAddToCart(product, cartQty, selectQty)) return;
      if (cartQty === 0) {
        addItem(product);
        if (selectQty > 1) updateQuantity(product.id, selectQty);
      } else {
        updateQuantity(product.id, cartQty + selectQty);
      }
      flashAdded();
    };

    return (
      <div
        className={`flex flex-col gap-1 w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 w-full">
          <QtyMaxHintTooltip show={maxQtyHint} message={maxQtyMessage}>
            <div
              className={`flex items-center gap-0.5 bg-slate-100 rounded-lg px-1 py-0.5 flex-shrink-0 ${
                maxQtyHint ? 'animate-qty-max-shake' : ''
              }`}
            >
              <button
                type="button"
                onClick={handleMinus}
                disabled={selectQty <= 1}
                aria-label="Smanji količinu"
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaMinus className="w-2.5 h-2.5" />
              </button>
              <span className="text-xs font-semibold text-slate-900 w-6 text-center tabular-nums">
                {selectQty}
              </span>
              <button
                type="button"
                onClick={handlePlus}
                aria-label={atMaxSelectable ? 'Maksimalna količina' : 'Povećaj količinu'}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  atMaxSelectable
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FaPlus className="w-2.5 h-2.5" />
              </button>
            </div>
          </QtyMaxHintTooltip>

          <button
            type="button"
            onClick={handleAddSelected}
            disabled={maxReached && cartQty > 0}
            className={`
              flex flex-1 items-center justify-center gap-1.5 min-w-0 px-3 py-2 rounded-lg text-xs font-medium shadow-sm transition-all duration-300 cursor-pointer
              ${added
                ? 'bg-[#5ba2ff] text-white scale-[1.02] shadow-[0_4px_6px_-1px_rgb(91_162_255_/_0.35),0_2px_4px_-2px_rgb(91_162_255_/_0.25)]'
                : maxReached && cartQty > 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-black text-white hover:shadow'
              }
            `}
            style={{ transitionTimingFunction: added ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease' }}
          >
            {added ? <FaCheck className="w-3.5 h-3.5 flex-shrink-0" /> : <FaShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />}
            <span className="truncate">
              {added ? 'Dodano!' : maxReached && cartQty > 0 ? 'Maks. zaliha' : 'Dodaj u košaricu'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={handleAddOnce}
        disabled={maxReached && cartQty > 0}
        title={added ? 'Dodano' : maxReached && cartQty > 0 ? 'Maksimalna zaliha' : 'Dodaj u košaricu'}
        className={`
          group flex items-center justify-center gap-1 sm:gap-1.5 min-w-[7rem] sm:min-w-[11rem] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transform-gpu transition-all duration-200 ease-out cursor-pointer
          ${
            added
              ? 'bg-[#5ba2ff] text-white shadow-[0_4px_6px_-1px_rgb(91_162_255_/_0.35),0_2px_4px_-2px_rgb(91_162_255_/_0.25)]'
              : maxReached && cartQty > 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm'
                : 'bg-slate-700 text-white shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/20 active:translate-y-0 active:scale-[0.98]'
          }
          ${className}
        `}
        style={{ transitionTimingFunction: added ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease' }}
      >
        {added ? (
          <FaCheck className="w-3.5 h-3.5 flex-shrink-0" />
        ) : (
          <FaShoppingCart className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
        )}
        <span className="truncate">
          {added ? (
            'Dodano'
          ) : maxReached && cartQty > 0 ? (
            <>
              <span className="sm:hidden">Maks.</span>
              <span className="hidden sm:inline">Maks. zaliha</span>
            </>
          ) : (
            <>
              <span className="sm:hidden">U košaricu</span>
              <span className="hidden sm:inline">Dodaj u košaricu</span>
            </>
          )}
        </span>
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleAddOnce}
        title={added ? 'Dodano!' : 'Dodaj u košaricu'}
        className={`
          relative p-2 rounded-full shadow transition-all duration-300 cursor-pointer overflow-visible
          ${added
            ? 'bg-green-500 text-white scale-110 rotate-12'
            : 'bg-white/90 hover:bg-white text-gray-700 hover:text-black hover:scale-110'
          }
          ${className}
        `}
        style={{ transitionTimingFunction: added ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease' }}
      >
        {popKey > 0 && (
          <span
            key={popKey}
            className="absolute left-1/2 -top-1 z-10 pointer-events-none text-[11px] font-bold text-emerald-600 animate-cart-add-pop"
            aria-hidden
          >
            +1
          </span>
        )}
        {added ? <FaCheck className="w-4 h-4 relative z-0" /> : <FaShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        type="button"
        onClick={handleAddOnce}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer
          ${added
            ? 'bg-green-500 border-green-500 text-white scale-[1.03]'
            : 'border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
          }
          ${className}
        `}
      >
        {added ? <FaCheck className="w-4 h-4" /> : <FaShoppingCart className="w-4 h-4" />}
        {added ? 'Dodano!' : 'U košaricu'}
      </button>
    );
  }

  // primary
  return (
    <button
      type="button"
      onClick={handleAddOnce}
      className={`
        flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 cursor-pointer
        ${added
          ? 'bg-green-500 text-white scale-[1.02] shadow-green-200 shadow-md'
          : 'bg-gray-900 hover:bg-black text-white hover:shadow'
        }
        ${className}
      `}
      style={{ transitionTimingFunction: added ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease' }}
    >
      {added ? <FaCheck className="w-4 h-4" /> : <FaShoppingCart className="w-4 h-4" />}
      {added ? 'Dodano u košaricu!' : 'Dodaj u košaricu'}
    </button>
  );
}
