'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const BMIComponent = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setBmi(null);
    setMessage('');
  };

  const validateInputs = () => {
    const weightPattern = /^\d+(\.\d+)?$/; 
    const heightPattern = /^\d+(\.\d+)?$/; 
    const agePattern = /^\d+$/; 

    if (!weightPattern.test(weight) || !heightPattern.test(height)) {
      setMessage('Please enter valid numbers for weight and height.');
      return false;
    }

    if (!agePattern.test(age) || parseInt(age) <= 0) {
      setMessage('Please enter a valid age.');
      return false;
    }

    return true;
  };

  const calculateBMI = () => {
    if (validateInputs()) {
      const bmiValue = parseFloat(weight) / (parseFloat(height) * parseFloat(height));
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setMessage('You are underweight, nutritional tracking and frequent exercises might be good for you.');
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setMessage('You are in good health! Bodybuilding maybe?');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setMessage('You are overweight. Join our group fitness exercises.');
      } else {
        setMessage('You are obese. Get individualized training from our personal trainers.');
      }
    } else {
      setBmi(null); 
    }
  };

  return (
    <div className="bg-black text-white p-2 lg:p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-customBlue mb-6">Check your BMI</h1>

      {bmi === null ? (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm">Weight (kg)</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm">Height (m)</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm">Age</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </div>

          <button
            className="bg-customBlue py-2 px-4 rounded text-white font-bold hover:bg-customHoverBlue transition duration-300 w-full"
            onClick={calculateBMI}
          >
            Calculate
          </button>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg h-72"> 
          <div className="flex items-center justify-between h-full"> {/* Flexbox to center content */}
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold mb-2">
                Your BMI: <span className="text-customBlue">{bmi.toFixed(1)}</span>
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
