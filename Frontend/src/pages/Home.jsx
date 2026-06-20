import React from 'react'
import logo from '../assets/logo.png'
import trafficLight from '../assets/trafficHero.jpg'
const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className='h-[70vh] w-[30%] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col bg-cover'
       style={{ backgroundImage: `url(${trafficLight})` }}
       >
        <img src={logo} alt="logo" className="w-28 mt-4 ml-4" />
        <div className='bg-white py-6 px-6 mt-auto'>
          <h2 className="text-2xl font-bold text-gray-800">Get started with RideBuddy</h2>
          <button className='w-full bg-black text-white py-3 rounded mt-4 hover:bg-gray-800 transition'>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Home
