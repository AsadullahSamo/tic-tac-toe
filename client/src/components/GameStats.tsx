import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Trophy, Minus, Hash } from "lucide-react";
import type { GameStats } from "@shared/schema";

interface Props {
  stats?: GameStats;
}

export default function GameStats({ stats }: Props) {
  if (!stats) return null;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Game Statistics</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#00FF88]" />
            <span>Wins</span>
          </div>
          <span className="font-medium text-[#00FF88]">{stats.playerWins}</span>
        </div>
        <div className="flex items-center justify-between bg-destructive/10 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-[#FF6B6B]" />
            <span>Losses</span>
          </div>
          <span className="font-medium text-[#FF6B6B]">{stats.aiWins}</span>
        </div>
        <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            <span>Draws</span>
          </div>
          <span className="font-medium">{stats.draws}</span>
        </div>
      </CardContent>
    </Card>
  );
}