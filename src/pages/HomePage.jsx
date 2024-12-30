import React, {useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { signOut, getGames } from '../services/firebase'
import { UserContext } from '../providers/UserProvider'

const HomePage = () => {
    const user = useContext(UserContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        if(user){
            getGames(user.email).then((data) => {
                setData(data)
            })
        }
    }, [user])


    const logout = () => {
        signOut().then(() => {
            window.location.href = '/'
        })
    }

  return (
    <div className='flex flex-col items-start justify-start h-screen p-4'>
        <div className='absolute top-6 left-6 flex justify-between w-[88%] items-center'>
        <p className=' font-[700] text-[28px] text-[#333333]'>Your Games</p>
        <p className='font-[700] text-[18px] text-[#FF0000]' onClick={() => logout()}>Logout</p>
        </div>
        <div className='h-[6vh]'></div>
      {data && data.length == 0 &&  <div className='items-center flex flex-col justify-center w-full h-full'>
      <p className=' text-[72px] font-thin leading-[70px] font-bilbo'>No Games</p>
      <p className=' text-[72px] font-thin font-bilbo'>Found</p>
      <Link to='/newgame'>
        <div className='w-screen p-4'>
       <button className=' bg-[#F2C94C] h-[56px] w-full rounded-lg text-white font-[700]'>Start a new game</button>
        </div>
        </Link>
       </div>}
     {data && data.length != 0 && data.map((item) => {
        let name = item.data().fromEmail == user.email ? item.data().toName : item.data().fromName;
        const toName = item.data().toName
        const turn = item.data().turn
        const winner = item.data().winner
        let description;

        if(item.data().createdAt.toDate().toLocaleString() == item.data().updatedAt.toDate().toLocaleString()){
            if(turn == user.email && winner == ''){
                description = "Make your first move!"
            }
            
            if(turn != user.email && winner == ''){
                description = "Waiting for " + item.data().fromName + " to make their first move."
            }
        } else {
            if(turn == user.email && winner == ''){
                description = name + " just made their move! It's your turn to play now."
            }
            
            if(turn != user.email && winner == ''){
                description = "You've made your move! Waiting for them."
            }
        }
        
        if(winner == user.email){
            description = 'You Won!'
        }

        if(winner != '' && winner != user.email){
            description = name + ' Won!'
        }

        if(winner == 'draw'){
            description = "It's a Draw!"
        }

        return (
            <div key={item.id} className=' shadow-2xl p-4 my-2 bg-white rounded-lg w-full flex flex-col'>
                <p className=' text-2xl font-[700] text-[#333333] mb-2'>Game with {name}</p>
                <p className=' text-sm font-[400] text-[#333333] mb-2'>{description}</p>
                <p className=' text-xs font-[400] text-[#333333] mb-4'>{item.data().updatedAt.toDate().toLocaleString()}</p>
                <Link to={'/game/' + item.id}>
                <button className=' bg-[#F2C94C] h-[40px] w-full rounded-lg text-white font-[700]'>{item.data().turn == user.email && winner == '' ? 'Play!' : 'View game'}</button>
                </Link>
            </div>
        )
     }
        )}
        
        {data && data.length != 0 && <Link to='/newgame'><button className=' fixed bottom-4 right-4 bg-[#270F36] text-white pt-2 pr-3 pb-2 pl-2 rounded-lg font-[700] flex justify-center items-center'><img src="https://img.icons8.com/ios-filled/50/FFFFFF/plus-math.png" className=' h-7'/>&nbsp;New Game</button></Link>}
    </div>
  )
}

export default HomePage
