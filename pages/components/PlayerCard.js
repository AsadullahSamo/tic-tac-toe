import React from 'react'
import Head from 'next/head'
import styles from '../components/Fonts.module.css'
import Image from 'next/image'
import x from '../../public/assets/icons/x.svg'
import o from '../../public/assets/icons/o.svg'
import Link from 'next/link'
import { useState } from 'react'
export default function PlayerCard() {
  const [player, setPlayer] = useState('X')
  const [selectedValue, setSelectedValue] = useState("x"); 
  const handleRadioChange = (e) => { 
    setSelectedValue(e.target.value); 
    setPlayer(e.target.value.toUpperCase())
  }; 

  return (
    <>
			<Head>
					<title> Player Card </title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta name="author" content="Asadullah Samo" />
					<meta name="description" content="This is Played Card page of Tic Tac Toe Project" />
					<meta charSet="utf-8" />
			</Head>

      <h1 className={`text-center text-xl ${styles.interSemiBold} -mt-8 mb-8`}> Pick player 1st mark </h1>
      <main className='transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2  flex flex-col pt-16 items-center shadow-2xl w-10/12 h-[30rem] bg-[#fff] -mt-4 rounded-2xl'>
       
      <div className='flex justify-center gap-10'>
        <div className='flex flex-col justify-center gap-1'>
          <Image src={x} alt="X" width={200} height={200}/>
          <input type="radio" value="x" className='ml-[5.5rem] w-6 h-6' checked={selectedValue === 'x'} onChange={handleRadioChange}/>
        </div>

        <div className='flex flex-col justify-center gap-1'>
          <Image src={o} alt="X" width={200} height={200}/>
          <input type="radio" value="o" className='ml-[5.5rem] w-6 h-6' checked={selectedValue === 'o'} onChange={handleRadioChange}/>
        </div>
      </div>

        <p className={`mt-24 text-center w-[50%] text-[1.4rem] ${styles.interSemiBold}`}> REMEMBER {player} is going first  </p>

        <Link href={{pathname: "/components/GameBoard", query: {player: encodeURIComponent(player)}}} className={`text-white mt-5 bg-[#45A6D5] hover:transition-all hover:duration-500 hover:cursor-pointer hover:text-black hover:bg-white border-2 border-solid hover:border-[#45a6d5] rounded-full px-24 py-2 font-semibold ${styles.interSemiBold}`}> Start Game </Link>        
      </main>

    </>
  )

}



