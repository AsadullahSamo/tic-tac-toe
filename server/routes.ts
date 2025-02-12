import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/stats", async (_req, res) => {
    const stats = await storage.getGameStats();
    res.json(stats);
  });

  app.post("/api/stats", async (req, res) => {
    const stats = await storage.updateGameStats(req.body);
    res.json(stats);
  });

  const httpServer = createServer(app);
  return httpServer;
}
