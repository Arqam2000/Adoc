import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='bg-[#01344f] text-white'>
                <div className='py-6 px-10'>
                    <ul className='flex items-center gap-5'>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">All Doctors</Link></li>
                        <li><Link to="#">All cities</Link></li>
                    </ul>
                </div>
                <div className='flex justify-center items-center py-3 border-t border-gray-400'>
                    Copyright © 2025 Adoc
                </div>
            </div>
        </>
    )
}

export default Footer