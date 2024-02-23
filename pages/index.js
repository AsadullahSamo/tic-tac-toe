import Homepage from "./components/Homepage";
import PlayerCard from "./components/PlayerCard";

export default function Home() {
  
  return (
  
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 bg-[#f3f3f3]`} >
      {/* <Homepage /> */}
      <PlayerCard />
    </main>

  );

}
