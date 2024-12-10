import { Col } from "reactstrap";
import HeaderLeft from "./HeaderLeft/HeaderLeft";
import HeaderRight from "./HeaderRight/HeaderRight";
import LogoWrapper from "./LogoWrapper/LogoWrapper";

const Header = () => {
  return (
    <header className="page-header row">
      <LogoWrapper />
      <Col className="page-main-header">
        <HeaderLeft />
        <HeaderRight />
      </Col>
    </header>
  );
};

export default Header;
