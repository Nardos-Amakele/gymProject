"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "../../../../i18n/routing";
import { useCart } from "./CartContext";
import {
  faShoppingCart,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "@/lib/formatters";
import { useTranslations } from "next-intl";

const CartModal = () => {
  const t = useTranslations("cart");

  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bg-black bg-opacity-50 z-20 "
          onClick={toggleCart}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-black  shadow-xl z-40 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl "
          onClick={toggleCart}
        >
          ✕
        </button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
          {t("heading")}
          </h2>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 p-2 bg-black border border-customBlue    rounded-sm hover:bg-complimentSeventy transition-all duration-300 ease-in-out relative"
                >
                  <>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-customBlue text-lg">
                        {item.name}
                      </h3>
                      <p className="text-customBlue">Qty: {item.quantity}</p>
                      <p className="text-customBlue font-semibold">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </>

                  <button
                    className="absolute top-10 right-8 text-white/75 hover:text-white/100 "
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white text-center">Your cart is empty</p>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex justify-between text-white text-lg font-semibold">
                <span>{t("subtotal")}</span>
                <span className="text-white">{t("currency")}{subtotal.toFixed(2)}</span>
              </div>
              <button
                className="w-full py-3 border-customBlue border-1 text-white rounded-full shadow-lg hover:scale-105  transition-all duration-300 ease-in-out"
                onClick={clearCart}
              >
              {t("buttons.clear_cart")}
              </button>
              <Link href="/Shop/checkout">
                <button className="w-full py-3 bg-customBlue mt-5 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                {t("buttons.proceed_checkout")}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleCart}
        className="sticky top-18 left-4 p-3 bg-accentthirty text-white rounded-full shadow-lg hover:bg-thirty transition-all z-30"
      >
        <FontAwesomeIcon icon={faShoppingCart} size="xl" />
        {totalItems >= 1 && (
          <span className="absolute top-0 right-0 text-xs bg-customBlue text-white rounded-full h-5 w-5 flex items-center justify-center transition-all">
            {totalItems}
          </span>
        )}
      </button>
    </>
  );
};

export default CartModal;
