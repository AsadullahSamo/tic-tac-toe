import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAIMove } from "@/lib/minimax";
import { checkWinner, type Board } from "@/lib/gameLogic";
import { playMove, playWin } from "@/lib/sounds";
import { triggerWinConfetti } from "@/lib/confetti";
import type { Difficulty } from "@/pages/Game";

interface Props {
  gameMode: "ai" | "pvp";
  difficulty: Difficulty;
  onGameEnd: (result: "win" | "loss" | "draw") => void;
  playerColor: string;
  aiColor: string;
  board: Board;
  onMove: (board: Board) => void;
}

export default function GameBoard({
  gameMode,
  difficulty,
  onGameEnd,
  playerColor,
  aiColor,
  board,
  onMove,
}: Props) {
  
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const gameEndedRef = useRef(false);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

  
  useEffect(() => {
    cellRefs.current = Array(9).fill(null);
  }, []);

  const makeMove = (index: number, player: "X" | "O") => {
    const newBoard = [...board];
    newBoard[index] = player;
    onMove(newBoard);
    playMove();

    const cell = cellRefs.current[index];
    if (cell) {
      gsap.fromTo(
        cell,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  };

  const handleClick = (index: number) => {
    if (board[index] || gameEndedRef.current) return;
    
    if (gameMode === "ai" && currentTurn !== "X") return;

    makeMove(index, currentTurn);
    if (gameMode === "pvp") {
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
    } else {
      setCurrentTurn("O");
    }
  };

  
  useEffect(() => {
    if (gameMode === "ai" && currentTurn === "O" && !gameEndedRef.current) {
      const { winner } = checkWinner(board);
      if (winner) return;

      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, difficulty);
        if (aiMove !== null && !board[aiMove]) {
          makeMove(aiMove, "O");
          setCurrentTurn("X");
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentTurn, board, difficulty, gameMode]);

  
  useEffect(() => {
    if (gameEndedRef.current) return;

    const { winner, combination } = checkWinner(board);
    if (winner) {
      gameEndedRef.current = true;
      setWinningCells(combination || []);
      if (combination) {
        const validCells = combination
          .map((index) => cellRefs.current[index])
          .filter((cell): cell is HTMLButtonElement => cell !== null);

        if (validCells.length > 0) {
          gsap.timeline()
            .to(validCells, {
              backgroundColor: winner === "X" ? playerColor : aiColor,
              scale: 1.1,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            })
            .to(validCells, {
              scale: 1,
              duration: 0.2,
              ease: "power2.inOut",
            });
          
          playWin();
          triggerWinConfetti();
        }
      }
      
      onGameEnd(gameMode === "ai"
        ? (winner === "X" ? "win" : "loss")
        : (winner === "X" ? "win" : "loss")
      );
    } else if (!board.includes(null)) {
      gameEndedRef.current = true;
      onGameEnd("draw");
    }
  }, [board, onGameEnd, playerColor, aiColor, gameMode]);

  const resetGame = () => {
    
    gameEndedRef.current = false;
    setCurrentTurn("X");
    setWinningCells([]);
    onMove(Array(9).fill(null));
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-4">
        <p className="text-lg">
          {gameEndedRef.current ? (
            winningCells.length > 0 ? (
              <span
                className="font-bold"
                style={{
                  color:
                    currentTurn === "X"
                      ? aiColor
                      : playerColor,
                }}
              >
                {gameMode === "ai"
                  ? currentTurn === "X"
                    ? "AI (O) Wins!"
                    : "Player (X) Wins!"
                  : currentTurn === "X"
                  ? "Player 2 (O) Wins!"
                  : "Player 1 (X) Wins!"}
              </span>
            ) : (
              <span className="font-bold">It's a Draw!</span>
            )
          ) : (
            <>
              Current Turn:{" "}
              <span
                className="font-bold animate-pulse"
                style={{
                  color:
                    currentTurn === "X"
                      ? playerColor
                      : aiColor,
                }}
              >
                {gameMode === "ai"
                  ? currentTurn === "X"
                    ? "Player (X)"
                    : "AI (O)"
                  : currentTurn === "X"
                  ? "Player 1 (X)"
                  : "Player 2 (O)"}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <Button
            key={index}
            ref={(el) => (cellRefs.current[index] = el)}
            variant="secondary"
            className={`h-24 text-4xl font-bold relative transition-all duration-200 ease-in-out transform
              ${!cell && currentTurn === "X" && !gameEndedRef.current ? "hover:bg-muted hover:scale-105 cursor-pointer" : ""}
              ${winningCells.includes(index) ? "winning-cell" : ""}`}
            onClick={() => handleClick(index)}
            disabled={
              !!cell ||
              gameEndedRef.current ||
              (gameMode === "ai" && currentTurn !== "X")
            }
            style={{
              color: cell === "X" ? playerColor : cell === "O" ? aiColor : undefined,
              backgroundColor: winningCells.includes(index)
                ? cell === "X"
                  ? playerColor
                  : aiColor
                : undefined,
            }}
          >
            {cell}
            {!cell && currentTurn === "X" && !gameEndedRef.current && (
              <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-20 transition-opacity">
                X
              </span>
            )}
          </Button>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetGame} style={{ width: "100%"}} >
          Reset Game
        </Button>
      </div>
    </Card>
  );
}
