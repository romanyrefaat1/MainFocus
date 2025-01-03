import CountTime from "../components/CountTime";
import FocusTracker from "../components/focus-tracker/FocusTracker";
import Tojjle from "../components/Tojjle";
import { CameraProvider } from "../contexts/CameraContext";
import Buttons from "./Buttons";
import CameraComponent from "./CameraComponent";
import Options from "./Options";

const constrainst = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
    facingMode: "user",
  },
};

export default function Camera() {
  console.log(`Welcome to Camera route!`);
  return (
    <CameraProvider>
      <div>
        <div className="flex justify-center align-center block">
          <FocusTracker />
          
        </div>
        <div className="video-options">
          <Options />
        </div>
      </div>
    </CameraProvider>
  );
}
