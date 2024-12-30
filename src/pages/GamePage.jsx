import React, { useEffect, useState, useContext } from 'react'
import Cross from '../assets/images/cross.svg'
import Circle from '../assets/images/circle.svg'
import { Link, useParams } from 'react-router-dom'
import { getGame, updateGame } from '../services/firebase'
import { UserContext } from '../providers/UserProvider'
import Confetti from 'react-confetti'

const GamePage = () => {
    const user = useContext(UserContext)
    const { gameId } = useParams()
    const [gamedata, setgamedata] = useState(null)
    const [board, setboard] = useState(['', '', '', '', '', '', '', '', ''])

    useEffect(() => {
        const unsubscribe = getGame(gameId, (data) => {
            setgamedata(data)
        })
        return unsubscribe;
    } , [])

    useEffect(() => {
        if(gamedata){
            setboard(gamedata.data().board)
        }
    }, [gamedata])

    const checkWinner = (board) => {
        const winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(let i = 0; i < winLines.length; i++){
            const [a, b, c] = winLines[i]
            if(board[a] && board[a] == board[b] && board[a] == board[c]){
                return board[a] == 'x' ? gamedata.data().fromEmail : gamedata.data().toEmail
            }
        }
        if(board[0] != '' && board[1] != '' && board[2] != '' && board[3] != '' && board[4] != '' && board[5] != '' && board[6] != '' && board[7] != '' && board[8] != '') {return 'draw'}
        return ''
    }

    const handleMove = (index) => {
        if(board[index] != '' || gamedata.data().turn != user.email || gamedata.data().winner != '') return
        const newBoard = [...board]
        if(gamedata.data().turn == user.email && gamedata.data().winner == ''){
            newBoard[index] = gamedata.data().fromEmail == user.email ? 'x' : 'o'
        }
        const game = {
            turn: gamedata.data().fromEmail == user.email ? gamedata.data().toEmail : gamedata.data().fromEmail,
            board: newBoard,
            winner: checkWinner(newBoard),
            updatedAt: new Date()
        }
        updateGame(gameId, game)
    }


  return (
    <div>
      <div className='p-4 h-screen'>
        <Link to='/home'>
      <img className='mb-8' src="https://img.icons8.com/ios-glyphs/30/333333/chevron-left.png"/>
        </Link>
      <p className=' text-[#333333] font-[700] text-[28px]'>Game with {gamedata && gamedata.data().fromEmail == user.email ? gamedata.data().toName : gamedata ? gamedata.data().fromName : '' }</p>
      <p className=' text-sm font-[400] text-[#333333] mb-2'>Your piece</p>
      <img src={gamedata && gamedata.data().fromEmail == user.email ? Cross : Circle} className='h-10 my-6 mx-2'/>
      <div className=' w-full flex items-center justify-center'>
      <div className=' h-[420px] w-[360px] bg-[#FFE79E] flex flex-col items-center justify-start mb-12 overflow-visible'>
        <p className='m-4 text-lg text-[#212121] font-[400]'>{
            gamedata && gamedata.data().winner == '' ? gamedata && gamedata.data().turn == user.email ? 'Your turn' : 'Opponent\'s turn' : gamedata && gamedata.data().winner == 'draw' ? 'Draw' : gamedata && gamedata.data().winner == user.email ? 'You won' : 'You lost'
        }</p>
        {gamedata && gamedata.data().winner == user.email && <Confetti/>}
        <div className='grid grid-cols-3 gap-3 '>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(0, board)}><img src={board[0] == '' ? null : board[0] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(1, board)}><img src={board[1] == '' ? null : board[1] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(2, board)}><img src={board[2] == '' ? null : board[2] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(3, board)}><img src={board[3] == '' ? null : board[3] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(4, board)}><img src={board[4] == '' ? null : board[4] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(5, board)}><img src={board[5] == '' ? null : board[5] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(6, board)}><img src={board[6] == '' ? null : board[6] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(7, board)}><img src={board[7] == '' ? null : board[7] == 'x' ? Cross : Circle}></img></div>
            <div className='h-28 w-28 bg-white flex items-center justify-center' onClick={()=>handleMove(8, board)}><img src={board[8] == '' ? null : board[8] == 'x' ? Cross : Circle}></img></div>
        </div>
      </div>
    </div>
        
      {/* <button className=' bg-[#F2C94C] h-[56px] w-full rounded-lg text-white font-[700]'>Submit!</button> */}
    </div>
    </div>
  )
}

export default GamePage
