import SvgIcon from "@/CommonComponent/SVG/IconSvg";
import ConfigDB from "@/Config/ThemeConfig";
import { SidebarIconList } from "@/Data/Applications/Layout/ThemeCustomizer";
import { addSidebarIconType } from "@/Redux/Reducers/ThemeCustomizerReducer";
import { useDispatch } from "react-redux";
import { Input, Label } from "reactstrap";

const SidebarIcon = () => {
  const sideBarIconType = ConfigDB.settings.sidebar.iconType;
  const dispatch = useDispatch();
  const handleSideBarIconType = (type: string) =>
    dispatch(addSidebarIconType(type));

  return (
    <div className="mb-3 p-2 rounded-3 b-t-primary border-3">
      <div className="sidebar-icon mb-2">
        <h4>Sidebar icon:</h4>
        <p>Choose between 2 different sidebar icon.</p>
      </div>
      <div className="sidebar-body form-check radio ps-0">
        <ul className="radio-wrapper">
          {SidebarIconList.map((item) => (
            <li
              className={`${item.class}-svg ${
                sideBarIconType === item.iconClass ? "active" : ""
              }`}
              key={item.id}
              onClick={() => handleSideBarIconType(item.iconClass)}
            >
              <Input
                id={`radio-icon${item.id}`}
                type="radio"
                name="radio2"
                value="option2"
                defaultChecked={item.check ? true : false}
              />
              <Label htmlFor={`radio-icon${item.id}`} check>
                <SvgIcon className="stroke-icon" iconId="stroke-icons" />
                <span>{item.text}</span>
              </Label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SidebarIcon;
