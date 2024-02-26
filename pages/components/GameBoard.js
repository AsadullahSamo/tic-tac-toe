import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../components/Fonts.module.css'
import Image from 'next/image'
import x from '../../public/assets/icons/x.svg'
import o from '../../public/assets/icons/o.svg'
import style from '../components/GameBoard.module.css'

export default function GameBoard() {
  const [player, setPlayer] = useState(x)
  const [cpuTurn, setCPUTurn] = useState(false)
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
    setShowImageX(img => !img)
    player === x ? setPlayer(o) : setPlayer(x)
    player === x ? setCPUTurn(true) : setCPUTurn(false)
    gameBoard[index] = player
    // console.log(gameBoard)
  } // end of handleShowImage

  const showImage = (index) => {
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
    // gameBoard[index] = o
    setGameBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = o;
        return newBoard
      }
    )
    showImage(index)
    setCPUTurn(false)
    setPlayer(x)
  } // end of takeMove

  useEffect(() => {
    if(cpuTurn) {
      setTimeout(() => {
        if(gameBoard[0] === x && gameBoard[1] === x && gameBoard[2] !== o) {
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
        } else {
          let emptyCells = gameBoard.filter(cell => cell !== x && cell !== o)
          let randomIndex = Math.floor(Math.random() * emptyCells.length)
          setGameBoard(prevBoard => {
              const newBoard = [...prevBoard];
              newBoard[emptyCells[randomIndex]] = o;
              return newBoard
            }
          )
          showImage(emptyCells[randomIndex])
          setCPUTurn(false)
          setPlayer(x)
        } // end of if-else ladder

      }, 2000)
    }
  }, [cpuTurn, gameBoard])

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
            <Image src={x} alt="X" width={40} height={40}/>
            <Image src={o} alt="O" width={40} height={40} className='-ml-3'/>
        </div>
        
        <div className='flex'>
            <p className='flex justify-center bg-white items-center w-44 font-bold h-12 rounded-lg '> 
                <Image src={x} alt="X" width={35} height={35} className='mt-2'/> 
                <span className='font-bold text-xl'> TURN </span> 
            </p>
        </div>

      </div>
      
      <div className='flex flex-col pt-16 shadow-2xl justify-center items-center w-[34rem] h-[32rem] bg-[#fff] -mt-4 rounded-2xl'>
        <table>
        <tbody>
          <tr className='flex justify-center gap-2' style={{borderBottom: '1px solid black', width: '22rem'}}>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(0, setShowImage1)}> 
                { showImage1 && <Image src={gameBoard[0]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(1, setShowImage2)}> 
                { showImage2 && <Image src={gameBoard[1]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => !cpuTurn && handleShowImage(2, setShowImage3)}>
                { showImage3 && <Image src={gameBoard[2]} alt="X" width={50} height={50}/> }
              </td>
          </tr>
          <tr className='flex justify-center gap-2' style={{borderBottom: '1px solid black', width: '22rem'}}>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(3, setShowImage4)}> 
                { showImage4 && <Image src={gameBoard[3]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(4, setShowImage5)}> 
                { showImage5 && <Image src={gameBoard[4]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => handleShowImage(5, setShowImage6)}>
                { showImage6 && <Image src={gameBoard[5]} alt="X" width={50} height={50}/> }
              </td>
          </tr>
          <tr className='flex justify-center gap-2'>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(6, setShowImage7)}> 
                { showImage7 && <Image src={gameBoard[6]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(7, setShowImage8)}> 
                { showImage8 && <Image src={gameBoard[7]} alt="X" width={50} height={50}/> }
              </td>
              <td className={`flex ${cpuTurn ? 'pointer-events-none' : 'pointer-events-auto'} justify-center items-center w-24 h-24 bg-white text-center`} style={{height: '8rem'}} onClick={() => handleShowImage(8, setShowImage9)}>
                { showImage9 && <Image src={gameBoard[8]} alt="X" width={50} height={50}/> }
              </td>
          </tr>

        </tbody>
        </table>

        {/* Progress Bar */}
        {cpuTurn &&
          <div class="my-10 w-[90%] bg-blue-600 rounded-ful text-center text-white rounded-full">
            CPU is thinking...
            <div class={`h-[25px] -mt-6 ${cpuTurn ? style.progressBar : style.zeroWidth} bg-red-600 text-xs font-medium text-blue-100 text-center py-1 leading-none rounded-full`}></div>
          </div>
        }

      </div>

      <div className='flex gap-44 mt-2'>
          <p className={`text-white text-center mt-5 bg-[#45A6D5] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#45a6d5] rounded-full px-12 py-5 font-semibold ${styles.interSemiBold}`}> X (CPU) </p>
          <p className={`text-white text-center mt-5 bg-[#FEC104] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#FEC104] rounded-full px-12 py-5 font-semibold ${styles.interSemiBold}`}> O (You) </p>
      </div>

     
      

      
     
    </>
  )

}



