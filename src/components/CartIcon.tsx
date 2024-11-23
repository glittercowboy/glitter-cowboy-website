import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartIcon: React.FC = () => {
  const { items, removeFromCart, getCartTotal, getItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Cart Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#2D1B00] hover:opacity-70 transition-opacity"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        
        {/* Item Count Badge */}
        {getItemCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#2D1B00] text-[#EDDABE] text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getItemCount()}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#EDDABE] z-50">
          <div className="p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.artist}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">${item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M6 18L18 6M6 6l12 12" 
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <button 
                    className="mt-4 w-full bg-[#2D1B00] text-[#EDDABE] py-2 rounded-lg hover:opacity-90 transition-opacity"
                    onClick={() => {
                      // Will integrate with Stripe later
                      alert('Stripe integration coming soon!');
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
