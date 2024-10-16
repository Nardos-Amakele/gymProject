  'use client'
  import { useState, useEffect } from 'react';
  import { useRouter, useSearchParams } from 'next/navigation'; 
  import { services } from '../../assets/data/servicesData';
  import Link from 'next/link';
  import bgImage from '../../assets/images/home_image.png';

  interface Service {
    title: string;
    price: string;
    benefits: string[];
  }

  type ServiceCategory = keyof typeof services;

  const Register = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Body Building');
    const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

    useEffect(() => {
      const categoryFromUrl = searchParams.get('category') as ServiceCategory;
      const packageFromUrl = searchParams.get('package');

      if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
      if (packageFromUrl) setSelectedPackages([packageFromUrl]);
    }, [searchParams]);

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
      router.push(`/Register/registerSummary?packages=${encodeURIComponent(JSON.stringify(selectedPackages))}&total=${totalPrice.toFixed(2)}`);
    };

    return (
      <div className='bg-black'>
        <div className="flex justify-center items-center min-h-screen"  >
        <div className="flex flex-col md:flex-row w-11/12 max-w-6xl shadow-lg rounded-lg overflow-hidden">
          {/* General Information Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">General Information</h2>
            <form className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder="Full name"
              />
              <input
                type="tel"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder="Phone number"
              />
              <input
                type="email"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder="Email"
              />
              <input
                type="text"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder="Address"
              />
              <input
                type="date"
                className="text-gray-400 w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder="Date of Birth"
              />
              <input
                type="tel"
                className="w-full p-3 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue bg-gray-800"
                placeholder="Emergency number"
              />
              <div className="space-y-2">
                <h3 className="text-gray-400">Gender</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-400">
                    <input type="radio" name="gender" value="male" className="mr-2" />
                    Male
                  </label>
                  <label className="flex items-center text-gray-400">
                    <input type="radio" name="gender" value="female" className="mr-2 " />
                    Female
                  </label>
                </div>
              </div>
                {/* Submit Button */}
            <div className="mt-4">
              <button className="w-full p-2 font-semibold text-customBlue rounded-lg bg-gray-800 hover:bg-customBlue hover:text-black" onClick={handleNextClick}>
                Next
              </button>
              {error && (
                <div className="mb-4 text-red-500 text-sm">
                  {error}
                </div>
              )}
            </div>
            </form>
          </div>

          {/* Choose Package Section */}
          <div className="w-full md:w-1/2 bg-gray-800 p-8 flex flex-col justify-between ">
            <div className=''>
              <h2 className="text-2xl font-semibold text-white mb-6">Choose a Package</h2>
              <div className="flex flex-wrap md:flex-nowrap space-x-1 mb-4">
                {Object.keys(services).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as ServiceCategory)}
                    className={`py-2 px-4 rounded-md ${
                      selectedCategory === category ? 'bg-white text-black' : 'bg-customBlue text-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services[selectedCategory].map((service: Service, index: number) => (
        <label
          key={index}
          className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            selectedPackages.includes(service.title) ? 'border-customBlue shadow-md' : 'border-zinc-600'
          } hover:border-customBlue`}
          onClick={() => handlePackageSelect(service.title)}
        >
          {/* Checkbox input (hidden) */}
          <input
            type="checkbox"
            checked={selectedPackages.includes(service.title)}
            onChange={() => handlePackageSelect(service.title)}
            className="hidden"
          />

          {/* Checkmark in the top right corner */}
          {selectedPackages.includes(service.title) && (
            <div className="absolute top-2 right-2 bg-customBlue rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
                    <div>
                      <h3 className="text-gray-400">{service.title}</h3>
                      <p className="text-blue-200">{service.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <label className='text-gray-400'>
            <input type="checkbox" /> I agree to the <Link href={'/terms'} className='underline hover:text-customBlue'>terms and conditions</Link></label>    
        
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default Register;
