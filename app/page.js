import "./globals.css";
import CountTime from "./components/CountTime";
import Message from "./components/Message";
import { useCameraContext } from "./contexts/CameraContext";

export default function Home() {
  return (
    <div className="flex items-center flex-col">
      <CountTime pomodoroTime={1500} />
      <Message />
    </div>
  );
}
