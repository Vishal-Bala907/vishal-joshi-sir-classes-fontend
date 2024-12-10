import { UnlimitedColorOptions } from "@/Data/Applications/Layout/ThemeCustomizer";
import { addSideBarBackGround } from "@/Redux/Reducers/ThemeCustomizerReducer";
import { useDispatch } from "react-redux";

const UnlimitedColor = () => {
  const dispatch = useDispatch();
  const handleColorChange = (primaryColor: string, secondaryColor: string) => {
    dispatch(addSideBarBackGround("light"));
    document.body.className = "light";
    document.documentElement.style.setProperty("--theme-default", primaryColor);
    document.documentElement.style.setProperty(
      "--theme-secondary",
      secondaryColor
    );
  };
  return (
    <div className="customizer-color mb-3 p-2 rounded-3 b-t-primary border-3">
      <div className="color-picker mb-2">
        <h4>Unlimited color:</h4>
      </div>
      <ul className="layout-grid">
        {UnlimitedColorOptions.map((item, index) => (
          <li
            key={index}
            className="color-layout"
            data-attr={`color-${item.name}`}
            data-primary={item.primary}
            data-secondary={item.secondary}
            onClick={() => handleColorChange(item.primary, item.secondary)}
          >
            <div />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UnlimitedColor;
