import Image from 'next/image'
import registerImage from '../home image.png';


import React from 'react'
import Link from 'next/link';

const registerTwo
  = () => {
    return (
      <div className="flex h-screen">

        <div className="md:w-1/3 w-full flex justify-center items-center bg-black">
          <div className="text-white bg-black bg-opacity-75 p-8 rounded-md">
            <h2 className="text-3xl  mb-8 text-center">Health Information</h2>
            <form className="flex flex-col items-center w-[110%]">
              <div className="mb-4 w-full">
                <input
                  type="text"
                  id="medical-condition"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Medical Condition"
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  type="text"
                  id="allergies"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Allergies"
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  type="text"
                  id="injuries"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Injuries"
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  type="text"
                  id="medication"
                  className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                  placeholder="Medications you take"
                />
              </div>
              <button className="w-full p-2 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black">
                <Link href="/Register/registerThree">Next</Link>
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-2/3  hidden md:block h-full md:relative">
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
      //health info 


    )
  }

export default registerTwo
