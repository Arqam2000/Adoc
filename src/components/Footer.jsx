import React from 'react'
import { Link } from 'react-router-dom'
import whatsapp from "../assets/whatsapp-social.png"

const Footer = () => {
  const handleClick = () => {
      window.open("https://wa.me/+923002120067", "_blank");
  }
    return (
        <>
            <div className='bg-[#01344f] text-white'>
                <div className='py-6 px-10 flex items-center justify-between'>
                    <ul className='flex items-center gap-5'>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">All Doctors</Link></li>
                        <li><Link to="#">All cities</Link></li>
                    </ul>
                    <div className=''>
                      <button onClick={handleClick}>
                        <img src={whatsapp} alt="whatsapp-logo" width={50} className='fixed bottom-8 right-6 cursor-pointer'/>
                      </button>
                    </div>
                </div>
                <div className='flex justify-center items-center py-3 border-t border-gray-400'>
                    Copyright © 2025 Adoc
                </div>
            </div>
        </>
    )
}

export default Footer