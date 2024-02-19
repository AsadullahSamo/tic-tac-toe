import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameStats = pgTable("game_stats", {
  id: serial("id").primaryKey(),
  playerWins: integer("player_wins").notNull().default(0),
  aiWins: integer("ai_wins").notNull().default(0),
  draws: integer("draws").notNull().default(0),
});

export const insertGameStatsSchema = createInsertSchema(gameStats).pick({
  playerWins: true,
  aiWins: true,
  draws: true,
});

export type InsertGameStats = z.infer<typeof insertGameStatsSchema>;
export type GameStats = typeof gameStats.$inferSelect;
