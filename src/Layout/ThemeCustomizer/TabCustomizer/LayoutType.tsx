import { LayoutTypeData } from "@/Data/Applications/Layout/ThemeCustomizer";
import { useAppSelector } from "@/Redux/Hooks";
import { setLayoutType } from "@/Redux/Reducers/ThemeCustomizerReducer";
import { useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";

const LayoutType = () => {
  const { layout_type } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useDispatch();
  const handleLayout = (layout: string) => dispatch(setLayoutType(layout));

  return (
    <div className="mb-3 p-2 rounded-3 b-t-primary border-3">
      <div className="theme-layout mb-2">
        <h4>Layout type:</h4>
        <p>Choose between 3 different layout types.</p>
      </div>
      <div className="radio-form checkbox-checked">
        {LayoutTypeData.map((item) => (
          <FormGroup
            className={`${item.class}-setting ${
              layout_type === item.type ? "active" : ""
            }`}
            key={item.id}
            onClick={() => handleLayout(item.type)}
            check
          >
            <Input
              id={`flexRadioDefault${item.id}`}
              type="radio"
              name="flexRadioDefault"
              defaultChecked={item.check ? true : false}
            />
            <Label htmlFor={`flexRadioDefault${item.id}`} check>
              {item.label}
            </Label>
          </FormGroup>
        ))}
      </div>
    </div>
  );
};
export default LayoutType;
