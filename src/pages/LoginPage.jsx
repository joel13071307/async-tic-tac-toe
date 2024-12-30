import React, {useState, useContext, useEffect} from 'react'
import { signInWithEmailAndPassword } from '../services/firebase'
import { useSnackbar } from 'react-simple-snackbar'
import { UserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [openSnackbar] = useSnackbar({ style: { backgroundColor: 'red' } })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useContext(UserContext)

  useEffect(() => {
    if (user) {
      window.location.href = '/home'
    }
  }, [user])

  const login = (email, password) => {
    signInWithEmailAndPassword(email, password).catch((error) => {
      if(error.code === 'auth/missing-email') {
        openSnackbar('Email not registered')
      } else if(error.code === 'auth/wrong-password') {
        openSnackbar('Wrong password')
      } else {
        openSnackbar('Something went wrong')
      }  
    })
  }


  return (
    <div>
      <div className='p-4 h-screen'>
        <Link to='/'>
      <img className='mb-8' src="https://img.icons8.com/ios-glyphs/30/333333/chevron-left.png"/>
        </Link>
      <p className=' text-[#333333] font-[700] text-[14px]'>Login</p>
      <p className=' text-[#333333] font-[700] text-[28px]'>Please enter your</p>
      <p className=' text-[#333333] font-[700] text-[28px] mb-8 leading-6'>details</p>
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Email</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-4 w-full' type='email' placeholder='Type your email here' value={email} onChange={(e) => setEmail(e.target.value)} />
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Password</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-4 w-full' type='password' placeholder='Type your password here' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button className=' bg-[#F2C94C] h-[56px] w-full rounded-lg text-white font-[700]' onClick={() => login(email, password)}>Login</button>
    </div>
    </div>
  )
}

export default LoginPage
