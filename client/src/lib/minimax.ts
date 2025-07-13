import type { Board, Cell } from "./gameLogic";
import { checkWinner } from "./gameLogic";
import type { Difficulty } from "@/pages/Game";

function getRandomMove(board: Board): number {
  const availableMoves = board
    .map((cell: Cell, index: number) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const { winner } = checkWinner(board);

  // Base cases with depth consideration
  if (winner === "O") return 100 - depth; // AI wins
  if (winner === "X") return depth - 100; // Player wins
  if (!board.includes(null)) return 0;    // Draw
  if (depth > 6) return 0;                // Depth limit for performance

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        const score = minimax(board, depth + 1, false, alpha, beta);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "X";
        const score = minimax(board, depth + 1, true, alpha, beta);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return bestScore;
  }
}

export function getAIMove(board: Board, difficulty: Difficulty): number | null {
  if (!board.includes(null)) return null;

  if (difficulty === "easy") {
    return getRandomMove(board);
  }

  if (difficulty === "medium") {
    // In medium mode, 70% chance of making the best move
    return Math.random() > 0.3 ? getBestMove(board) : getRandomMove(board);
  }

  return getBestMove(board);
}

function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = 0;

  // Prioritize center position for first move
  if (board.every(cell => cell === null) && board.length === 9) {
    return 4;
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}