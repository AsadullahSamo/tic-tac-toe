import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2, VolumeX } from "lucide-react";
import { toggleSound } from "@/lib/sounds";

interface Props {
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  playerColor: string;
  aiColor: string;
  onColorChange: (player: "player" | "ai", color: string) => void;
}

const colorOptions = [
  { label: "Green", value: "#00FF88" },
  { label: "Red", value: "#FF6B6B" },
  { label: "Blue", value: "#60A5FA" },
  { label: "Purple", value: "#A78BFA" },
  { label: "Yellow", value: "#FBBF24" },
];

export default function GameSettings({ 
  isSoundEnabled, 
  onToggleSound,
  playerColor,
  aiColor,
  onColorChange,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Game Settings</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <Label htmlFor="sound-toggle">Sound Effects</Label>
          </div>
          <Switch
            id="sound-toggle"
            checked={isSoundEnabled}
            onCheckedChange={onToggleSound}
          />
        </div>

        <div className="space-y-2">
          <Label>Player Color (X)</Label>
          <Select
            value={playerColor}
            onValueChange={(value) => onColorChange("player", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span>{color.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>AI Color (O)</Label>
          <Select
            value={aiColor}
            onValueChange={(value) => onColorChange("ai", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span>{color.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
