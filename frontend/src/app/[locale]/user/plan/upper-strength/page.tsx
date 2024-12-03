import React from 'react'
import strength from "../../../../../../assets/images/strength.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const page = () => {
  return (
    <div className='flex flex-col p-3 '>
<div className="bg-[#151515] p-4 rounded-lg shadow-lg flex flex-row justify-between text-white space-y-2">
  <div className="flex flex-col justify-between">
    <div>
      <h2 className="text-lg font-semibold">Upper body - Strength</h2>
      <p className="text-xs font-extralight pt-2">Upper Body</p>
      <p className="text-xs font-extralight">Easy</p>
      <p className="text-xs font-extralight">Weight loss</p>

    </div>
    <div className="flex items-center space-x-2 mt-auto">
      <FontAwesomeIcon icon={faClock} className="text-customBlue" />
      <span className="text-sm font-extralight">3 Months, 3 weeks per day</span>
    </div>
  </div>
  <Image
    src={strength}
    alt="Upper body - Strength"
    className="w-60 h-40 object-contain rounded-lg"
  />
</div>
      <div>

      </div>
    </div>

  )
}

export default page
