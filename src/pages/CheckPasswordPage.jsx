import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { setToken } from '../redux/userSlice';
import { useDispatch } from 'react-redux';



const CheckPasswordPage = () => {

  const [data, setData] = useState({
    password : "",
    userId : ""
  })


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/email')
    }
  }, [location, navigate])

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

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

  try {
    const response = await axios({
      method : 'post',
      url : URL,
      data : {
        userId : location?.state?._id,
        password : data.password
      },
      withCredentials  : true      
    })

    toast.success(response.data.message)

    if(response.data.success){
      dispatch(setToken(response?.data?.data?.access_token))
      localStorage.setItem('token',response?.data?.data?.access_token)

      setData({
        password : "",
      })
      navigate('/')
    }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='mt-5'>
      <div className='bg-white rounded w-full max-w-md overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar
            width={80}
            height={80}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className=' font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>
        
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password: </label>
            <input 
              type='password'
              id='password'
              name='password'
              placeholder='enter your password'
              className='bg-slate-300 px-2 py-1 focus:outline-second'
              value={data.password}
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

        <p className='my-3 text-center'> <Link to={"/forgot-password"} className='hover:text-third font-semibold'>Se te olvido la contraseña?</Link></p>
      </div>
    </div>
  )
}

export default CheckPasswordPage