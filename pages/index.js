import Homepage from "./components/Homepage";

export default function Home() {
  
  return (
    <>
      <bds></bds>
      <Head>
        <title> Homepage </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Asadullah Samo" />
        <meta name="description" content="This page is homepage and entry point of Tic Tac Toe app" />
        <meta charSet="utf-8" />
      </Head>

      <main className={`min-h-screen m-auto flex flex-col justify-center items-center p-24 bg-[#f3f3f3]`} >
        <Homepage />
      </main>
    </>
  );

}
