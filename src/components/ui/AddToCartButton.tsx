'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

interface Props {
  product: Product;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
}

export default function AddToCartButton({ product, variant = 'primary', className = '' }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        title={added ? 'Dodano!' : 'Dodaj u košaricu'}
        className={`
          relative p-2 rounded-full shadow transition-all duration-300 cursor-pointer
          ${added
            ? 'bg-green-500 text-white scale-110 rotate-12'
            : 'bg-white/90 hover:bg-white text-gray-700 hover:text-black hover:scale-110'
          }
          ${className}
        `}
        style={{ transitionTimingFunction: added ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease' }}
      >
        {added
          ? <FaCheck className="w-4 h-4" />
          : <FaShoppingCart className="w-4 h-4" />
        }
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
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
      onClick={handleClick}
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
