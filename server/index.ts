import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS and logging middleware (omitted for brevity)

(async () => {
  const server = registerRoutes(app);

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = (err as any).status || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 8000;
  server.listen(PORT, undefined, () => {
    log(`App running at http://localhost:${PORT}`);
  });
})().catch(err => {
  log(`Failed to start server: ${err}`);
  process.exit(1);
});
