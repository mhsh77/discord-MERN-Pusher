import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginreq } from '../redux/actions/authactions';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setemail] =useState('')
  const [password,setpassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  
  return (
    <div className="flex-1 bg-[url('https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f204e5015.png')] bg-cover flex justify-center items-center">
        <div  className='container bg-[#36393F] md:max-w-3xl flex-row flex flex-1 m-3 rounded'>
            <form action="" className='flex-col flex-1 p-5 flex' >
                
                <h1 className='text-center text-white text-lg mt-3 mb-1 font-bold'>Welcome back!</h1>
                <h2 className='text-center text-white mb-2'>We're so excited to see you again!</h2>
                
                
                <h1 className='text-[#B9BBBE] font-bold'>Username:</h1>
                <input type="text" className='bg-[#202225] mb-5 p-2 rounded' value={email} onChange={e=>setemail(e.target.value)}/>
                <h1 className='text-[#B9BBBE] font-bold'>Password:</h1>
                <input type="text" className='bg-[#202225] p-2 rounded' type="password" value={password} onChange={e=>setpassword(e.target.value)}/>
                <button href="" className='text-blue-500 mb-5 font-bold text-start'>Forgot your password?</button>
                <button className='py-2 bg-blue-500 text-white rounded' onClick={(e)=>{
                e.preventDefault()
                console.log('login');
                
                dispatch(loginreq(email,password))
                
                
            }}>Login*</button>
                <div className='text-[#B9BBBE]'>
                  Create an account?<button onClick={()=>{
                    navigate('/register')
                  }} className='text-blue-500 mb-5 font-bold text-start pl-2'>Create</button>
                </div>
                
            </form>

                
            <div className='flex-1 hidden md:flex flex-col items-center justify-center'>
            <img src={require('../img/qrcode.png')} alt="qrcode" width={150} height={150} className="rounded"/>
            <h1 className='text-center text-white text-3xl mt-3 mb-1 font-bold'>Log in with QR Code</h1>
            <h2 className='text-center text-white mb-2'>scan this with mobile discord app</h2>
            </div>
            
        </div>
    </div>
  )
}

export default Login