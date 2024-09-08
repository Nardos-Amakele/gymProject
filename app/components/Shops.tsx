import Image from 'next/image';
import shopItem1 from '../../assets/images/shop_item2.png';
import shopItem2 from '../../assets/images/shop_item1.png';

const Shop = () => {
  return (
    <section className="bg-black text-white py-16 px-[13rem]" id="shop">
    
        <div className="flex space-x-14">
          {/* First column*/}
       
          <div className="flex flex-col justify-between">
          <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4 text-[#2596BE]">Shop</h2>
        <p className="mb-12 text-gray-300 max-w-sm text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
            {/* Left and right arrows */}
            <div className="flex space-x-2">
              {/* Left arrow */}
              <button className="text-white hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right arrow */}
              <button className="text-white hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Shop Item 1 */}
            <div className="relative mt-6">
              <Image src={shopItem1} alt="Kings Gym Belt" className="rounded-lg w-[700px] h-[245.59px]" />
              <div className="absolute bottom-4 left-4 flex align-items-center ">
                <p className="text-white text-lg font-bold">900 Birr</p>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400">Explore more</a>
              </div>
            </div>
          </div>

          {/* Second column*/}
          <div className="flex flex-col justify-between">
            {/* Shop Item 2 */}
            <div className="relative">
              <Image
                src={shopItem2}
                alt="Water Bottle"
                className="rounded-tl-[6px] rounded-tr-[111px] rounded-br-[6px] rounded-bl-[6px]"
              />
              <div className="absolute bottom-4 left-4 flex space-x-4">
                <p className="text-red-500 line-through text-lg font-bold">300 Birr</p>
                <p className="text-white text-lg font-bold">150 Birr</p>
              </div>
            </div>

            {/* New Arrival and Discount */}
            <div className="flex justify-between mt-4">
              <p className="text-3xl text-white">New Arrival</p>
              <p className="text-sm text-white">50% Discount for the first 10 sales</p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Shop;
