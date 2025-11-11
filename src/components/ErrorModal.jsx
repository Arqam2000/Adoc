import React from 'react'

const ErrorModal = ({setError}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black/30 z-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg relative">
        <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setError(false)}>✕</button>
        {/* <h3 className='text-center text-xl text-red-500 '>Error</h3> */}
        <p className="text-center text-gray-800  text-lg text-red-500">Please select city or specialization from the above searchbar</p>
      </div>
    </div>

  )
}

export default ErrorModal
