import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import GameBoard from "@/components/GameBoard";
import ThemeToggle from "@/components/ThemeToggle";
import DifficultySelect from "@/components/DifficultySelect";
import GameSettings from "@/components/GameSettings";
import GameStats from "@/components/GameStats";
import { apiRequest } from "@/lib/queryClient";
import { toggleSound, isSoundEnabled } from "@/lib/sounds";
import type { GameStats as GameStatsType } from "@shared/schema";
import type { Board } from "@/lib/gameLogic";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export type Difficulty = "easy" | "medium" | "hard";

export default function Game() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [soundEnabled, setSoundEnabled] = useState(isSoundEnabled());
  const [playerColor, setPlayerColor] = useState("#00FF88");
  const [aiColor, setAiColor] = useState("#FF6B6B");
  const [moveHistory, setMoveHistory] = useState<Board[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const { data: stats } = useQuery<GameStatsType>({
    queryKey: ["/api/stats"],
  });

  const updateStatsMutation = useMutation({
    mutationFn: async (newStats: Partial<GameStatsType>) => {
      const res = await apiRequest("POST", "/api/stats", newStats);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const handleGameEnd = (result: "win" | "loss" | "draw") => {
    if (!stats) return;

    const newStats = {
      playerWins: stats.playerWins + (result === "win" ? 1 : 0),
      aiWins: stats.aiWins + (result === "loss" ? 1 : 0),
      draws: stats.draws + (result === "draw" ? 1 : 0),
    };

    updateStatsMutation.mutate(newStats);
  };

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    toggleSound(newState);
  };

  const handleColorChange = (player: "player" | "ai", color: string) => {
    if (player === "player") {
      setPlayerColor(color);
    } else {
      setAiColor(color);
    }
  };

  const handleMove = (newBoard: Board) => {
    const newHistory = [...moveHistory.slice(0, currentMove + 1), newBoard];
    setMoveHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1); // Go back one move
    }
  };

  const canUndo = currentMove > 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tic Tac Toe AI</h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUndo}
                disabled={!canUndo}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Undo Move
              </Button>
            </div>
            <GameBoard 
              difficulty={difficulty} 
              onGameEnd={handleGameEnd}
              playerColor={playerColor}
              aiColor={aiColor}
              board={moveHistory[currentMove]}
              onMove={handleMove}
            />
          </div>

          <div className="space-y-6">
            <DifficultySelect 
              value={difficulty} 
              onChange={setDifficulty} 
            />
            <GameSettings 
              isSoundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              playerColor={playerColor}
              aiColor={aiColor}
              onColorChange={handleColorChange}
            />
            {stats && <GameStats stats={stats} />}
          </div>
        </div>
      </div>
    </div>
  );
}