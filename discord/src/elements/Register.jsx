import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { registerreq } from '../redux/actions/authactions';

import { useNavigate } from 'react-router-dom';
function Register() {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const birthYears = [1984, 1987, 1990, 1993, 1996, 1999, 2002, 2005, 2008, 2011, 2014, 2017];
  const daysInMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const [username,setusername] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="flex-1 bg-[url('https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f204e5015.png')] bg-cover flex justify-center items-center text-white">
        <div  className='container bg-[#36393F] md:max-w-xl flex-row flex flex-1 m-3 rounded'>
            <form action="" className='flex-col flex-1 p-5 flex' onSubmit={()=>{
              dispatch(registerreq(username,email,password))
              console.log(username,email,password)
            }}>
                
                <h1 className='text-center text-white text-3xl mt-3 mb-1 font-bold'>Create Acount</h1>
                
                
                
                <h1 className='text-[#B9BBBE] font-bold'>Username:</h1>
                <input type="text" className='bg-[#202225] mb-5 p-2 rounded' value={username} onChange={e=>setusername(e.target.value)}/>
                <h1 className='text-[#B9BBBE] font-bold'>Email:</h1>
                <input type="text" className='bg-[#202225] p-2 mb-5 rounded' value={email} onChange={e=>setemail(e.target.value)}/>
                <h1 className='text-[#B9BBBE] font-bold'>Password:</h1>
                <input type="text" className='bg-[#202225] p-2 mb-5 rounded' value={password} onChange={e=>setpassword(e.target.value)}/>
                <h1 className='text-[#B9BBBE] font-bold'>Date of birth:</h1>
                <div className='flex-1 justify-between flex space-x-2 mt-2 text-[#B9BBBE]'>
                
                  <select name="month" id="month" className='bg-[#202225] mb-5 p-2 rounded flex-1' placeholder='Month'>
                    {monthNames.map(moon=>(
                      <option value={moon} className='bg-[#202225] mb-5 p-2 rounded'>{moon}</option>
                    ))}
                    
                  </select>
                  <select name="day" id="day" className='bg-[#202225] mb-5 p-2 rounded flex-1' placeholder='Day'>
                    {
                      daysInMonth.map(day=>(
                        <option value={day} className='bg-[#202225] mb-5 p-2 rounded'>{day}</option>
                      ))
                    }
                  </select>
                  <select name="year" id="year" className='bg-[#202225] mb-5 p-2 rounded flex-1'>
                    {
                      birthYears.map(year=>(
                        <option value={year} className='bg-[#202225] mb-5 p-2 rounded'>{year}</option>
                      ))
                    }
                    
                  </select>
                </div>
                
                <button className='py-2 bg-blue-500 text-white rounded'  type='submit' onClick={(e)=>{
                    e.preventDefault()
                    console.log(username,email,password)
                    dispatch(registerreq(username,email,password))
                }}  >Register</button>
                <div className='text-[#B9BBBE]'>
                  Already have an account?<button onClick={()=>{navigate('/login')}} className='text-blue-500 mb-5 font-bold text-start pl-2'>Login</button>
                </div>
                
            </form>

            
        </div>
    </div>
  )
}

export default Register
