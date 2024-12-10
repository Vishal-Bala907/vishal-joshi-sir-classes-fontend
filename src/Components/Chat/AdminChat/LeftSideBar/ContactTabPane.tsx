import SVG from "@/CommonComponent/SVG";
import { Href, NameAndPhoneNumber } from "@/Constant";
import { Mic } from "react-feather";
import { Input } from "reactstrap";
import { ContactList } from "./ContactList";
import SvgIcon from "@/CommonComponent/SVG/IconSvg";

export const ContactTabPane = () => {
  return (
    <>
      <div className="common-space">
        <p>Contacts</p>
        <div className="header-top">
          <a className="btn badge-light-primary f-w-500" href={Href}>
            <i className="fa-solid fa-plus" />
          </a>
        </div>
      </div>
      <div className="search-contacts">
        <Input type="text" placeholder={NameAndPhoneNumber} />
        <SvgIcon iconId="stroke-search" />
        <Mic className="mic-search" />
      </div>
      <ContactList/>
    </>
  );
};
