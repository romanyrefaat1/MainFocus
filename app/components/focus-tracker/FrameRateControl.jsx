import { Settings } from "lucide-react";

export default function FrameRateControl({ frameRate, onChange }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <Settings className="w-4 h-4" />
      <span>Frame Rate:</span>
      <select
        value={frameRate}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-gray-100 rounded px-2 py-1"
      >
        <option value="5">5 FPS (Low End)</option>
        <option value="10">10 FPS (Balanced)</option>
        <option value="15">15 FPS (High End)</option>
      </select>
    </div>
  );
}
