import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../components/Fonts.module.css'
import Image from 'next/image'
import x from '../../public/assets/icons/x.svg'
import o from '../../public/assets/icons/o.svg'
import hl from '../../public/assets/icons/hl.svg'
import style from '../components/GameBoard.module.css'
import { useRouter } from 'next/router'

export default function GameBoard() {

    const router = useRouter()
    const encodedData = router.query.player;
    const decodedData = encodedData ? decodeURIComponent(encodedData) : null;
    
    const [humanPlayer, setHumanPlayer] = useState(decodedData === "X" ? x : o)
    const [cpuPlayer, setCPUPlayer] = useState(humanPlayer === x ? o : x)
    const [noOfXMoves, setNoOfXMoves] = useState(0)
    const [noOfOMoves, setNoOfOMoves] = useState(0)
    const [player, setPlayer] = useState(decodedData === "X" ? x : o)
    const [cpuTurn, setCPUTurn] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [showImageArray, setShowImageArray] = useState([false, false, false, false, false, false, false, false, false])
    const [gameBoard, setGameBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])

    const calculateNoOfMoves = (player) => {
      if(isATie()) return 
      else if(player === x) setNoOfXMoves(prev => prev + 1)
      else setNoOfOMoves(prev => prev + 1)
    } // end of calculateNoOfMoves

    const isATie = () => {
      return noOfOMoves + noOfXMoves >= 9 && !checkIfPlayerWins(humanPlayer) ;
    } // end of isATie

    const handleShowImage = (index) => {
      showImage(index)
      humanPlayer === x ? setPlayer(o) : setPlayer(x)
      player === humanPlayer && !isATie() && !gameOver ? setCPUTurn(true) : setCPUTurn(false)
      gameBoard[index] = player
      calculateNoOfMoves(player)
    } // end of handleShowImage

    const showImage = (index) => {
      setShowImageArray(prevImageArray => {
        const newImageArray = [...prevImageArray]
        newImageArray[index] = true
        return newImageArray
      })
    } // end of showImage

    const checkIfPlayerWins = (player) => {
      const winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
      for(let i=0; i<winningCombination.length; i++) {
        if(gameBoard[winningCombination[i][0]] === player && gameBoard[winningCombination[i][1]] === player && gameBoard[winningCombination[i][2]] === player) {
          setGameOver(true)
          return true
        }
      }
      return false
    } // end of checkIfPlayerWins
  
    const checkMove = (firstIndex, secondIndex, cpuMoveIndex, p1, p2) => {
      if(gameBoard[firstIndex] === p2 && gameBoard[secondIndex] === p2 && gameBoard[cpuMoveIndex] !== p1 && gameBoard[cpuMoveIndex] !== p2) {
        takeMove(cpuMoveIndex)
        calculateNoOfMoves(cpuPlayer)
        return true
      } else {
        return false
      }
    } // end of checkMove

    const takeMove = (index) => {
      setGameBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = cpuPlayer;
        return newBoard
      })
      showImage(index)
      setCPUTurn(false)
      setPlayer(humanPlayer)
    } // end of takeMove

    const takeRandomMove = () => {
      let emptyCells = gameBoard.filter(cell => cell !== humanPlayer && cell !== cpuPlayer)
      let randomIndex = Math.floor(Math.random() * emptyCells.length)
      setGameBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[emptyCells[randomIndex]] = cpuPlayer;
        return newBoard
        }
      )
          
      showImage(emptyCells[randomIndex])
      setCPUTurn(false)
      setPlayer(humanPlayer)
      calculateNoOfMoves(cpuPlayer)
    } // end of takeRandomMove

    const checkGameOver = () => {
      setCPUTurn(false)
      setGameOver(true)
    } // end of checkGameOver

    const handleCPUMove = () => {
      //             If X wins then return
      if(checkIfPlayerWins(humanPlayer)) return

      const checkMoveArray = [ [0, 1, 2], [0, 2, 1], [1, 2, 0], [3, 4, 5], [3, 5, 4], [4, 5, 3], [6, 7, 8], [6, 8, 7], [7, 8, 6],
                               [0, 3, 6], [0, 6, 3], [3, 6, 0], [1, 4, 7], [1, 7, 4], [4, 7, 1], [2, 5, 8], [2, 8, 5], [5, 8, 2],
                               [0, 4, 8], [0, 8, 4], [4, 8, 0], [2, 4, 6], [2, 6, 4], [4, 6, 2]
                             ]

      //              Take Winning Moves
      for(let i=0; i<checkMoveArray.length; i++) {
        if(checkMove(checkMoveArray[i][0], checkMoveArray[i][1], checkMoveArray[i][2], humanPlayer, cpuPlayer))
          return
      }

      //              Take Counter Moves
      for(let i=0; i<checkMoveArray.length; i++) {
        if(checkMove(checkMoveArray[i][0], checkMoveArray[i][1], checkMoveArray[i][2], cpuPlayer, humanPlayer)) 
          return
      }
      
      //            Random Move (if no winning or counter moves functions are called)
      takeRandomMove()
    } // end of handleCPUMove

    const checkAndShowStrikeThrough = () => {
      if(checkIfPlayerWins(cpuPlayer))
        checkGameOver()
    } // end of checkAndShowStrikeThrough

    useEffect(() => {
      if (!gameOver && cpuTurn) {
        // setTimeout(() => {
          handleCPUMove()
        // }, 1600)
      }
      checkAndShowStrikeThrough()
    }, [cpuTurn, gameOver]) // end of useEffect

    const handleResetClick = () => {
      setGameBoard([0, 1, 2, 3, 4, 5, 6, 7, 8])
      setShowImageArray([false, false, false, false, false, false, false, false, false])
      setCPUTurn(false)
      setPlayer(humanPlayer)
      setGameOver(false)
      setNoOfXMoves(0)
      setNoOfOMoves(0)
    } // end of handleResetClick

    return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <Head>
          <title> Game Board </title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="author" content="This is the Game board page of the Tic Tac Toe project" />
          <meta name="description" content="This is Played Card page of Tic Tac Toe Project" />
          <meta charSet="utf-8" />
      </Head>

      {gameOver && !isATie() && (
        <p className="text-center text-xl font-semibold"> PLAYER {player === x ? "O" : "X"} WON </p>
      )} 
      {gameOver && isATie() && (
        <p className="text-center text-xl font-semibold"> GAME TIE </p>
      )}
      <div className="flex md:justify-start justify-evenly gap-4 md:gap-80 mb-5">
        <div className={`flex pl-5 md:pl-0`}>
          <Image priority={false} src={x} alt="X" width={40} height={40}/>
          <Image priority={false} src={o} alt="O" width={40} height={40} className="-ml-3"/>
        </div>
        
        <div className="flex">
          <p className="flex justify-center bg-white items-center w-44 font-bold h-12 rounded-lg "> 
            <Image priority={false} src={player} alt={player === x ? "X" : "O"} width={35} height={35} className="mt-2"/> 
            <span className="font-bold text-xl"> TURN </span> 
          </p>
        </div>
      </div>
      
      <div className="flex flex-col pt-16 shadow-2xl justify-center items-center md:w-[34rem] w-[20rem] h-[32rem] bg-[#fff] -mt-4 rounded-2xl">
      <table suppressHydrationWarning>
      <tbody>

        <tr>
          { ((gameBoard[0] === cpuPlayer && gameBoard[1] === cpuPlayer && gameBoard[2] === cpuPlayer) || (gameBoard[0] === humanPlayer && gameBoard[1] === humanPlayer && gameBoard[2] === humanPlayer)) &&
            <Image className={`relative top-[4.6rem] md:w-[22rem] w-[16rem]`} src={hl} alt="Winning Line"/>          
          }
          { ((gameBoard[3] === cpuPlayer && gameBoard[4] === cpuPlayer && gameBoard[5] === cpuPlayer) || (gameBoard[3] === humanPlayer && gameBoard[4] === humanPlayer && gameBoard[5] === humanPlayer)) &&
            <Image className={`relative top-[12.6rem] md:w-[22rem] w-[16rem]`} src={hl} alt="Winning Line"/>          
          }
          { ((gameBoard[6] === cpuPlayer && gameBoard[7] === cpuPlayer && gameBoard[8] === cpuPlayer) || (gameBoard[6] === humanPlayer && gameBoard[7] === humanPlayer && gameBoard[8] === humanPlayer)) &&
            <Image className={`relative top-[20.6rem] md:w-[22rem] w-[16rem]`} src={hl} alt="Winning Line"/>          
          }

          { ((gameBoard[0] === cpuPlayer && gameBoard[3] === cpuPlayer && gameBoard[6] === cpuPlayer) || (gameBoard[0] === humanPlayer && gameBoard[3] === humanPlayer && gameBoard[6] === humanPlayer)) &&
            <Image className={`absolute top-[22.6rem] md:ml-[-6.6rem] ml-[-8.8rem] md:w-[22rem] w-[24rem] rotate-90`} src={hl} alt="Winning Line"/>          
          }
          { ((gameBoard[1] === cpuPlayer && gameBoard[4] === cpuPlayer && gameBoard[7] === cpuPlayer) || (gameBoard[1] === humanPlayer && gameBoard[4] === humanPlayer && gameBoard[7] === humanPlayer)) &&
            <Image className={`absolute top-[22.6rem] md:ml-[0rem] ml-[-3.8rem] md:w-[22rem] w-[24rem] rotate-90`} src={hl} alt="Winning Line"/>          
          }
          { ((gameBoard[2] === cpuPlayer && gameBoard[5] === cpuPlayer && gameBoard[8] === cpuPlayer) || (gameBoard[2] === humanPlayer && gameBoard[5] === humanPlayer && gameBoard[8] === humanPlayer)) &&
            <Image className={`absolute top-[22.6rem] md:ml-[6.5rem] ml-[1.25rem] md:w-[22rem] w-[24rem] rotate-90`} src={hl} alt="Winning Line"/>  
          }
          { ((gameBoard[0] === cpuPlayer && gameBoard[4] === cpuPlayer && gameBoard[8] === cpuPlayer) || (gameBoard[0] === humanPlayer && gameBoard[4] === humanPlayer && gameBoard[8] === humanPlayer)) &&
            <Image className={`absolute top-[23rem] md:ml-[-1.7rem] ml-[-3.7rem] md:w-[26rem] w-[24rem] rotate-[58deg] md:rotate-[51deg]`} src={hl} alt="Winning Line"/>          
          }
          { ((gameBoard[2] === cpuPlayer && gameBoard[4] === cpuPlayer && gameBoard[6] === cpuPlayer) || (gameBoard[2] === humanPlayer && gameBoard[4] === humanPlayer && gameBoard[6] === humanPlayer)) &&
            <Image className={`absolute top-[22.5rem] md:ml-[-2rem] ml-[-3.7rem] md:w-[26rem] w-[24rem] rotate-[-58deg] md:rotate-[-51deg]`} src={hl} alt="Winning Line"/>          
          }
        </tr>

        <tr className="flex justify-center gap-2 md:w-[22rem] w-[16rem]" style={{borderBottom: '1px solid black'}}>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(0)}> 
            { showImageArray[0] && <Image priority={false} src={gameBoard[0]} alt={gameBoard[0] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center || gameOver`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(1)}> 
            { showImageArray[1] && <Image priority={false} src={gameBoard[1]} alt={gameBoard[1] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center || gameOver`} style={{height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(2)}>
            { showImageArray[2] && <Image priority={false} src={gameBoard[2]} alt={gameBoard[2] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
        </tr>
        <tr className="flex justify-center gap-2 md:w-[22rem] w-[16rem]" style={{borderBottom: '1px solid black'}}>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(3)}> 
            { showImageArray[3] && <Image priority={false} src={gameBoard[3]} alt={gameBoard[3] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(4)}> 
            { showImageArray[4] && <Image priority={false} src={gameBoard[4]} alt={gameBoard[4] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => handleShowImage(5)}>
            { showImageArray[5] && <Image priority={false} src={gameBoard[5]} alt={gameBoard[5] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
        </tr>
        <tr className="flex justify-center gap-2">
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(6)}> 
            { showImageArray[6] && <Image priority={false} src={gameBoard[6]} alt={gameBoard[6] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(7)}> 
            { showImageArray[7] && <Image priority={false} src={gameBoard[7]} alt={gameBoard[7] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
          <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center md:w-24 w-[4.5rem] h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => handleShowImage(8)}>
            { showImageArray[8] && <Image priority={false} src={gameBoard[8]} alt={gameBoard[8] === x ? "X" : "O"} className='md:w-[50px] md:h-[50px] w-[35px] h-[35px]'/> }
          </td>
        </tr> 
      </tbody>
      </table>

      {/* Progress Bar */}
      {/* {cpuTurn && !isATie() &&
        <div className="my-10 w-[90%] bg-blue-600 rounded-ful text-center text-white rounded-full">
        CPU is thinking...
        <div className={`h-[25px] -mt-6 ${cpuTurn ? style.progressBar : style.zeroWidth} bg-green-600 text-xs font-medium text-blue-100 text-center py-1 leading-none rounded-full`}></div>
        </div>
      } */}

      </div>

      <div className="flex md:gap-44 gap-4 mt-2">
        <p className={`text-white text-center mt-5 ${cpuPlayer === x ? 'bg-[#45A6D5]' : 'bg-[#FEC104]'} hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#45a6d5] rounded-full md:px-12 md:py-5 py-[6px] px-5 font-semibold ${styles.interSemiBold}`}> {cpuPlayer === x ? "X" : "O"} (CPU) <br /> {cpuPlayer === x ? noOfXMoves : noOfOMoves} </p>
        <p className={`text-white text-center mt-5 ${humanPlayer === x ? 'bg-[#45A6D5]' : 'bg-[#FEC104]'} hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#FEC104] rounded-full md:px-12 md:py-5 py-[6px] px-5 font-semibold ${styles.interSemiBold}`}> {humanPlayer === x ? "X" : "O"} (You) <br /> {humanPlayer === x ? noOfXMoves : noOfOMoves} </p> 
      </div>

      <button onClick={handleResetClick} className={`text-white hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#c5c5c5] my-5 bg-[#c5c5c5] rounded-full md:px-48 px-24 py-2 font-semibold ${styles.interSemiBold}`}> Reset Game </button>

    </div>
    )
}