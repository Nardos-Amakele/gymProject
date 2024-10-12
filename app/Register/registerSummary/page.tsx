'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RegisterSummary = () => {
  const router = useRouter();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [total, setTotal] = useState<string | null>(null);

  useEffect(() => {
    // Use URLSearchParams to extract the query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const packagesQuery = searchParams.get('packages');
    const totalQuery = searchParams.get('total');

    setSelectedPackages(packagesQuery ? JSON.parse(packagesQuery) : []);
    setTotal(totalQuery || '0');
  }, []);

  if (!selectedPackages.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-white bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-3xl mb-6 text-center">Order Summary</h2>

        {/* Order Summary */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Selected Packages:</h3>
          <ul>
            {selectedPackages.map((pkg: string, index: number) => (
              <li key={index} className="mb-1">
                {pkg}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Total:</h3>
          <p>{`ETB ${total}`}</p>
        </div>

        {/* Payment Instructions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold">Payment Instructions:</h3>
          <p>
            Please transfer 50% of the total amount – ETB {total ? (+total / 2).toFixed(2) : '0.00'} – to one of the following accounts:
          </p>
          <ul className="list-disc list-inside">
            <li>CBE Account Number: 123456789</li>
            <li>Bank of Abyssinia Account Number: 987654321</li>
            <li>Telebirr: Phone Number: 0123456789</li>
          </ul>
        </div>

        {/* Payment Confirmation Button */}
        <button className="w-full bg-customBlue text-white py-2 px-4 rounded-lg">
          Place Order – I Have Paid
        </button>
      </div>
    </div>
  );
};

export default RegisterSummary;
