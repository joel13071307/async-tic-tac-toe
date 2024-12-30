import React, {useState, useContext, useEffect} from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { createUserWithEmailAndPassword, saveProfile } from '../services/firebase'
import { UserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [openSnackbar] = useSnackbar({ style: { backgroundColor: 'red' } })
  const user = useContext(UserContext)

  // useEffect(() => {
  //   if(user) {
  //     window.location.href = '/home'
  //   }
  // }, [user])

  const register = (name, username, email, password) => {
    createUserWithEmailAndPassword(email, password).then((userCredential) => {
      saveProfile(userCredential.user.uid, {name,username, email}).then(()=>{
        window.location.href = '/home'
      }).catch((error) => {
        openSnackbar('Something went wrong')
      })
    }).catch((error) => {
      if(error.code === 'auth/email-already-in-use') {
        openSnackbar('Email already in use')
      } else if(error.code === 'auth/invalid-email') {
        openSnackbar('Invalid email')
      } else if(error.code === 'auth/weak-password') {
        openSnackbar('Weak password')
      } else {
        console.log(error)
        openSnackbar('Something went wrong')
      }
    })
  }


  return (
    <div className='p-4 h-screen'>
      <Link to='/'>
      <img className='mb-8' src="https://img.icons8.com/ios-glyphs/30/333333/chevron-left.png"/>
      </Link>
      <p className=' text-[#333333] font-[700] text-[14px]'>Create Account</p>
      <p className=' text-[#333333] font-[700] text-[28px]'>Let's get to know</p>
      <p className=' text-[#333333] font-[700] text-[28px] mb-8 leading-6'>you better!</p>
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Your name</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-4 w-full' type='text' placeholder='Type your name here' value={name} onChange={(e) => setName(e.target.value)}/>
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Username</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-4 w-full' type='text' placeholder='Type your username here' value={username} onChange={(e) => setUsername(e.target.value)} />
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Email</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-4 w-full' type='email' placeholder='Type your email here' value={email} onChange={(e) => setEmail(e.target.value)} />
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Password</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-8 w-full' type='password' placeholder='Type your password here' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className=' bg-[#F2C94C] h-[56px] w-full rounded-lg text-white font-[700]' onClick={() => register(name, username, email, password)}>Register</button>
    </div>
  )
}

export default RegisterPage
