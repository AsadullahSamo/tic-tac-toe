import React from 'react'
import Head from 'next/head'
import styles from '../components/Fonts.module.css'
import Image from 'next/image'
import x from '../../public/assets/icons/x.svg'
import o from '../../public/assets/icons/o.svg'
import Link from 'next/link'
import { useState } from 'react'

export default function GameBoard() {
  const [player, setPlayer] = useState(x)
  const [showImage1, setShowImage1] = useState(false)
  const [showImage2, setShowImage2] = useState(false)
  const [showImage3, setShowImage3] = useState(false)
  const [showImage4, setShowImage4] = useState(false)
  const [showImage5, setShowImage5] = useState(false)
  const [showImage6, setShowImage6] = useState(false)
  const [showImage7, setShowImage7] = useState(false)
  const [showImage8, setShowImage8] = useState(false)
  const [showImage9, setShowImage9] = useState(false)


  const [gameBoard, setGameBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const handleShowImage = (index, setShowImageX) => {
    setShowImageX(img => !img)
    player === x ? setPlayer(o) : setPlayer(x)
    gameBoard[index] = player
  }

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
            <p className='flex justify-center bg-white flex justify-center items-center w-44 font-bold h-12 rounded-lg '> 
                <Image src={x} alt="X" width={35} height={35} className='mt-2'/> 
                <span className='font-bold text-xl'> TURN </span> 
            </p>
        </div>

      </div>
      
      <table className='flex flex-col pt-16 shadow-2xl justify-center items-center w-[34rem] h-[32rem] bg-[#fff] -mt-4 rounded-2xl'>
      <tbody>
        <tr className='flex justify-center gap-2' style={{borderBottom: '1px solid black', width: '22rem'}}>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(0, setShowImage1)}> 
              { showImage1 && <Image src={gameBoard[0]} alt={gameBoard[0].toString().toUpperCase} width={50} height={50}/> }
            </td>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(1, setShowImage2)}> 
              { showImage2 && <Image src={gameBoard[1]} alt={gameBoard[1].toString().toUpperCase} width={50} height={50}/> }
            </td>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{height: '8rem'}} onClick={() => handleShowImage(2, setShowImage3)}>
              { showImage3 && <Image src={gameBoard[2]} alt={gameBoard[2].toString().toUpperCase} width={50} height={50}/> }
            </td>
        </tr>
        <tr className='flex justify-center gap-2' style={{borderBottom: '1px solid black', width: '22rem'}}>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(3, setShowImage4)}> 
              { showImage4 && <Image src={gameBoard[3]} alt={gameBoard[3].toString().toUpperCase} width={50} height={50}/> }
            </td>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(4, setShowImage5)}> 
              { showImage5 && <Image src={gameBoard[4]} alt={gameBoard[4].toString().toUpperCase} width={50} height={50}/> }
            </td>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{height: '8rem'}} onClick={() => handleShowImage(5, setShowImage6)}>
              { showImage6 && <Image src={gameBoard[5]} alt={gameBoard[5].toString().toUpperCase} width={50} height={50}/> }
            </td>
        </tr>
        <tr className='flex justify-center gap-2'>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(6, setShowImage7)}> 
              { showImage7 && <Image src={gameBoard[6]} alt={gameBoard[6].toString().toUpperCase} width={50} height={50}/> }
            </td>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{borderRight: '1px solid black', height: '8rem'}} onClick={() => handleShowImage(7, setShowImage8)}> 
              { showImage8 && <Image src={gameBoard[7]} alt={gameBoard[7].toString().toUpperCase} width={50} height={50}/> }
            </td>
            <td className='flex justify-center items-center w-24 h-24 bg-white text-center' style={{height: '8rem'}} onClick={() => handleShowImage(8, setShowImage9)}>
              { showImage9 && <Image src={gameBoard[8]} alt={gameBoard[8].toString().toUpperCase} width={50} height={50}/> }
            </td>
        </tr>

      </tbody>
      </table>

      <div className='flex gap-44 mt-2'>
          <p className={`text-white text-center mt-5 bg-[#45A6D5] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#45a6d5] rounded-full px-12 py-5 font-semibold ${styles.interSemiBold}`}> X (CPU) </p>
          <p className={`text-white text-center mt-5 bg-[#FEC104] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#FEC104] rounded-full px-12 py-5 font-semibold ${styles.interSemiBold}`}> O (You) </p>
        </div>
     
    </>
  )

}



