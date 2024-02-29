import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../components/Fonts.module.css'
import Image from 'next/image'
import x from '../../public/assets/icons/x.svg'
import o from '../../public/assets/icons/o.svg'
import style from '../components/GameBoard.module.css'
import StrikethroughLine from './StrikethroughLine'

export default function GameBoard() {
  const [player, setPlayer] = useState(x)
  const [strikeThrough, setStrikeThrough] = useState({bottomPos: 29.9, rightPos: 41.5, width: 22, borderBottomWidth: 4, height: 0, borderRightWidth: 0, rotateDeg: 0})
  const [cpuTurn, setCPUTurn] = useState(false)
  const [showStrikeThrough, setShowStrikeThrough] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showImage1, setShowImage1] = useState(false)
  const [showImage2, setShowImage2] = useState(false)
  const [showImage3, setShowImage3] = useState(false)
  const [showImage4, setShowImage4] = useState(false)
  const [showImage5, setShowImage5] = useState(false)
  const [showImage6, setShowImage6] = useState(false)
  const [showImage7, setShowImage7] = useState(false)
  const [showImage8, setShowImage8] = useState(false)
  const [showImage9, setShowImage9] = useState(false)


  const [gameBoard, setGameBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const handleShowImage = (index, setShowImageX) => {
    setShowImageX(true)
    player === x ? setPlayer(o) : setPlayer(x)
    player === x && !showStrikeThrough ? setCPUTurn(true) : setCPUTurn(false)
    gameBoard[index] = player
  } // end of handleShowImage

  const showImage = (index) => {
    if(showStrikeThrough) {
      setCPUTurn(false)
      return
    }
    switch (index) {
      case 0: setShowImage1(true)
        break
      case 1: setShowImage2(true)
        break
      case 2: setShowImage3(true)
        break
      case 3: setShowImage4(true)
        break
      case 4: setShowImage5(true)
        break
      case 5: setShowImage6(true)
        break
      case 6: setShowImage7(true)
        break
      case 7: setShowImage8(true)
        break
      case 8: setShowImage9(true)
        break
    }
  } // end of showImage

  const takeMove = (index) => {
    if(showStrikeThrough) {
      setCPUTurn(false)
      return
    }
    setGameBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = o;
        return newBoard
      }
    )
    if(!gameOver) { console.log(`gameOver: ${gameOver}, cpuTurn: ${cpuTurn}`) }
    showImage(index)
    setCPUTurn(false)
    setPlayer(x)
  } // end of takeMove

  const takeWinningMove = (index) => {
    if(showStrikeThrough) {
      setCPUTurn(false)
      return
    }
    setGameBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = o;
      return newBoard
    })
    if(!gameOver) { console.log(`gameOver: ${gameOver}, cpuTurn: ${cpuTurn}, showStrikeThrough: ${showStrikeThrough}`) }
    showImage(index)
    setCPUTurn(false)
    setPlayer(x)
  } // end of takeWinningMove

  const showStrikeThroughLine = (width, height, rightPos, bottomPos, borderBottomWidth, borderRightWidth, rotateDeg) => {
    setCPUTurn(false)
    setStrikeThrough({width, height, rightPos, bottomPos, borderBottomWidth, borderRightWidth, rotateDeg})
    setShowStrikeThrough(true)
    setGameOver(true)
  } // end of showStrikeThroughLine

  const handleCPUMove = () => {
    if(showStrikeThrough) {
      setCPUTurn(false)
      return
    }
    //              Take Winning Moves
    if(gameBoard[0] === o && gameBoard[1] === o && gameBoard[2] !== x && gameBoard[2] !== o) {
      takeWinningMove(2)
    } else if(gameBoard[0] === o && gameBoard[2] === o && gameBoard[1] !== x && gameBoard[1] !== o) {
      takeWinningMove(1)
    } else if(gameBoard[1] === o && gameBoard[2] === o && gameBoard[0] !== x && gameBoard[0] !== o) {
      takeWinningMove(0)
    } else if(gameBoard[3] === o && gameBoard[4] === o && gameBoard[5] !== x && gameBoard[5] !== o) {
      takeWinningMove(5)
    } else if(gameBoard[3] === o && gameBoard[5] === o && gameBoard[4] !== x && gameBoard[4] !== o) {
      takeWinningMove(4)
    } else if(gameBoard[4] === o && gameBoard[5] === o && gameBoard[3] !== x && gameBoard[3] !== o) {
      takeWinningMove(3)
    } else if(gameBoard[6] === o && gameBoard[7] === o && gameBoard[8] !== x && gameBoard[8] !== o) {
      takeWinningMove(8)
    } else if(gameBoard[6] === o && gameBoard[8] === o && gameBoard[7] !== x && gameBoard[7] !== o) {
      takeWinningMove(7)
    } else if(gameBoard[7] === o && gameBoard[8] === o && gameBoard[6] !== x && gameBoard[6] !== o) {
      takeWinningMove(6)
    } else if(gameBoard[0] === o && gameBoard[4] === o && gameBoard[8] !== x && gameBoard[8] !== o) {
      takeWinningMove(8)
    } else if(gameBoard[0] === o && gameBoard[8] === o && gameBoard[4] !== x && gameBoard[4] !== o) {
      takeWinningMove(4)
    } else if(gameBoard[4] === o && gameBoard[8] === o && gameBoard[0] !== x && gameBoard[0] !== o) {
      takeWinningMove(0)
    } else if(gameBoard[2] === o && gameBoard[4] === o && gameBoard[6] !== x && gameBoard[6] !== o) {
      takeWinningMove(6)
    } else if(gameBoard[2] === o && gameBoard[6] === o && gameBoard[4] !== x && gameBoard[4] !== o) {
      takeWinningMove(4)
    } else if(gameBoard[4] === o && gameBoard[6] === o && gameBoard[2] !== x && gameBoard[2] !== o) {
      takeWinningMove(2)
    } else if(gameBoard[0] === o && gameBoard[3] === o && gameBoard[6] !== x && gameBoard[6] !== o) {
      takeWinningMove(6)
    } else if(gameBoard[0] === o && gameBoard[6] === o && gameBoard[3] !== x && gameBoard[3] !== o) {
      takeWinningMove(3)
    } else if(gameBoard[3] === o && gameBoard[6] === o && gameBoard[0] !== x && gameBoard[0] !== o) {
      takeWinningMove(0)
    } else if(gameBoard[1] === o && gameBoard[4] === o && gameBoard[7] !== x && gameBoard[7] !== o) {
      takeWinningMove(7)
    } else if(gameBoard[1] === o && gameBoard[7] === o && gameBoard[4] !== x && gameBoard[4] !== o) {
      takeWinningMove(4)
    } else if(gameBoard[4] === o && gameBoard[7] === o && gameBoard[1] !== x && gameBoard[1] !== o) {
      takeWinningMove(1)
    } else if(gameBoard[2] === o && gameBoard[5] === o && gameBoard[8] !== x && gameBoard[8] !== o) {
      takeWinningMove(8)
    } else if(gameBoard[2] === o && gameBoard[8] === o && gameBoard[5] !== x && gameBoard[5] !== o) {
      takeWinningMove(5)
    } else if(gameBoard[5] === o && gameBoard[8] === o && gameBoard[2] !== x && gameBoard[2] !== o) {
      takeWinningMove(2)
    }
    //              Counter Winning Moves
    else if(gameBoard[0] === x && gameBoard[1] === x && gameBoard[2] !== o && gameBoard[2] !== x) {
      takeMove(2)
    } else if(gameBoard[0] === x && gameBoard[2] === x && gameBoard[1] !== o && gameBoard[1] !== x) {
      takeMove(1)
    } else if(gameBoard[1] === x && gameBoard[2] === x && gameBoard[0] !== o && gameBoard[0] !== x) {
      takeMove(0)
    } else if(gameBoard[3] === x && gameBoard[4] === x && gameBoard[5] !== o && gameBoard[5] !== x) {
      takeMove(5)
    } else if(gameBoard[3] === x && gameBoard[5] === x && gameBoard[4] !== o && gameBoard[4] !== x) {
      takeMove(4)
    } else if(gameBoard[4] === x && gameBoard[5] === x && gameBoard[3] !== o && gameBoard[3] !== x) {
      takeMove(3)
    } else if(gameBoard[6] === x && gameBoard[7] === x && gameBoard[8] !== o && gameBoard[8] !== x) {
      takeMove(8)
    } else if(gameBoard[6] === x && gameBoard[8] === x && gameBoard[7] !== o && gameBoard[7] !== x) {
      takeMove(7)
    } else if(gameBoard[7] === x && gameBoard[8] === x && gameBoard[6] !== o && gameBoard[6] !== x) {
      takeMove(6)
    } else if(gameBoard[0] === x && gameBoard[4] === x && gameBoard[8] !== o && gameBoard[8] !== x) {
      takeMove(8)
    } else if(gameBoard[0] === x && gameBoard[8] === x && gameBoard[4] !== o && gameBoard[4] !== x) {
      takeMove(4)
    } else if(gameBoard[4] === x && gameBoard[8] === x && gameBoard[0] !== o && gameBoard[0] !== x) {
      takeMove(0)
    } else if(gameBoard[2] === x && gameBoard[4] === x && gameBoard[6] !== o && gameBoard[6] !== x) {
      takeMove(6)
    } else if(gameBoard[2] === x && gameBoard[6] === x && gameBoard[4] !== o && gameBoard[4] !== x) {
      takeMove(4)
    } else if(gameBoard[4] === x && gameBoard[6] === x && gameBoard[2] !== o && gameBoard[2] !== x) {
      takeMove(2)
    } else if(gameBoard[0] === x && gameBoard[3] === x && gameBoard[6] !== o && gameBoard[6] !== x) {
      takeMove(6)
    } else if(gameBoard[0] === x && gameBoard[6] === x && gameBoard[3] !== o && gameBoard[3] !== x) {
      takeMove(3)
    } else if(gameBoard[3] === x && gameBoard[6] === x && gameBoard[0] !== o && gameBoard[0] !== x) {
      takeMove(0)
    } else if(gameBoard[1] === x && gameBoard[4] === x && gameBoard[7] !== o && gameBoard[7] !== x) {
      takeMove(7)
    } else if(gameBoard[1] === x && gameBoard[7] === x && gameBoard[4] !== o && gameBoard[4] !== x) {
      takeMove(4)
    } else if(gameBoard[4] === x && gameBoard[7] === x && gameBoard[1] !== o && gameBoard[1] !== x) {
      takeMove(1)
    } else if(gameBoard[2] === x && gameBoard[5] === x && gameBoard[8] !== o && gameBoard[8] !== x) {
      takeMove(8)
    } else if(gameBoard[2] === x && gameBoard[8] === x && gameBoard[5] !== o && gameBoard[5] !== x) {
      takeMove(5)
    } else if(gameBoard[5] === x && gameBoard[8] === x && gameBoard[2] !== o && gameBoard[2] !== x) {
      takeMove(2)
    }
    //             Random Moves 
    else if(cpuTurn) {
      let emptyCells = gameBoard.filter(cell => cell !== x && cell !== o)
      let randomIndex = Math.floor(Math.random() * emptyCells.length)
      setGameBoard(prevBoard => {
          const newBoard = [...prevBoard];
          newBoard[emptyCells[randomIndex]] = o;
          return newBoard
        }
      )
      if(!gameOver) { console.log(`gameOver: ${gameOver}, cpuTurn: ${cpuTurn}, showStrikeThrough: ${showStrikeThrough}`) }
      showImage(emptyCells[randomIndex])
      setCPUTurn(false)
      setPlayer(x)
    } // end of if-else ladder
  } // end of handleCPUMove

  useEffect(() => {
    if(cpuTurn) {
      handleCPUMove();
    }

    if(gameBoard[0] === o && gameBoard[1] === o && gameBoard[2] === o || gameBoard[0]===x && gameBoard[1]===x && gameBoard[2]===x) {
      showStrikeThroughLine(22, 0, 41.5, 29.9, 4, 0, 0)
    } else if(gameBoard[3] === o && gameBoard[4] === o && gameBoard[5] === o || gameBoard[3]===x && gameBoard[4]===x && gameBoard[5]===x) {
      showStrikeThroughLine(22, 0, 41.5, 21.8, 4, 0, 0)
    } else if(gameBoard[6] === o && gameBoard[7] === o && gameBoard[8] === o || gameBoard[6]===x && gameBoard[7]===x && gameBoard[8]===x) {
      showStrikeThroughLine(22, 0, 41.5, 13.7, 4, 0, 0)
    } else if(gameBoard[0] === o && gameBoard[3] === o && gameBoard[6] === o || gameBoard[0]===x && gameBoard[3]===x && gameBoard[6]===x) {
      showStrikeThroughLine(0, 24.2, 59.2, 10, 0, 4, 0)
    } else if(gameBoard[1] === o && gameBoard[4] === o && gameBoard[7] === o || gameBoard[1]===x && gameBoard[4]===x && gameBoard[7]===x) {
      showStrikeThroughLine(0, 24.2, 52.6, 9.5, 0, 4, 0)
    } else if(gameBoard[2] === o && gameBoard[5] === o && gameBoard[8] === o || gameBoard[2]===x && gameBoard[5]===x && gameBoard[8]===x) {
      showStrikeThroughLine(0, 24.2, 46, 9.5, 0, 4, 0)
    } else if(gameBoard[0] === o && gameBoard[4] === o && gameBoard[8] === o || gameBoard[0]===x && gameBoard[4]===x && gameBoard[8]===x) {
      showStrikeThroughLine(0, 24.2, 52.2, 9.5, 0, 4, -39)
    } else if(gameBoard[2] === o && gameBoard[4] === o && gameBoard[6] === o || gameBoard[2]===x && gameBoard[4]===x && gameBoard[6]===x) {
      showStrikeThroughLine(0, 24.2, 52.8, 10, 0, 4, 39)
    }

  }, [cpuTurn, gameOver]) // end of useEffect

  const handleResetClick = () => {
    setGameBoard([0, 1, 2, 3, 4, 5, 6, 7, 8])
    setShowImage1(false)
    setShowImage2(false)
    setShowImage3(false)
    setShowImage4(false)
    setShowImage5(false)
    setShowImage6(false)
    setShowImage7(false)
    setShowImage8(false)
    setShowImage9(false)
    setCPUTurn(false)
    setPlayer(x)
    setGameOver(false)
    setShowStrikeThrough(false)
  } // end of handleResetClick

  const constructGAmeBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <>
        <Head>
                <title> Game Board </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="This is the Game board page of the Tic Tac Toe project" />
                <meta name="description" content="This is Played Card page of Tic Tac Toe Project" />
                <meta charSet="utf-8" />
        </Head>

      <div className='flex justify-evenly gap-96 mb-5'>
        <div className={`flex`}>
            <Image priority={false} src={x} alt="X" width={40} height={40}/>
            <Image priority={false} src={o} alt="O" width={40} height={40} className='-ml-3'/>
        </div>
        
        <div className='flex'>
            <p className='flex justify-center bg-white items-center w-44 font-bold h-12 rounded-lg '> 
                <Image priority={false} src={x} alt="X" width={35} height={35} className='mt-2'/> 
                <span className='font-bold text-xl'> TURN </span> 
            </p>
        </div>

      </div>
      
      <div className='flex flex-col pt-16 shadow-2xl justify-center items-center w-[34rem] h-[32rem] bg-[#fff] -mt-4 rounded-2xl'>
        <table suppressHydrationWarning>
        <tbody>
          {showStrikeThrough && 
            <StrikethroughLine width={strikeThrough.width} height={strikeThrough.height} rightPos={strikeThrough.rightPos} bottomPos={strikeThrough.bottomPos} borderBottomWidth={strikeThrough.borderBottomWidth} borderRightWidth={strikeThrough.borderRightWidth} rotateDeg={strikeThrough.rotateDeg}/>
          }
         <tr className='border-b-amber-400 flex justify-center gap-2' style={{borderBottom: '1px solid black', width: '22rem'}}>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(0, setShowImage1)}> 
                { showImage1 && <Image priority={false} src={gameBoard[0]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center || gameOver`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(1, setShowImage2)}> 
                { showImage2 && <Image priority={false} src={gameBoard[1]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center || gameOver`} style={{height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(2, setShowImage3)}>
                { showImage3 && <Image priority={false} src={gameBoard[2]} alt="X" width={50} height={50}/> }
              </td>
          </tr>

          <tr className='flex justify-center gap-2' style={{borderBottom: '1px solid black', width: '22rem'}}>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(3, setShowImage4)}> 
                { showImage4 && <Image priority={false} src={gameBoard[3]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(4, setShowImage5)}> 
                { showImage5 && <Image priority={false} src={gameBoard[4]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => handleShowImage(5, setShowImage6)}>
                { showImage6 && <Image priority={false} src={gameBoard[5]} alt="X" width={50} height={50}/> }
              </td>
          </tr>
          <tr className='flex justify-center gap-2'>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(6, setShowImage7)}> 
                { showImage7 && <Image priority={false} src={gameBoard[6]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(7, setShowImage8)}> 
                { showImage8 && <Image priority={false} src={gameBoard[7]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn || gameOver ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => handleShowImage(8, setShowImage9)}>
                { showImage9 && <Image priority={false} src={gameBoard[8]} alt="X" width={50} height={50}/> }
              </td>
          </tr> 
        </tbody>
        </table>

        {/* Progress Bar */}
        {/* {cpuTurn &&
          <div className="my-10 w-[90%] bg-blue-600 rounded-ful text-center text-white rounded-full">
            CPU is thinking...
            <div className={`h-[25px] -mt-6 ${cpuTurn ? style.progressBar : style.zeroWidth} bg-red-600 text-xs font-medium text-blue-100 text-center py-1 leading-none rounded-full`}></div>
          </div>
        } */}

      </div>

      <div className='flex gap-44 mt-2'>
          <p className={`text-white text-center mt-5 bg-[#45A6D5] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#45a6d5] rounded-full px-12 py-5 font-semibold ${styles.interSemiBold}`}> X (CPU) </p>
          <p className={`text-white text-center mt-5 bg-[#FEC104] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#FEC104] rounded-full px-12 py-5 font-semibold ${styles.interSemiBold}`}> O (You) </p>
      </div>

      <button onClick={handleResetClick} className={`text-white hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#c5c5c5] mt-5 bg-[#c5c5c5] rounded-full px-48 py-2 font-semibold ${styles.interSemiBold}`}> Reset Game </button>


     
      

      
     
    </>
  )

}



