import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { createNewGame } from '../services/firebase'
import { useSnackbar } from 'react-simple-snackbar'
import { UserContext } from '../providers/UserProvider'

const NewGamePage = () => {
    const [email, setEmail] = useState('')
    const [openSnackbar] = useSnackbar({ style: { backgroundColor: 'red' } })
    const user = useContext(UserContext)

    const create = (fromEmail, toEmail) => {
        const date = new Date()
            createNewGame(fromEmail, toEmail, {
                fromEmail,
                toEmail,
                turn: fromEmail,
                board: [
                    '', '', '',
                    '', '', '',
                    '', '', '',
                ],
                winner: '',
                createdAt: date,
                updatedAt: date,
            }).then(() => {
                window.location.href = '/home'
            }).catch((error) => {
                if(error.code === 'user-not-found') {
                    openSnackbar('Email not found')
                } else if(error.code === 'game-exists') {
                    openSnackbar('A game with this user is already in progress')
                } else {
                    console.log(error)
                    openSnackbar('Something went wrong')
                }
            })
    }

  return (
    <div>
      <div className='p-4 h-screen'>
        <Link to='/home'>
      <img className='mb-8' src="https://img.icons8.com/ios-glyphs/30/333333/chevron-left.png"/>
        </Link>
      <p className=' text-[#333333] font-[700] text-[14px]'>Start a new game</p>
      <p className=' text-[#333333] font-[700] text-[28px]'>Whom do yo want</p>
      <p className=' text-[#333333] font-[700] text-[28px] mb-8 leading-6'>to play with?</p>
      <p className=' text-[#333333] font-[700] text-[14px] mb-2'>Email</p>
      <input className=' bg-[#F4F4F4] px-5 py-4 rounded-lg mb-4 w-full' type='text' placeholder='Type their email here' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button className=' bg-[#F2C94C] h-[56px] w-full rounded-lg text-white font-[700]' onClick={() => {if(user && user.email !== email){create(user.email, email)} else {
            openSnackbar('You cannot play with yourself')
      }}}>Start Game</button>
    </div>
    </div>
  )
}

export default NewGamePage
