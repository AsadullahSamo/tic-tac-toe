import React from 'react'
import logo from '../../public/assets/icons/logo.svg'
import Image from "next/image";
import Link from 'next/link';
import Head from 'next/head';
import styles from '../components/Fonts.module.css'
export default function Homepage() {
  return (
    
    <>
      <Head>
        <title> Home Page </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Asadullah Samo" />
        <meta name="description" content="This page is homepage of Quiz project" />
        <meta charSet="utf-8" />
      </Head>

      <main className='transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex flex-col justify-center items-center shadow-2xl md:w-10/12 w-[100%] h-[40rem] bg-[#d1d1d1] -mt-4 rounded-2xl'>
        <Image
          src={logo}
          alt="Tic Tac Toe logo"
          className='w-20 h-20 md:w-[10rem] md:h-[10rem]'
        />

        <p className={`text-4xl md:text-6xl my-5 ${styles.interBlack}`}> Tic Tac Toe </p>
        <p className={`text-center md:w-[50%] w-[90%] text-[1rem] md:text-[1.4rem] ${styles.interSemiBold}`}> Dive into the excitement now and experience the timeless joy of this classic game  </p>
        <Link href="/components/PlayerCard" className={`mt-5 bg-[#45A6D5] hover:transition-all hover:duration-500 hover:cursor-pointer rounded-full px-24 py-2 font-semibold ${styles.interSemiBold}`}> New Game </Link>
      </main>
    

    </>
  )
}
