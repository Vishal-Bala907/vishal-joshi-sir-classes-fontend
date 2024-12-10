import SVG from "@/CommonComponent/SVG";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setSideBarToggle } from "@/Redux/Reducers/ThemeCustomizerReducer";

const LogoWrapper = () => {
  const { sideBarToggle } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useAppDispatch();
  return (
    <div className="logo-wrapper d-flex align-items-center col-auto">
      <div style={{ fontWeight: 'bolder' }}>
        VJ Sir Classes
      </div>
      <a className="close-btn toggle-sidebar" onClick={() => dispatch(setSideBarToggle(!sideBarToggle))}>
        <SVG className="svg-color" iconId="Category" />
      </a>
    </div>
  );
};

export default LogoWrapper;
