import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartProps {
  cartItems: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onSubmit: () => void; // Function to handle submit
}

const Cart: React.FC<CartProps> = ({ cartItems, isOpen, onClose, onRemoveItem, onSubmit }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3 bg-black shadow-lg z-50 transition-transform ${
        isOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center p-4 bg-black text-white">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 flex-grow overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between my-4 p-2 border-b">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button onClick={() => onRemoveItem(item.id)} className="text-customBlue">
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>

      <div className="p-4">
        <button
          onClick={onSubmit}
          className="w-full bg-customBlue text-white font-bold py-2 rounded shadow hover:bg-customHoverBlue transition"
        >
          Get
        </button>
      </div>
    </div>
  );
};

export default Cart;