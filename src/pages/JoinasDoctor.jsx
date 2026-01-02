import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { CitySelect, CountrySelect, PhonecodeSelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import "./JoinasDoctor.css"
import useSpecializations from '../hooks/useSpecializations';
import { apiBaseUrl } from '../constants/constants';
import useLoginName from '../context/LoginContext';

export const JoinasDoctor = () => {
  const [doctor, setDoctor] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [phonecode, setPhonecode] = useState(null);
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [value, setValue] = useState()
  const [specialization, setSpecialization] = useState("")

  const navigate = useNavigate()

  const {setLoginName, setPd} = useLoginName()

  const { specializations } = useSpecializations()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/register`, { ...doctor, country, state: currentState, city: currentCity, mobile: value, specialization })
      console.log("res", resp)

      console.log(resp.data.data)

      if (resp.data.success) {
        toast.success("Registered Successfuly")
        localStorage.setItem("doctorId", JSON.stringify(resp.data.doctor.dr))
        localStorage.setItem("doctor", JSON.stringify(resp.data.doctor))
        setLoginName(resp.data.doctor.name)
        setPd("d")
        navigate(`/dashboard`)
        // navigate("/login")
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
            <h1 className='text-3xl text-[#373f50] font-semibold'>Welcome to Largest Network of Patients</h1>

          </div>
          <ul>
            <li>Create your profile and get instant appointments</li>
            <li>Setup your online practice clinic</li>
            <li>Consult patients online from anywhere</li>
            <li>Manage your schedule efficiently</li>
          </ul>
        </div>
        <div className='flex flex-col gap-7 w-full lg:w-1/2 mt-5 lg:mx-auto'>
          <h1 className='text-xl'>Register Now</h1>
          <form className='flex flex-col items-center lg:items-baseline gap-5' onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })} />
            <input type="text" placeholder='Username' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.username} onChange={(e) => setDoctor({ ...doctor, username: e.target.value })} />
            <input type="email" placeholder='Email' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.email} onChange={(e) => setDoctor({ ...doctor, email: e.target.value })} />
            <CountrySelect
              containerClassName="form-group"
              inputClassName=""
              onChange={(_country) => {
                console.log(_country)
                setCountry(_country)
              }}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select Country"
              size={71}
              className='border-none'

            />
            <StateSelect
              countryid={country?.id}
              containerClassName="form-group"
              inputClassName=""
              onChange={(_state) => {
                console.log(_state)
                setCurrentState(_state)
              }}
              onTextChange={(_txt) => console.log(_txt)}
              defaultValue={currentState}
              placeHolder="Select State"
              size={71}
              className='state-select'
            />
            {/* <PhonecodeSelect
              containerClassName="form-group"
              inputClassName=""
              onChange={(_code) => setPhonecode(_code)}
              onTextChange={(_txt) => console.log(_txt)}
              defaultValue={phonecode}
              placeHolder="Select Phone Code"
            /> */}

            <CitySelect
              countryid={country?.id}
              stateid={currentState?.id}
              onChange={(_city) => {
                console.log(_city.name)
                setCurrentCity(_city)
              }}
              defaultValue={currentCity}
              placeHolder="Select City"
              size={71}
              containerClassName="state-select"
            // inputClassName='state-select'
            />
            <div className='py-3 px-3 w-[100%] lg:w-[80%] outline'>
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                international
              />
            </div>
            <select
              className="py-3 px-3 w-[100%] lg:w-[80%] outline"
              value={specialization}
              onChange={(e) =>
                setSpecialization(e.target.value)
              }
            >
              <option value="">Select Specialization</option>
              {specializations.map((s) => (
                <option key={s.Specialization_code} value={s.Specialization_name}>
                  {s.Specialization_name}
                </option>
              ))}
            </select>
            {/* <input type="text" placeholder='Phone' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.phone} onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })} /> */}
            <input type="password" placeholder='Password' className='py-3 px-3 w-[100%] lg:w-[80%] outline' required value={doctor.password} onChange={(e) => setDoctor({ ...doctor, password: e.target.value })} />
            <div className='flex gap-3'>
              <label>Gender</label>
              <label ><input type="radio" name="gender" id="gender" value="Male" onChange={e => setDoctor({ ...doctor, gender: e.target.value })} /> Male</label>
              <label ><input type="radio" name="gender" id="gender" value="Female" onChange={e => setDoctor({ ...doctor, gender: e.target.value })} /> Female</label>

            </div>
            {
              error && <p className='text-red-500'>{error}</p>
            }
            {/* <input type="button" value={loading ? "Loading..." : "Create Your Profile"} className='bg-[#90fbcd] text-white py-3 px-3 w-[80%] rounded-md'/> */}
            <button type='submit' className='bg-[#42d697] text-black font-bold py-3 px-3 w-[80%] rounded-md'>{loading ? "Loading..." : "Submit"}</button>
            <p className='text-lg'>
              By signing up, you agree to adoc's Terms of use and Privacy Policy
            </p>
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
