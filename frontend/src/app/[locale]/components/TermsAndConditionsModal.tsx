import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#131313] text-white p-8 rounded-lg max-w-4xl w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Modal Content */}
        <h1 className="text-2xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-customBlue scrollbar-track-customBlue">
          {[
            {
              title: "Maintaining Personal Hygiene",
              text: "It is mandatory for every individual to maintain personal cleanliness.",
            },
            {
              title: "Wearing Sports Armor",
              text: "Anyone entering the sports area must wear proper sports attire.",
            },
            {
              title: "Prohibited Items",
              text: "Items with strong scents, such as perfumes or deodorants, are not allowed in the sports hall.",
            },
            {
              title: "Respect for Equipment",
              text: "Use gym equipment responsibly without disturbing others or causing damage.",
            },
            {
              title: "Returning Equipment",
              text: "Return equipment to its proper place after use to maintain sportsmanship.",
            },
            {
              title: "Clearing Space",
              text: "Release equipment after use to allow others to work.",
            },
            {
              title: "Camera Awareness",
              text: "Avoid unnecessary behaviors as you are being monitored by cameras.",
            },
            {
              title: "Locker Use",
              text: "Use the locker appropriately and don’t forget to return the key after use.",
            },
            {
              title: "Waste Disposal",
              text: "Properly dispose of items like gum or personal care products in designated bins.",
            },
            {
              title: "Shoes",
              text: "Store shoes in the provided locker; the center is not liable for lost property.",
            },
            {
              title: "Gym Hours",
              text: "Respect the gym’s opening hours and behave in a sportsmanlike manner.",
            },
          ].map((item, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
