import SVG from "@/CommonComponent/SVG";
import ConfigDB from "@/Config/ThemeConfig";
import { Href } from "@/Constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { addSideBarBackGround } from "@/Redux/Reducers/ThemeCustomizerReducer";

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const handleDarkMode = (data: string) => {
    dispatch(addSideBarBackGround(data));
    document.body.className = data;
  };
  return (
    <li onClick={() => handleDarkMode(ConfigDB.color.mix_background_layout !== "light" ? "light" : "dark-only")}>
      <a className={`dark-mode ${ConfigDB.color.mix_background_layout !== "light" ? "active" : ""}`} href={Href}>
        <SVG iconId="moondark" /> 
      </a>
    </li>
  );
};

export default DarkMode;
