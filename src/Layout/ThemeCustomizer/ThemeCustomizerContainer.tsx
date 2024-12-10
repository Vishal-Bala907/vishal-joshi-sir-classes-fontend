import NavCustomizer from "./NavCustomizer/NavCustomizer";
import TabCustomizer from "./TabCustomizer/TabCustomizer";
import { useSelector, useDispatch } from "react-redux";
import { setOpenCus } from "@/Redux/Reducers/ThemeCustomizerReducer";
import { useAppSelector } from "@/Redux/Hooks";

const ThemeCustomizer = () => {
  const { openCus } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useDispatch();
  const toggle = () => dispatch(setOpenCus(!openCus));

  return (
    <>
      <div className="sidebar-pannle-main" onClick={toggle}>
        <NavCustomizer />
      </div>
      <section className={`setting-sidebar ${openCus ? "open" : ""}`}>
        <TabCustomizer toggle={toggle} />
      </section>
    </>
  );
};
export default ThemeCustomizer