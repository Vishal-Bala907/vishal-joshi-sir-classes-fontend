import SVG from "@/CommonComponent/SVG";
import { Href } from "@/Constant";
import { useState } from "react";

const MaximizeScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) document.documentElement.requestFullscreen();
    else document?.exitFullscreen();
  };
  return (
    <li>
      <a className="full-screen" onClick={() => fullScreenHandler(!fullScreen)} href={Href}>
        <SVG iconId="scanfull" />
      </a>
    </li>
  );
};

export default MaximizeScreen;
