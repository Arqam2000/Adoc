import React from 'react'

const Search = () => {
    return (
        <div className='text-xl w-7xl mt-4 mx-auto'>
            {/* <div className='text-xl  p-2 flex items-center gap-2'>
        <span className='inline-flex items-center justify-center rounded-full bg-[#014e78] text-white text-2xl aspect-square px-3'>G</span>
        <h2 className='text-base text-[#3A3A3A] font-semibold'>Hello, Guest</h2>
      </div> */}
            <h1 className='font-bold text-lg text-[#3A3A3A] mt-2'>Find the best doctor near you</h1>
            <div className='w-6xl mx-auto outline outline-[#ADADAD] border-[#ADADAD] px-2 rounded-lg shadow-md grid grid-cols-[1fr_1fr_1fr_1fr_auto] my-7 h-10 items-center'>
                <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057]'>
                    <option value="City">Enter City</option>
                </select>
                <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057]'>
                    <option value="Specialization">Specialization</option>
                </select>
                <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057]'>
                    <option value="Doctor">Doctor</option>
                </select>
                <select className='outline-none text-base text-[#495057]'>
                    <option value="Hospital">Hospital</option>
                </select>
                <div className='flex justify-end items-center w-fit justify-self-end px-2 bg-[#f2fafe] font-normal'>
                    <button className='cursor-pointer'><i class="fa fa-search font-normal"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Search
