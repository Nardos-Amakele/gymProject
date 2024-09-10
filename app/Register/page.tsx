import React from 'react'

const register = () => {
  return (
    <div>
      <div className="flex h-screen">

<div className="w-3/5 flex justify-center items-center bg-black">
<div className="text-white bg-black bg-opacity-75 p-8 rounded-md">
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
  <button type="submit" className="w-full p-2 font-semibold text-customBlue rounded-lg bg-zinc-800 hover:bg-customBlue hover:text-black">
  Next
  </button>
</form>
</div>

</div>
<div className="w-4/5 h-full relative">
  <img
    src="/path/to/your/image.jpg" 
    alt="Gym Image"
    className="h-full w-full object-cover"
  />
</div>
</div>
    </div>
  )
}

export default register
