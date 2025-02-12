import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Difficulty } from "@/pages/Game";

function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case "easy":
      return "#E6FFFA"; 
    case "medium":
      return "#FEFCBF"; 
    case "hard":
      return "#FFF5F5";
    default:
      return "transparent";
  }
}

interface Props {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
}

export default function DifficultySelect({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">AI Difficulty</label>
      <Select
        defaultValue={value}
        onValueChange={(val) => onChange(val as Difficulty)}
      >
        <SelectTrigger style={{ backgroundColor: getDifficultyColor(value), color: '#333', fontWeight : '500' }}>
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#00FF88' }} />
              <span>Easy</span>
            </div>
          </SelectItem>
          <SelectItem value="medium">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FBBF24' }} />
              <span>Medium</span>
            </div>
          </SelectItem>
          <SelectItem value="hard">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF6B6B' }} >
                <span>Hard</span>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
