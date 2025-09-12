import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const JoinasDoctor = () => {
    const [doctor, setDoctor] = useState({
        name: "Zafar Ahmed",
        email: "zafar@gmail.com",
        phone: "456762129",
        password: "12345"
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const resp = await axios.post("/api/v1/doctors/register", doctor)
            console.log("res", resp)

            console.log(resp.data.data)
            if (resp.data.data) {
                toast.success("Registered Successfuly")
                navigate("/login")
            } else {
                setError("Please provide valid credentials")
            }

        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <div className='flex flex-col justify-center items-center lg:min-h-screen'>
            <ToastContainer />
            <div className='w-[80%] lg:h-[90%] p-3 flex flex-col lg:flex-row  my-3'>
                <div className='flex flex-col justify-center lg:self-center h-full gap-3 lg:w-1/2'>
                    <div>
                        <h1 className='text-3xl text-[#373f50] font-semibold'>Welcome to Pakistan's Largest Network of Patients</h1>

                    </div>
                    <ul>
                        <li>Create your profile and get instant appointments</li>
                        <li>Setup your online practice clinic</li>
                        <li>Establish online word of mouth</li>
                        <li>Manage your schedule efficiently</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-7 w-full lg:w-1/2 mt-5 lg:mx-auto'>
                    <h1 className='text-xl'>Register Now</h1>
                    <form className='flex flex-col items-center lg:items-baseline gap-5' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Name' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })} />
                        <input type="email" placeholder='Email' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.email} onChange={(e) => setDoctor({ ...doctor, email: e.target.value })} />
                        <input type="text" placeholder='Phone' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.phone} onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })} />
                        <input type="password" placeholder='Password' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.password} onChange={(e) => setDoctor({ ...doctor, password: e.target.value })} />
                        {
                            error && <p className='text-red-500'>{error}</p>
                        }
                        {/* <input type="button" value={loading ? "Loading..." : "Create Your Profile"} className='bg-[#90fbcd] text-white py-3 px-3 w-[80%] rounded-md'/> */}
                        <button type='submit' className='bg-[#42d697] text-white py-3 px-3 w-[80%] rounded-md'>{loading ? "Loading..." : "Create Your Profile"}</button>
                        <p className=" text-center text-gray-600">
                            Already have an account? {" "}
                            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    )
}
