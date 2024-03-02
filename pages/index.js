import Homepage from "./components/Homepage";
import PlayerCard from "./components/PlayerCard";
import GameBoard from "./components/GameBoard";

export default function Home() {
  
  return (
  
    <main className={`min-h-screen m-auto flex flex-col justify-center items-center p-24 bg-[#f3f3f3]`} >
      <Homepage />
      {/* <PlayerCard /> */}
      {/* <GameBoard /> */}
    </main>

  );

}
