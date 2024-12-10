import { useAppSelector } from "@/Redux/Hooks";
import { addSidebarTypes } from "@/Redux/Reducers/ThemeCustomizerReducer";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";

const SidebarType = () => {
  const { sidebar_types } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useDispatch();
  const handleSidebarType = (type: string) => dispatch(addSidebarTypes(type));

  return (
    <div className="mb-3 p-2 rounded-3 b-t-primary border-3">
      <div className="sidebar-type mb-2">
        <h4>Sidebar type:</h4>
        <p>Choose between 2 different sidebar types.</p>
      </div>
      <Form>
        <FormGroup className="sidebar-body radio ps-0" check>
          <ul className="radio-wrapper">
            <li className={`vertical-setting ${sidebar_types === "compact-wrapper" ? "active" : ""}`} onClick={() => handleSidebarType("compact-wrapper")}>
              <Input id="radio-icon" type="radio" name="radio2" value="option2" defaultChecked />
              <Label htmlFor="radio-icon" check><span>Vertical</span></Label>
            </li>
            <li className={`horizontal-setting ${sidebar_types === "horizontal-sidebar" ? "active" : ""}`} onClick={() => handleSidebarType("horizontal-sidebar")}>
              <Input id="radio-icon4" type="radio" name="radio2" value="option2" />
              <Label htmlFor="radio-icon4" check><span>Horizontal</span></Label>
            </li>
          </ul>
        </FormGroup>
      </Form>
    </div>
  );
};
export default SidebarType;
