import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
    
    return (
        <nav className='flex justify-between lg:justify-evenly items-center p-6 shadow'>
            <div>
                <h1 className='text-2xl font-bold'><Link to="/">Adoc</Link></h1>
            </div>
            <div className='hidden lg:block'>
                <ul className='flex items-center gap-7'>
                    <li>
                        <Link to="/doctors" className='flex items-center gap-1'>Doctors <i className="fa text-[14px]"
                        >&#xf107;</i>
                        </Link>
                        <ul className='hidden'>
                            <li><Link to="#" className='flex items-center gap-1'>Dermatologist
                            </Link></li>
                            <li><Link to="#" className='flex items-center gap-1'>Gynecologist
                            </Link></li>
                            <li><Link to="#" className='flex items-center gap-1'>Urologist
                            </Link></li>
                            
                        </ul>
                    </li>
                    <li><Link to="#">Hospitals</Link> </li>
                    <li><Link to="#">Labs and Diagnostics</Link> </li>
                    <li><Link to="#">Surgeries</Link> </li>
                    <li><Link to="#">Health Blog</Link> </li>
                </ul>
            </div>
            <div className='hidden lg:flex items-center gap-4'>
                <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]' onClick={() => navigate("/login")}>Login/Signup</button>
                <button className='bg-white text-[#ff9d14] py-2 px-2 lg:px-5 rounded border border-[#ff9d14]'>
                    <Link to="/register/doctor">Join as Doctor</Link>
                </button>
                <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]'><Link to="/admin">Admin</Link></button>
            </div>
            <div className='lg:hidden z-10' id="menu">
                <span className={`text-3xl`}>&equiv;</span>
            </div>
        </nav>
    )
}
