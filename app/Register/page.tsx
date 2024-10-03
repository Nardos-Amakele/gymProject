import Image from 'next/image'
import registerImage from './home image.png';
import Link from 'next/link';


import React from 'react';

const register = () => {
  return (
    <div>
      <div className="flex h-screen">

        <div className="md:w-1/3 w-full flex justify-center items-center bg-black">
          <div className="text-white  bg-black bg-opacity-75 p-8 rounded-md">
            <h2 className="text-3xl  mb-8 text-center">Basic Information</h2>
            <form className="flex flex-col items-center w-[110%]">
              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Full name"

                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Phone number"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Email "
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Address"
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="mb-2 w-full">
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Emergency number"
                />
              </div>
              <div className="mb-6 w-full">

                <div className="mb-2 w-full">
                  <h2 className="text-white/40 text-lg mb-2">Gender</h2>
                  <div className="flex items-center space-x-4 -mb-3">
                    <label className="flex items-center text-white">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="form-radio appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue  "
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="flex items-center text-white">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="form-radio  border-white  appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue "
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>
              </div>
              <button className="w-full p-2 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black">
                <Link href="/Register/registerTwo">Next</Link>
              </button>
            </form>
          </div>

        </div>
        <div className="md:w-2/3  hidden md:block h-full md:relative">
          <div className="absolute inset-0 "></div>
          <Image
            src={registerImage}
            alt="Register Background"
            layout="fill"
            objectFit="cover"
            className="rounded-none p-12"
          />
          <div className="absolute top-20 right-20 text-white text-right text-2xl font-bold leading-snug">
            No Hidden Fees. Cancel Anytime.<br />
            Sign up now and get your first week<br />
            FREE!
          </div>

        </div>
      </div>
    </div>
  )
}

export default register