import { DropClassTypes } from "@/Types/ChatType";
import { useState } from "react";
import { MoreVertical } from "react-feather";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

export const ContactEdit: React.FC<DropClassTypes> = ({ dropClass }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className={`contact-edit ${dropClass}`}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="">
          <MoreVertical/>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>View details</DropdownItem>
          <DropdownItem>Send messages</DropdownItem>
          <DropdownItem>Add to favorites</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};


