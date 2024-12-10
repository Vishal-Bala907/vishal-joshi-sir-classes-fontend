import { TabCustomizerType } from "@/Types/LayoutTypes";
import CustomizerFooter from "./CustomizerFooter";
import CustomizerHeader from "./CustomizerHeader";
import LayoutType from "./LayoutType";
import SidebarIcon from "./SidebarIcon";
import SidebarType from "./SidebarType";
import ThemeColorMode from "./ThemeColorMode";
import UnlimitedColor from "./UnlimitedColor";

const TabCustomizer: React.FC<TabCustomizerType> = ({ toggle }) => {
  return (
    <>
      <CustomizerHeader toggle={toggle} />
      <div className="customizer-body">
        <ThemeColorMode />
        <SidebarIcon/>
        <LayoutType/>
        <SidebarType/>
        <UnlimitedColor/>
      </div>
      {/* <CustomizerFooter/> */}
    </>
  );
};
export default TabCustomizer;
