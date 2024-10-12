'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { services } from '../../assets/data/servicesData';

interface Service {
  title: string;
  price: string;
  benefits: string[];
}

type ServiceCategory = keyof typeof services;

const Register = () => {
  const router = useRouter(); 
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Body Building');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackages((prevSelected) =>
      prevSelected.includes(packageName)
        ? prevSelected.filter((name) => name !== packageName)
        : [...prevSelected, packageName]
    );
  };

  const [error, setError] = useState<string | null>(null);

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (selectedPackages.length === 0) {
      setError("Please choose at least one package.");
      return;
    }

    const totalPrice = selectedPackages.reduce(
      (total, packageName) =>
        total + parseFloat(services[selectedCategory].find(service => service.title === packageName)?.price || '0'),
      0
    );
    setError(null);

    // Perform client-side navigation with App Router's router.push
    router.push(`/Register/registerSummary?packages=${encodeURIComponent(JSON.stringify(selectedPackages))}&total=${totalPrice.toFixed(2)}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex">
        {/* Form Section */}
        <div className="w-1/3 flex justify-center items-center bg-black">
          <div className="text-white bg-black bg-opacity-75 p-8 rounded-md w-4/5">
            <h2 className="text-3xl mb-8 text-center">Basic Information</h2>
            <form className="flex flex-col items-center w-full">
              {/* Form fields */}
              <div className="mb-4 w-full">
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Full name"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Phone number"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="text"
                  id="address"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Address"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="date"
                  id="dob"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="tel"
                  id="emergency"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Emergency number"
                />
              </div>

              {/* Gender Selection */}
              <div className="mb-6 w-full">
                <h2 className="text-white/40 text-lg mb-2">Gender</h2>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="form-radio h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-radio h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full p-2 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black" onClick={handleNextClick}>
                Next
              </button>
              {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            </form>
          </div>
        </div>

        {/* Package Selection Section */}
        <div className="w-1/2 p-8 pt-16 bg-black ">
          <div className="mb-2">
            <h1 className="text-white/40 text-xl">Choose a Package</h1>
          </div>

          <div className='flex flex-col justify-start'>
            {/* Sidebar section */}
            <div className="w-1/3 bg-black p-4 ml-[-1rem] flex flex-row justify-between ">
              {/* Category buttons */}
              <div className="mb-8 flex flex-row justify-center gap-10">
                {Object.keys(services).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as ServiceCategory)}
                    className={`w-full text-left py-2 px-4 mb-2 rounded-lg text-sm font-semibold hover:bg-customBlue hover:text-black ${
                      selectedCategory === category ? 'bg-customBlue text-black' : 'bg-black text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services[selectedCategory].map((service: Service, index: number) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border ${
                    selectedPackages.includes(service.title) ? 'border-customBlue' : 'border-gray-600'
                  } rounded-lg cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    name="package"
                    value={service.title}
                    checked={selectedPackages.includes(service.title)}
                    onChange={() => handlePackageSelect(service.title)}
                    className="form-checkbox h-4 w-4 text-customBlue mr-4 accent-customBlue"
                  />
                  <div>
                    <h2 className="text-white text-lg">{service.title}</h2>
                    <p className="text-white/40">{service.price}</p>
                  </div>
                </label>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
