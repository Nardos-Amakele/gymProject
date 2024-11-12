"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const BMIComponent = () => {
  const t = useTranslations("home_Page.bmiSection.form");

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setBmi(null);
    setMessage("");
  };

  const validateInputs = () => {
    const weightPattern = /^\d+(\.\d+)?$/;
    const heightPattern = /^\d+(\.\d+)?$/;
    const agePattern = /^\d+$/;

    if (!weightPattern.test(weight) || !heightPattern.test(height)) {
      setMessage("Please enter valid numbers for weight and height.");
      return false;
    }

    if (!agePattern.test(age) || parseInt(age) <= 0) {
      setMessage("Please enter a valid age.");
      return false;
    }

    return true;
  };

  const calculateBMI = () => {
  if (validateInputs()) {
    const bmiValue = parseFloat(weight) / (parseFloat(height) * parseFloat(height));
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setMessage(t("messages.underweight"));
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage(t("messages.goodHealth"));
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage(t("messages.overweight"));
    } else {
      setMessage(t("messages.obese"));
    }
  } else {
    setBmi(null);
  }
};

  return (
    <div className="bg-black text-white p-2 lg:p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-customBlue mb-6">{t("title")}</h1>

      {bmi === null ? (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm">{t("weight.label")}</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={t("weight.placeholder")}
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm">{t("height.label")}</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={t("height.placeholder")}
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm">{t("age.label")}</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t("age.placeholder")}
            />
          </div>

          <button
            className="bg-customBlue py-2 px-4 rounded text-white font-bold hover:bg-customHoverBlue transition duration-300 w-full"
            onClick={calculateBMI}
          >
            {t("calculateButton")}
          </button>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg h-72">
          <div className="flex items-center justify-between h-full">
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold mb-2">
                {t("bmiLabel")}: <span className="text-customBlue">{bmi.toFixed(1)}</span>
              </p>
              <p className="text-lg">{message}</p>
            </div>

            <button
              className="bg-customBlue p-2 rounded-full text-white hover:bg-customHoverBlue transition duration-300 flex items-center"
              onClick={resetCalculator}
            >
              <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIComponent;
