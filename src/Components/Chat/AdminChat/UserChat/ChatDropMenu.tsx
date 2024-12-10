import SvgIcon from "@/CommonComponent/SVG/IconSvg";
import { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const ChatDropMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="dropdown-form">
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="up">
      <DropdownToggle color="transparent" className="dropdown-toggle dropdown-form p-0 border-0 bg-transparent"><i className="icon-plus" /></DropdownToggle>
      <DropdownMenu className="chat-icon">
        <div className="mb-2 dropdown-item"><SvgIcon iconId="camera" /></div>
        <div className="dropdown-item"><SvgIcon iconId="attchment" /></div>
      </DropdownMenu>
    </Dropdown>
    </div>
  );
};

export default ChatDropMenu;