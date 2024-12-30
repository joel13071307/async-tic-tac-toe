import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const LandingPage = () => {
  const user = useContext(UserContext)
  
  useEffect(() => {
    if (user) {
      window.location.href = '/home'
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center h-screen p-2'> {/*centers the position of contents inside the tag*/}
       <div className=' absolute items-center flex flex-col justify-center'>
      <p className=' text-[36px] italic leading-[45px] font-bilbo'>async</p>
      <p className=' text-[84px] font-thin font-bilbo'>tic tac</p>
      <p className=' text-[84px] font-thin font-bilbo'>toe</p>
       </div>
      <div className=' absolute bottom-6 w-[95%]'>
        <Link to='/login' >
      <button className=' bg-[#F2C94C] h-[56px] w-full rounded-lg mb-4 text-white font-[700]'>Login</button>
        </Link>
        <Link to='/register'>
      <button className=' bg-[#2F80ED] h-[56px] w-full rounded-lg text-white font-[700]'>Register</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
