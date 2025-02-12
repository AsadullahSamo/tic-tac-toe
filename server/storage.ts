import { gameStats, type GameStats, type InsertGameStats } from "@shared/schema";

export interface IStorage {
  getGameStats(): Promise<GameStats>;
  updateGameStats(stats: InsertGameStats): Promise<GameStats>;
}

export class MemStorage implements IStorage {
  private stats: GameStats;

  constructor() {
    this.stats = {
      id: 1,
      playerWins: 0,
      aiWins: 0,
      draws: 0,
    };
  }

  async getGameStats(): Promise<GameStats> {
    return this.stats;
  }

  async updateGameStats(stats: InsertGameStats): Promise<GameStats> {
    this.stats = { ...this.stats, ...stats };
    return this.stats;
  }
}

export const storage = new MemStorage();
