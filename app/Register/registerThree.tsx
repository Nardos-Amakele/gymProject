import React from 'react';

const RegisterTwo = () => {
  return (
    <div className="flex h-screen">
      {/* Form Section */}
      <div className="w-2/5 flex justify-center items-center bg-black">
        <div className="text-white bg-black bg-opacity-75 p-8 rounded-md">
          <h2 className="text-2xl mb-8 text-center">Personal info and fitness goal</h2>
          <form className="flex flex-col items-center w-full"> 
            <div className="mb-4 w-4/5 flex gap-4">
              <input
                type="text"
                id="weight"
                className="w-1/2 p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder="Weight"
              />
              <input
                type="text"
                id="height"
                className="w-1/2 p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder="Height"
              />
            </div>
            <div className="mb-4 w-4/5">
              <input
                type="text"
                id="blood-type"
                className="w-full p-2 placeholder-white/40 rounded-lg border-2 border-white/20 bg-black"
                placeholder="Blood Type"
              />
            </div>
            <div className="mb-4 w-4/5">
              <p className="mb-2 text-white/40">Is this your first time joining a gym?</p>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personalInfo"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2 mb-1">No</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personalInfo"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2 mb-1">Yes, I have worked out for less than a year</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personalInfo"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2 mb-1">Yes, I have worked out for more than a year</span>
                </label>
              </div>
            </div>
            <div className="mb-6 w-4/5">
              <p className="mb-2 text-white/40">Why do you want to join the gym?</p>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gymExperience"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2 mb-1">Lose weight</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gymExperience"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2 mb-1">Gain weight</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gymExperience"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2 mb-1">Cut fat</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gymExperience"
                    className="form-radio border-white appearance-none h-4 w-4 border-2 rounded-sm checked:bg-customBlue"
                  />
                  <span className="ml-2">Not mentioned here</span>
                </label>
              </div>
              <button type="submit" className="w-full p-2 mt-6 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black">
      Register
    </button>
            </div>
            
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-3/5 h-full relative">
        <img
          src="/path/to/your/image.jpg" 
          alt="Gym Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default RegisterTwo;
