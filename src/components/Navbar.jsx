import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-pink-300 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>ArChie</span>
      </div>
        <ul className="flex gap-10 mx-9">
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
