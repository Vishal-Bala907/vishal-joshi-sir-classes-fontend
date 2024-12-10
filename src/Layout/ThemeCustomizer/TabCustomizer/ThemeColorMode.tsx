import { Href, ImagePath } from "@/Constant";
import { ThemeColorModeData } from "@/Data/Applications/Layout/ThemeCustomizer";
import { addSideBarBackGround } from "@/Redux/Reducers/ThemeCustomizerReducer";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

const ThemeColorMode = () => {
  const dispatch = useDispatch();
  const handleMixLayout = (data: string) => {
    dispatch(addSideBarBackGround(data));
    document.body.className = data;
  };
  return (
    <div className="mb-3 p-2 rounded-3 b-t-primary border-3">
      <div className="color-header mb-2">
        <h4>Theme color mode:</h4>
        <p>Choose between 3 different mix layout.</p>
      </div>
      <div className="color-body d-flex align-items-center justify-space-between">
        {ThemeColorModeData.map((data, index) => (
          <div className="color-img mx-1" key={index}>
            <Image
              width={100}
              height={74}
              className="img-fluid"
              src={`${ImagePath}/${data.image}`}
              alt=""
            />
            <div className="customizer-overlay"></div>
            <Button
              color=""
              className={`color-btn ${data.buttonClass}`}
              onClick={() => handleMixLayout(data.class)}
            >
              <a href={Href}>{data.text}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ThemeColorMode;
