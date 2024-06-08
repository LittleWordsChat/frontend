import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email : ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value } = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
  
  const handleSubmit = async (e)=>{
  e.preventDefault()
  e.stopPropagation()

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

  try {
    const response = await axios.post(URL,data)

    toast.success(response.data.message)

    if(response.data.success){
        setData({
          email : ""
        })

        navigate('/password',{
          state : response?.data?.data
        })

    }
  } catch (error) {
      toast.error(error?.response?.data?.message)
  }
  }

  return (
    <div className='mt-5'>
      <div className='bg-white rounded w-full max-w-md overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <PiUserCircle
            size={80}
          />
        </div>
        
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input 
              type='email'
              id='email'
              name='email'
              placeholder='enter your email'
              className='bg-slate-300 px-2 py-1 focus:outline-second'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button 
            className='bg-primary text-lg px-4 text-white py-1 hover:bg-third rounded mt-4 font-bold leading-relaxed tracking-wide' 
          >
            Ingresar
          </button>
        </form>

        <p className='my-3 text-center'>No tienes cuenta? <Link to={"/register"} className='hover:text-third font-semibold'>Registro</Link></p>
      </div>
    </div>
  )
}

export default CheckEmailPage