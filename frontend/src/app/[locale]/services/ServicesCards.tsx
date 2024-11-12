import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface ServiceCardProps {
  title: string;
  price: string;
  benefits: string[];
  isPremium?: boolean;
  isPerDay?: boolean;
  onClick: () => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  price,
  benefits,
  isPremium,
  isPerDay,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`p-8 rounded-lg shadow-lg space-y-6 border transition-all duration-300 transform hover:scale-10 hover:border-[#2596BE] h-[29rem] w-[20rem] flex flex-col justify-between ${className} ${
        isPremium
          ? "bg-gradient-to-r from-[#2596BE] to-[#00BFFF] text-black"
          : "bg-gray-800 text-white"
      } ${className}`}
      style={{ transform: className ? `scale(${className})` : "scale(1)" }}
    >
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p
          className={`text-4xl font-bold ${
            isPremium ? "text-black" : "text-[#2596BE]"
          }`}
        >
          {price}
        </p>
        <div className="space-y-4 pt-9">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-2 text-left">
              <FontAwesomeIcon
                icon={faCheck}
                className={`text-[#2596BE] w-5 h-5 ${
                  isPremium ? "text-black" : "text-[#2596BE]"
                }`}
              />
              <p
                className={`${isPremium ? "text-[#000000]" : "text-gray-400"}`}
              >
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onClick}
        className={`p-2 transition-all duration-300 transform hover:scale-110 ${
          isPremium
            ? "bg-black text-white hover:bg-gray-700"
            : "bg-[#2596BE] hover:bg-[#007EA7]"
        }`}
      >
        {isPerDay ? "In Person" : "Purchase"}
      </button>
    </div>
  );
};

export default ServiceCard;
