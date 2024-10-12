'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RegisterSummary = () => {
  const router = useRouter();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [total, setTotal] = useState<string | null>(null);

  useEffect(() => {

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
    <div className="text-white flex justify-center items-center p-10 bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-2/3">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Package Summary */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Packages Selected:</h3>
          <div className="grid grid-cols-2">
            {/* First column - Packages */}
            <ul>
              {selectedPackages.map((pkg: string, index: number) => (
                <li key={index} className="mb-1">
                  {pkg}
                </li>
              ))}
            </ul>

            {/* Second column - Prices */}
            <ul className="text-right">
              {selectedPackages.map((pkg: string, index: number) => (
                <li key={index} className="mb-1">
                  {`ETB ${(1000 + index * 100).toFixed(2)}`}
                </li>
                
              ))}
              <p className='text-right text-customBlue'></p>
            </ul>
          </div>
        </div>
              


        {/* Total */}
        <div className="border-t border-customHoverBlue pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <p>Total:</p>
            <p>{`ETB ${total}`}</p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-customBlue">Payment Instructions</h3>
          <div className="bg-[#c0ebff] p-4 mt-2 rounded-lg border border-customBlue">
            <p className="mb-2 text-black">
              Please transfer 50% of the total amount --- ETB {total ? (+total / 2).toFixed(2) : '0.00'} --- to one of the following accounts:
            </p>
            <ul className="list-none text-black">
              <li><strong>CBE:</strong> Account Number 123456789</li>
              <li><strong>Bank of Abyssinia:</strong> Account Number 987654321</li>
              <li><strong>TeleBirr:</strong> Phone Number 0912345678</li>
            </ul>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            After making the payment, click the button below to confirm your order.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          <button className="bg-customBlue text-white py-2 px-6 rounded-lg font-semibold hover:bg-customHoverBlue">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSummary;
