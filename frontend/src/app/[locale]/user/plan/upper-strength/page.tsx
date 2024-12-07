import React from 'react'
import strength from "../../../../../../assets/images/strength.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import videoThumbnail from "../../../../../../assets/images/video.png"; 


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
      <div className="bg-[#151515] p-4 rounded-lg shadow-lg text-white mt-4 flex flex-row space-x-4">
      {/* Left Sidebar for Selection */}
      <div className=" bg-[#1C1C1C] p-3 rounded-lg">
        <h3 className="text-sm font-semibold mb-4">Month 1</h3>
        <ul className="text-xs space-y-2">
          <li className="cursor-pointer hover:bg-[#333333] p-2 rounded-md">
            Week 1
            <ul className="pl-4 mt-2">
              <li className="cursor-pointer hover:bg-[#444444] p-2 rounded-md">
                Day 1
              </li>
              <li className="cursor-pointer hover:bg-[#444444] p-2 rounded-md">
                Day 2
              </li>
            </ul>
          </li>
          <li className="cursor-pointer hover:bg-[#333333] p-2 rounded-md">
            Week 2
          </li>
          <li className="cursor-pointer hover:bg-[#333333] p-2 rounded-md">
            Week 3
          </li>
          <li className="cursor-pointer hover:bg-[#333333] p-2 rounded-md">
            Week 4
          </li>
        </ul>
      </div>

      {/* List of Exercises */}
      <div className="w-1/3 flex flex-col space-y-3">
        <h3 className="text-sm font-semibold">List of Exercise</h3>
        <button className="flex justify-between items-center bg-[#1C1C1C] p-3 rounded-lg hover:bg-[#333333]">
          <span className="text-sm">Pull Up</span>
          <FontAwesomeIcon icon={faPlay} className="text-customBlue" />
        </button>
        <button className="flex justify-between items-center bg-[#1C1C1C] p-3 rounded-lg hover:bg-[#333333]">
          <span className="text-sm">Lat Pulldowns</span>
          <FontAwesomeIcon icon={faPlay} className="text-customBlue" />
        </button>
        <button className="flex justify-between items-center bg-[#1C1C1C] p-3 rounded-lg hover:bg-[#333333]">
          <span className="text-sm">Shoulder Press</span>
          <FontAwesomeIcon icon={faPlay} className="text-customBlue" />
        </button>
        <button className="flex justify-between items-center bg-[#1C1C1C] p-3 rounded-lg hover:bg-[#333333]">
          <span className="text-sm">Bench Press</span>
          <FontAwesomeIcon icon={faPlay} className="text-customBlue" />
        </button>
      </div>

      {/* Video Preview */}
      <div className="w-1/2 bg-[#1C1C1C] p-3 rounded-lg relative">
        <Image
          src={videoThumbnail}
          alt="Exercise Video"
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faPlay}
            className="text-customBlue text-2xl bg-white rounded-full p-2"
          />
        </div>
      </div>
    </div>

    </div>

  )
}

export default page
